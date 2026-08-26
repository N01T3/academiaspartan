<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'accent' | 'outline'
    type?: 'button' | 'submit' | 'reset'
    to?: string
    href?: string
    disabled?: boolean
    size?: 'small' | 'default' | 'large'
    block?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    size: 'default',
    block: false,
  },
)

const color = computed(() => (props.variant === 'accent' ? 'secondary' : 'primary'))
const vVariant = computed(() => (props.variant === 'outline' ? 'outlined' : 'flat'))
const vSize = computed(() =>
  props.size === 'large' ? 'x-large' : props.size === 'small' ? 'small' : 'default',
)
</script>

<template>
  <v-btn
    :color="color"
    :variant="vVariant"
    :to="to"
    :href="href"
    :type="href || to ? undefined : type"
    :disabled="disabled"
    :size="vSize"
    :block="block"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    class="text-uppercase font-weight-bold"
  >
    <slot />
  </v-btn>
</template>
