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
const valid = ref(false)

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
}

function submit() {
  if (!valid.value) return
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
    <section class="page-hero">
      <div class="container-content">
        <SectionTitle
          eyebrow="Contato"
          title="Fale com a gente"
          subtitle="Agende uma aula grátis, tire dúvidas ou venha conhecer a estrutura."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <v-row>
          <v-col cols="12" lg="7">
            <h2 class="text-h5">Envie uma mensagem</h2>

            <v-form v-model="valid" class="mt-4" @submit.prevent="submit">
              <v-text-field v-model="form.name" label="Nome" :rules="[rules.required]" />
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    type="email"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.phone" label="Telefone" type="tel" />
                </v-col>
              </v-row>
              <v-text-field v-model="form.subject" label="Assunto" :rules="[rules.required]" />
              <v-textarea
                v-model="form.message"
                label="Mensagem"
                rows="4"
                :rules="[rules.required]"
                auto-grow
              />

              <v-alert
                v-if="sent"
                type="success"
                class="mb-4"
                text="Mensagem enviada com sucesso! Retornaremos em breve."
              />

              <UiButton type="submit" :disabled="submitting" size="large">
                {{ submitting ? 'Enviando...' : 'Enviar mensagem' }}
              </UiButton>
            </v-form>
          </v-col>

          <v-col cols="12" lg="5">
            <v-card class="pa-6 mb-6">
              <h3 class="text-subtitle-1 font-weight-bold">Informações</h3>
              <v-list class="bg-transparent mt-2">
                <v-list-item
                  :href="`tel:${content.config.phone}`"
                  :prepend-icon="'mdi-phone'"
                  :title="content.config.phone"
                />
                <v-list-item
                  :href="`mailto:${content.config.email}`"
                  :prepend-icon="'mdi-email-outline'"
                  :title="content.config.email"
                />
                <v-list-item :prepend-icon="'mdi-map-marker-outline'" :title="content.config.address" />
              </v-list>
            </v-card>

            <v-card class="pa-6 mb-6">
              <h3 class="text-subtitle-1 font-weight-bold">Horário de funcionamento</h3>
              <v-divider class="my-3" />
              <div v-for="h in content.config.hours" :key="h.day" class="d-flex justify-space-between py-2">
                <span class="text-body-2 text-medium-emphasis">{{ h.day }}</span>
                <span class="text-body-2 font-weight-bold">{{ h.time }}</span>
              </div>
            </v-card>

            <v-card class="pa-6" color="primary">
              <h3 class="text-subtitle-1 font-weight-bold text-white">Chamada rápida</h3>
              <p class="text-body-2 mt-1" style="color: rgba(255, 255, 255, 0.85)">
                Fale agora mesmo com a nossa equipe.
              </p>
              <v-btn
                :href="`tel:${content.config.phone}`"
                color="secondary"
                class="mt-3 text-uppercase"
                size="large"
                block
              >
                Ligar agora
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="pb-12">
      <div class="container-content">
        <v-card class="overflow-hidden">
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
        </v-card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 4rem 0;
  background: linear-gradient(180deg, #14181e 0%, #0b0d10 100%);
  border-bottom: 1px solid #1a1f27;
}
</style>
