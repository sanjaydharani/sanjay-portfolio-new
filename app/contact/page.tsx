import type { Metadata } from 'next'
import { Mail, MessageCircle } from 'lucide-react'
import { EnquiryForm } from '@/components/contact/enquiry-form'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'
import { CinematicButton } from '@/components/cinematic-button'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Have a project in mind? Let's turn your idea into something extraordinary. Enquire with CT Sanjay on WhatsApp or email.",
}

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="relative overflow-hidden pb-28 pt-36 md:pb-40 md:pt-48">
      <span aria-hidden className="pointer-events-none absolute -left-40 top-20 size-[40rem] rounded-full bg-amber/[0.12] blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <Eyebrow index="04">CONTACT</Eyebrow>
        <h1
          id="contact-heading"
          className="mt-8 text-[clamp(3rem,10vw,10.5rem)] font-black leading-[0.85] tracking-[-0.05em]"
        >
          <RevealWords text="HAVE A PROJECT" delay={0.3} />
          <br />
          <RevealWords text="in mind?" delay={0.5} className="font-serif font-normal italic text-amber" />
        </h1>
        <Reveal delay={0.7} y={20}>
          <p className="mt-8 max-w-xl text-pretty text-xl leading-relaxed text-foreground/75 md:text-2xl">
            {"Let's turn your idea into something extraordinary."}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.2}>
            <h2 className="mb-10 text-[11px] font-bold tracking-[0.3em] text-warm-grey">PROJECT ENQUIRY</h2>
            <EnquiryForm />
          </Reveal>

          <aside aria-label="Direct contact" className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.3} className="flex flex-col gap-10 border-t border-foreground/10 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-warm-grey">
                  <MessageCircle className="size-4 text-amber" aria-hidden />
                  WHATSAPP
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight">{site.phoneDisplay}</p>
                <div className="mt-5">
                  <CinematicButton href={site.whatsappUrl} external variant="ghost" cursor="CHAT">
                    CHAT ON WHATSAPP
                  </CinematicButton>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-warm-grey">
                  <Mail className="size-4 text-amber" aria-hidden />
                  EMAIL
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all text-2xl font-bold tracking-tight underline-offset-8 transition-colors hover:text-amber hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <p className="text-sm leading-relaxed text-warm-grey">
                Share as much as you can about your business and goals — it helps me understand what you need before we talk.
              </p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
