<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import UiButton from '@/components/ui/UiButton.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({ title: 'Login — Academia Spartan' })

const auth = useAuth()
const route = useRoute()
const router = useRouter()

const form = reactive({ username: '', password: '' })
const error = ref('')

function submit() {
  error.value = ''
  const ok = auth.login(form.username, form.password)
  if (!ok) {
    error.value = 'Usuário ou senha inválidos.'
    return
  }
  const redirect = (route.query.redirect as string) || '/admin'
  router.push(redirect)
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-ink px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 flex flex-col items-center gap-4 text-center">
        <img src="/logo.png" alt="Logo Academia Spartan" class="h-16 w-auto" />
        <div>
          <h1 class="text-2xl font-bold text-white">Área administrativa</h1>
          <p class="mt-2 text-sm text-zinc-400">Acesso restrito à equipe Spartan.</p>
        </div>
      </div>

      <form class="card space-y-5" @submit.prevent="submit">
        <div>
          <label class="label" for="username">Usuário</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            class="input"
            autocomplete="username"
            placeholder="admin"
          />
        </div>
        <div>
          <label class="label" for="password">Senha</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="input"
            autocomplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="rounded border border-red-600 bg-red-600/10 px-4 py-3 text-sm text-red-400">
          {{ error }}
        </p>

        <UiButton type="submit" class="w-full">Entrar</UiButton>
      </form>

      <p class="mt-6 text-center text-sm text-zinc-500">
        <RouterLink to="/" class="transition-colors hover:text-primary">← Voltar ao site</RouterLink>
      </p>
    </div>
  </div>
</template>
