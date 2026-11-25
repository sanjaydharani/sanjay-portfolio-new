
import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Instrument_Serif } from 'next/font/google'
import { IntroProvider } from '@/components/motion/intro-provider'
import { Loader } from '@/components/motion/loader'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { TransitionProvider } from '@/components/motion/page-transition'
import { Cursor } from '@/components/motion/cursor'
import { ScrollProgress } from '@/components/motion/reveal'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ct-sanjay-portfolio-new.sanjayct9.workers.dev'),

  verification: {
    google: 'L19S30swK7mQIAlRz6nikCdBO4Iz73ghee9NwqPYpr4',
  },

  title: {
    default: 'CT Sanjay | Freelance Website Developer & Creative Developer',
    template: '%s — CT Sanjay',
  },
  description:
    'CT Sanjay creates responsive business websites, web applications, appointment systems and admin dashboards with thoughtful design and SEO-ready foundations.',
  keywords: [
    'CT Sanjay',
    'freelance website developer',
    'business website development',
    'responsive website design',
    'web application development',
    'appointment booking website',
    'admin dashboard development',
    'local SEO setup',
    'SEO-friendly websites',
  ],
  authors: [{ name: 'CT Sanjay' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CT Sanjay | Websites & Digital Experiences for Businesses',
    description:
      'Responsive business websites, web applications and SEO-ready digital experiences built around real business needs.',
    type: 'website',
    url: '/',
    images: ['/images/sanjay.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CT Sanjay | Freelance Website Developer',
    description: 'Business websites, web applications and SEO-ready digital experiences.',
    images: ['/images/sanjay.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080807',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-amber focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <IntroProvider>
          <TransitionProvider>
            <SmoothScroll />
            <Loader />
            <ScrollProgress />
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
            <Cursor />
            <div aria-hidden className="grain" />
          </TransitionProvider>
        </IntroProvider>
      </body>
    </html>
  )
}
