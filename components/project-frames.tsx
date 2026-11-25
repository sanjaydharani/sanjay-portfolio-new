import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority,
  imageClassName,
}: {
  src: string
  alt: string
  url: string
  className?: string
  priority?: boolean
  imageClassName?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-foreground/10 bg-[#0f0f0e] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-amber/70" />
        </span>
        <span className="mx-auto truncate rounded-full bg-foreground/5 px-4 py-1 text-[11px] tracking-wide text-warm-grey">
          {url}
        </span>
        <span aria-hidden className="w-10" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 70vw"
          className={cn('object-cover object-top', imageClassName)}
        />
      </div>
    </div>
  )
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[2rem] border-[6px] border-[#1c1c1b] bg-[#0f0f0e] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      <div className="relative aspect-[390/844]">
        <Image src={src} alt={alt} fill sizes="240px" className="object-cover object-top" />
      </div>
    </div>
  )
}
