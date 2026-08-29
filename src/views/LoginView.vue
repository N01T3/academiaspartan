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
const valid = ref(false)
const showPassword = ref(false)
const base = import.meta.env.BASE_URL

const required = (v: string) => !!v || 'Campo obrigatório'

function submit() {
  error.value = ''
  if (!valid.value) return
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
  <div class="login-wrap">
    <v-card class="login-card pa-8" max-width="440" width="100%">
      <div class="text-center mb-6">
        <img :src="base + 'logo.png'" alt="Logo Academia Spartan" class="login-logo" />
        <h1 class="text-h5 mt-4">Área administrativa</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Acesso restrito à equipe Spartan.</p>
      </div>

      <v-form v-model="valid" @submit.prevent="submit">
        <v-text-field
          v-model="form.username"
          label="Usuário"
          :rules="[required]"
          autocomplete="username"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          :rules="[required]"
          autocomplete="current-password"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-alert v-if="error" type="error" class="mb-4" :text="error" />

        <UiButton type="submit" size="large" block>Entrar</UiButton>
      </v-form>

      <div class="text-center mt-6">
        <RouterLink to="/" class="text-body-2 text-medium-emphasis text-decoration-none">
          ← Voltar ao site
        </RouterLink>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at 20% 20%, rgba(225, 29, 46, 0.18), transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.12), transparent 45%), #0b0d10;
}

.login-logo {
  height: 64px;
  width: auto;
}
</style>
