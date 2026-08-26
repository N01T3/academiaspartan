export function useReveal() {
  function reveal(isIntersecting: boolean, entries: IntersectionObserverEntry[]) {
    if (!isIntersecting) return
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement
      el.classList.add('is-visible')
      const delay = el.dataset.revealDelay
      if (delay) el.style.transitionDelay = `${delay}ms`
    })
  }

  return { reveal }
}
