<script setup lang="ts">
import type { SiteAction } from '~/site'
import { UserConfigKey } from '~/types'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import logo from '~/assets/logo.svg'
import { getStore, setUserConfig, toggleUserConfigKey } from '~/chrome'
import { facebook, github, hackernews, instagram, linkedin, pinterest, reddit, tiktok, twitch, x, youtube, youtubeMobile } from '~/sites'
import CooldownPlot from '~/components/CooldownPlot.vue'

const chromeWebStoreLink = 'https://chromewebstore.google.com/detail/saner-social-media-feed-b/opnoobcmpioggidgaejfkbopdphbfkkk'
const githubLink = 'https://github.com/tobiasdalhof/sanersocialmedia'

const sites = [youtube, youtubeMobile, x, instagram, facebook, tiktok, pinterest, linkedin, twitch, reddit, github, hackernews]

const userConfig = ref<UserConfig>()

const cooldownEnabled = ref(false)
const cooldownMode = ref<'fixed' | 'percentage' | 'hybrid'>('fixed')
const cooldownMinutes = ref(1)
const cooldownPercentage = ref(10)
const overrideEnabled = ref(true)
const overridePhrase = ref("SaNeR SoCiaL mEDiA")

async function getUserConfig() {
  const store = await getStore()
  userConfig.value = store.userConfig
  cooldownEnabled.value = userConfig.value[UserConfigKey.CooldownEnabled] === true
  cooldownMode.value = userConfig.value[UserConfigKey.CooldownMode]
  cooldownMinutes.value = userConfig.value[UserConfigKey.CooldownMinutes]
  cooldownPercentage.value = userConfig.value[UserConfigKey.CooldownPercentage]
  overrideEnabled.value = userConfig.value[UserConfigKey.OverrideEnabled] === true
  overridePhrase.value = userConfig.value[UserConfigKey.OverridePhrase]
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

async function toggleCooldownEnabled() {
  await toggleUserConfigKey(UserConfigKey.CooldownEnabled);
}
async function toggleOverrideEnabled() {
  await toggleUserConfigKey(UserConfigKey.OverrideEnabled);
}
async function setCooldownMode(mode: 'fixed' | 'percentage' | 'hybrid') {
  if (cooldownMode.value === mode) return;
  cooldownMode.value = mode;
  if (userConfig.value) {
    await setUserConfig({ ...userConfig.value, [UserConfigKey.CooldownMode]: mode });
  }
}

watch(cooldownMinutes, async (newValue) => {
  if (!userConfig.value) return;
  const minutes = Math.max(1, Number(newValue) || 1);
  if (minutes !== newValue) cooldownMinutes.value = minutes;
  await setUserConfig({ ...userConfig.value, [UserConfigKey.CooldownMinutes]: minutes });
});
watch(cooldownPercentage, async (newValue) => {
  if (!userConfig.value) return;
  const percentage = Math.max(5, Math.min(1000, Number(newValue) || 5));
  if (percentage !== newValue) cooldownPercentage.value = percentage;
  await setUserConfig({ ...userConfig.value, [UserConfigKey.CooldownPercentage]: percentage });
});
watch(overridePhrase, async (newValue) => {
  if (!userConfig.value) return;
  await setUserConfig({ ...userConfig.value, [UserConfigKey.OverridePhrase]: newValue });
});

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

function i18n(key: string): string {
  return chrome.i18n.getMessage(key)
}
</script>

<template>
  <div v-if="ready" class="select-none">
    <div class="mb-6 bg-black bg-opacity-50">
      <div class="mx-auto max-w-4xl flex items-center justify-between px-4 py-3.5 leading-none container">
        <div class="flex items-center">
          <img :src="logo" alt="Saner Social Media" class="mr-4 h-32px rounded-full">
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
            <span class="i-mdi:google-chrome inline-block text-24px" />
            <span class="ml-2">{{ i18n('rateUs') }}</span>
          </a>
          <a
            :href="githubLink"
            class="inline-flex items-center"
            target="_blank"
          >
            <span class="i-mdi:github inline-block text-24px" />
            <span class="ml-2">{{ i18n('sourceCode') }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-4xl px-4 container">
      <div class="mb-2 flex border-dark-200 space-x-2">
        <button
          class="w-full rounded bg-dark-800 px-4 py-2.5 text-sm leading-none ring-blue-500 transition-all hover:bg-dark-500 active:ring-2"
          @click.prevent="enableAllSiteActions()"
        >
          <span>{{ i18n('enableAll') }}</span>
        </button>
        <button
          class="w-full rounded bg-dark-800 px-4 py-2.5 text-sm leading-none ring-blue-500 transition-all hover:bg-dark-500 active:ring-2"
          @click.prevent="disableAllSiteActions()"
        >
          <span>{{ i18n('disableAll') }}</span>
        </button>
      </div>
      <div class="mb-6 space-y-2">
        <h3 class="mb-1 text-lg font-semibold px-1">Cooldown Settings</h3>
        <div class="flex cursor-pointer items-center justify-between rounded bg-dark-800 bg-opacity-80 px-3 py-2.5 leading-none ring-blue-500 transition-all hover:bg-dark-500 active:ring-2" :class="{ 'opacity-40': !cooldownEnabled }" @click="toggleCooldownEnabled()">
          <div class="flex items-center">
            <span class="i-mdi:timer-sand mr-3 text-2xl text-blue-400"></span>
            <span class="text-base">Enable Cooldown Period</span>
          </div>
          <div class="ml-4">
            <div v-if="cooldownEnabled" class="i-mdi:check text-28px text-green-500" />
            <div v-else class="i-mdi:close text-28px text-red-500" />
          </div>
        </div>
        <div v-if="cooldownEnabled" class="pl-5 space-y-4">
          <div class="rounded bg-dark-700 bg-opacity-70 p-3">
            <h4 class="text-md font-semibold text-gray-300 mb-3">Cooldown Calculation</h4>
            <div class="flex flex-col md:flex-row gap-4 md:gap-6">
              <div class="space-y-3 flex-1 min-w-0">
                <div>
                  <label class="block mb-1.5 text-sm font-medium">Cooldown Type:</label>
                  <div class="flex space-x-2">
                    <button
                      @click="setCooldownMode('fixed')"
                      :class="['px-3 py-1.5 text-sm rounded leading-none transition-colors', cooldownMode === 'fixed' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-dark-600 hover:bg-dark-500 text-gray-300']"
                    > 
                      Fixed 
                    </button>
                    <button
                      @click="setCooldownMode('percentage')"
                      :class="['px-3 py-1.5 text-sm rounded leading-none transition-colors', cooldownMode === 'percentage' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-dark-600 hover:bg-dark-500 text-gray-300']"
                    > 
                      Percentage
                    </button>
                    <button
                      @click="setCooldownMode('hybrid')"
                      :class="['px-3 py-1.5 text-sm rounded leading-none transition-colors', cooldownMode === 'hybrid' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-dark-600 hover:bg-dark-500 text-gray-300']"
                    >
                      Hybrid (Max)
                    </button>
                  </div>
                </div>
                <div v-if="cooldownMode !== 'percentage'" class="flex items-center">
                  <label for="cooldownMinutesInput" class="mr-2 w-32 text-sm shrink-0">Fixed duration:</label>
                  <input 
                    id="cooldownMinutesInput" 
                    v-model="cooldownMinutes" 
                    type="number" 
                    min="1" 
                    step="1" 
                    class="w-60px rounded p-1 text-center text-dark-500 bg-gray-200"
                  >
                  <span class="ml-2 text-sm text-gray-400">mins</span>
                </div>
                <div v-if="cooldownMode !== 'fixed'" class="flex items-center">
                  <label for="cooldownPercentageInput" class="mr-2 w-32 text-sm shrink-0">Percentage:</label>
                  <input 
                    id="cooldownPercentageInput" 
                    v-model="cooldownPercentage" 
                    type="number" 
                    min="5" 
                    max="1000" 
                    step="5" 
                    class="w-60px rounded p-1 text-center text-dark-500 bg-gray-200"
                  >
                  <span class="ml-1 text-sm text-gray-400">%</span>
                  <span class="ml-3 text-xs text-gray-400 hidden sm:inline">(of snooze)</span>
                </div>
                <p class="text-xs text-gray-400 pt-1">
                  <span v-if="cooldownMode === 'fixed'">Cooldown will last for the fixed duration specified.</span>
                  <span v-if="cooldownMode === 'percentage'">Cooldown will last for the specified percentage of the previous snooze time.</span>
                  <span v-if="cooldownMode === 'hybrid'">Cooldown will last for the LONGER of the fixed duration OR the percentage calculation.</span>
                </p>
              </div>
              <div v-if="cooldownMode === 'hybrid'" class="flex-shrink-0 md:w-[350px]">
                <CooldownPlot 
                  :cooldown-minutes="cooldownMinutes" 
                  :cooldown-percentage="cooldownPercentage" 
                />
              </div>
            </div>
          </div>
          <div class="space-y-3 rounded bg-dark-700 bg-opacity-70 p-3">
            <h4 class="text-md font-semibold text-gray-300">Cooldown Override</h4>
            <div class="flex cursor-pointer items-center justify-between rounded bg-dark-600 bg-opacity-80 px-3 py-2 leading-none ring-yellow-500 transition-all hover:bg-dark-500 active:ring-2" :class="{ 'opacity-40': !overrideEnabled }" @click="toggleOverrideEnabled()">
              <div class="flex items-center">
                <span v-if="overrideEnabled" class="i-mdi:lock-open-variant-outline mr-3 text-xl text-yellow-400"></span>
                <span v-else class="i-mdi:lock-outline mr-3 text-xl text-gray-500"></span>
                <span>Allow Cooldown Override</span>
              </div>
              <div class="ml-4">
                <div v-if="overrideEnabled" class="i-mdi:check text-28px text-green-500" />
                <div v-else class="i-mdi:close text-28px text-red-500" />
              </div>
            </div>
            <div v-if="overrideEnabled" class="flex items-center">
              <label for="overridePhraseInput" class="mr-2 w-32 text-sm shrink-0">Required phrase:</label>
              <input id="overridePhraseInput" v-model="overridePhrase" type="text" class="flex-1 rounded p-1 text-dark-500 bg-gray-200 min-w-0" placeholder="e.g., SaNeR SoCiaL mEDiA">
            </div>
            <p class="text-xs text-gray-400 pt-1">
              <span v-if="overrideEnabled">The popup requires typing the phrase above (case-sensitive) to bypass cooldown.</span>
              <span v-else>The cooldown cannot be bypassed from the popup.</span>
            </p>
          </div>
        </div>
        <p v-if="!cooldownEnabled" class="mt-2 text-sm text-gray-400 px-1"> When enabled, a cooldown period prevents unblocking again immediately after a snooze timer runs out. </p>
      </div>
      <div class="mb-6 space-y-2">
        <h3 class="mb-1 text-lg font-semibold px-1">Blocked Content Settings</h3>
        <div v-for="(site, siteIndex) in sites" :key="`site-${siteIndex}`">
          <div
            v-for="(siteAction, siteActionIndex) in site.params.siteActions"
            :key="`site-action-${siteActionIndex}`"
            class="mb-2 flex cursor-pointer items-center justify-between rounded bg-dark-800 bg-opacity-80 px-3 py-2 leading-none ring-blue-500 transition-all hover:bg-dark-500 active:ring-2"
            :class="{
              'opacity-40': !isSiteEnabled(siteAction),
            }"
            @click="toggleSiteAction(siteAction)"
            >
            <div class="flex items-center">
              <div
                class="mr-4 h-7 w-7 rounded-full bg-center"
                :style="{ backgroundImage: `url(${site.params.logoSvg})` }"
              />
              <div>{{ site.params.name }}</div>
              <div class="i-mdi:chevron-right mx-1 text-24px" />
              <div>{{ siteAction.params.name }}</div>
            </div>
            <div class="ml-4">
              <div v-if="isSiteEnabled(siteAction)" class="i-mdi:check text-28px text-green-500" />
              <div v-else class="i-mdi:close text-28px text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
