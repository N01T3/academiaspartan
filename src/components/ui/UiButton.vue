<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'accent' | 'outline'
    type?: 'button' | 'submit' | 'reset'
    to?: string
    href?: string
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

const cls = computed(() => {
  const map = {
    primary: 'btn-primary',
    accent: 'btn-accent',
    outline: 'btn-outline',
  } as const
  return map[props.variant]
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="href || to ? undefined : type"
    :disabled="disabled"
    class="cursor-pointer"
    :class="cls"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
  >
    <slot />
  </component>
</template>
