'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { useIntro } from './intro-provider'

const BRAND = ['C', 'T', ' ', 'S', 'A', 'N', 'J', 'A', 'Y']

export function Loader() {
  const { setReady } = useIntro()
  const [visible, setVisible] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setReady(true)
        setVisible(false)
        return
      }
      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: () => setVisible(false) })
      tl.fromTo(
        '.loader-char',
        { yPercent: 115, rotate: 6, opacity: 0, filter: 'blur(10px)' },
        { yPercent: 0, rotate: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.055, duration: 1.1, ease: 'expo.out' },
        0.15,
      )
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            },
          },
          0,
        )
        .fromTo('.loader-line', { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
        .fromTo('.loader-meta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.3)
        .to('.loader-char', { yPercent: -115, opacity: 0, stagger: 0.03, duration: 0.6, ease: 'expo.in' }, 1.9)
        .to(['.loader-meta', '.loader-line'], { opacity: 0, duration: 0.3 }, 1.9)
        .add(() => setReady(true), 2.4)
        .to('.loader-panel-top', { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, 2.35)
        .to('.loader-panel-bottom', { yPercent: 100, duration: 1.15, ease: 'expo.inOut' }, 2.35)
    },
    { scope: root },
  )

  if (!visible) return null

  return (
    <div ref={root} className="fixed inset-0 z-[200]" role="status" aria-live="polite" aria-label="Loading CT Sanjay portfolio">
      <div className="loader-panel-top absolute inset-x-0 top-0 h-1/2 bg-[#050504]" />
      <div className="loader-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#050504]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <p className="flex overflow-hidden pb-2 text-[clamp(3rem,13vw,11rem)] font-black leading-none tracking-[-0.04em] text-foreground">
          {BRAND.map((c, i) => (
            <span key={i} className="loader-char inline-block" style={{ width: c === ' ' ? '0.3em' : undefined }}>
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </p>
        <span className="loader-line mt-6 block h-px w-[min(60vw,28rem)] origin-left bg-amber" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-xs tracking-[0.3em] text-warm-grey md:p-10">
        <span className="loader-meta">CREATIVE DEVELOPER</span>
        <span className="loader-meta font-serif text-5xl italic tracking-normal text-foreground md:text-7xl">
          <span ref={countRef}>000</span>
        </span>
      </div>
    </div>
  )
}
