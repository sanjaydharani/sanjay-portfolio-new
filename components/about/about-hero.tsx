'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { useIntro } from '@/components/motion/intro-provider'
import { RevealWords } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/eyebrow'

export function AboutHero() {
  const root = useRef<HTMLElement>(null)
  const { ready } = useIntro()

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap.fromTo(
        '.about-portrait',
        { yPercent: 18, opacity: 0, filter: 'brightness(0.2) grayscale(1)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'brightness(1) grayscale(0)',
          duration: 2,
          ease: 'expo.out',
          delay: 0.2,
          clearProps: 'filter',
        },
      )
      gsap.fromTo('.about-back', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: 'expo.out' })
      gsap.to('.about-portrait-wrap', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.about-back', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section
      ref={root}
      aria-labelledby="about-heading"
      className="relative h-svh min-h-[640px] overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-[18%] size-[34rem] -translate-x-1/2 rounded-full bg-amber/20 blur-[120px] md:size-[44rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#080807_85%)]" />
      </div>

      {/* Layer 1 — text behind the portrait */}
      <p
        aria-hidden
        className="about-back pointer-events-none absolute inset-x-0 top-[17%] select-none text-center text-[22vw] font-black leading-[0.8] tracking-[-0.06em] text-foreground/[0.9] md:top-[13%] md:text-[19vw]"
      >
        MORE THAN
      </p>

      {/* Layer 2 — portrait */}
      <div className="about-portrait-wrap pointer-events-none absolute inset-x-0 top-[24svh] z-10 flex justify-center md:top-[16svh]">
        <div className="about-portrait relative aspect-[563/1431] h-[92svh] md:h-[118svh]">
          <Image
            src="/images/sanjay.png"
            alt="CT Sanjay standing with hands in pockets"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 30vw"
            className="portrait-light object-contain object-top"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-background via-background/80 to-transparent"
      />

      {/* Layer 3 — foreground text */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36">
        <Eyebrow index="02">ABOUT</Eyebrow>
        <div className="flex flex-col items-center text-center">
          <h1 id="about-heading" className="text-[18vw] font-black leading-[0.8] tracking-[-0.05em] md:text-[13vw]">
            <span className="sr-only">MORE THAN JUST CODE.</span>
            <span aria-hidden>
              <RevealWords text="JUST" delay={0.6} />{' '}
              <RevealWords text="code." delay={0.75} className="font-serif font-normal italic text-amber" />
            </span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/70">
            Freelance developer — turning business ideas into digital experiences.
          </p>
        </div>
      </div>
    </section>
  )
}
