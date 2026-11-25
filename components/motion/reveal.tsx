'use client'

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { useIntro } from './intro-provider'

const EASE = [0.16, 1, 0.3, 1] as const

/** Word-by-word masked reveal. Renders inline so it can be composed inside headings. */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const { ready } = useIntro()
  const reduce = useReducedMotion()
  const show = (inView && ready) || reduce
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="-mr-[0.12em] inline-block overflow-hidden pb-[0.08em] pr-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '110%', rotate: 4 }}
            animate={show ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </span>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'p' | 'span'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const { ready } = useIntro()
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={(inView && ready) || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-amber"
      style={{ scaleX }}
    />
  )
}
