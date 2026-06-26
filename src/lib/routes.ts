export const PRICING_PATH = '/priser'
export const CASES_PATH = '/cases'
export const WEB_DEVELOPMENT_PATH = '/webudvikling'

export function toAppHref(href: string): string {
  if (href.startsWith('/')) return href
  if (href.startsWith('#')) return `/${href}`
  return href
}
