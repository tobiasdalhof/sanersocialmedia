<template>
  <svg class="inline-block leading-none" viewBox="0 0 24 24" @click="$emit('click', $event)">
    <path :d="value" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()
</script>
