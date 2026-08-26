import type {
  AdminUser,
  BlogPost,
  ContactMessage,
  ErpModule,
  GalleryImage,
  Plan,
  Program,
  SiteConfig,
  TeamMember,
  Testimonial,
  Transaction,
} from '@/types'

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isStr = (v: unknown): v is string => typeof v === 'string'
const isNum = (v: unknown): v is number => typeof v === 'number'
const isBool = (v: unknown): v is boolean => typeof v === 'boolean'
const isStrArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isStr)

const isRole = (v: unknown): boolean => v === 'admin' || v === 'editor'

export const isTeam = (v: unknown): v is TeamMember[] =>
  Array.isArray(v) &&
  v.every(
    (m) =>
      isObj(m) &&
      isStr(m.id) &&
      isStr(m.name) &&
      isStr(m.role) &&
      isStr(m.bio) &&
      isStr(m.image) &&
      isStrArray(m.credentials),
  )

export const isPrograms = (v: unknown): v is Program[] =>
  Array.isArray(v) &&
  v.every(
    (p) =>
      isObj(p) &&
      isStr(p.id) &&
      isStr(p.title) &&
      isStr(p.description) &&
      isStr(p.image) &&
      isStr(p.tag) &&
      isStrArray(p.features),
  )

export const isPosts = (v: unknown): v is BlogPost[] =>
  Array.isArray(v) &&
  v.every(
    (p) =>
      isObj(p) &&
      isStr(p.id) &&
      isStr(p.slug) &&
      isStr(p.title) &&
      isStr(p.excerpt) &&
      isStr(p.content) &&
      isStr(p.category) &&
      isStr(p.image) &&
      isStr(p.author) &&
      isStr(p.publishedAt) &&
      isBool(p.published),
  )

export const isTestimonials = (v: unknown): v is Testimonial[] =>
  Array.isArray(v) &&
  v.every(
    (t) => isObj(t) && isStr(t.id) && isStr(t.name) && isStr(t.role) && isStr(t.quote) && isStr(t.image),
  )

export const isGallery = (v: unknown): v is GalleryImage[] =>
  Array.isArray(v) && v.every((g) => isObj(g) && isStr(g.id) && isStr(g.src) && isStr(g.alt))

export const isMessages = (v: unknown): v is ContactMessage[] =>
  Array.isArray(v) &&
  v.every(
    (m) =>
      isObj(m) &&
      isStr(m.id) &&
      isStr(m.name) &&
      isStr(m.email) &&
      isStr(m.phone) &&
      isStr(m.subject) &&
      isStr(m.message) &&
      isBool(m.read) &&
      isStr(m.createdAt),
  )

export const isSiteConfig = (v: unknown): v is SiteConfig =>
  isObj(v) &&
  isStr(v.heroTitle) &&
  isStr(v.heroSubtitle) &&
  isStr(v.heroCta) &&
  isStr(v.phone) &&
  isStr(v.whatsapp) &&
  isStr(v.email) &&
  isStr(v.address) &&
  isStr(v.instagram) &&
  isStr(v.facebook) &&
  isStr(v.youtube) &&
  isStr(v.mapEmbed) &&
  Array.isArray(v.hours) &&
  v.hours.every((h) => isObj(h) && isStr(h.day) && isStr(h.time))

export const isUsers = (v: unknown): v is AdminUser[] => Array.isArray(v) && v.every(isAdminUser)

export const isAdminUser = (v: unknown): v is AdminUser =>
  isObj(v) &&
  isStr(v.id) &&
  isStr(v.name) &&
  isStr(v.email) &&
  isStr(v.username) &&
  isStr(v.password) &&
  isRole(v.role) &&
  isBool(v.active)

export const isTransactions = (v: unknown): v is Transaction[] =>
  Array.isArray(v) &&
  v.every(
    (t) =>
      isObj(t) &&
      isStr(t.id) &&
      isStr(t.description) &&
      isStr(t.category) &&
      isNum(t.amount) &&
      (t.type === 'income' || t.type === 'expense') &&
      isStr(t.date),
  )

export const isPlans = (v: unknown): v is Plan[] =>
  Array.isArray(v) &&
  v.every(
    (p) => isObj(p) && isStr(p.id) && isStr(p.name) && isNum(p.price) && isStr(p.period) && isBool(p.active),
  )

export const isErpModules = (v: unknown): v is ErpModule[] =>
  Array.isArray(v) &&
  v.every(
    (m) =>
      isObj(m) &&
      isStr(m.id) &&
      isStr(m.name) &&
      isStr(m.description) &&
      isBool(m.enabled) &&
      isStr(m.integrationUrl),
  )
