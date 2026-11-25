import { Layers, LayoutTemplate, Lightbulb, MousePointerClick, Rocket, Store } from 'lucide-react'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal, RevealWords } from '@/components/motion/reveal'

const INTERESTS = [
  { icon: LayoutTemplate, title: 'Interface design', body: 'Clean, modern layouts with strong typography and clear hierarchy.' },
  { icon: MousePointerClick, title: 'Motion & interaction', body: 'Animation that guides attention and makes interfaces feel alive.' },
  { icon: Layers, title: 'SaaS products', body: 'How software-as-a-service platforms are designed, built and scaled.' },
  { icon: Store, title: 'Business presence', body: 'Helping local businesses look professional and trustworthy online.' },
  { icon: Lightbulb, title: 'Problem solving', body: 'Turning a rough business idea into a working digital solution.' },
  { icon: Rocket, title: 'Continuous learning', body: 'Picking up new tools and frameworks as the web keeps evolving.' },
]

export function Interests() {
  return (
    <section aria-labelledby="interests-heading" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Eyebrow index="03">INTERESTS</Eyebrow>
        <h2
          id="interests-heading"
          className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
        >
          <RevealWords text="WHAT KEEPS ME" />{' '}
          <RevealWords text="curious." className="font-serif font-normal italic text-amber" delay={0.15} />
        </h2>

        <ul className="mt-16 grid border-l border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.08}
              y={24}
              className="group relative overflow-hidden border-b border-r border-foreground/10 p-8 md:p-10"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-gradient-to-t from-amber/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
              />
              <div className="relative flex items-start justify-between">
                <item.icon
                  className="size-7 text-amber transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <span className="font-serif text-sm italic text-warm-grey">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="relative mt-12 text-xl font-black tracking-[-0.01em] md:text-2xl">
                {item.title.toUpperCase()}
              </h3>
              <p className="relative mt-3 text-pretty leading-relaxed text-warm-grey">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
