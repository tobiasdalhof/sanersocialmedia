<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { mdiCheck, mdiClose } from '@mdi/js'
import SSMIcon from '@sanersocialmedia/shared/components/SSMIcon.vue'
import logo from '@sanersocialmedia/shared/assets/logo.svg'
import * as sites from '@sanersocialmedia/core/sites'
import { getStore, setUserConfig, toggleUserConfigKey } from '@sanersocialmedia/core/store'
import type { UserConfig } from '@sanersocialmedia/core/types'
import { UserConfigKey } from '@sanersocialmedia/core/types'
import type { SiteAction } from '@sanersocialmedia/core/site'

const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const gitHubUrl = 'https://github.com/tobiasdalhof/sanersocialmedia'

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

function isSiteEnabled(siteAction: SiteAction): boolean {
  if (!userConfig.value)
    return false
  return userConfig.value[siteAction.params.requiredUserConfigKey] === true
}

async function toggleSiteAction(siteAction: SiteAction) {
  await toggleUserConfigKey(siteAction.params.requiredUserConfigKey)
}

async function enableAllSiteActions() {
  const config: UserConfig = {}

  for (const site of Object.values(sites)) {
    site.params.siteActions.forEach((siteAction) => {
      config[siteAction.params.requiredUserConfigKey] = true
    })
  }

  await setUserConfig({ ...userConfig.value, ...config })
}

async function disableAllSiteActions() {
  const config: UserConfig = {}

  for (const site of Object.values(sites)) {
    site.params.siteActions.forEach((siteAction) => {
      config[siteAction.params.requiredUserConfigKey] = false
    })
  }

  await setUserConfig({ ...userConfig.value, ...config })
}

const hideOptionsLink = computed(() => {
  return userConfig.value?.HideQuoteWidgetOptionsLink === true
})

async function toggleHideOptionsLink() {
  await toggleUserConfigKey(UserConfigKey.HideQuoteWidgetOptionsLink)
}
</script>

<template>
  <div v-if="ready" class="container max-w-4xl mx-auto p-5">
    <header class="flex items-center pb-8">
      <img :src="logo" alt="Saner Social Media" class="w-10 mr-4">
      <div>
        <div class="text-2xl">
          <span>Saner Social Media</span>
        </div>
      </div>
    </header>

    <section>
      <div class="mb-8 p-8 border-2 border-blue-500 rounded-2xl">
        <div>
          <span class="font-bold">Feeling saner already?</span> Please consider to support this free and
          <a :href="gitHubUrl" target="_blank" class="text-blue-500">open source</a>
          project:
        </div>
        <ul class="list-disc pl-6 mt-3">
          <li>Tell your friends</li>
          <li>
            Visit the
            <a :href="chromeWebStoreUrl" target="_blank" class="text-blue-500">Chrome Web Store</a> and write a short
            review
          </li>
          <li>
            Report bugs on
            <a :href="gitHubUrl" target="_blank" class="text-blue-500">GitHub</a>
          </li>
        </ul>
      </div>
    </section>

    <main class="my-5">
      <div class="space-x-2">
        <button
          class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-700 opacity-60 hover:opacity-100 transition-opacity active:ring-2 ring-blue-500 leading-none"
          @click.prevent="enableAllSiteActions()"
        >
          <span>Enable all</span>
        </button>
        <button
          class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-700 opacity-60 hover:opacity-100 transition-opacity active:ring-2 ring-blue-500 leading-none"
          @click.prevent="disableAllSiteActions()"
        >
          <span>Disable all</span>
        </button>
      </div>

      <div class="mt-2 mb-8">
        <div v-for="(site, siteIndex) in sites" :key="`site-${siteIndex}`">
          <div
            v-for="(siteAction, siteActionIndex) in site.params.siteActions" :key="`site-action-${siteActionIndex}`"
            class="mb-2 transition-opacity" :class="{ 'opacity-60 hover:opacity-100': !isSiteEnabled(siteAction) }"
            @click="toggleSiteAction(siteAction)"
          >
            <div
              class="flex justify-between items-center bg-dark-800 rounded-full px-3 py-2 cursor-pointer select-none active:ring-2 ring-blue-500 leading-none"
            >
              <div class="flex items-center">
                <div class="w-7 h-7 bg-center rounded-full" :style="{ backgroundImage: `url(${site.params.logoSvg})` }" />
                <div class="ml-4">
                  <span>{{ site.params.name }} - {{ siteAction.params.name }}</span>
                </div>
              </div>
              <div class="ml-4">
                <SSMIcon v-if="isSiteEnabled(siteAction)" :icon="mdiCheck" class="w-7 text-green-500" />
                <SSMIcon v-else :icon="mdiClose" class="w-7 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center select-none">
        <input
          id="hide-quote-widget-options-link"
          :checked="hideOptionsLink"
          type="checkbox"
          class="w-4 h-4 cursor-pointer"
          @input="toggleHideOptionsLink()"
        >
        <label
          class="ml-2 cursor-pointer"
          for="hide-quote-widget-options-link"
        >
          Make it harder to disable the extension by hiding the options link below the quote
        </label>
      </div>
    </main>
  </div>
</template>
