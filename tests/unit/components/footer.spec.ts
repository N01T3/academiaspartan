import { describe, it, expect } from 'vitest'
import { mountWithVuetify } from '../helpers'
import SiteFooter from '@/components/layout/SiteFooter.vue'

describe('SiteFooter', () => {
  function mountFooter() {
    return mountWithVuetify(SiteFooter)
  }

  it('renderiza o título "Navegação"', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('Navegação')
  })

  it('renderiza o link "Área administrativa"', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('Área administrativa')
  })

  it('renderiza os dados de contato do store content', () => {
    const wrapper = mountFooter()
    const text = wrapper.text()
    expect(text).toContain('Av. dos Atletas, 1000 — São Paulo, SP')
    expect(text).toContain('+55 (11) 99999-0000')
    expect(text).toContain('contato@academiaspartan.com.br')
  })
})
