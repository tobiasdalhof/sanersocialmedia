<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import logo from '~/assets/logo.svg'
import { checkSnoozed, getSnoozedUntilTimestamp, getSnoozeMinutes, openOptionsPage, setSnoozedUntilTimestamp, setSnoozeMinutes, checkCooldownActive, getCooldownUntilTimestamp, setLastSnoozeDurationMs, setCooldownUntilTimestamp, getOverrideConfig } from '~/chrome'
import type { OverrideConfig } from '~/types'

const ready = ref(false)
const snoozed = ref(false)
chrome.storage.onChanged.addListener(async () => snoozed.value = await checkSnoozed())

const minutes = ref(0)
watch(minutes, async value => await setSnoozeMinutes(value))

const isCooldownActive = ref(false)
const showOverrideInput = ref(false)
const overrideInputText = ref('')
const overrideError = ref('')
const pasteBlockedMessage = ref('')
let pasteMessageTimeout: number | null = null
const overrideInputRef = ref<HTMLInputElement | null>(null)
const overrideConfig = ref<OverrideConfig>({ enabled: true, phrase: "SaNeR SoCiaL mEDiA" })

onMounted(async () => {
  snoozed.value = await checkSnoozed()
  isCooldownActive.value = await checkCooldownActive()
  minutes.value = await getSnoozeMinutes()
  overrideConfig.value = await getOverrideConfig()
  setupTimer()
  setupCooldownTimer()
  chrome.storage.onChanged.addListener(handleStorageChange)
  ready.value = true
})

async function snooze() {
  const ms = minutes.value * 60 * 1000
  const now = new Date()
  const timestamp = now.getTime() + ms
  await setLastSnoozeDurationMs(ms)
  await setSnoozedUntilTimestamp(timestamp)
  showOverrideInput.value = false
}

async function unsnooze() {
  await setSnoozedUntilTimestamp(0)
  await setLastSnoozeDurationMs(0)
}

const timer = ref({ minutes: 0, seconds: 0 })
let timerInterval: NodeJS.Timeout
const cooldownTimer = ref({ minutes: 0, seconds: 0 })
let cooldownTimerInterval: NodeJS.Timeout

async function updateTimer() {
  const now = new Date()
  const until = await getSnoozedUntilTimestamp()
  const diff = until - now.getTime()

  timer.value = {
    minutes: Math.floor(diff / 1000 / 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function setupTimer() {
  clearInterval(timerInterval)
  if (!snoozed.value)
    return

  updateTimer()
  timerInterval = setInterval(() => updateTimer(), 1000)
}

watch(snoozed, setupTimer)

function withLeadingZero(value: number) {
  return value < 10 ? `0${value}` : value
}

async function updateCooldown() {
  const now = new Date()
  const until = await getCooldownUntilTimestamp()
  const diff = until - now.getTime()

  cooldownTimer.value = {
    minutes: Math.floor(diff / 1000 / 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
}

function setupCooldownTimer() {
  clearInterval(cooldownTimerInterval)

  if (!isCooldownActive.value)
    return
  
  updateCooldown()
  cooldownTimerInterval = setInterval(() => updateCooldown(), 1000)
}

watch(isCooldownActive, setupCooldownTimer)

function handleOverrideClick() {
  showOverrideInput.value = true
  overrideError.value = ''
  pasteBlockedMessage.value = ''
  nextTick(() => {
    overrideInputRef.value?.focus()
  })
}

function endOverride() {
  showOverrideInput.value = false
  overrideInputText.value = ''
  overrideError.value = ''
  pasteBlockedMessage.value = ''
}

async function confirmOverride() {
  if (overrideInputText.value.trim() === overrideConfig.value.phrase) {
    await setCooldownUntilTimestamp(0)
    endOverride()
  } else {
    overrideError.value = "Incorrect. Please type exactly as shown."
    overrideInputText.value = ''
  }
}

function handlePasteAttempt() {
  pasteBlockedMessage.value = "Pasting is disabled. Please type the phrase."
  if (pasteMessageTimeout !== null) 
    clearTimeout(pasteMessageTimeout)
  pasteMessageTimeout = window.setTimeout(() => {
    pasteBlockedMessage.value = ''
  }, 3000)
}

async function handleStorageChange(changes: { [key: string]: chrome.storage.StorageChange }, area: string) {
  if (area === 'sync') {
    if (changes.snoozedUntilTimestamp) {
      snoozed.value = await checkSnoozed()
      setupTimer()
    }
    if (changes.cooldownUntilTimestamp || changes.userConfig) {
      isCooldownActive.value = await checkCooldownActive()
      setupCooldownTimer()
    }
    if (changes.userConfig) {
      overrideConfig.value = await getOverrideConfig()
    }
  }
}

</script>

<template>
  <div v-if="ready" class="w-260px select-none p-3">
    <header class="mb-3 flex items-center justify-between">
      <img :src="logo" alt="Saner Social Media" class="mr-2 h-28px rounded-full">
      <button class="flex items-center rounded bg-dark-800 px-3 py-2 font-semibold leading-none ring-blue-500 hover:bg-dark-500 active:ring-2" @click="openOptionsPage()">
        <span class="i-mdi:cog mr-1.5" />
        <span>Site settings</span>
      </button>
    </header>
    <section class="rounded-xl bg-dark-800 p-4 text-center">
      <div v-if="isCooldownActive">
        <h2 class="mb-2 font-bold">
          Cooldown Active
        </h2>
        <div v-if="showOverrideInput" class="my-3">
          <label for="overrideText" class="block mb-1 text-sm text-gray-300">
            Type the phrase below (case-sensitive):
            <br>
            <span class="font-mono text-base text-yellow-400 my-1 inline-block">{{ overrideConfig.phrase }}</span>
          </label>
          <input
            id="overrideText"
            ref="overrideInputRef"
            v-model="overrideInputText"
            type="text"
            class="w-full rounded p-1 text-center text-dark-500 border border-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
            autocomplete="off"
            spellcheck="false"
            @paste.prevent="handlePasteAttempt"
          >
          <p v-if="pasteBlockedMessage" class="mt-1 text-xs text-yellow-300">{{ pasteBlockedMessage }}</p>
          <p v-if="overrideError" class="mt-1 text-xs text-red-400">{{ overrideError }}</p>
          <div class="mt-2 flex space-x-2">
            <button class="flex-1 rounded bg-yellow-600 px-3 py-1.5 text-sm text-yellow-50 font-semibold leading-none hover:bg-yellow-700 active:bg-yellow-800" @click="confirmOverride()">Confirm Override</button>
            <button class="flex-1 rounded bg-gray-600 px-3 py-1.5 text-sm text-gray-100 font-semibold leading-none hover:bg-gray-700 active:bg-gray-800" @click="endOverride()">Cancel</button>
          </div>
        </div>
        <div v-else>
          <p class="mb-2 text-sm text-gray-400">Cannot unblock sites yet.</p>
          <div class="mb-3 text-3xl text-orange-500 font-light">
            {{ withLeadingZero(cooldownTimer.minutes) }}:{{ withLeadingZero(cooldownTimer.seconds) }}
          </div>
          <button v-if="overrideConfig.enabled" class="block w-full rounded bg-yellow-500 px-3 py-2 text-center text-yellow-900 font-semibold leading-none hover:bg-yellow-600 active:bg-yellow-700" @click="handleOverrideClick()">Override Cooldown</button>
          <p v-else class="mt-2 text-xs text-gray-500">(Override disabled in settings)</p>
        </div>
      </div>
      <div v-else-if="snoozed">
        <h2 class="mb-2 font-bold">
          Sites are temporarily unblocked
        </h2>
        <div class="mb-4 text-3xl text-blue-500 font-light">
          {{ withLeadingZero(timer.minutes) }}:{{ withLeadingZero(timer.seconds) }}
        </div>
        <div>
          <button class="block w-full rounded bg-blue-500 px-3 py-2 text-center text-blue-50 font-semibold leading-none active:bg-blue-700 hover:bg-blue-600" @click="unsnooze()">
            Resume blocking
          </button>
        </div>
      </div>
      <div v-else>
        <h2 class="mb-2 font-bold">
          Snooze mode
        </h2>
        <div class="mb-3">
          <label for="minutes">Temporarily unblock all sites for</label>
          <input
            id="minutes"
            v-model="minutes"
            class="mx-2 my-2 inline-block w-40px rounded p-0.5 text-center text-dark-500"
            type="number"
            min="1"
            step="1"
          >
          <label for="minutes">minutes.</label>
        </div>
        <button class="block w-full rounded bg-red-500 px-3 py-2 text-center text-red-50 font-semibold leading-none active:bg-red-700 hover:bg-red-600" @click="snooze()">Unblock sites</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button {
  opacity: 1
}
.font-mono.text-yellow-400 {
  background-color: rgba(55, 65, 81, 0.5);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  border: 1px solid rgba(250, 204, 21, 0.3);
}
</style>
