import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches IntersectionObserver to ref'd elements
 * and adds/removes `sr-visible` class for CSS-driven fade+slide-up.
 *
 * @param {string} selector  CSS selector within the section to reveal
 * @param {object} options   IntersectionObserver options
 */
export function useScrollReveal(selector = '.sr-hidden', options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [selector, options])

  return containerRef
}
