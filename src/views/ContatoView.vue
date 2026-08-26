<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({ title: 'Contato — Academia Spartan', description: 'Fale com a gente e agende sua aula grátis.' })

const content = useContentStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const sent = ref(false)
const submitting = ref(false)

function submit() {
  submitting.value = true
  setTimeout(() => {
    content.addMessage({ ...form })
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
    submitting.value = false
    sent.value = true
    setTimeout(() => (sent.value = false), 5000)
  }, 600)
}
</script>

<template>
  <div>
    <section class="border-b border-ink-600 bg-ink-800 py-16 sm:py-20">
      <div class="container-content">
        <SectionTitle
          eyebrow="Contato"
          title="Fale com a gente"
          subtitle="Agende uma aula grátis, tire dúvidas ou venha conhecer a estrutura."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl font-bold text-white">Envie uma mensagem</h2>

          <form class="mt-6 space-y-5" @submit.prevent="submit">
            <div>
              <label class="label" for="name">Nome</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input"
                placeholder="Seu nome"
              />
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="label" for="email">E-mail</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input"
                  placeholder="voce@email.com"
                />
              </div>
              <div>
                <label class="label" for="phone">Telefone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input"
                  placeholder="(11) 99999-0000"
                />
              </div>
            </div>
            <div>
              <label class="label" for="subject">Assunto</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="input"
                placeholder="Aula experimental, planos..."
              />
            </div>
            <div>
              <label class="label" for="message">Mensagem</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="input resize-none"
                placeholder="Escreva sua mensagem"
              ></textarea>
            </div>

            <p
              v-if="sent"
              class="rounded border border-green-600 bg-green-600/10 px-4 py-3 text-sm text-green-400"
            >
              Mensagem enviada com sucesso! Retornaremos em breve.
            </p>

            <UiButton type="submit" :disabled="submitting">
              {{ submitting ? 'Enviando...' : 'Enviar mensagem' }}
            </UiButton>
          </form>
        </div>

        <div class="space-y-8">
          <div class="card">
            <h3 class="text-lg font-bold text-white">Informações</h3>
            <ul class="mt-4 space-y-3 text-sm text-zinc-300">
              <li class="flex items-center gap-3">
                <span class="text-accent">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.7 13.3l3.3 1.4-2 5.3a2 2 0 0 1-2.5 1.1A16.6 16.6 0 0 1 3 5.5 2 2 0 0 1 4.1 3l5.3-2 1.4 3.3-2.3 2.3a13.6 13.6 0 0 0 6.9 6.9l2.3-2.3Z"
                    />
                  </svg>
                </span>
                <a :href="`tel:${content.config.phone}`" class="transition-colors hover:text-primary">{{
                  content.config.phone
                }}</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-accent">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm18 2-10 7L2 6"
                    />
                  </svg>
                </span>
                <a :href="`mailto:${content.config.email}`" class="transition-colors hover:text-primary">{{
                  content.config.email
                }}</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-accent">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"
                    />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                {{ content.config.address }}
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="text-lg font-bold text-white">Horário de funcionamento</h3>
            <ul class="mt-4 divide-y divide-ink-600">
              <li v-for="h in content.config.hours" :key="h.day" class="flex justify-between py-2 text-sm">
                <span class="text-zinc-300">{{ h.day }}</span>
                <span class="font-semibold text-white">{{ h.time }}</span>
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="text-lg font-bold text-white">Chamada rápida</h3>
            <a :href="`tel:${content.config.phone}`" class="btn-accent mt-4 w-full">Ligar agora</a>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="container-content overflow-hidden rounded-lg border border-ink-500">
        <iframe
          :src="content.config.mapEmbed"
          width="100%"
          height="400"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Localização da Academia Spartan"
        ></iframe>
      </div>
    </section>
  </div>
</template>
