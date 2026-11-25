'use client'

import { ArrowUpRight, Gauge, MapPin, Search, ShieldCheck } from 'lucide-react'
import { Eyebrow } from './eyebrow'
import { Reveal, RevealWords } from './motion/reveal'

const items = [
  {
    icon: Search,
    number: '01',
    title: 'ON-PAGE SEO',
    description: 'Clear page titles, meta descriptions, headings, image alt text and internal links that help search engines understand your content.',
  },
  {
    icon: MapPin,
    number: '02',
    title: 'LOCAL SEO',
    description: 'Location-focused service information, consistent business details and Google Business Profile support where included.',
  },
  {
    icon: Gauge,
    number: '03',
    title: 'PERFORMANCE',
    description: 'Mobile-friendly layouts, image optimisation and performance improvements for a smoother visitor experience.',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'TECHNICAL SEO',
    description: 'Sitemap, robots.txt, indexing checks, structured data basics and technical foundations for search discovery.',
  },
]

export function GrowthSection({ index = '06' }: { index?: string }) {
  return (
    <section id="seo" aria-labelledby="growth-heading" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index={index}>SEO & DIGITAL GROWTH</Eyebrow>
            <h2 id="growth-heading" className="mt-6 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
              <RevealWords text="BE SEEN." />{' '}
              <RevealWords text="Be remembered." className="font-serif font-normal italic text-amber" delay={0.18} />
            </h2>
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
            <p className="text-pretty leading-relaxed text-warm-grey">
              A good website should do more than look impressive. It should make it easier for the right people to discover and contact your business.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-l border-t border-foreground/10 sm:grid-cols-2 md:mt-24">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.number} delay={i * 0.07} className="group border-b border-r border-foreground/10 p-7 transition-colors duration-500 hover:bg-amber/[0.045] md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg italic text-amber">({item.number})</span>
                  <Icon className="size-5 text-amber transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </div>
                <h3 className="mt-10 text-2xl font-black tracking-[-0.03em] md:text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-warm-grey">{item.description}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 flex flex-col gap-3 border-l-2 border-amber pl-5 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl text-sm leading-relaxed text-warm-grey">
            SEO setup can improve your website's search foundations, but Google rankings, indexing time, traffic, enquiries and sales are not guaranteed. Ongoing SEO campaigns can be scoped separately.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-amber hover:text-foreground">
            LET'S DISCUSS <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
