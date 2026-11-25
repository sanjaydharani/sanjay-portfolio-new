'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { useIntro } from './intro-provider'

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

export function scrollToTop(immediate = false) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function SmoothScroll() {
  const { ready } = useIntro()
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  useEffect(() => {
    if (ready) lenisInstance?.start()
    else lenisInstance?.stop()
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  useEffect(() => {
    scrollToTop(true)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
