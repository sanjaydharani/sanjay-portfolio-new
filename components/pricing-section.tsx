'use client'

import { ArrowUpRight, Check } from 'lucide-react'
import { site } from '@/lib/site'
import { Eyebrow } from './eyebrow'
import { Reveal, RevealWords } from './motion/reveal'
import { CinematicButton } from './cinematic-button'

const packages = [
  {
    number: '01',
    name: 'STARTER',
    description: 'A professional online presence for a new or small business.',
    price: '₹9,999',
    note: 'Negotiable',
    features: [
      'Custom UI/UX website design',
      'Up to 5 pages or sections',
      'Responsive mobile and desktop layout',
      'WhatsApp, call and contact enquiry',
      'Basic on-page SEO setup',
      'Google Search Console and sitemap setup',
      'Cloudflare deployment support',
    ],
  },
  {
    number: '02',
    name: 'GROWTH',
    description: 'For businesses ready to generate and manage more enquiries.',
    price: '₹14,999',
    note: 'Negotiable',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 8 pages',
      'Lead or appointment request form',
      'Database integration',
      'Basic admin dashboard',
      'Core keyword research and local SEO foundations',
      'Analytics setup and speed improvements',
    ],
  },
  {
    number: '03',
    name: 'ADVANCED',
    description: 'A stronger digital presence with expanded SEO and lead tools.',
    price: '₹24,999',
    note: 'Negotiable',
    features: [
      'Everything in Growth',
      'Up to 12 pages',
      'Expanded keyword-to-page planning',
      'Service and location landing pages',
      'Enhanced enquiry dashboard',
      'Google Business Profile support',
      'Technical SEO and structured data basics',
    ],
  },
  {
    number: '04',
    name: 'PREMIUM',
    description: 'A tailored website experience for businesses with broader needs.',
    price: '₹39,999',
    note: 'Negotiable',
    features: [
      'Everything in Advanced',
      'Custom multi-page website structure',
      'Up to 18 pages, based on scope',
      'Advanced lead management dashboard',
      'Expanded local SEO planning',
      'Blog or content section',
      'Advanced analytics event setup',
    ],
  },
]

export function PricingSection({ index = '05' }: { index?: string }) {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative overflow-hidden bg-charcoal py-28 md:py-40">
      <span aria-hidden className="pointer-events-none absolute -right-48 top-1/4 size-[34rem] rounded-full bg-amber/[0.08] blur-[130px]" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index={index}>WEBSITE PACKAGES</Eyebrow>
            <h2 id="pricing-heading" className="mt-6 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
              <RevealWords text="CLEAR PLANS." />{' '}
              <RevealWords text="Real value." className="font-serif font-normal italic text-amber" delay={0.18} />
            </h2>
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
            <p className="text-pretty leading-relaxed text-warm-grey">
              Choose a starting point. Every project is scoped around your business, goals and required features.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 md:mt-20">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.number} delay={i * 0.08} y={34} className="h-full">
              <article className={`group relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-all duration-700 hover:-translate-y-2 md:p-7 ${pkg.popular ? 'border-amber/60 bg-[#1c1a17] shadow-[0_0_55px_rgba(255,107,26,0.09)]' : 'border-foreground/12 bg-[#10100f] hover:border-amber/45'}`}>
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent opacity-70" />
                {pkg.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber px-3 py-1 text-[9px] font-black tracking-[0.16em] text-primary-foreground">
                    POPULAR
                  </span>
                )}
                <p className="text-[10px] font-bold tracking-[0.25em] text-amber">{pkg.number} / {pkg.name}</p>
                <p className="mt-5 min-h-[52px] pr-2 text-sm leading-relaxed text-warm-grey">{pkg.description}</p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-1">
                  <span className="text-[clamp(2rem,3vw,2.65rem)] font-black tracking-[-0.055em] text-foreground">{pkg.price}</span>
                </div>
                <p className="mt-1 min-h-8 text-[11px] font-semibold leading-relaxed text-green-400">{pkg.note}</p>
                <div className="my-5 h-px bg-foreground/10" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-foreground">PACKAGE INCLUDES</p>
                <ul className="mt-5 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/75">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-amber" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${site.whatsappUrl}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} website package (${pkg.price}). Please let me know if you can offer a suitable option within my budget and share the details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 flex min-h-12 items-center justify-between rounded-full border px-4 text-[10px] font-bold tracking-[0.16em] transition-all duration-500 ${pkg.popular ? 'border-amber bg-amber text-primary-foreground hover:bg-foreground hover:text-background' : 'border-foreground/20 text-foreground hover:border-amber hover:bg-amber hover:text-primary-foreground'}`}
                >
                  DISCUSS PACKAGE
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs leading-relaxed text-warm-grey md:flex-row md:items-center md:justify-between">
          <p>* All listed prices are negotiable. Final pricing depends on your budget, requirements and agreed project scope.</p>
          <p>Three months of basic maintenance is included. Domain, paid hosting and third-party service fees are separate unless agreed in writing.</p>
        </Reveal>
      </div>
    </section>
  )
}
