'use client'

import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { technologies, type Tech } from '@/lib/site'
import { Eyebrow } from './eyebrow'
import { Reveal, RevealWords } from './motion/reveal'

function TechTile({ tech }: { tech: Tech }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 200, damping: 18 })
  const iconX = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 18 })
  const iconY = useSpring(useTransform(py, [0, 1], [-8, 8]), { stiffness: 200, damping: 18 })

  return (
    <li className="shrink-0 [perspective:900px]">
      <motion.div
        style={
          {
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            '--brand': tech.color,
          } as React.CSSProperties & Record<string, unknown>
        }
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
        className="group relative flex h-44 w-40 flex-col items-center justify-center gap-5 rounded-2xl border border-foreground/10 bg-gradient-to-b from-foreground/[0.04] to-transparent transition-[border-color,box-shadow] duration-500 [transform-style:preserve-3d] hover:border-(--brand)/50 hover:shadow-[0_0_60px_-12px_var(--brand)] md:h-52 md:w-48"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_30%,var(--brand),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.12]"
        />
        <motion.span style={reduce ? undefined : { x: iconX, y: iconY, z: 40 }} className="relative block">
          {tech.kind === 'mask' ? (
            <span
              aria-hidden
              className="block size-12 bg-foreground/55 transition-colors duration-500 group-hover:bg-(--brand) md:size-14"
              style={{
                maskImage: `url(${tech.icon})`,
                WebkitMaskImage: `url(${tech.icon})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          ) : (
            <Image
              src={tech.icon}
              alt=""
              width={56}
              height={56}
              className="size-12 object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:size-14"
            />
          )}
        </motion.span>
        <span className="relative text-center" style={{ transform: 'translateZ(20px)' }}>
          <span className="block text-sm font-bold tracking-wide text-foreground">{tech.name}</span>
          <span className="mt-1 block text-[10px] tracking-[0.25em] text-warm-grey">{tech.group.toUpperCase()}</span>
        </span>
      </motion.div>
    </li>
  )
}

function MarqueeRow({ items, reverse, duration }: { items: Tech[]; reverse?: boolean; duration: string }) {
  return (
    <div className="marquee relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`marquee-track flex w-max gap-5 pr-5 ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {[...items, ...items].map((t, i) => (
          <TechTile key={`${t.name}-${i}`} tech={t} />
        ))}
      </ul>
    </div>
  )
}

export function TechWall({ index = '08' }: { index?: string }) {
  const half = Math.ceil(technologies.length / 2)
  return (
    <section aria-labelledby="tech-heading" className="relative overflow-hidden py-28 md:py-40">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.06] blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index={index}>TOOLS & TECHNOLOGIES</Eyebrow>
            <h2
              id="tech-heading"
              className="mt-6 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
            >
              <RevealWords text="THE TOOLKIT" />{' '}
              <RevealWords text="behind the work." className="font-serif font-normal italic text-amber" delay={0.2} />
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="text-pretty leading-relaxed text-warm-grey">
              The languages, frameworks and tools I use in my work — some daily, others I&apos;m actively developing
              my skills in as I grow.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="relative mt-14 md:mt-20">
        <MarqueeRow items={technologies.slice(0, half)} duration="38s" />
        <MarqueeRow items={technologies.slice(half)} duration="44s" reverse />
      </div>
      <ul className="sr-only">
        {technologies.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
