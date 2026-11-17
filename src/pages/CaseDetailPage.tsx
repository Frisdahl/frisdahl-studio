import { Navigate, useParams } from 'react-router-dom'
import { PageMeta } from '../components/layout'
import { useLocale } from '../context/LocaleContext'
import { getCaseDetail } from '../data/caseDetails'
import { CASES_PATH } from '../lib/routes'
import {
  CaseDetailAfterPalette,
  CaseDetailAfterResults,
  CaseDetailGallery,
  CaseDetailHero,
  CaseDetailIntroPair,
  CaseDetailOverview,
  CaseDetailPalette,
  CaseDetailResults,
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
      <PageMeta title={detail.hero.title} description={detail.hero.description} />
      <CaseDetailHero hero={detail.hero} />
      <CaseDetailOverview overview={detail.overview} />
      <CaseDetailIntroPair gallery={detail.gallery} />
      {/* The same order on every project page: overview, the MacBooks, typography, colour palette, the phones (and the
          tablet), results, the next project. */}
      {detail.typography ? <CaseDetailTypography typography={detail.typography} /> : null}
      {detail.palette ? <CaseDetailPalette palette={detail.palette} /> : null}
      <CaseDetailGallery gallery={detail.gallery} />
      <CaseDetailAfterPalette gallery={detail.gallery} />
      {detail.results ? <CaseDetailResults results={detail.results} /> : null}
      <CaseDetailAfterResults gallery={detail.gallery} />
      <CaseDetailNextSection nextCase={detail.nextCase} />
    </main>
  )
}
