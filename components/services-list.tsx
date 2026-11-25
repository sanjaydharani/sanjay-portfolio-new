'use client'

import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/site'
import { Eyebrow } from './eyebrow'
import { Reveal, RevealWords } from './motion/reveal'
import { TransitionLink } from './motion/page-transition'

const EASE = 'ease-[cubic-bezier(0.76,0,0.24,1)]'

export function ServicesList({ index = '03' }: { index?: string }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index={index}>SERVICES</Eyebrow>
            <h2
              id="services-heading"
              className="mt-6 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
            >
              <RevealWords text="WHAT I CAN" />{' '}
              <RevealWords text="build for you." className="font-serif font-normal italic text-amber" delay={0.2} />
            </h2>
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
            <p className="text-pretty leading-relaxed text-warm-grey">
              From a first website to a full software product — focused on what your business actually needs.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-b border-foreground/10 md:mt-24">
          {services.map((s, i) => (
            <Reveal as="li" key={s.index} delay={i * 0.06} y={30}>
              <TransitionLink
                href="/contact"
                data-cursor="DISCUSS"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 overflow-hidden border-t border-foreground/10 py-7 md:grid-cols-12 md:py-10"
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-bottom scale-y-0 bg-amber transition-transform duration-700 ${EASE} group-hover:scale-y-100 group-focus-visible:scale-y-100`}
                />
                <span
                  className={`relative font-serif text-lg italic text-amber transition-colors duration-500 group-hover:text-primary-foreground md:col-span-1 md:text-2xl`}
                >
                  {s.index}
                </span>
                <span
                  className={`relative text-[clamp(1.5rem,4.2vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] transition-[color,transform] duration-700 ${EASE} group-hover:translate-x-3 group-hover:text-primary-foreground md:col-span-6`}
                >
                  {s.title}
                </span>
                <span
                  className={`relative col-span-3 col-start-2 text-sm leading-relaxed text-warm-grey transition-colors duration-500 group-hover:text-primary-foreground/80 md:col-span-4 md:col-start-8 md:row-start-1 md:text-base`}
                >
                  {s.description}
                </span>
                <span
                  className={`relative col-start-3 row-start-1 flex size-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-primary-foreground group-hover:bg-primary-foreground group-hover:text-amber md:col-span-1 md:col-start-12 md:justify-self-end md:size-14`}
                >
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </TransitionLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
