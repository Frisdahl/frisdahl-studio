import { Navigate, useParams } from 'react-router-dom'
import { PageMeta } from '../components/layout'
import { useLocale } from '../context/LocaleContext'
import { getCaseDetail } from '../data/caseDetails'
import { getNextCasePreview } from '../data/caseNavigation'
import { CASES_PATH } from '../lib/routes'
import {
  CaseDetailCtaBar,
  CaseDetailGallery,
  CaseDetailHero,
  CaseDetailIntroPair,
  CaseDetailOverview,
  CaseDetailTypography,
  CaseDetailNextSection,
  ContactSection,
} from '../components/sections'

export function CaseDetailPage() {
  const { caseSlug } = useParams<{ caseSlug: string }>()
  const { locale } = useLocale()
  const detail = caseSlug ? getCaseDetail(locale, caseSlug) : null
  const nextCase = caseSlug ? getNextCasePreview(locale, caseSlug) : null

  if (!detail) {
    return <Navigate to={CASES_PATH} replace />
  }

  return (
    <main className="page-surface case-detail-page bg-background">
      <PageMeta title={detail.hero.title} description={detail.hero.description} />
      <CaseDetailHero hero={detail.hero} />
      <CaseDetailOverview overview={detail.overview} />
      <CaseDetailIntroPair gallery={detail.gallery} />
      {detail.typography ? <CaseDetailTypography typography={detail.typography} /> : null}
      <CaseDetailGallery gallery={detail.gallery} />
      <ContactSection />
      {nextCase ? <CaseDetailNextSection nextCase={nextCase} /> : null}
      <CaseDetailCtaBar />
    </main>
  )
}
