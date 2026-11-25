'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { navLinks } from '@/lib/site'
import { prefersReducedMotion } from '@/lib/gsap'
import { getLenis, scrollToTop } from './smooth-scroll'

type Phase = 'idle' | 'cover' | 'reveal'
const TransitionContext = createContext<{ navigate: (href: string) => void }>({ navigate: () => {} })
export const usePageTransition = () => useContext(TransitionContext)

const EASE = [0.76, 0, 0.24, 1] as const

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState('')
  const pending = useRef<string | null>(null)

  const scrollToHash = (hash: string) => {
    const element = document.getElementById(hash)
    if (!element) return
    window.history.replaceState(null, '', `#${hash}`)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(element)
    else element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const navigate = useCallback(
    (href: string) => {
      const [rawTarget, hash] = href.split('#')
      const target = rawTarget || '/'
      if (target === pathname) {
        if (hash) scrollToHash(hash)
        else scrollToTop()
        return
      }
      pending.current = href
      if (prefersReducedMotion()) {
        router.push(href)
        return
      }
      const link = navLinks.find((l) => l.href === href) ?? navLinks.find((l) => l.href.split('#')[0] === target)
      setLabel(link ? `${link.index} — ${link.label}` : '')
      setPhase('cover')
    },
    [pathname, router],
  )

  useEffect(() => {
    if (pending.current && (pending.current.split('#')[0] || '/') === pathname) {
      const href = pending.current
      pending.current = null
      setPhase('reveal')
      const hash = href.split('#')[1]
      if (hash) {
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(hash)))
      }
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-charcoal"
        initial="idle"
        animate={phase}
        variants={{
          idle: { y: '100%', transition: { duration: 0 } },
          cover: { y: '0%', transition: { duration: 0.75, ease: EASE } },
          reveal: { y: '-100%', transition: { duration: 0.85, ease: EASE, delay: 0.15 } },
        }}
        onAnimationComplete={(def) => {
          if (def === 'cover' && pending.current) router.push(pending.current)
          if (def === 'reveal') setPhase('idle')
        }}
      >
        <span className="absolute inset-x-0 top-0 h-px bg-amber" />
        <span className="text-[clamp(2rem,7vw,6rem)] font-black tracking-[-0.03em] text-foreground">
          {label}
          <span className="text-amber">.</span>
        </span>
      </motion.div>
    </TransitionContext.Provider>
  )
}

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }

export function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition()
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigate(href)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}
