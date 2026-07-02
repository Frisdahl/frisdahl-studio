import { Navigate, useParams } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'
import { getCaseDetail } from '../data/caseDetails'
import { getNextCasePreview } from '../data/caseNavigation'
import { CASES_PATH } from '../lib/routes'
import {
  CaseDetailColumns,
  CaseDetailGallery,
  CaseDetailHero,
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
      <CaseDetailHero hero={detail.hero} />
      <CaseDetailColumns columns={detail.columns} />
      <CaseDetailGallery gallery={detail.gallery} />
      <ContactSection />
      {nextCase ? <CaseDetailNextSection nextCase={nextCase} /> : null}
    </main>
  )
}
