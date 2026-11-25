import { cn } from '@/lib/utils'

export function Eyebrow({ index, children, className }: { index?: string; children: string; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-warm-grey', className)}>
      {index && <span className="font-serif text-sm italic tracking-normal text-amber">({index})</span>}
      <span aria-hidden className="h-px w-8 bg-foreground/25" />
      {children}
    </p>
  )
}
