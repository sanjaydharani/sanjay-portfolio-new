'use client'

import { Plus } from 'lucide-react'
import { Eyebrow } from './eyebrow'
import { Reveal, RevealWords } from './motion/reveal'

const steps = [
  { n: '01', title: 'DISCOVER', text: 'We understand your business, audience, goals and the features your website needs.' },
  { n: '02', title: 'DESIGN', text: 'The layout and user experience are planned to match your brand and make information easy to find.' },
  { n: '03', title: 'DEVELOP', text: 'The approved design is built, connected to the agreed tools and made responsive.' },
  { n: '04', title: 'TEST & LAUNCH', text: 'We test key pages and forms, then deploy the website and guide you through handover.' },
]

const faqs = [
  { q: 'How much does a website cost?', a: 'Packages are listed from ₹9,999, and every package is negotiable. Your final quote depends on your budget, pages, features, integrations and agreed project scope.' },
  { q: 'How long does development take?', a: 'A typical project takes around 5–21 working days depending on the selected package and how quickly content and approvals are provided.' },
  { q: 'Is the domain and hosting included?', a: 'Deployment support is included in the listed packages. Domain registration, renewal and any paid hosting or third-party services are separate unless stated in your proposal.' },
  { q: 'Will my website rank first on Google?', a: 'No developer can guarantee a particular Google position. SEO setup improves the website’s foundations, while rankings depend on competition, content, location, reputation and ongoing work.' },
  { q: 'Can I manage enquiries from the website?', a: 'Enquiry forms and admin dashboard features are included in selected packages. The exact workflow and data fields will be agreed before development.' },
  { q: 'Do you provide maintenance?', a: 'Basic maintenance for the agreed delivered features is included for three months after launch, subject to the written project scope. New features and major changes are quoted separately.' },
]

export function ProcessFaq({ index = '07' }: { index?: string }) {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index={index}>HOW I WORK</Eyebrow>
            <h2 id="process-heading" className="mt-6 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
              <RevealWords text="FROM IDEA" />{' '}
              <RevealWords text="to launch." className="font-serif font-normal italic text-amber" delay={0.18} />
            </h2>
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
            <p className="leading-relaxed text-warm-grey">A clear process keeps every project organised, transparent and focused on your goals.</p>
          </Reveal>
        </div>

        <ol className="mt-16 grid border-l border-t border-foreground/10 sm:grid-cols-2 xl:grid-cols-4 md:mt-24">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.07} className="list-none border-b border-r border-foreground/10 p-7 md:p-8">
              <span className="font-serif text-xl italic text-amber">({step.n})</span>
              <h3 className="mt-12 text-2xl font-black tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-warm-grey">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div id="faq" className="mt-28 grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>GOOD TO KNOW</Eyebrow>
            <h3 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
              QUICK <span className="font-serif font-normal italic text-amber">answers.</span>
            </h3>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-warm-grey">A few things clients often ask before starting a website project.</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="border-t border-foreground/15">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.04}>
                  <details className="group border-b border-foreground/15 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold marker:hidden md:text-lg">
                      <span>{faq.q}</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-amber transition-transform duration-500 group-open:rotate-45 group-open:border-amber">
                        <Plus className="size-4" aria-hidden />
                      </span>
                    </summary>
                    <p className="max-w-2xl pr-12 pt-4 text-sm leading-relaxed text-warm-grey">{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
