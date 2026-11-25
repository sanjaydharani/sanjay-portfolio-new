import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/about-hero'
import { AboutStory } from '@/components/about/about-story'
import { Journey } from '@/components/about/journey'
import { Interests } from '@/components/about/interests'
import { TechWall } from '@/components/tech-wall'
import { ContactCta } from '@/components/contact-cta'

export const metadata: Metadata = {
  title: 'About',
  description:
    'CT Sanjay is a freelance developer passionate about transforming business ideas into powerful digital experiences.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <Journey />
      <Interests />
      <TechWall index="04" />
      <ContactCta />
    </>
  )
}
