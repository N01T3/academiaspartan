import { defineStore } from 'pinia'
import { ref } from 'vue'
import { erpModules as seedErp } from '@/data/erp'
import { loadStorage, saveStorage } from '@/utils/storage'
import { isErpModules } from '@/utils/validators'
import type { ErpModule } from '@/types'

const KEY = 'spartan.erp'

export const useErpStore = defineStore('erp', () => {
  const modules = ref<ErpModule[]>(loadStorage(KEY, seedErp, isErpModules))

  function persist() {
    saveStorage(KEY, modules.value)
  }

  function toggleModule(id: string, enabled: boolean) {
    const idx = modules.value.findIndex((m) => m.id === id)
    if (idx !== -1) {
      modules.value[idx].enabled = enabled
      persist()
    }
  }

  function setIntegrationUrl(id: string, url: string) {
    const idx = modules.value.findIndex((m) => m.id === id)
    if (idx !== -1) {
      modules.value[idx].integrationUrl = url
      persist()
    }
  }

  return { modules, toggleModule, setIntegrationUrl }
})
