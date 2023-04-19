<script setup lang="ts">
const props = defineProps<{
  icon: string
  size: string
}>()
const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()
</script>

<template>
  <svg
    class="inline-block"
    :style="{ width: props.size, minWidth: props.size, maxWidth: props.size }"
    viewBox="0 0 24 24"
    @click="value => emit('click', value)"
  >
    <path :d="props.icon" fill="currentColor" />
  </svg>
</template>
