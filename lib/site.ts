export const site = {
  name: 'CT SANJAY',
  shortName: 'CT Sanjay',
  role: 'Freelance Developer / Creative Developer',
  tagline: 'BUILDING THE DIGITAL FUTURE.',
  email: 'sanjayct9@gmail.com',
  phoneDisplay: '+91 80980 19813',
  whatsappUrl: 'https://wa.me/918098019813',
  /**
   * Add real profile URLs here when available. Entries left as null are
   * rendered as plain labels instead of links, so no URL is ever invented.
   */
  profiles: {
    github: null as string | null,
    acode: null as string | null,
  },
} as const

export const navLinks = [
  { index: '01', label: 'HOME', href: '/' },
  { index: '02', label: 'ABOUT', href: '/about' },
  { index: '03', label: 'PROJECTS', href: '/projects' },
  { index: '04', label: 'SERVICES', href: '/#services' },
  { index: '05', label: 'PRICING', href: '/#pricing' },
  { index: '06', label: 'CONTACT', href: '/#contact' },
] as const

export const featuredProject = {
  name: 'BRIGHT PATH ACADEMY',
  displayName: 'Bright Path Academy',
  category: 'Education / Coaching Centre Website',
  url: 'https://brightpath.sanjayct9.workers.dev/',
  urlLabel: 'brightpath.sanjayct9.workers.dev',
  description:
    'Bright Path Academy is a coaching centre website project designed to establish a professional digital presence for an educational institution.',
  desktopImage: '/images/brightpath-desktop.png',
  mobileImage: '/images/brightpath-mobile.png',
  /** Verified from the live site source: static HTML/CSS/JS with the Supabase JS client, served on Cloudflare Workers. */
  stack: ['HTML', 'CSS', 'JavaScript', 'Supabase JS client', 'Cloudflare Workers'],
  features: [
    'Cinematic animated intro sequence',
    'Responsive layout for desktop and mobile',
    'Courses, gallery, fees and student portal sections',
    'Clear enquiry calls-to-action for admissions',
  ],
} as const

export const services = [
  {
    index: '01',
    title: 'WEBSITE DEVELOPMENT',
    description: 'Professional responsive websites for businesses and brands.',
  },
  {
    index: '02',
    title: 'WEBSITE DESIGN',
    description: 'Modern user interfaces and engaging digital experiences.',
  },
  {
    index: '03',
    title: 'WEB APPLICATIONS',
    description: 'Functional applications built around business requirements.',
  },
  {
    index: '04',
    title: 'SAAS DEVELOPMENT',
    description: 'Software-as-a-service products and scalable software solutions.',
  },
  {
    index: '05',
    title: 'BUSINESS DIGITAL SOLUTIONS',
    description: 'Helping businesses establish and improve their online presence.',
  },
] as const

export type Tech = {
  name: string
  icon: string
  /** Monochrome Simple Icons SVGs are tinted via CSS mask; full-colour logos render as images. */
  kind: 'mask' | 'image'
  color: string
  group: 'Language' | 'Framework' | 'Runtime' | 'Tool' | 'Platform'
}

export const technologies: Tech[] = [
  { name: 'HTML', icon: '/icons/html5.svg', kind: 'mask', color: '#E34F26', group: 'Language' },
  { name: 'CSS', icon: '/icons/css.svg', kind: 'mask', color: '#8B5CF6', group: 'Language' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', kind: 'mask', color: '#F7DF1E', group: 'Language' },
  { name: 'React', icon: '/icons/react.svg', kind: 'mask', color: '#61DAFB', group: 'Framework' },
  { name: 'Next.js', icon: '/icons/nextdotjs.svg', kind: 'mask', color: '#FFFFFF', group: 'Framework' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', kind: 'mask', color: '#06B6D4', group: 'Framework' },
  { name: 'Node.js', icon: '/icons/nodedotjs.svg', kind: 'mask', color: '#5FA04E', group: 'Runtime' },
  { name: 'GitHub', icon: '/icons/github.svg', kind: 'mask', color: '#FFFFFF', group: 'Platform' },
  { name: 'VS Code', icon: '/icons/vscode.svg', kind: 'image', color: '#23A9F2', group: 'Tool' },
  { name: 'Acode', icon: '/icons/acode.png', kind: 'image', color: '#3A9BFF', group: 'Tool' },
  { name: 'Figma', icon: '/icons/figma.svg', kind: 'mask', color: '#F24E1E', group: 'Tool' },
  { name: 'Cloudflare', icon: '/icons/cloudflare.svg', kind: 'mask', color: '#F38020', group: 'Platform' },
]
