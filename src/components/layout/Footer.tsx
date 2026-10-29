import { useLayoutEffect, useRef } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent } from '../../data/footer'
import { CASES_PATH } from '../../lib/routes'
import { Container, RollLabel } from '../ui'
import { FOOTER_WORDMARK_PATH, FOOTER_WORDMARK_VIEWBOX } from './footerWordmarkPath'

gsap.registerPlugin(ScrollTrigger)

/**
 * The studio name across the full width: a path whose viewBox hugs its
 * outline, so width: 100% puts the F and the o exactly on the content edges
 * and the baseline on the bottom edge.
 */
function FooterWordmark({ label }: { label: string }) {
  return (
    <svg className="site-footer-wordmark" viewBox={FOOTER_WORDMARK_VIEWBOX} role="img" aria-label={label}>
      <path d={FOOTER_WORDMARK_PATH} />
    </svg>
  )
}

export function Footer() {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  const { openDrawer } = useContactDrawer()
  const isCaseDetailPage = Boolean(
    matchPath({ path: `${CASES_PATH}/:caseSlug`, end: true }, pathname),
  )
  const footer = getFooterContent(locale)
  const footerRef = useRef<HTMLElement>(null)

  // The footer slides up over the page, the way the home cases section rolls
  // over the hero: the page (the <main> before it) is sticky with its top at
  // "screen height minus its own height", so it stops moving once its bottom
  // reaches the bottom of the screen while the footer keeps scrolling over it.
  // The offset follows the page's height as images load or the layout changes,
  // and the effect follows the page itself: lazy routes first render a loading
  // placeholder, which the real <main> then replaces.
  useLayoutEffect(() => {
    const element = footerRef.current
    const shell = element?.parentElement
    if (isCaseDetailPage || !element || !shell) return

    let page: HTMLElement | null = null
    const update = () => {
      if (page) page.style.setProperty('--page-stick-top', `${window.innerHeight - page.offsetHeight}px`)
    }
    const resizeObserver = new ResizeObserver(update)
    const release = () => {
      if (!page) return
      resizeObserver.unobserve(page)
      page.classList.remove('is-under-footer')
      page.style.removeProperty('--page-stick-top')
      page = null
    }
    const attach = () => {
      const next = element.previousElementSibling
      if (next === page) return
      release()
      if (!(next instanceof HTMLElement)) return
      page = next
      page.classList.add('is-under-footer')
      resizeObserver.observe(page)
      update()
    }

    attach()
    const mutationObserver = new MutationObserver(attach)
    mutationObserver.observe(shell, { childList: true })
    window.addEventListener('resize', update)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
      release()
    }
  }, [isCaseDetailPage, pathname])

  // The footer arrives grey and turns light as it rolls in: --footer-light
  // (which every colour in .site-footer mixes from) runs 0 → 1 from the footer
  // entering at the bottom of the screen until it reaches the bottom of the
  // page, so the colours are settled exactly when the page ends. Without the
  // animation (reduced motion) it rests at 1, its light state. The footer is
  // not rendered on case pages, so the effect re-runs when it comes back.
  useLayoutEffect(() => {
    const element = footerRef.current
    if (isCaseDetailPage || !element) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        element,
        { '--footer-light': 0 },
        {
          '--footer-light': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    })
    return () => mm.revert()
  }, [isCaseDetailPage])

  if (isCaseDetailPage) {
    return null
  }

  const { columnTitles } = footer

  return (
    <footer ref={footerRef} className="site-footer">
      {/* Full container so the footer frames the page on the same edges as the header. */}
      <Container fullWidth className="site-footer-inner">
        <div className="site-footer-columns">
          <div className="site-footer-column">
            <h2 className="site-footer-column-title">{columnTitles.contact}</h2>
            <ul className="site-footer-links">
              <li>
                <a href={footer.emailHref} className="site-footer-link">
                  <RollLabel>{footer.email}</RollLabel>
                </a>
              </li>
              {footer.socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    className="site-footer-link"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <RollLabel>{social.label}</RollLabel>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="site-footer-column" aria-label={footer.navAriaLabel}>
            <h2 className="site-footer-column-title">{columnTitles.nav}</h2>
            <ul className="site-footer-links site-footer-links-nav">
              {footer.links.map((link) => (
                <li key={link.href}>
                  {/* No contact section to scroll to on the homepage, so the
                      contact link opens the drawer like the header CTA. */}
                  {link.href === '/#contact' ? (
                    <button
                      type="button"
                      className="site-footer-link"
                      onClick={() => openDrawer('contact')}
                    >
                      <RollLabel>{link.label}</RollLabel>
                    </button>
                  ) : (
                    <a href={link.href} className="site-footer-link">
                      <RollLabel>{link.label}</RollLabel>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-column">
            <h2 className="site-footer-column-title">{columnTitles.studio}</h2>
            <p className="site-footer-strong">{footer.locationTitle}</p>
            <p className="site-footer-text">{footer.coordinates}</p>
          </div>

          <div className="site-footer-column">
            <h2 className="site-footer-column-title">{columnTitles.legal}</h2>
            <ul className="site-footer-links">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="site-footer-link">
                    <RollLabel>{link.label}</RollLabel>
                  </a>
                </li>
              ))}
            </ul>
            <p className="site-footer-copyright">{footer.copyright}</p>
          </div>
        </div>

        <FooterWordmark label={footer.wordmark} />
      </Container>
    </footer>
  )
}
