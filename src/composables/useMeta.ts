import { watch } from 'vue'
import { useRoute } from 'vue-router'

interface MetaOptions {
  title: string
  description?: string
  image?: string
}

export function useMeta(options: MetaOptions) {
  const route = useRoute()

  function apply() {
    document.title = options.title
    ensureMeta('description', options.description ?? '')
    ensureMeta('og:title', options.title)
    ensureMeta('og:description', options.description ?? '')
    ensureMeta('og:image', options.image ?? `${window.location.origin}/logo.png`)
    ensureMeta('og:url', window.location.href)
    ensureMeta('og:type', 'website')
  }

  function ensureMeta(name: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  watch(
    () => route.fullPath,
    () => apply(),
    { immediate: true },
  )
}
