<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { checkSnoozed, getSnoozeMinutes, getSnoozedUntilTimestamp, openOptionsPage, setSnoozeMinutes, setSnoozedUntilTimestamp } from '~/chrome'
import logo from '~/assets/logo.svg'

const ready = ref(false)

const snoozed = ref(false)
chrome.storage.onChanged.addListener(async () => {
  snoozed.value = await checkSnoozed()
})

const snoozeMinutes = ref(0)
watch(snoozeMinutes, async (value) => {
  await setSnoozeMinutes(value)
})

const remainingTime = ref({ minutes: 0, seconds: 0 })

const snoozedUntilTimestamp = ref(0)
chrome.storage.onChanged.addListener(async () => {
  snoozedUntilTimestamp.value = await getSnoozedUntilTimestamp()
})

function setRemainingTime(timestamp: number) {
  const now = new Date()
  const diff = timestamp - now.getTime()
  if (diff <= 0) {
    remainingTime.value = { minutes: 0, seconds: 0 }
    return
  }

  remainingTime.value = {
    minutes: Math.floor(diff / 1000 / 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

onMounted(async () => {
  snoozed.value = await checkSnoozed()
  snoozeMinutes.value = await getSnoozeMinutes()
  snoozedUntilTimestamp.value = await getSnoozedUntilTimestamp()
  setRemainingTime(snoozedUntilTimestamp.value)
  setInterval(() => setRemainingTime(snoozedUntilTimestamp.value), 1000)
  ready.value = true
})

async function snooze() {
  const ms = snoozeMinutes.value * 60 * 1000
  const now = new Date()
  const timestamp = now.getTime() + ms
  await setSnoozedUntilTimestamp(timestamp)
  setRemainingTime(timestamp)
}

async function unsnooze() {
  await setSnoozedUntilTimestamp(0)
}

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
          <label for="snooze-minutes">Temporarly unblock all sites for</label>
          <input
            id="snooze-minutes"
            v-model="snoozeMinutes"
            class="mx-2 my-2 inline-block w-40px rounded p-0.5 text-center text-dark-500"
            type="number"
            min="1"
            step="1"
          >
          <label for="snooze-minutes">minutes.</label>
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
          {{ withLeadingZero(remainingTime.minutes) }}:{{ withLeadingZero(remainingTime.seconds) }}
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
