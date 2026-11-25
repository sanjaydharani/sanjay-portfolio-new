'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/motion/reveal'
import { CinematicButton } from '@/components/cinematic-button'
import { site } from '@/lib/site'

const STATEMENT =
  'I believe every business deserves a strong digital presence. I turn business ideas into websites and digital products that are visually impressive, functional and built around real needs.'

const ACCENT = new Set(['strong', 'digital', 'presence.'])

export function IntroStatement() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.statement-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="intro-heading" className="relative py-28 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <Eyebrow index="01">INTRODUCTION</Eyebrow>
          <h2 id="intro-heading" className="sr-only">
            Introduction
          </h2>
        </div>
        <div className="md:col-span-9">
          <p className="statement text-balance text-[clamp(1.75rem,4.2vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            {STATEMENT.split(' ').map((w, i) => (
              <span
                key={i}
                className={`statement-word ${ACCENT.has(w) ? 'font-serif font-normal italic text-amber' : ''}`}
              >
                {w}{' '}
              </span>
            ))}
          </p>

          <div className="mt-16 grid gap-10 border-t border-foreground/10 pt-10 sm:grid-cols-3">
            {[
              { k: 'ROLE', v: 'Freelance Developer' },
              { k: 'FOCUS', v: 'Websites · Web Apps · SaaS' },
              { k: 'REACH ME', v: site.email, href: `mailto:${site.email}` },
            ].map((item, i) => (
              <Reveal key={item.k} delay={i * 0.1} y={20}>
                <p className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">{item.k}</p>
                {item.href ? (
                  <a href={item.href} className="mt-3 block break-all text-lg text-foreground hover:text-amber">
                    {item.v}
                  </a>
                ) : (
                  <p className="mt-3 text-lg text-foreground">{item.v}</p>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12" delay={0.2}>
            <CinematicButton href="/about" variant="ghost">
              MORE ABOUT ME
            </CinematicButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
