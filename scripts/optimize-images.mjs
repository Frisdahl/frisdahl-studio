// Generates responsive WebP width variants for every image the app references,
// plus a manifest the <img> helpers read (src/data/generated/responsiveImages.json).
//
//   npm run images           generate missing variants and rewrite the manifest
//   npm run images -- --check fail if a referenced image has no manifest entry
//
// Sources stay where they are in public/. Variants go to public/_img/ and are
// committed, so the production build doesn't need sharp.
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public')
const OUT_DIR = join(PUBLIC, '_img')
const MANIFEST = join(ROOT, 'src/data/generated/responsiveImages.json')

// Breakpoints cover phones (1x–3x), tablets and desktops up to large 2x screens.
const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]
const QUALITY = 78
const IMAGE_PATH = /['"`](\/(?:cases|images)\/[^'"`\s]+\.(?:jpe?g|png|webp|avif))['"`]/g

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (/\.(tsx?|css)$/.test(entry.name)) yield path
  }
}

async function referencedImages() {
  const found = new Set()
  for await (const file of walk(join(ROOT, 'src'))) {
    for (const [, path] of (await readFile(file, 'utf8')).matchAll(IMAGE_PATH)) found.add(path)
  }
  return [...found].sort()
}

async function isFresh(output, sourceMtime) {
  try {
    return (await stat(output)).mtimeMs >= sourceMtime
  } catch {
    return false
  }
}

async function processImage(src) {
  const sourcePath = join(PUBLIC, src)
  const sourceMtime = (await stat(sourcePath)).mtimeMs
  const { width, height } = await sharp(sourcePath).metadata()

  // Every breakpoint below the source width, plus the source width itself (capped).
  const largest = Math.min(width, WIDTHS.at(-1))
  const targets = [...new Set([...WIDTHS.filter((w) => w < largest), largest])]

  const base = src.slice(0, -extname(src).length)
  const variants = []
  for (const w of targets) {
    const url = `/_img${base}-${w}w.webp`
    const output = join(PUBLIC, url)
    if (!(await isFresh(output, sourceMtime))) {
      await mkdir(dirname(output), { recursive: true })
      await sharp(sourcePath).resize({ width: w }).webp({ quality: QUALITY }).toFile(output)
    }
    variants.push([w, url])
  }
  return { width, height, variants }
}

const images = await referencedImages()

if (process.argv.includes('--check')) {
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
  const missing = images.filter((src) => !manifest[src])
  if (missing.length) {
    console.error(`Missing responsive variants (run npm run images):\n  ${missing.join('\n  ')}`)
    process.exit(1)
  }
  console.log(`All ${images.length} referenced images have responsive variants.`)
  process.exit(0)
}

const manifest = {}
for (const src of images) {
  try {
    manifest[src] = await processImage(src)
    console.log(`${src}  ${manifest[src].variants.map(([w]) => w).join(', ')}`)
  } catch (error) {
    console.warn(`Skipped ${src}: ${error.message}`)
  }
}

await mkdir(dirname(MANIFEST), { recursive: true })
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\n${Object.keys(manifest).length} images → ${relative(ROOT, OUT_DIR)}, manifest → ${relative(ROOT, MANIFEST)}`)
