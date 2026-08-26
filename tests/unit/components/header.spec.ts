import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { VApp } from 'vuetify/dist/vuetify.js'
import { mountWithVuetify } from '../helpers'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const HeaderWrapper = {
  components: { VApp, SiteHeader },
  template: '<v-app><site-header /></v-app>',
}

describe('SiteHeader', () => {
  function mountHeader() {
    return mountWithVuetify(HeaderWrapper)
  }

  it('renderiza os links de navegação', () => {
    const wrapper = mountHeader()
    const text = wrapper.text()
    expect(text).toContain('Início')
    expect(text).toContain('Equipe')
    expect(text).toContain('Estrutura')
    expect(text).toContain('Programas')
    expect(text).toContain('Blog')
    expect(text).toContain('Contato')
  })

  it('renderiza o CTA "Aula grátis"', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('Aula grátis')
  })

  it('possui um botão de menu mobile com aria-label "Abrir menu"', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('button[aria-label="Abrir menu"]').exists()).toBe(true)
  })

  it('exibe o menu mobile ao clicar no botão de menu', async () => {
    const wrapper = mountHeader()
    const drawer = wrapper.find('.v-navigation-drawer')
    expect(drawer.exists()).toBe(true)
    expect(drawer.classes()).not.toContain('v-navigation-drawer--active')

    await wrapper.find('button[aria-label="Abrir menu"]').trigger('click')
    await nextTick()

    expect(wrapper.find('.v-navigation-drawer').classes()).toContain('v-navigation-drawer--active')
  })
})
