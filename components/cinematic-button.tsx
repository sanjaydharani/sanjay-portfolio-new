'use client'

import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from './motion/reveal'
import { TransitionLink } from './motion/page-transition'

type Props = {
  children: string
  href?: string
  external?: boolean
  variant?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  cursor?: string
}

export function CinematicButton({
  children,
  href,
  external,
  variant = 'primary',
  type = 'button',
  onClick,
  className,
  icon,
  cursor,
}: Props) {
  const classes = cn(
    'group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 text-xs font-bold tracking-[0.22em] transition-colors duration-500',
    variant === 'primary'
      ? 'bg-amber text-primary-foreground'
      : 'border border-foreground/25 text-foreground hover:border-amber hover:text-primary-foreground',
    className,
  )

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100',
          variant === 'primary' ? 'bg-foreground' : 'bg-amber',
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span className="relative transition-transform duration-500 group-hover:rotate-45">
        {icon ?? <ArrowUpRight className="size-4" aria-hidden />}
      </span>
    </>
  )

  let el: React.ReactNode
  if (href && external) {
    el = (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-cursor={cursor}>
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  } else if (href && /^(mailto:|tel:)/.test(href)) {
    el = (
      <a href={href} className={classes} data-cursor={cursor}>
        {inner}
      </a>
    )
  } else if (href) {
    el = (
      <TransitionLink href={href} className={classes} data-cursor={cursor}>
        {inner}
      </TransitionLink>
    )
  } else {
    el = (
      <button type={type} onClick={onClick} className={classes} data-cursor={cursor}>
        {inner}
      </button>
    )
  }

  return <Magnetic strength={0.25}>{el}</Magnetic>
}
