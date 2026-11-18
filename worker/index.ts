// The site's Cloudflare Worker: serves the built site (static assets, see wrangler.jsonc)
// and handles POST /api/contact, which sends the contact form through Resend. The API key
// is a Worker secret (RESEND_API_KEY) and never reaches the browser.

import { emailSubject, renderContactEmail } from './email'

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  RESEND_API_KEY: string
  CONTACT_TO: string
  CONTACT_FROM: string
}

interface ContactBody {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  source?: unknown
  message?: unknown
  website?: unknown // honeypot: real visitors never fill it
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  // A bot filled the hidden field: pretend it worked, send nothing.
  if (text(body.website, 200)) return json({ ok: true })

  const name = text(body.name, 120)
  const company = text(body.company, 120)
  const email = text(body.email, 200)
  const phone = text(body.phone, 60)
  const source = text(body.source, 300)
  const message = text(body.message, 5000)

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'invalid_fields' }, 422)

  const contact = { name, company, email, phone, source, message }
  const { html, text: plain } = renderContactEmail(contact)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: emailSubject(contact),
      html,
      text: plain,
    }),
  })

  if (!response.ok) {
    console.error('Resend failed', response.status, await response.text())
    return json({ error: 'send_failed' }, 502)
  }
  return json({ ok: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === '/api/contact') return handleContact(request, env)
    return env.ASSETS.fetch(request)
  },
}
