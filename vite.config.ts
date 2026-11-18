import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Dev only: the contact form posts to the Worker (worker/index.ts), which does not run under `vite`. This answers
 * POST /api/contact with a success after a short wait, so the form (its toasts and the confetti) can be tried
 * locally. Nothing is sent. It is not part of the build.
 */
function mockContactApi(): Plugin {
  return {
    name: 'mock-contact-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end(JSON.stringify({ error: 'method_not_allowed' }))
          return
        }
        request.resume()
        setTimeout(() => {
          response.setHeader('content-type', 'application/json')
          response.end(JSON.stringify({ ok: true }))
        }, 700)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mockContactApi()],
})
