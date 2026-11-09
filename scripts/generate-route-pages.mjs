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
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

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

for (const route of pages) {
  const file = join(DIST, `${route}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, shell)
}
await writeFile(join(DIST, '404.html'), shell)

console.log(`route pages: ${pages.length} + 404.html\n  ${pages.join('\n  ')}`)
