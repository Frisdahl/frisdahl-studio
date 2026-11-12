// The site's Cloudflare Worker: serves the built site (static assets, see wrangler.jsonc)
// and handles POST /api/contact, which sends the contact form through Resend. The API key
// is a Worker secret (RESEND_API_KEY) and never reaches the browser.

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

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ESCAPES[char])

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

  const sender = company ? `${name}, ${company}` : name
  const rows = (
    [
      ['Navn', name],
      ['Virksomhed', company],
      ['Email', email],
      ['Telefon', phone],
      ['Fandt siden via', source],
    ] as [string, string][]
  ).filter(([, value]) => value)

  const html =
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><hr>` +
    rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('')
  const plain = [message, '', ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Ny henvendelse fra ${sender}`.replace(/[\r\n]+/g, ' '),
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
