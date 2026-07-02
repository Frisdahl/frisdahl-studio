const NAV_REVEAL_TRANSITION = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'

function forceReflow(element: HTMLElement) {
  element.offsetHeight
}

export function resetNavClusterSlide(cluster: HTMLElement | null) {
  if (!cluster) return

  cluster.style.removeProperty('transition')
  cluster.style.transform = 'translate3d(-50%, 0, 0)'
}

export function clearNavClusterSlide(cluster: HTMLElement | null) {
  if (!cluster) return

  cluster.style.removeProperty('transform')
  cluster.style.removeProperty('transition')
}

export function hideNavClusterSlide(
  cluster: HTMLElement | null,
  pinnedTop: number,
) {
  if (!cluster) return

  cluster.style.transition = 'none'
  cluster.style.transform = `translate3d(-50%, calc(-100% - ${pinnedTop}px), 0)`
  forceReflow(cluster)
}

export function revealNavClusterSlide(
  cluster: HTMLElement | null,
  pinnedTop: number,
) {
  if (!cluster) return

  hideNavClusterSlide(cluster, pinnedTop)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cluster.style.transition = NAV_REVEAL_TRANSITION
      cluster.style.transform = 'translate3d(-50%, 0, 0)'
    })
  })
}

export function resetHeaderSlide(header: HTMLElement | null) {
  if (!header) return

  header.style.removeProperty('transform')
  header.style.removeProperty('transition')
}

export function hideHeaderSlide(header: HTMLElement | null) {
  if (!header) return

  header.style.transition = 'none'
  header.style.transform = 'translate3d(0, -100%, 0)'
  forceReflow(header)
}

export function revealHeaderSlide(header: HTMLElement | null) {
  if (!header) return

  hideHeaderSlide(header)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      header.style.transition = NAV_REVEAL_TRANSITION
      header.style.transform = 'translate3d(0, 0, 0)'
    })
  })
}
