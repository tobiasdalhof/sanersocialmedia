<template>
  <div>
    <template v-for="(site) in sites">
      <div
        v-for="(siteAction, index) in site.params.siteActions"
        :key="'site-action-' + index"
        class="mb-2"
        @click="toggle(siteAction)"
      >
        <div
          class="flex justify-between items-center bg-gray-800 rounded-full px-3 py-2 cursor-pointer select-none"
        >
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-center rounded-full mr-5"
              :style="{ backgroundImage: `url(${site.params.logoSvg})` }"
            ></div>
            <div>
              <span
                class="text-xl text-gray-300"
              >{{ site.params.name }} - {{ siteAction.params.name }}</span>
            </div>
          </div>
          <div>
            <app-icon
              v-if="isEnabled(siteAction)"
              :value="mdiCheckCircle"
              class="w-10 text-green-500"
            ></app-icon>
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
import { getStore, toggleUserConfig } from '../../store'
import { AppIcon } from '../components'
import type { UserConfig } from '../../types'
import type SiteAction from '../../lib/SiteAction'

const userConfig = ref<UserConfig>()
async function getUserConfig() {
  const store = await getStore()
  userConfig.value = store.userConfig
}

onMounted(() => {
  getUserConfig()
})

function isEnabled(siteAction: SiteAction): boolean {
  if (!userConfig.value) return false
  return userConfig.value[siteAction.params.requiredUserConfigKey] === true
}

async function toggle(siteAction: SiteAction) {
  await toggleUserConfig(siteAction.params.requiredUserConfigKey)
}

async function storageChangedHandler() {
  getUserConfig()
}

onMounted(() => {
  chrome.storage.onChanged.addListener(storageChangedHandler)
})

onUnmounted(() => {
  chrome.storage.onChanged.removeListener(storageChangedHandler)
})
</script>
