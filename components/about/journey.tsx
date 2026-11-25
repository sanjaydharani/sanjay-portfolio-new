'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'

const STEPS = [
  {
    title: 'Curiosity',
    body: 'It started with wanting to know how websites are made — learning the foundations of HTML, CSS and JavaScript.',
  },
  {
    title: 'Coding anywhere',
    body: 'Writing and testing code wherever I am — with Acode on mobile and VS Code on desktop.',
  },
  {
    title: 'Modern tooling',
    body: 'Exploring React, Next.js, Tailwind CSS and Node.js to build faster, cleaner and more maintainable products.',
  },
  {
    title: 'Real-world work',
    body: 'Building Bright Path Academy — a coaching centre website designed to give an educational institution a professional online presence.',
  },
  {
    title: 'Today',
    body: 'Working as a freelance developer: building websites for businesses while exploring SaaS platforms and software solutions.',
  },
]

export function Journey() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.journey-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.journey-list', start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      )
      gsap.utils.toArray<HTMLElement>('.journey-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: '#2a2826', scale: 0.6 },
          {
            backgroundColor: '#ff6b1a',
            scale: 1,
            scrollTrigger: { trigger: dot, start: 'top 62%', toggleActions: 'play none none reverse' },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="journey-heading" className="relative bg-charcoal py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow index="02">PERSONAL DEVELOPMENT TIMELINE</Eyebrow>
            <h2
              id="journey-heading"
              className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
            >
              <RevealWords text="MY DEVELOPMENT" />{' '}
              <RevealWords text="journey." className="font-serif font-normal italic text-amber" delay={0.15} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-pretty leading-relaxed text-warm-grey">
                The steps that shaped how I think about building for the web — still very much in motion.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="journey-list relative md:col-span-6 md:col-start-7">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-foreground/10" />
          <span aria-hidden className="journey-fill absolute bottom-2 left-[7px] top-2 w-px origin-top bg-amber" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative pb-16 pl-12 last:pb-0">
              <span aria-hidden className="journey-dot absolute left-0 top-2 size-[15px] rounded-full bg-amber ring-4 ring-charcoal" />
              <Reveal y={24}>
                <p className="font-serif text-lg italic text-amber">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] md:text-4xl">{s.title.toUpperCase()}</h3>
                <p className="mt-4 max-w-lg text-pretty leading-relaxed text-foreground/70">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
