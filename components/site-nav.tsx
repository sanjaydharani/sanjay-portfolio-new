'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks, site } from '@/lib/site'
import { TransitionLink } from './motion/page-transition'
import { getLenis } from './motion/smooth-scroll'
import { Magnetic } from './motion/reveal'
import { useIntro } from './motion/intro-provider'

const EASE = [0.76, 0, 0.24, 1] as const

export function SiteNav() {
  const pathname = usePathname()
  const { ready } = useIntro()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 200 && !open)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      requestAnimationFrame(() => firstLink.current?.focus())
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[120]"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -100 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: ready && !scrolled ? 0.9 : 0 }}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 transition-all duration-500 md:px-10 md:py-6',
            scrolled && !open && 'md:py-4',
          )}
        >
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 border-b border-foreground/0 transition-all duration-500',
              scrolled && !open && 'border-foreground/10 bg-background/60 backdrop-blur-xl',
            )}
          />
          <TransitionLink href="/" className="group flex items-center gap-3" aria-label="CT Sanjay — home">
            <span className="flex size-9 items-center justify-center rounded-full border border-foreground/20 text-[11px] font-black tracking-tight transition-colors duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-primary-foreground">
              CT
            </span>
            <span className="text-sm font-black tracking-[0.18em]">SANJAY</span>
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="group relative flex items-baseline gap-1.5 px-4 py-2 text-xs font-bold tracking-[0.2em]"
              >
                <span className="font-serif text-[13px] italic tracking-normal text-amber">{link.index}</span>
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 block translate-y-full text-amber transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                  >
                    {link.label}
                  </span>
                </span>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-amber"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </TransitionLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic strength={0.3}>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center gap-2 rounded-full border border-foreground/20 px-5 text-[11px] font-bold tracking-[0.2em] transition-colors duration-500 hover:border-amber hover:bg-amber hover:text-primary-foreground"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber" />
                </span>
                {"LET'S TALK"}
                <span className="sr-only">on WhatsApp (opens in a new tab)</span>
              </a>
            </Magnetic>
          </div>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-10 flex h-10 items-center gap-3 rounded-full border border-foreground/20 pl-4 pr-3 text-[11px] font-bold tracking-[0.2em] lg:hidden"
          >
            {open ? 'CLOSE' : 'MENU'}
            <span aria-hidden className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={cn(
                  'h-px w-full bg-foreground transition-transform duration-500',
                  open && 'translate-y-[5.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-foreground transition-transform duration-500',
                  open && '-translate-y-[5.5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-charcoal px-5 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-amber/15 blur-3xl"
            />
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.07 }}
                    >
                      <TransitionLink
                        ref={i === 0 ? firstLink : undefined}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={cn(
                          'flex items-baseline gap-4 text-[13vw] font-black leading-[1] tracking-[-0.03em]',
                          isActive(link.href) ? 'text-amber' : 'text-foreground',
                        )}
                      >
                        <span className="font-serif text-xl font-normal italic tracking-normal text-amber">
                          {link.index}
                        </span>
                        {link.label}
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="flex flex-col gap-3 border-t border-foreground/10 pt-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href={`mailto:${site.email}`} className="text-foreground underline-offset-4 hover:underline">
                {site.email}
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-grey underline-offset-4 hover:underline"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
