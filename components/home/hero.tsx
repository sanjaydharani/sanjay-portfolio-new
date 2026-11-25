'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { useIntro } from '@/components/motion/intro-provider'
import { Reveal, RevealWords } from '@/components/motion/reveal'
import { CinematicButton } from '@/components/cinematic-button'
import { site } from '@/lib/site'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { ready } = useIntro()

  useGSAP(
    () => {
      if (!ready) return
      if (prefersReducedMotion()) {
        gsap.set(['.hero-portrait', '.hero-giant', '.hero-glow', '.hero-meta'], { clearProps: 'all' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo('.hero-glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 2.4 }, 0)
        .fromTo(
          '.hero-giant',
          { xPercent: 12, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 2.2, ease: 'power3.out' },
          0.1,
        )
        .fromTo(
          '.hero-portrait',
          { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 8, filter: 'brightness(0.15) blur(6px)' },
          {
            clipPath: 'inset(-20% -20% -20% -20%)',
            yPercent: 0,
            filter: 'brightness(1) blur(0px)',
            duration: 2,
            clearProps: 'clipPath,filter',
          },
          0.15,
        )
        .fromTo('.hero-meta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.1)

      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.to('.hero-portrait-parallax', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-giant', {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-copy', {
          yPercent: -25,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      mm.add('(pointer: fine) and (min-width: 1024px)', () => {
        const px = gsap.quickTo('.hero-portrait-mouse', 'x', { duration: 1.2, ease: 'power3' })
        const py = gsap.quickTo('.hero-portrait-mouse', 'y', { duration: 1.2, ease: 'power3' })
        const gx = gsap.quickTo('.hero-glow', 'x', { duration: 1.6, ease: 'power3' })
        const gy = gsap.quickTo('.hero-glow', 'y', { duration: 1.6, ease: 'power3' })
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          px(nx * 18)
          py(ny * 10)
          gx(nx * -50)
          gy(ny * -30)
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      className="relative h-svh min-h-[640px] overflow-hidden bg-background"
    >
      {/* Atmosphere — sits behind the portrait */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,#1a1612_0%,transparent_70%)]" />
        <div className="hero-glow absolute right-[-10%] top-[8%] size-[38rem] rounded-full bg-amber/25 opacity-0 blur-[110px] md:right-[8%] md:size-[46rem]" />
        <div className="absolute right-[18%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent lg:block" />
        <div className="absolute left-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-foreground/[0.06] to-transparent lg:block" />
      </div>

      <p
        aria-hidden
        className="hero-giant text-outline pointer-events-none absolute left-0 top-[14%] select-none whitespace-nowrap text-[34vw] font-black leading-none tracking-[-0.06em] opacity-0 md:top-[6%] md:text-[25vw]"
      >
        SANJAY
      </p>

      {/* Foreground portrait */}
      <div className="hero-portrait-parallax pointer-events-none absolute inset-y-0 right-[-14%] top-[9svh] z-10 sm:right-[2%] md:top-[11svh] lg:right-[7%] lg:top-[9svh]">
        <div className="hero-portrait-mouse h-full">
          <div className="hero-portrait relative aspect-[563/1431] h-[96svh] md:h-[118svh] lg:h-[128svh]">
            <Image
              src="/images/sanjay.png"
              alt="Portrait of CT Sanjay in a plum blazer and white shirt"
              fill
              priority
              sizes="(max-width: 768px) 60vw, 40vw"
              className="portrait-light object-contain object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </div>
      </div>

      {/* Ground shadow & bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%] bg-gradient-to-t from-background via-background/85 to-transparent"
      />

      <div className="hero-copy relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-12 md:pt-36">
        <div className="flex items-start justify-between">
          <div className="hero-meta flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-warm-grey opacity-0">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-amber" />
            </span>
            AVAILABLE FOR FREELANCE PROJECTS
          </div>
          <p className="hero-meta hidden text-right text-[11px] font-bold leading-relaxed tracking-[0.3em] text-warm-grey opacity-0 md:block">
            FREELANCE DEVELOPER
            <br />
            <span className="text-foreground">CREATIVE DEVELOPER</span>
          </p>
        </div>

        <div className="max-w-[62rem]">
          <h1
            id="hero-heading"
            className="text-[clamp(2.6rem,10.5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] md:text-[clamp(4rem,6.6vw,7.6rem)]"
          >
            <RevealWords text="BUILDING DIGITAL" delay={0.45} />
            <br />
            <RevealWords text="EXPERIENCES THAT" delay={0.6} />
            <br />
            <RevealWords
              text="MEAN BUSINESS."
              delay={0.75}
              className="font-serif font-normal normal-case italic tracking-[-0.02em] text-amber"
            />
          </h1>

          <div className="mt-6 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:gap-12">
            <Reveal delay={1.1} y={20}>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-foreground/75 md:text-base">
                {"I'm CT Sanjay — a freelance developer creating modern websites, digital products and software experiences for businesses."}
              </p>
            </Reveal>
            <Reveal delay={1.25} y={20} className="flex flex-wrap gap-3">
              <CinematicButton href="/projects">EXPLORE MY WORK</CinematicButton>
              <CinematicButton href="/contact" variant="ghost">
                {"LET'S WORK TOGETHER"}
              </CinematicButton>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="hero-meta absolute bottom-8 right-5 z-20 hidden flex-col items-center gap-3 opacity-0 md:right-10 md:bottom-12 md:flex">
        <span className="text-[10px] font-bold tracking-[0.35em] text-warm-grey [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span aria-hidden className="relative h-16 w-px overflow-hidden bg-foreground/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-amber" />
        </span>
      </div>
      <span className="sr-only">{site.role}</span>
    </section>
  )
}
