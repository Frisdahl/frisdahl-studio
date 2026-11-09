export const CASES_PATH = '/cases'
export const MEET_US_PATH = '/mod-mig'
/** The old address of the Mød mig page, kept as a redirect. */
export const MEET_US_LEGACY_PATH = '/mod-os'
export const PRIVACY_POLICY_PATH = '/datapolitik'
export const CONTACT_PATH = '/kontakt'

export function toAppHref(href: string): string {
  if (href.startsWith('/')) return href
  if (href.startsWith('#')) return `/${href}`
  return href
}
