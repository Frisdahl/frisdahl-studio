export const PROCESS_PATH = '/proces'
export const PRICING_PATH = '/priser'
export const CASES_PATH = '/cases'
export const MEET_US_PATH = '/mod-os'
export const WEB_DEVELOPMENT_PATH = '/webudvikling'

export function toAppHref(href: string): string {
  if (href.startsWith('/')) return href
  if (href.startsWith('#')) return `/${href}`
  return href
}
