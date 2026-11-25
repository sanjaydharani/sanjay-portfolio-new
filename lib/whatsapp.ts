import { site } from './site'

export type Enquiry = {
  name: string
  phone: string
  businessName: string
  businessType: string
  requirements: string
}

export function buildEnquiryMessage(e: Enquiry) {
  return [
    'Hello CT Sanjay!',
    '',
    'I would like to enquire about your services.',
    '',
    `Name: ${e.name.trim()}`,
    `Phone: ${e.phone.trim()}`,
    `Business Name: ${e.businessName.trim()}`,
    `Business Type: ${e.businessType.trim()}`,
    `Project Requirements: ${e.requirements.trim()}`,
    '',
    'Please contact me regarding this project.',
  ].join('\n')
}

export function buildWhatsAppUrl(e: Enquiry) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(buildEnquiryMessage(e))}`
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (e.name.trim().length < 2) errors.name = 'Please enter your name.'
  const digits = e.phone.replace(/\D/g, '')
  if (!e.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+\d\s()-]+$/.test(e.phone.trim()) || digits.length < 10 || digits.length > 15)
    errors.phone = 'Enter a valid phone number (10–15 digits).'
  if (!e.businessName.trim()) errors.businessName = 'Please enter your business name.'
  if (!e.businessType.trim()) errors.businessType = 'Please select your business type.'
  if (e.requirements.trim().length < 10)
    errors.requirements = 'Tell me a little about your project (at least 10 characters).'
  return errors
}
