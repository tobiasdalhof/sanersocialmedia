<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { mdiCheck, mdiChevronRight, mdiClose, mdiStar } from '@mdi/js'
import SSMIcon from '@sanersocialmedia/shared/components/SSMIcon.vue'
import logo from '@sanersocialmedia/shared/assets/logo.svg'
import * as sites from '@sanersocialmedia/core/sites'
import { getStore, setUserConfig, toggleUserConfigKey } from '@sanersocialmedia/core/store'
import type { UserConfig } from '@sanersocialmedia/core/types'
import { UserConfigKey } from '@sanersocialmedia/core/types'
import type { SiteAction } from '@sanersocialmedia/core/site'

const chromeWebStoreLink = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const githubIssuesLink = 'https://github.com/tobiasdalhof/sanersocialmedia/issues'

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
  return userConfig.value?.HideOptionsLink === true
})

async function toggleHideOptionsLink() {
  await toggleUserConfigKey(UserConfigKey.HideOptionsLink)
}

function i18n(key: string): string {
  return chrome.i18n.getMessage(key)
}
</script>

<template>
  <div v-if="ready" class="select-none">
    <a :href="chromeWebStoreLink" target="_blank" class="py-2 flex items-center justify-center bg-green-500 bg-opacity-20 hover:bg-opacity-30 transition-all leading-none font- text-green-100">
      <span>{{ i18n('rateUs') }}</span>
      <div class="ml-3">
        <SSMIcon :icon="mdiStar" size="18px" />
        <SSMIcon :icon="mdiStar" size="18px" />
        <SSMIcon :icon="mdiStar" size="18px" />
        <SSMIcon :icon="mdiStar" size="18px" />
        <SSMIcon :icon="mdiStar" size="18px" />
      </div>
    </a>
    <div class="container max-w-4xl mx-auto p-5">
      <div class="flex items-center pb-12">
        <img :src="logo" alt="Saner Social Media" class="w-10 mr-4">
        <div>
          <div class="text-xl">
            <span>Saner Social Media</span>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg leading-none font-medium">
          {{ i18n('siteSettings') }}
        </h2>
        <div class="space-x-2">
          <button
            class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-500 transition-all active:ring-2 ring-blue-500 leading-none font-medium"
            @click.prevent="enableAllSiteActions()"
          >
            <span>{{ i18n('enableAll') }}</span>
          </button>
          <button
            class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-500 transition-all active:ring-2 ring-blue-500 leading-none font-medium"
            @click.prevent="disableAllSiteActions()"
          >
            <span>{{ i18n('disableAll') }}</span>
          </button>
        </div>
      </div>
      <div class="mt-2 mb-8">
        <div v-for="(site, siteIndex) in sites" :key="`site-${siteIndex}`">
          <div
            v-for="(siteAction, siteActionIndex) in site.params.siteActions"
            :key="`site-action-${siteActionIndex}`"
            class="mb-2 transition-all flex justify-between items-center bg-dark-800 hover:bg-dark-500 rounded-full px-3 py-2 cursor-pointer active:ring-2 ring-blue-500 leading-none"
            :class="{
              'opacity-40': !isSiteEnabled(siteAction),
            }"
            @click="toggleSiteAction(siteAction)"
          >
            <div class="flex items-center">
              <div
                class="w-7 h-7 bg-center rounded-full"
                :style="{ backgroundImage: `url(${site.params.logoSvg})` }"
              />
              <div class="ml-4">
                <span>{{ site.params.name }}</span>
                <SSMIcon :icon="mdiChevronRight" size="24px" class="mx-1" />
                <span>{{ siteAction.params.name }}</span>
              </div>
            </div>
            <div class="ml-4">
              <SSMIcon
                v-if="isSiteEnabled(siteAction)"
                :icon="mdiCheck"
                size="28px"
                class="text-green-500"
              />
              <SSMIcon
                v-else
                :icon="mdiClose"
                size="28px"
                class="text-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
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
          {{ i18n('hideOptionsLink') }}
        </label>
      </div>

      <div class="mt-5 text-blue-500">
        <a :href="githubIssuesLink" target="_blank">{{ i18n('reportBug') }}</a>
      </div>
    </div>
  </div>
</template>
