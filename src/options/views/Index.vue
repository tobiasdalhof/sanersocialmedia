<template>
  <div v-if="ready">
    <div class="mb-2 space-x-2">
      <button
        class="px-4 py-2 rounded-full text-sm bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 opacity-50 hover:opacity-100 transition-opacity active:ring-1 ring-blue-500"
        @click.prevent="enableAll()"
      >
        <span>Enable all</span>
      </button>
      <button
        class="px-4 py-2 rounded-full text-sm bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 opacity-50 hover:opacity-100 transition-opacity active:ring-1 ring-blue-500"
        @click.prevent="disableAll()"
      >
        <span>Disable all</span>
      </button>
    </div>

    <div v-for="(site, siteIndex) in sites" :key="'site-' + siteIndex">
      <div
        v-for="(siteAction, siteActionIndex) in site.params.siteActions"
        :key="'site-action-' + siteActionIndex"
        class="mb-2 transition-opacity"
        :class="{ 'opacity-50 hover:opacity-100': !isEnabled(siteAction) }"
        @click="toggle(siteAction)"
      >
        <div
          class="flex justify-between items-center bg-gray-800 rounded-full px-3 py-2 cursor-pointer select-none active:ring-1 ring-blue-500"
        >
          <div class="flex items-center">
            <div
              class="w-7 h-7 bg-center rounded-full"
              :style="{ backgroundImage: `url(${site.params.logoSvg})` }"
            ></div>
            <div class="ml-4">
              <span
                class="text-base text-gray-300"
              >{{ site.params.name }} - {{ siteAction.params.name }}</span>
            </div>
          </div>
          <div class="ml-4">
            <app-icon v-if="isEnabled(siteAction)" :value="mdiCheck" class="w-7 text-green-500"></app-icon>
            <app-icon v-else :value="mdiClose" class="w-7 text-red-500"></app-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { mdiCheck, mdiClose } from '@mdi/js'
import * as sites from '../../sites'
import { getStore, setUserConfig, toggleUserConfigKey } from '../../store'
import { AppIcon } from '../components'
import type { UserConfig } from '../../types'
import { UserConfigKey } from '../../types'
import type SiteAction from '../../lib/SiteAction'

const userConfig = ref<UserConfig>()
async function getUserConfig() {
  const store = await getStore()
  userConfig.value = store.userConfig
}

const ready = ref(false)
onMounted(async () => {
  chrome.storage.onChanged.addListener(getUserConfig)
  await getUserConfig()
  ready.value = true
})

onUnmounted(() => {
  chrome.storage.onChanged.removeListener(getUserConfig)
})

function isEnabled(siteAction: SiteAction): boolean {
  if (!userConfig.value) return false
  return userConfig.value[siteAction.params.requiredUserConfigKey] === true
}

async function toggle(siteAction: SiteAction) {
  await toggleUserConfigKey(siteAction.params.requiredUserConfigKey)
}

async function enableAll() {
  const userConfig: UserConfig = {}
  Object.values(UserConfigKey).forEach((key) => {
    userConfig[key] = true
  })
  await setUserConfig(userConfig)
}

async function disableAll() {
  const userConfig: UserConfig = {}
  Object.values(UserConfigKey).forEach((key) => {
    userConfig[key] = false
  })
  await setUserConfig(userConfig)
}
</script>
