import { useLocale } from '../../context/LocaleContext'
import { getCaseMainVideo } from '../../data/caseVideos'
import { getHomeContent } from '../../data/home'
import { CaseCard } from './CaseCard'

export interface ProjectCardProps {
  /** The case's slug (peter-salling, nordwear, ...): finds its clip and where its picture is centred. */
  id: string
  client: string
  /** The keywords, as a list or already joined with " • ". */
  keywords: string | readonly string[]
  imageSrc: string | null
  imageAlt: string
  /** The case page; empty means there is none yet and the card is not a link. */
  href: string
  /** Layout classes for the card from the page that places it (spans, shape). */
  className?: string
  /** The title and keywords rise out of their masks once the card scrolls in (the home page). */
  revealOnScroll?: boolean
  /** How wide the card draws its picture (an HTML `sizes` value), so only the file that is needed is fetched. */
  imageSizes?: string
  /** The card is on the first screen: its picture loads at once and first. */
  priority?: boolean
}

/**
 * The project card of the site: the picture (a clip where the case has one) with the title and the
 * keywords in white on its foot, no arrow, and a click that lifts the picture into the case page.
 * One place for what a project card is, used by the home page's grid and the /cases page, so a fix here
 * reaches both. How the card is drawn is CaseCard and CaseMedia; this adds what every project needs:
 * its clip and the point its picture is centred on. The page decides the card's size and place.
 */
export function ProjectCard({ id, client, keywords, imageSrc, imageAlt, href, className, revealOnScroll = false, imageSizes, priority = false }: ProjectCardProps) {
  const { locale } = useLocale()
  // Where each project's picture is centred (OFFSCRIPT on the phone) is kept with the home content.
  const home = getHomeContent(locale).cases.items.find((item) => item.id === id)
  const focus = home && 'focus' in home ? home.focus : undefined

  return (
    <CaseCard
      className={className}
      client={client}
      keywords={typeof keywords === 'string' ? keywords : keywords.join(' • ')}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      video={getCaseMainVideo(id)}
      focus={focus}
      href={href}
      overlay
      revealOnScroll={revealOnScroll}
      imageSizes={imageSizes}
      priority={priority}
      // The still under the clip is the same picture, so the clip needs no poster of its own.
      omitPoster
    />
  )
}
