import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mountWithVuetify } from '../helpers'
import UiButton from '@/components/ui/UiButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import KpiCard from '@/components/ui/KpiCard.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('UiButton', () => {
  it('sem to/href renderiza um <button> com type padrão "button"', () => {
    const wrapper = mountWithVuetify(UiButton, { slots: { default: 'Clique' } })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
  })

  it('respeita a prop type', () => {
    const wrapper = mountWithVuetify(UiButton, { props: { type: 'submit' }, slots: { default: 'Enviar' } })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('com to renderiza um <a> com a rota correta', () => {
    const wrapper = mountWithVuetify(UiButton, {
      props: { to: '/contato' },
      slots: { default: 'Aula grátis' },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/contato')
  })

  it('com href renderiza um <a> com target _blank', () => {
    const wrapper = mountWithVuetify(UiButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })
})

describe('BaseModal', () => {
  const modalOptions = {
    global: { stubs: { teleport: false } },
  }

  it('com open=false não renderiza o conteúdo do slot', () => {
    const wrapper = mountWithVuetify(BaseModal, {
      props: { open: false, title: 'Título' },
      slots: { default: '<p>Conteúdo do modal</p>' },
      ...modalOptions,
    })
    expect(wrapper.text()).not.toContain('Conteúdo do modal')
    expect(document.body.textContent).not.toContain('Conteúdo do modal')
  })

  it('com open=true renderiza o título e o slot', () => {
    mountWithVuetify(BaseModal, {
      props: { open: true, title: 'Meu Título' },
      slots: { default: '<p>Conteúdo do modal</p>' },
      ...modalOptions,
    })
    const title = document.body.querySelector('.v-card-title')
    expect(title?.textContent).toContain('Meu Título')
    expect(document.body.querySelector('h3')).toBeNull()
    expect(document.body.textContent).toContain('Conteúdo do modal')
  })

  it('emite close ao clicar no botão de fechar', async () => {
    const wrapper = mountWithVuetify(BaseModal, {
      props: { open: true, title: 'Título' },
      slots: { default: '<p>Conteúdo</p>' },
      ...modalOptions,
    })
    const closeBtn = document.body.querySelector('button[aria-label="Fechar"]')
    expect(closeBtn).not.toBeNull()
    closeBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite close ao clicar no backdrop', async () => {
    const wrapper = mountWithVuetify(BaseModal, {
      props: { open: true, title: 'Título' },
      slots: { default: '<p>Conteúdo</p>' },
      ...modalOptions,
    })
    const scrim = document.body.querySelector('.v-overlay__scrim')
    expect(scrim).not.toBeNull()
    scrim!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    scrim!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

describe('ToggleSwitch', () => {
  it('emite update:modelValue com true ao marcar', async () => {
    const wrapper = mountWithVuetify(ToggleSwitch, { props: { modelValue: false } })
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emite update:modelValue com false ao desmarcar', async () => {
    const wrapper = mountWithVuetify(ToggleSwitch, { props: { modelValue: true } })
    await wrapper.find('input[type="checkbox"]').setValue(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })
})

describe('SectionTitle', () => {
  it('renderiza title, eyebrow e subtitle', () => {
    const wrapper = mountWithVuetify(SectionTitle, {
      props: { title: 'Título da seção', eyebrow: 'Eyebrow', subtitle: 'Subtítulo' },
    })
    expect(wrapper.find('h2').text()).toBe('Título da seção')
    expect(wrapper.text()).toContain('Eyebrow')
    expect(wrapper.text()).toContain('Subtítulo')
  })
})

describe('KpiCard', () => {
  it('renderiza label e value', () => {
    const wrapper = mountWithVuetify(KpiCard, { props: { label: 'Receita', value: 1000 } })
    expect(wrapper.text()).toContain('Receita')
    expect(wrapper.text()).toContain('1000')
  })
})
