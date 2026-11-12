import { PageEntrance } from '../components/layout/PageEntrance'
import { Navigate, useParams } from 'react-router-dom'
import { PageMeta } from '../components/layout'
import { useLocale } from '../context/LocaleContext'
import { getCaseDetail } from '../data/caseDetails'
import { CASES_PATH } from '../lib/routes'
import {
  CaseDetailAfterPalette,
  CaseDetailGallery,
  CaseDetailHero,
  CaseDetailIntroPair,
  CaseDetailOverview,
  CaseDetailPalette,
  CaseDetailTypography,
  CaseDetailNextSection,
} from '../components/sections'

/**
 * One route serves every case, so React would keep the same page elements when going from one
 * case to the next and only rewrite their text. Keyed by the case, each one is a fresh page:
 * nothing from the previous case (split text, scroll triggers, refs) can carry over.
 */
export function CaseDetailPage() {
  const { caseSlug } = useParams<{ caseSlug: string }>()
  return <CaseDetail key={caseSlug} caseSlug={caseSlug} />
}

function CaseDetail({ caseSlug }: { caseSlug: string | undefined }) {
  const { locale } = useLocale()
  const detail = caseSlug ? getCaseDetail(locale, caseSlug) : null

  if (!detail) {
    return <Navigate to={CASES_PATH} replace />
  }

  return (
    <main id="main-content" className="page-surface case-detail-page bg-background">
      <PageEntrance />
      <PageMeta title={detail.hero.title} description={detail.hero.description} />
      <CaseDetailHero hero={detail.hero} />
      <CaseDetailOverview overview={detail.overview} />
      <CaseDetailIntroPair gallery={detail.gallery} />
      {detail.typography ? <CaseDetailTypography typography={detail.typography} /> : null}
      <CaseDetailGallery gallery={detail.gallery} />
      {detail.palette ? <CaseDetailPalette palette={detail.palette} /> : null}
      <CaseDetailAfterPalette gallery={detail.gallery} />
      <CaseDetailNextSection nextCase={detail.nextCase} />
    </main>
  )
}
