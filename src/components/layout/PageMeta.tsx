import { useEffect } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getPageMetaContent, siteName } from '../../data/pageMeta'

interface PageMetaProps {
  /** Page name. Omit on the home page to use the site name alone. */
  title?: string
  /** Falls back to the site description. */
  description?: string
  noIndex?: boolean
}

function setHeadMeta(attribute: 'name' | 'property', key: string, content: string | null) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (content === null) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.content = content
}

// Updates the single set of head tags from index.html (the static values are
// the fallback for crawlers and link previews that do not run JS), instead of
// rendering duplicates next to them.
export function PageMeta({ title, description, noIndex = false }: PageMetaProps) {
  const { locale } = useLocale()
  const { siteDescription } = getPageMetaContent(locale)
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const metaDescription = description || siteDescription

  useEffect(() => {
    document.title = fullTitle
    setHeadMeta('name', 'description', metaDescription)
    setHeadMeta('property', 'og:title', fullTitle)
    setHeadMeta('property', 'og:description', metaDescription)
    setHeadMeta('name', 'robots', noIndex ? 'noindex' : null)
  }, [fullTitle, metaDescription, noIndex])

  return null
}
