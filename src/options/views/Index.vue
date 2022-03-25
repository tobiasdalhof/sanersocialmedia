<template>
  <div>
    {{ userSettings }}
    <template v-for="(site) in sites">
      <div
        v-for="(action, index) in site.actions"
        :key="'action-' + index"
        class="mb-2"
        @click="toggle(action)"
      >
        <div
          class="flex justify-between items-center bg-gray-800 rounded-full px-3 py-2 cursor-pointer select-none"
        >
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-center rounded-full mr-5"
              :style="{ backgroundImage: `url(${site.logo})` }"
            ></div>
            <div>
              <span class="text-xl text-gray-300">{{ site.name }} - {{ action.name }}</span>
            </div>
          </div>
          <div>
            <app-icon v-if="isEnabled(action)" :value="mdiCheckCircle" class="w-10 text-green-500"></app-icon>
            <app-icon v-else :value="mdiCircleOutline" class="w-10 text-gray-500"></app-icon>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { mdiCheckCircle, mdiCircleOutline } from '@mdi/js'
import * as sites from '../../sites'
import { getStore, toggleUserSettings } from '../../store'
import { AppIcon } from '../components'
import type { SiteAction, UserSettings } from '../../types'

const userSettings = ref<UserSettings>()
async function getUserSettings() {
  const store = await getStore()
  userSettings.value = store.userSettings
}

onMounted(() => {
  getUserSettings()
})

function isEnabled(action: SiteAction): boolean {
  if (!userSettings.value) return false
  return userSettings.value[action.userSettingsKey] === true
}

async function toggle(action: SiteAction) {
  await toggleUserSettings(action.userSettingsKey)
}

async function storageChangedHandler() {
  getUserSettings()
}

onMounted(() => {
  chrome.storage.onChanged.addListener(storageChangedHandler)
})

onUnmounted(() => {
  chrome.storage.onChanged.removeListener(storageChangedHandler)
})
</script>
