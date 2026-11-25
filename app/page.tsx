import { Hero } from '@/components/home/hero'
import { IntroStatement } from '@/components/home/intro-statement'
import { FeaturedProject } from '@/components/home/featured-project'
import { ServicesList } from '@/components/services-list'
import { PricingSection } from '@/components/pricing-section'
import { GrowthSection } from '@/components/growth-section'
import { ProcessFaq } from '@/components/process-faq'
import { TechWall } from '@/components/tech-wall'
import { ContactCta } from '@/components/contact-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <FeaturedProject />
      <ServicesList />
      <PricingSection />
      <GrowthSection />
      <ProcessFaq />
      <TechWall />
      <ContactCta />
    </>
  )
}
