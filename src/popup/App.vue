<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import logo from '~/assets/logo.svg'
import { checkSnoozed, getSnoozedUntilTimestamp, getSnoozeMinutes, openOptionsPage, setSnoozedUntilTimestamp, setSnoozeMinutes } from '~/chrome'

const ready = ref(false)
const snoozed = ref(false)
chrome.storage.onChanged.addListener(async () => snoozed.value = await checkSnoozed())

const minutes = ref(0)
watch(minutes, async value => await setSnoozeMinutes(value))

onMounted(async () => {
  snoozed.value = await checkSnoozed()
  minutes.value = await getSnoozeMinutes()
  ready.value = true
})

async function snooze() {
  const ms = minutes.value * 60 * 1000
  const now = new Date()
  const timestamp = now.getTime() + ms
  await setSnoozedUntilTimestamp(timestamp)
}

async function unsnooze() {
  await setSnoozedUntilTimestamp(0)
}

const timer = ref({ minutes: 0, seconds: 0 })
let timerInterval: NodeJS.Timeout

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
      <div v-if="!snoozed">
        <h2 class="mb-2 font-bold">
          Snooze mode
        </h2>
        <div class="mb-3">
          <label for="minutes">Temporarly unblock all sites for</label>
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
        <button class="block w-full rounded bg-red-500 px-3 py-2 text-center text-red-50 font-semibold leading-none active:bg-red-700 hover:bg-red-600" @click="snooze()">
          Unblock sites
        </button>
      </div>
      <div v-else>
        <h2 class="mb-2 font-bold">
          Sites are temporarly unblocked
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
    </section>
  </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button {
    opacity: 1
}
</style>
