import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'

const PARAGRAPHS = [
  "I'm CT Sanjay, a freelance developer passionate about transforming business ideas into powerful digital experiences.",
  'From designing professional websites to exploring SaaS platforms and software solutions, I focus on creating digital products that are visually impressive, functional and built around real business needs.',
]

export function AboutStory() {
  return (
    <section aria-labelledby="story-heading" className="relative py-28 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Eyebrow index="01">INTRODUCTION</Eyebrow>
          <h2
            id="story-heading"
            className="mt-8 text-[clamp(2.25rem,5vw,4.75rem)] font-black leading-[0.95] tracking-[-0.04em]"
          >
            <RevealWords text="MORE THAN" /> <RevealWords text="JUST CODE." delay={0.15} />
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7 md:pt-16">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="text-pretty text-lg leading-relaxed text-foreground/80 md:text-xl">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <blockquote className="border-l-2 border-amber pl-6 font-serif text-[clamp(1.75rem,3.4vw,3rem)] italic leading-[1.1] text-foreground">
              I believe every business deserves a strong digital presence.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
