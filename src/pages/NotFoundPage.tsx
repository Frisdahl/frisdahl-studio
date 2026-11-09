import { PageMeta } from '../components/layout'
import { ArrowButton, Container } from '../components/ui'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function NotFoundPage() {
  const { locale } = useLocale()
  const { titles, notFound } = getPageMetaContent(locale)

  return (
    <main id="main-content" className="page-surface bg-background">
      <PageMeta title={titles.notFound} noIndex />
      <Container>
        <div className="flex min-h-[60vh] flex-col items-start justify-center gap-lg py-section-sm">
          <h1>{titles.notFound}</h1>
          <p className="max-w-[38rem] text-body-lg text-secondary">{notFound.text}</p>
          <ArrowButton href="/">{notFound.cta}</ArrowButton>
        </div>
      </Container>
    </main>
  )
}
