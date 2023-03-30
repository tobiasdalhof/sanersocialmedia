<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { mdiCheck, mdiChevronRight, mdiClose, mdiGithub, mdiGoogleChrome } from '@mdi/js'
import { SSMIcon } from '@sanersocialmedia/vue'
import { UserConfigKey, facebook, getStore, github, instagram, linkedin, pinterest, reddit, setUserConfig, tiktok, toggleUserConfigKey, twitch, twitter, youtube } from '@sanersocialmedia/core'
import type { SiteAction, UserConfig } from '@sanersocialmedia/core'
import logo from './assets/logo.svg'

const chromeWebStoreLink = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const githubLink = 'https://github.com/tobiasdalhof/sanersocialmedia'

const sites = [youtube, twitter, instagram, facebook, tiktok, pinterest, linkedin, twitch, reddit, github]

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

  sites.forEach((site) => {
    site.params.siteActions.forEach((siteAction) => {
      config[siteAction.params.requiredUserConfigKey] = true
    })
  })

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
    <div class="bg-black bg-opacity-50 mb-6">
      <div class="container mx-auto max-w-4xl px-4 py-3.5 flex items-center justify-between leading-none">
        <div class="flex items-center">
          <img :src="logo" alt="Saner Social Media" class="h-32px mr-4 rounded-full">
          <div class="font-semibold">
            Saner Social Media
          </div>
        </div>
        <div class="space-x-6">
          <a
            :href="chromeWebStoreLink"
            class="inline-flex items-center"
            target="_blank"
          >
            <SSMIcon :icon="mdiGoogleChrome" size="24px" />
            <span class="ml-2">{{ i18n('rateUs') }}</span>
          </a>
          <a
            :href="githubLink"
            class="inline-flex items-center"
            target="_blank"
          >
            <SSMIcon :icon="mdiGithub" size="24px" />
            <span class="ml-2">{{ i18n('sourceCode') }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-4xl px-4">
      <div class="mb-2 space-x-2 flex border-dark-200">
        <button
          class="bg-dark-800 hover:bg-dark-500 rounded px-4 py-2.5 text-sm leading-none ring-blue-500 transition-all active:ring-2 w-full"
          @click.prevent="enableAllSiteActions()"
        >
          <span>{{ i18n('enableAll') }}</span>
        </button>
        <button
          class="bg-dark-800 hover:bg-dark-500 rounded px-4 py-2.5 text-sm leading-none ring-blue-500 transition-all active:ring-2 w-full"
          @click.prevent="disableAllSiteActions()"
        >
          <span>{{ i18n('disableAll') }}</span>
        </button>
      </div>

      <div class="mb-8">
        <div v-for="(site, siteIndex) in sites" :key="`site-${siteIndex}`">
          <div
            v-for="(siteAction, siteActionIndex) in site.params.siteActions"
            :key="`site-action-${siteActionIndex}`"
            class="bg-dark-800 hover:bg-dark-500 mb-2 flex cursor-pointer items-center justify-between rounded bg-opacity-80 px-3 py-2 leading-none ring-blue-500 transition-all active:ring-2"
            :class="{
              'opacity-40': !isSiteEnabled(siteAction),
            }"
            @click="toggleSiteAction(siteAction)"
          >
            <div class="flex items-center">
              <div
                class="h-7 w-7 rounded-full bg-center"
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
          class="h-4 w-4 cursor-pointer"
          @input="toggleHideOptionsLink()"
        >
        <label
          class="ml-2 cursor-pointer"
          for="hide-quote-widget-options-link"
        >
          {{ i18n('hideOptionsLink') }}
        </label>
      </div>
    </div>
  </div>
</template>
