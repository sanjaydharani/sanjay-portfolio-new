'use client'

import { useRef } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { useIntro } from '@/components/motion/intro-provider'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'
import { CinematicButton } from '@/components/cinematic-button'
import { BrowserFrame, PhoneFrame } from '@/components/project-frames'
import { featuredProject as p } from '@/lib/site'

export function ProjectShowcase() {
  const root = useRef<HTMLElement>(null)
  const { ready } = useIntro()

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap.fromTo(
        '.ps-preview',
        { clipPath: 'inset(30% 12% 30% 12% round 24px)', scale: 1.08 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 12px)',
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.ps-preview-wrap', start: 'top 90%', end: 'top 25%', scrub: true },
        },
      )
      gsap.fromTo(
        '.ps-phone',
        { y: 120, rotate: 6 },
        {
          y: -60,
          rotate: -2,
          ease: 'none',
          scrollTrigger: { trigger: '.ps-preview-wrap', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <article ref={root} aria-labelledby="ps-heading">
      <header className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-amber/15 blur-[130px]"
        />
        <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
          <Eyebrow index="03">SELECTED WORK — 01</Eyebrow>
          <h1
            id="ps-heading"
            className="mt-8 text-[clamp(3rem,13vw,14rem)] font-black leading-[0.82] tracking-[-0.055em]"
          >
            <RevealWords text="BRIGHT" delay={0.3} />
            <br />
            <RevealWords text="PATH" delay={0.42} />{' '}
            <RevealWords text="Academy" delay={0.54} className="font-serif font-normal italic text-amber" />
          </h1>

          <dl className="mt-14 grid gap-8 border-t border-foreground/10 pt-8 sm:grid-cols-3">
            <Reveal delay={0.6} y={16}>
              <dt className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">CATEGORY</dt>
              <dd className="mt-2 text-foreground">{p.category}</dd>
            </Reveal>
            <Reveal delay={0.7} y={16}>
              <dt className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">TYPE</dt>
              <dd className="mt-2 text-foreground">Website — live project</dd>
            </Reveal>
            <Reveal delay={0.8} y={16}>
              <dt className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">LIVE URL</dt>
              <dd className="mt-2">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 break-all text-foreground underline-offset-4 hover:text-amber hover:underline"
                >
                  {p.urlLabel}
                  <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:rotate-45" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </Reveal>
          </dl>
        </div>
      </header>

      <div className="ps-preview-wrap relative mx-auto max-w-[1600px] px-5 md:px-10">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VISIT"
          aria-label={`Open the live ${p.displayName} website in a new tab`}
          className="ps-preview group block overflow-hidden rounded-xl"
        >
          <BrowserFrame
            src={p.desktopImage}
            alt={`${p.displayName} homepage — "Building Bright Minds. Shaping Brighter Futures."`}
            url={p.urlLabel}
            priority
            imageClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </a>
        <div className="ps-phone pointer-events-none absolute -bottom-16 right-[6%] w-[30%] max-w-56 md:right-[8%] md:w-[16%]">
          <PhoneFrame src={p.mobileImage} alt={`${p.displayName} on a mobile screen`} />
        </div>
      </div>

      <section aria-labelledby="ps-overview" className="py-28 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Eyebrow>OVERVIEW</Eyebrow>
            <h2 id="ps-overview" className="sr-only">
              Project overview
            </h2>
            <Reveal className="mt-8">
              <p className="text-pretty text-2xl leading-snug text-foreground md:text-3xl">{p.description}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <CinematicButton href={p.url} external cursor="VISIT">
                VIEW LIVE PROJECT
              </CinematicButton>
            </Reveal>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">WHAT THE SITE INCLUDES</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 leading-relaxed text-foreground/80">
                    <Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-warm-grey">TECHNOLOGY</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-foreground/15 px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-amber hover:text-amber"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-warm-grey">
                Hand-built front end, hosted on Cloudflare Workers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  )
}
