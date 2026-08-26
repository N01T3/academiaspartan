<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <v-switch
    :model-value="modelValue"
    :label="label"
    color="primary"
    hide-details
    inset
    @update:model-value="(v) => emit('update:modelValue', Boolean(v))"
  />
</template>
