import type { Metadata } from 'next'
import { ProjectShowcase } from '@/components/projects/project-showcase'
import { ContactCta } from '@/components/contact-cta'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Bright Path Academy — a coaching centre website designed to establish a professional digital presence for an educational institution.',
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectShowcase />
      <ContactCta />
    </>
  )
}
