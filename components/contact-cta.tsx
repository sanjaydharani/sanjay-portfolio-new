'use client'

import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { site } from '@/lib/site'
import { Eyebrow } from './eyebrow'
import { Magnetic, Reveal, RevealWords } from './motion/reveal'
import { TransitionLink } from './motion/page-transition'

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="cta-heading" className="relative overflow-hidden py-32 md:py-48">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.12] blur-[140px]"
      />
      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center px-5 text-center md:px-10">
        <Eyebrow>NEXT CHAPTER</Eyebrow>
        <h2
          id="cta-heading"
          className="mt-8 text-balance text-[clamp(2.75rem,9vw,9rem)] font-black leading-[0.88] tracking-[-0.045em]"
        >
          <RevealWords text="LET'S BUILD" />
          <br />
          <RevealWords text="something" className="font-serif font-normal italic text-amber" delay={0.15} />{' '}
          <RevealWords text="REAL." delay={0.3} />
        </h2>

        <Reveal delay={0.3} className="mt-14">
          <Magnetic strength={0.4}>
            <TransitionLink
              href="/contact"
              data-cursor="START"
              className="group relative flex size-40 items-center justify-center overflow-hidden rounded-full bg-amber text-primary-foreground md:size-52"
            >
              <span
                aria-hidden
                className="absolute inset-0 scale-0 rounded-full bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
              />
              <span className="relative flex flex-col items-center gap-2 text-xs font-black tracking-[0.25em]">
                <ArrowUpRight
                  className="size-6 transition-transform duration-500 group-hover:rotate-45"
                  aria-hidden
                />
                {"LET'S WORK"}
                <br />
                TOGETHER
              </span>
            </TransitionLink>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.4} className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground/80 underline-offset-8 transition-colors hover:text-amber hover:underline"
          >
            <MessageCircle className="size-4 text-amber" aria-hidden />
            WhatsApp {site.phoneDisplay}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-sm text-foreground/80 underline-offset-8 transition-colors hover:text-amber hover:underline"
          >
            <Mail className="size-4 text-amber" aria-hidden />
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
