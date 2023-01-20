<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { mdiCheck, mdiChevronRight, mdiClose, mdiGithub } from '@mdi/js'
import SSMIcon from '@sanersocialmedia/shared/src/components/SSMIcon.vue'
import logo from '@sanersocialmedia/shared/src/assets/logo.svg'
import { facebook, github, instagram, linkedin, pinterest, reddit, tiktok, twitch, twitter, youtube } from '@sanersocialmedia/core/src/sites'
import { getStore, setUserConfig, toggleUserConfigKey } from '@sanersocialmedia/core/src/store'
import type { UserConfig } from '@sanersocialmedia/core/src/types'
import { UserConfigKey } from '@sanersocialmedia/core/src/types'
import type { SiteAction } from '@sanersocialmedia/core/src/site'

const chromeWebStoreLink = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const githubIssuesLink = 'https://github.com/tobiasdalhof/sanersocialmedia/issues'

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
    <div class="container max-w-4xl mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <img :src="logo" alt="Saner Social Media" class="h-32px mr-4 rounded-full">
          <div class="font-semibold">
            Saner Social Media Feed Blocker
          </div>
        </div>
        <div>
          <a
            :href="githubIssuesLink"
            class="inline-flex items-center"
            target="_blank"
          >
            <SSMIcon :icon="mdiGithub" size="24px" />
            <span class="ml-2">{{ i18n('reportIssue') }}</span>
          </a>
        </div>
      </div>

      <a
        :href="chromeWebStoreLink"
        target="_blank"
        class="py-3 px-6 mb-6 block rounded-full text-center bg-green-900 hover:bg-opacity-50 bg-opacity-30 transition-all text-green-200 active:ring-2 ring-green-500"
      >
        {{ i18n('rateUs') }}
      </a>

      <div class="space-x-2 mb-4">
        <button
          class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-500 transition-all active:ring-2 ring-blue-500 leading-none"
          @click.prevent="enableAllSiteActions()"
        >
          <span>{{ i18n('enableAll') }}</span>
        </button>
        <button
          class="px-4 py-2 rounded-full text-sm bg-dark-800 hover:bg-dark-500 transition-all active:ring-2 ring-blue-500 leading-none"
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
            class="mb-2 transition-all flex justify-between items-center bg-opacity-80 bg-dark-800 hover:bg-dark-500 rounded-full px-3 py-2 cursor-pointer active:ring-2 ring-blue-500 leading-none"
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
    </div>
  </div>
</template>
