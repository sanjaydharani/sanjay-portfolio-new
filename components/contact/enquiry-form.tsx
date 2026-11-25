'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl, validateEnquiry, type Enquiry, type EnquiryErrors } from '@/lib/whatsapp'
import { Magnetic } from '@/components/motion/reveal'

const BUSINESS_TYPES = [
  'Education / Coaching',
  'Retail / Shop',
  'Restaurant / Café',
  'Healthcare / Clinic',
  'Professional Services',
  'Startup / SaaS',
  'Personal Brand',
  'Other',
]

const EMPTY: Enquiry = { name: '', phone: '', businessName: '', businessType: '', requirements: '' }
const ORDER: (keyof Enquiry)[] = ['name', 'phone', 'businessName', 'businessType', 'requirements']

const fieldBase =
  'peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-7 text-lg text-foreground outline-none transition-colors placeholder:text-transparent focus:ring-0'

function FieldShell({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('group relative', className)}>
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-7 origin-left text-lg text-warm-grey transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-[0.25em] peer-focus:text-amber peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-[0.25em] peer-data-[filled=true]:top-0 peer-data-[filled=true]:text-[11px] peer-data-[filled=true]:font-bold peer-data-[filled=true]:tracking-[0.25em]"
      >
        {label} <span className="text-amber">*</span>
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] peer-focus:scale-x-100"
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-sm text-[#ff8a4c]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(EMPTY)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [opened, setOpened] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (key: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (submitted) setErrors(validateEnquiry(next))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateEnquiry(values)
    setErrors(found)
    const first = ORDER.find((k) => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#enq-${first}`)?.focus()
      return
    }
    const url = buildWhatsAppUrl(values)
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = url
    setOpened(true)
  }

  const a11y = (key: keyof Enquiry) => ({
    id: `enq-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `enq-${key}-error` : undefined,
    className: cn(fieldBase, errors[key] ? 'border-[#ff8a4c]/70' : 'border-foreground/15'),
  })

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Project enquiry" className="flex flex-col gap-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <FieldShell id="enq-name" label="Your name" error={errors.name}>
          <input {...a11y('name')} type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={update('name')} required />
        </FieldShell>
        <FieldShell id="enq-phone" label="Phone number" error={errors.phone}>
          <input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" value={values.phone} onChange={update('phone')} required />
        </FieldShell>
        <FieldShell id="enq-businessName" label="Business name" error={errors.businessName}>
          <input {...a11y('businessName')} type="text" autoComplete="organization" placeholder="Business name" value={values.businessName} onChange={update('businessName')} required />
        </FieldShell>
        <FieldShell id="enq-businessType" label="Business type" error={errors.businessType}>
          <select
            {...a11y('businessType')}
            data-filled={values.businessType ? 'true' : 'false'}
            value={values.businessType}
            onChange={update('businessType')}
            required
            className={cn(a11y('businessType').className, 'appearance-none pr-8', !values.businessType && 'text-transparent')}
          >
            <option value="" disabled hidden />
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t} className="bg-charcoal text-foreground">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-0 top-8 size-5 text-warm-grey" />
        </FieldShell>
      </div>

      <FieldShell id="enq-requirements" label="Project requirements" error={errors.requirements}>
        <textarea
          {...a11y('requirements')}
          rows={4}
          placeholder="Project requirements"
          value={values.requirements}
          onChange={update('requirements')}
          required
          className={cn(a11y('requirements').className, 'resize-none')}
        />
      </FieldShell>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-warm-grey">
          Submitting opens WhatsApp with your enquiry pre-filled. Just press <span className="text-foreground">Send</span> inside WhatsApp.
        </p>
        <Magnetic strength={0.25}>
          <button
            type="submit"
            data-cursor="SEND"
            className="group relative inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-amber px-9 text-xs font-black tracking-[0.22em] text-primary-foreground"
          >
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <span className="relative">SEND VIA WHATSAPP</span>
            <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
          </button>
        </Magnetic>
      </div>

      <p role="status" aria-live="polite" className="min-h-6 text-sm text-amber">
        {opened ? 'WhatsApp opened with your message — press Send there to deliver it.' : ''}
      </p>
    </form>
  )
}
