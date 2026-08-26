import { defineStore } from 'pinia'
import { ref } from 'vue'
import { team as seedTeam } from '@/data/team'
import { programs as seedPrograms } from '@/data/programs'
import { posts as seedPosts } from '@/data/posts'
import { testimonials as seedTestimonials } from '@/data/testimonials'
import { gallery as seedGallery } from '@/data/gallery'
import { siteConfig as seedConfig } from '@/data/site-config'
import { messages as seedMessages } from '@/data/messages'
import { loadStorage, saveStorage } from '@/utils/storage'
import { uid } from '@/utils/format'
import type {
  BlogPost,
  ContactMessage,
  GalleryImage,
  Program,
  SiteConfig,
  TeamMember,
  Testimonial,
} from '@/types'

const KEYS = {
  team: 'spartan.team',
  programs: 'spartan.programs',
  posts: 'spartan.posts',
  testimonials: 'spartan.testimonials',
  gallery: 'spartan.gallery',
  config: 'spartan.config',
  messages: 'spartan.messages',
} as const

export const useContentStore = defineStore('content', () => {
  const team = ref<TeamMember[]>(loadStorage(KEYS.team, seedTeam))
  const programs = ref<Program[]>(loadStorage(KEYS.programs, seedPrograms))
  const posts = ref<BlogPost[]>(loadStorage(KEYS.posts, seedPosts))
  const testimonials = ref<Testimonial[]>(loadStorage(KEYS.testimonials, seedTestimonials))
  const gallery = ref<GalleryImage[]>(loadStorage(KEYS.gallery, seedGallery))
  const config = ref<SiteConfig>(loadStorage(KEYS.config, seedConfig))
  const messages = ref<ContactMessage[]>(loadStorage(KEYS.messages, seedMessages))

  function persist(key: string, value: unknown) {
    saveStorage(key, value)
  }

  function addTo<T>(list: { value: T[] }, item: T, key: string) {
    list.value.unshift(item)
    persist(key, list.value)
  }

  function updateIn<T extends { id: string }>(
    list: { value: T[] },
    id: string,
    data: Partial<T>,
    key: string,
  ) {
    const idx = list.value.findIndex((i) => i.id === id)
    if (idx !== -1) {
      list.value[idx] = { ...list.value[idx], ...data }
      persist(key, list.value)
    }
  }

  function removeFrom<T extends { id: string }>(list: { value: T[] }, id: string, key: string) {
    list.value = list.value.filter((i) => i.id !== id)
    persist(key, list.value)
  }

  // Team
  const addTeam = (data: Omit<TeamMember, 'id'>) => addTo(team, { ...data, id: uid() }, KEYS.team)
  const updateTeam = (id: string, data: Partial<TeamMember>) => updateIn(team, id, data, KEYS.team)
  const removeTeam = (id: string) => removeFrom(team, id, KEYS.team)

  // Programs
  const addProgram = (data: Omit<Program, 'id'>) => addTo(programs, { ...data, id: uid() }, KEYS.programs)
  const updateProgram = (id: string, data: Partial<Program>) => updateIn(programs, id, data, KEYS.programs)
  const removeProgram = (id: string) => removeFrom(programs, id, KEYS.programs)

  // Posts
  const addPost = (data: Omit<BlogPost, 'id'>) => addTo(posts, { ...data, id: uid() }, KEYS.posts)
  const updatePost = (id: string, data: Partial<BlogPost>) => updateIn(posts, id, data, KEYS.posts)
  const removePost = (id: string) => removeFrom(posts, id, KEYS.posts)

  // Testimonials
  const addTestimonial = (data: Omit<Testimonial, 'id'>) =>
    addTo(testimonials, { ...data, id: uid() }, KEYS.testimonials)
  const updateTestimonial = (id: string, data: Partial<Testimonial>) =>
    updateIn(testimonials, id, data, KEYS.testimonials)
  const removeTestimonial = (id: string) => removeFrom(testimonials, id, KEYS.testimonials)

  // Gallery
  const addGalleryImage = (data: Omit<GalleryImage, 'id'>) =>
    addTo(gallery, { ...data, id: uid() }, KEYS.gallery)
  const removeGalleryImage = (id: string) => removeFrom(gallery, id, KEYS.gallery)

  // Config
  function updateConfig(data: Partial<SiteConfig>) {
    config.value = { ...config.value, ...data }
    persist(KEYS.config, config.value)
  }

  // Messages
  const addMessage = (data: Omit<ContactMessage, 'id' | 'read' | 'createdAt'>) =>
    addTo(messages, { ...data, id: uid(), read: false, createdAt: new Date().toISOString() }, KEYS.messages)
  function updateMessage(id: string, data: Partial<ContactMessage>) {
    updateIn(messages, id, data, KEYS.messages)
  }
  const removeMessage = (id: string) => removeFrom(messages, id, KEYS.messages)

  return {
    team,
    programs,
    posts,
    testimonials,
    gallery,
    config,
    messages,
    addTeam,
    updateTeam,
    removeTeam,
    addProgram,
    updateProgram,
    removeProgram,
    addPost,
    updatePost,
    removePost,
    addTestimonial,
    updateTestimonial,
    removeTestimonial,
    addGalleryImage,
    removeGalleryImage,
    updateConfig,
    addMessage,
    updateMessage,
    removeMessage,
  }
})
