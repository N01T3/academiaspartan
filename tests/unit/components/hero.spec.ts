import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mountWithVuetify } from '../helpers'
import HeroSection from '@/components/sections/HeroSection.vue'

function installCountUpMocks() {
  const original = {
    IntersectionObserver: globalThis.IntersectionObserver,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
  }

  class ImmediateIntersectionObserver {
    private cb: (entries: unknown[], observer: unknown) => void

    constructor(cb: (entries: unknown[], observer: unknown) => void) {
      this.cb = cb
    }

    observe(el: unknown) {
      this.cb([{ isIntersecting: true, target: el }], this)
    }

    unobserve() {}

    disconnect() {}
  }

  globalThis.IntersectionObserver = ImmediateIntersectionObserver as unknown as typeof IntersectionObserver
  globalThis.requestAnimationFrame = (cb: (time: number) => void) => {
    cb(performance.now() + 100000)
    return 0
  }
  globalThis.cancelAnimationFrame = () => {}

  return () => {
    globalThis.IntersectionObserver = original.IntersectionObserver
    globalThis.requestAnimationFrame = original.requestAnimationFrame
    globalThis.cancelAnimationFrame = original.cancelAnimationFrame
  }
}

describe('HeroSection', () => {
  it('renderiza o heroTitle vindo do store content', () => {
    const wrapper = mountWithVuetify(HeroSection)
    expect(wrapper.text()).toContain('Forje seu corpo. Domine seus limites.')
  })

  it('renderiza o heroSubtitle vindo do store content', () => {
    const wrapper = mountWithVuetify(HeroSection)
    expect(wrapper.text()).toContain(
      'A Academia Spartan é o centro de treinamento para quem busca hipertrofia, força e performance de verdade',
    )
  })

  it('renderiza o heroCta "Agende uma aula grátis"', () => {
    const wrapper = mountWithVuetify(HeroSection)
    expect(wrapper.text()).toContain('Agende uma aula grátis')
  })

  it('renderiza os números de destaque "+15" e "+800"', async () => {
    const restore = installCountUpMocks()
    try {
      const wrapper = mountWithVuetify(HeroSection)
      await nextTick()
      const text = wrapper.text()
      expect(text).toContain('+15')
      expect(text).toContain('+800')
    } finally {
      restore()
    }
  })
})
