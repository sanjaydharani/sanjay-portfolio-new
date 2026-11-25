'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringInner = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return
    const dot = dotRef.current
    const ring = ringRef.current
    const inner = ringInner.current
    const label = labelRef.current
    if (!dot || !ring || !inner || !label) return

    document.documentElement.classList.add('has-custom-cursor')
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const show = (v: boolean) => gsap.to([dot, ring], { opacity: v ? 1 : 0, duration: 0.25 })

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      const interactive = target?.closest('a, button, input, textarea, select, label, [role="button"]')
      if (labelled) {
        inner.dataset.mode = 'label'
        label.textContent = labelled.dataset.cursor ?? ''
      } else if (interactive) {
        inner.dataset.mode = 'hover'
        label.textContent = ''
      } else {
        inner.dataset.mode = 'default'
        label.textContent = ''
      }
    }

    const onLeave = () => show(false)
    const onEnter = () => show(true)

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    show(true)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[300] hidden [@media(pointer:fine)]:block">
      <div ref={ringRef} className="absolute left-0 top-0 opacity-0">
        <div
          ref={ringInner}
          data-mode="default"
          className="-translate-x-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-foreground/40 transition-[width,height,background-color,border-color] duration-300 ease-out data-[mode=hover]:size-14 data-[mode=hover]:border-amber data-[mode=label]:size-24 data-[mode=label]:border-amber data-[mode=label]:bg-amber"
        >
          <span ref={labelRef} className="text-[10px] font-bold tracking-[0.2em] text-primary-foreground" />
        </div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 opacity-0">
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
      </div>
    </div>
  )
}
