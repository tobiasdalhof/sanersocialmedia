<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { generateRandomCode } from '~/utils'

const emit = defineEmits<{
  (event: 'confirmed'): void
  (event: 'cancel'): void
}>()

const codeLength = 5
const code = ref(generateRandomCode(codeLength))
const inputChar = ref('')
const enteredCode = ref<string[]>([])
const inputRef = useTemplateRef('inputRef')

const nextChar = computed(() => {
  if (enteredCode.value.length >= codeLength) {
    return undefined
  }
  return code.value[enteredCode.value.length].toUpperCase()
})

const hasError = computed(() => {
  if (!inputChar.value || !nextChar.value) {
    return false
  }
  return inputChar.value !== nextChar.value
})

const emptySlots = computed(() => Math.max(0, codeLength - enteredCode.value.length - 1))

onMounted(() => inputRef.value?.focus())
watch(enteredCode, () => inputRef.value?.focus())

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.toUpperCase().slice(0, 1)
  inputChar.value = value
}

watch(inputChar, (char) => {
  if (!char || !nextChar.value) {
    return
  }
  if (char === nextChar.value) {
    enteredCode.value.push(char)
    inputChar.value = ''
  }
})

watch(() => enteredCode.value.length, (enteredCodeLength) => {
  if (enteredCodeLength === codeLength) {
    emit('confirmed')
  }
})

const inputStyles = computed(() => [
  'h-7 w-7 rounded text-center text-lg font-mono outline-none leading-none bg-dark-50',
  hasError.value ? 'bg-white text-red-600' : 'bg-white text-gray-600',
])
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-2 flex flex-col items-center">
      <div class="text-sm text-yellow">
        Enter code to confirm
      </div>
      <div class="text-2xl font-bold tracking-widest font-mono">
        {{ code }}
      </div>
    </div>
    <div class="mb-4 flex gap-2">
      <div
        v-for="(char, index) in enteredCode"
        :key="`char-${index}`"
        class="h-7 w-7 flex items-center justify-center rounded bg-dark-100 text-lg font-mono"
      >
        {{ char }}
      </div>
      <input
        v-if="enteredCode.length < codeLength"
        ref="inputRef"
        v-model="inputChar"
        type="text"
        maxlength="1"
        :class="inputStyles"
        @input="handleInput"
      >
      <div
        v-for="index in emptySlots"
        :key="`placeholder-${index}`"
        class="h-7 w-7 flex items-center justify-center rounded bg-dark-100/50 text-lg text-gray-500 font-mono"
      />
    </div>
    <button class="block w-full rounded bg-blue-500 px-3 py-2 text-center text-blue-50 font-semibold leading-none active:bg-blue-700 hover:bg-blue-600" @click="emit('cancel')">
      Cancel
    </button>
  </div>
</template>
