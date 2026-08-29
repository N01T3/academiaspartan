import { createVuetify, components, directives } from 'vuetify/dist/vuetify.js'
import { afterEach } from 'vitest'
import { enableAutoUnmount, mount, type ComponentMountingOptions } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'

enableAutoUnmount(afterEach)

const vuetify = createVuetify({ components, directives })

if (typeof globalThis.visualViewport === 'undefined') {
  Object.defineProperty(globalThis, 'visualViewport', {
    configurable: true,
    value: {
      width: 0,
      height: 0,
      scale: 1,
      offsetLeft: 0,
      offsetTop: 0,
      pageLeft: 0,
      pageTop: 0,
      addEventListener() {},
      removeEventListener() {},
    },
  })
}

const routes = [
  { path: '/', component: { template: '<div />' } },
  { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
]

export function createTestRouter(): Router {
  return createRouter({ history: createMemoryHistory(), routes })
}

export function mountWithVuetify(
  component: unknown,
  options: ComponentMountingOptions<Record<string, unknown>> = {},
) {
  const router = createTestRouter()
  const pinia = createPinia()
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify, pinia, router, ...(options.global?.plugins ?? [])],
      stubs: { teleport: true, transition: false, ...(options.global?.stubs ?? {}) },
    },
  })
}
