export type Role = 'admin' | 'editor'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  credentials: string[]
  image: string
}

export interface Program {
  id: string
  title: string
  description: string
  image: string
  tag: string
  features: string[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  author: string
  publishedAt: string
  published: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  image: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  username: string
  password: string
  role: Role
  active: boolean
}

export interface SiteConfig {
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  phone: string
  whatsapp: string
  email: string
  address: string
  instagram: string
  facebook: string
  youtube: string
  hours: { day: string; time: string }[]
  mapEmbed: string
}

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: TransactionType
  date: string
}

export interface Plan {
  id: string
  name: string
  price: number
  period: string
  active: boolean
}

export interface ErpModule {
  id: string
  name: string
  description: string
  enabled: boolean
  integrationUrl: string
}
