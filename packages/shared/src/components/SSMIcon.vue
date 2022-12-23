<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()
</script>

<template>
  <svg class="inline-block leading-none" viewBox="0 0 24 24" @click="event => emit('click', event)">
    <path :d="props.icon" fill="currentColor" />
  </svg>
</template>
