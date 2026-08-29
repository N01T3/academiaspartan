import { describe, it, expect } from 'vitest'
import { mountWithVuetify } from '../helpers'
import ProgramCard from '@/components/sections/ProgramCard.vue'
import TeamCard from '@/components/sections/TeamCard.vue'
import TestimonialCard from '@/components/sections/TestimonialCard.vue'
import BlogCard from '@/components/sections/BlogCard.vue'
import type { BlogPost, Program, TeamMember, Testimonial } from '@/types'

const program: Program = {
  id: 'p1',
  title: 'Powerlifting',
  description: 'Foco em força máxima e técnica de levantamento.',
  image: 'https://example.com/powerlifting.jpg',
  tag: 'Performance',
  features: ['Técnica de levantamento', 'Ciclos de força'],
}

const member: TeamMember = {
  id: 'm1',
  name: 'Ricardo Almeida',
  role: 'Treinador Chefe · Bodybuilding',
  bio: 'Atleta com mais de 15 anos de competição.',
  credentials: ['CREF 012345-G/SP', 'Cert. IFBB Pro Prep'],
  image: 'https://example.com/ricardo.jpg',
}

const testimonial: Testimonial = {
  id: 't1',
  name: 'João Silva',
  role: 'Atleta',
  quote: 'Melhor academia da cidade.',
  image: 'https://example.com/joao.jpg',
}

const post: BlogPost = {
  id: 'b1',
  slug: 'periodizacao-para-hipertrofia',
  title: 'Periodização para hipertrofia',
  excerpt: 'Como estruturar seus treinos em ciclos.',
  content: 'Conteúdo do post.',
  category: 'Treinamento',
  image: 'https://example.com/post.jpg',
  author: 'Ricardo Almeida',
  publishedAt: '2026-08-10',
  published: true,
}

describe('ProgramCard', () => {
  it('renderiza title, description e features', () => {
    const wrapper = mountWithVuetify(ProgramCard, { props: { program } })
    expect(wrapper.text()).toContain('Powerlifting')
    expect(wrapper.text()).toContain('Foco em força máxima e técnica de levantamento.')
    expect(wrapper.text()).toContain('Técnica de levantamento')
    expect(wrapper.text()).toContain('Ciclos de força')
  })
})

describe('TeamCard', () => {
  it('renderiza name, role e credentials', () => {
    const wrapper = mountWithVuetify(TeamCard, { props: { member } })
    expect(wrapper.text()).toContain('Ricardo Almeida')
    expect(wrapper.text()).toContain('Treinador Chefe · Bodybuilding')
    expect(wrapper.text()).toContain('CREF 012345-G/SP')
    expect(wrapper.text()).toContain('Cert. IFBB Pro Prep')
  })
})

describe('TestimonialCard', () => {
  it('renderiza quote, name e role', () => {
    const wrapper = mountWithVuetify(TestimonialCard, { props: { testimonial } })
    expect(wrapper.text()).toContain('Melhor academia da cidade.')
    expect(wrapper.text()).toContain('João Silva')
    expect(wrapper.text()).toContain('Atleta')
  })
})

describe('BlogCard', () => {
  it('renderiza title, excerpt e category', () => {
    const wrapper = mountWithVuetify(BlogCard, { props: { post } })
    expect(wrapper.text()).toContain('Periodização para hipertrofia')
    expect(wrapper.text()).toContain('Como estruturar seus treinos em ciclos.')
    expect(wrapper.text()).toContain('Treinamento')
  })

  it('é um link cujo href contém /blog/{slug}', () => {
    const wrapper = mountWithVuetify(BlogCard, { props: { post } })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toContain('/blog/periodizacao-para-hipertrofia')
  })
})
