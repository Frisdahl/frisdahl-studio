// The e-mail the contact form sends to the studio: who wrote, what they wrote, and how to answer, readable at a glance.
// Built as a table layout with inline styles (the only thing mail apps agree on), 600 px wide, in the site's colours
// (ink #131313, paper #fffefe, accent #ff4f56). Every value from the form is escaped before it goes into the HTML.

export interface ContactMessage {
  name: string
  company: string
  email: string
  phone: string
  source: string
  message: string
}

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ESCAPES[char])

const INK = '#131313'
const PAPER = '#fffefe'
const SOFT = '#f0efef'
const MUTED = '#6b6b6b'
const LINE = '#e4e3e3'
const ACCENT = '#ff4f56'
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

/** "12. november 2026, 14.05", in Danish time. */
function formatWhen(date: Date): string {
  return new Intl.DateTimeFormat('da-DK', {
    timeZone: 'Europe/Copenhagen',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/** The subject line: the sender first, so the inbox list says who it is from. */
export function emailSubject({ name, company }: ContactMessage): string {
  const sender = company ? `${name}, ${company}` : name
  return `Ny henvendelse fra ${sender}`.replace(/[\r\n]+/g, ' ')
}

export function renderContactEmail(data: ContactMessage, now: Date = new Date()): { html: string; text: string } {
  const { name, company, email, phone, source, message } = data
  const firstName = name.split(/\s+/)[0] || name
  const when = formatWhen(now)
  const replySubject = encodeURIComponent(`Svar fra Frisdahl Studio`)
  const replyHref = `mailto:${encodeURIComponent(email).replace(/%40/g, '@')}?subject=${replySubject}`
  const preview = message.replace(/\s+/g, ' ').slice(0, 110)

  const details: { label: string; value: string; href?: string }[] = [
    { label: 'E-mail', value: email, href: `mailto:${email}` },
    ...(phone ? [{ label: 'Telefon', value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` }] : []),
    ...(company ? [{ label: 'Virksomhed', value: company }] : []),
    ...(source ? [{ label: 'Fandt siden via', value: source }] : []),
  ]

  const detailRows = details
    .map(
      ({ label, value, href }, index) => `
            <tr>
              <td style="padding:14px 0;${index ? `border-top:1px solid ${LINE};` : ''}width:120px;vertical-align:top;font-family:${FONT};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">${escapeHtml(label)}</td>
              <td style="padding:14px 0;${index ? `border-top:1px solid ${LINE};` : ''}vertical-align:top;font-family:${FONT};font-size:15px;line-height:1.5;color:${INK};">${
                href
                  ? `<a href="${escapeHtml(href)}" style="color:${INK};text-decoration:underline;text-decoration-color:${ACCENT};text-underline-offset:3px;">${escapeHtml(value)}</a>`
                  : escapeHtml(value)
              }</td>
            </tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html lang="da">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>${escapeHtml(emailSubject(data))}</title>
  </head>
  <body style="margin:0;padding:0;background:${SOFT};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${SOFT};">${escapeHtml(preview)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SOFT};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${PAPER};border-radius:14px;">
            <tr>
              <td style="padding:28px 36px 0 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:${FONT};font-size:15px;font-weight:600;letter-spacing:-0.01em;color:${INK};">Frisdahl Studio</td>
                    <td align="right" style="font-family:${FONT};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};"><span style="color:${ACCENT};">&#9679;</span>&nbsp; Ny henvendelse</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 36px 8px 36px;">
                <div style="font-family:${FONT};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">Fra</div>
                <div style="padding-top:8px;font-family:${FONT};font-size:32px;line-height:1.1;font-weight:600;letter-spacing:-0.03em;color:${INK};">${escapeHtml(name)}</div>${
                  company
                    ? `
                <div style="padding-top:6px;font-family:${FONT};font-size:16px;line-height:1.4;color:${MUTED};">${escapeHtml(company)}</div>`
                    : ''
                }
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 8px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:${SOFT};border-left:3px solid ${ACCENT};border-radius:4px 10px 10px 4px;padding:20px 24px;font-family:${FONT};font-size:16px;line-height:1.65;color:${INK};white-space:pre-wrap;">${escapeHtml(message)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px 8px 36px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:${INK};border-radius:999px;">
                      <a href="${escapeHtml(replyHref)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:14px;font-weight:600;color:${PAPER};text-decoration:none;">Svar ${escapeHtml(firstName)} &rarr;</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px 8px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${INK};">${detailRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px 32px 36px;font-family:${FONT};font-size:12px;line-height:1.5;color:${MUTED};">
                Sendt via kontaktformularen p&aring; frisdahlstudio.dk &middot; ${escapeHtml(when)}<br>
                Du kan svare direkte p&aring; denne mail: svaret g&aring;r til ${escapeHtml(firstName)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = [
    `Ny henvendelse fra ${company ? `${name}, ${company}` : name}`,
    '',
    message,
    '',
    '---',
    `E-mail: ${email}`,
    ...(phone ? [`Telefon: ${phone}`] : []),
    ...(company ? [`Virksomhed: ${company}`] : []),
    ...(source ? [`Fandt siden via: ${source}`] : []),
    '',
    `Sendt via kontaktformularen på frisdahlstudio.dk, ${when}.`,
    'Du kan svare direkte på denne mail: svaret går til afsenderen.',
  ].join('\n')

  return { html, text }
}
