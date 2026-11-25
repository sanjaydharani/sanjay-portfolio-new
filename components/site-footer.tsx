'use client'

import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '@/lib/site'
import { TransitionLink } from './motion/page-transition'
import { scrollToTop } from './motion/smooth-scroll'
import { Magnetic } from './motion/reveal'

const linkClass =
  'group relative inline-block w-fit text-sm text-foreground/80 transition-colors duration-300 hover:text-amber'

export function SiteFooter() {
  const profiles = [
    { label: 'GitHub', url: site.profiles.github },
    { label: 'Acode', url: site.profiles.acode },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-[#050504]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full size-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 pb-8 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-bold tracking-[0.3em] text-warm-grey">CT SANJAY</p>
            <p className="mt-4 max-w-md text-balance text-3xl font-black leading-[1] tracking-[-0.02em] md:text-5xl">
              BUILDING THE <span className="font-serif font-normal italic text-amber">digital</span> FUTURE.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-warm-grey">PAGES</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className={linkClass}>
                    {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-warm-grey">CONTACT</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  Email — {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-warm-grey">WORKSPACE</p>
            <ul className="flex flex-col gap-2.5">
              {profiles.map((p) => (
                <li key={p.label}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {p.label}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground/60">{p.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 select-none whitespace-nowrap text-center text-[19vw] font-black leading-[0.8] tracking-[-0.05em] text-foreground/[0.06] md:text-[17vw]"
        >
          CT SANJAY
        </p>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 border-t border-foreground/10 pt-6 text-xs text-warm-grey sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} CT Sanjay. {site.role}.
          </p>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToTop()}
              className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] text-foreground"
            >
              BACK TO TOP
              <span className="flex size-10 items-center justify-center rounded-full border border-foreground/20 transition-colors duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-primary-foreground">
                <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
