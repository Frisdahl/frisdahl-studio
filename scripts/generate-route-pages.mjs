// After `vite build`: gives every real route its own copy of the app shell, plus a 404.html.
//
// The site is a single-page app, so every route is served by the same index.html. A host
// that falls back to index.html for any unknown address answers 200 for it (a "soft 404":
// the app shows its not-found page, but the HTTP status says the page exists). With one
// file per real route, a static host can answer 404 for everything else:
//
//   /cases              -> dist/cases.html             200
//   /cases/nordwear     -> dist/cases/nordwear.html    200
//   /old-page (removed) -> dist/404.html               404, no redirect
//
// The host must serve 404.html with a 404 status for unmatched paths instead of the single-page
// fallback (Cloudflare static assets: not_found_handling = "404-page"). The routes are read from
// src/lib/routes.ts and the case list in src/data/caseNavigation.ts, so a new route there is
// picked up without editing this file.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
// DIST can be set to run this on a build somewhere else (a measurement copy, for instance).
const DIST = process.env.DIST || join(ROOT, 'dist')

const routesSource = await readFile(join(ROOT, 'src/lib/routes.ts'), 'utf8')
const caseSource = await readFile(join(ROOT, 'src/data/caseNavigation.ts'), 'utf8')

// `export const NAME_PATH = '/address'`
const routes = [...routesSource.matchAll(/export const \w+_PATH = '(\/[^']+)'/g)].map((match) => match[1])

// `export const caseOrder = ['peter-salling', ...] as const`
const caseList = caseSource.match(/export const caseOrder = \[([^\]]*)\]/)
const caseSlugs = caseList ? [...caseList[1].matchAll(/'([^']+)'/g)].map((match) => match[1]) : []

if (routes.length === 0 || caseSlugs.length === 0) {
  console.error('generate-route-pages: found no routes or no cases; check the patterns against src/lib/routes.ts and src/data/caseNavigation.ts')
  process.exit(1)
}

const casesPath = routes.find((route) => route === '/cases')
if (!casesPath) {
  console.error('generate-route-pages: /cases is missing from src/lib/routes.ts')
  process.exit(1)
}

const shell = await readFile(join(DIST, 'index.html'))
const pages = [...routes, ...caseSlugs.map((slug) => `${casesPath}/${slug}`)]

// A project page's own copy of the shell also starts what the page needs first, in parallel with the main bundle,
// instead of after it (main bundle, then the route's chunk, then React, and only then the hero picture):
//   - the route's code chunk and the chunks it imports (modulepreload);
//   - the page's hero picture, with the same srcset and sizes as its <img> (preload as image, high priority), so the
//     browser asks for the very file the page will want, and it is already there when the page renders.
// Both are read from the build itself (dist/assets, the responsive-image manifest and the case data); nothing is listed by hand.
const assetFiles = await readdir(join(DIST, 'assets')).catch(() => [])
const chunkImports = async (file, seen = new Set()) => {
  if (seen.has(file)) return seen
  seen.add(file)
  const code = await readFile(join(DIST, 'assets', file), 'utf8')
  for (const match of code.matchAll(/(?:from|import)\s*["']\.\/([^"']+\.js)["']/g)) await chunkImports(match[1], seen)
  return seen
}
const caseChunk = assetFiles.find((name) => /^CaseDetailPage-.*\.js$/.test(name))
const caseChunks = caseChunk ? [...(await chunkImports(caseChunk))] : []
// The main bundle is already loaded by the shell, so it needs no preload of its own.
const mainChunks = new Set([...shell.toString().matchAll(/assets\/([^"']+\.js)/g)].map((match) => match[1]))
const preloadChunks = caseChunks.filter((name) => !mainChunks.has(name))

let manifest = {}
try {
  manifest = JSON.parse(await readFile(join(ROOT, 'src/data/generated/responsiveImages.json'), 'utf8'))
} catch {
  /* no manifest (the images step has not run): the picture is simply not preloaded */
}
const detailSource = await readFile(join(ROOT, 'src/data/caseDetails.ts'), 'utf8')
const containerSizes = (await readFile(join(ROOT, 'src/lib/responsiveImage.ts'), 'utf8')).match(/container:\s*'([^']+)'/)?.[1]
// Each case's hero picture is the first slide of its hero: `id: 'slug'` ... `slides: [{ imageSrc: '...'`
const heroPictures = new Map(
  [...detailSource.matchAll(/id:\s*'([^']+)',[\s\S]*?slides:\s*\[\s*\{\s*imageSrc:\s*'([^']+)'/g)].map((match) => [match[1], match[2]]),
)

const heroPreload = (slug) => {
  const src = heroPictures.get(slug)
  const entry = src ? manifest[src] : undefined
  if (!src || !entry || !containerSizes) return ''
  const srcset = entry.variants.map(([width, url]) => `${url} ${width}w`).join(', ')
  const fallback = entry.variants.find(([width]) => width >= 1080)?.[1] ?? entry.variants[entry.variants.length - 1][1]
  return `<link rel="preload" as="image" href="${fallback}" imagesrcset="${srcset}" imagesizes="${containerSizes}" fetchpriority="high" />`
}

const withPreloads = (route) => {
  const slug = route.startsWith(`${casesPath}/`) ? route.slice(casesPath.length + 1) : null
  if (!slug) return shell
  const tags = [...preloadChunks.map((name) => `<link rel="modulepreload" crossorigin href="/assets/${name}" />`), heroPreload(slug)].filter(Boolean)
  if (tags.length === 0) return shell
  return Buffer.from(shell.toString().replace('</head>', `    ${tags.join('\n    ')}\n  </head>`))
}

for (const route of pages) {
  const file = join(DIST, `${route}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, withPreloads(route))
}
await writeFile(join(DIST, '404.html'), shell)

console.log(`route pages: ${pages.length} + 404.html\n  ${pages.join('\n  ')}`)
