'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'
import { CinematicButton } from '@/components/cinematic-button'
import { BrowserFrame, PhoneFrame } from '@/components/project-frames'
import { featuredProject as p } from '@/lib/site'

export function FeaturedProject({ index = '02', showDetailsLink = true }: { index?: string; showDetailsLink?: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.fp-browser',
        { scale: 0.86, rotateX: 14, y: 60 },
        {
          scale: 1,
          rotateX: 0,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.fp-stage', start: 'top 95%', end: 'center 60%', scrub: true },
        },
      )
      gsap.fromTo(
        '.fp-phone',
        { y: 160 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: '.fp-stage', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="fp-heading" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index={index}>FEATURED PROJECT</Eyebrow>
            <h2
              id="fp-heading"
              className="mt-6 text-[clamp(2.75rem,10vw,10rem)] font-black leading-[0.85] tracking-[-0.05em]"
            >
              <RevealWords text="BRIGHT PATH" />
              <br />
              <RevealWords text="Academy" className="font-serif font-normal italic text-amber" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2} className="md:pb-4 md:text-right">
            <p className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">CATEGORY</p>
            <p className="mt-2 text-foreground">{p.category}</p>
          </Reveal>
        </div>

        <div className="fp-stage relative mt-14 [perspective:1600px] md:mt-20">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VISIT"
            aria-label={`Open the live ${p.displayName} website in a new tab`}
            className="fp-browser group relative block origin-top will-change-transform"
          >
            <BrowserFrame
              src={p.desktopImage}
              alt={`${p.displayName} homepage preview`}
              url={p.urlLabel}
              imageClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-30"
            />
          </a>
          <div aria-hidden className="fp-phone absolute -bottom-10 right-[4%] hidden w-[15%] min-w-40 md:block">
            <PhoneFrame src={p.mobileImage} alt="" />
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="text-pretty text-xl leading-relaxed text-foreground/85 md:text-2xl">{p.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3 md:col-start-8">
            <p className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">BUILT WITH</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground/80">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col items-start gap-3 md:col-span-2 md:col-start-11">
            <CinematicButton href={p.url} external cursor="VISIT">
              VIEW LIVE PROJECT
            </CinematicButton>
            {showDetailsLink && (
              <CinematicButton href="/projects" variant="ghost">
                DETAILS
              </CinematicButton>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
