<script setup lang="ts">
import { mdiCommentQuoteOutline, mdiGithub, mdiGoogleChrome, mdiSync } from '@mdi/js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { SSMIcon } from '@sanersocialmedia/vue'
import youtube from 'super-tiny-icons/images/svg/youtube.svg'
import twitter from 'super-tiny-icons/images/svg/twitter.svg'
import instagram from 'super-tiny-icons/images/svg/instagram.svg'
import facebook from 'super-tiny-icons/images/svg/facebook.svg'
import tiktok from 'super-tiny-icons/images/svg/tiktok.svg'
import pinterest from 'super-tiny-icons/images/svg/pinterest.svg'
import linkedin from 'super-tiny-icons/images/svg/linkedin.svg'
import twitch from 'super-tiny-icons/images/svg/twitch.svg'
import reddit from 'super-tiny-icons/images/svg/reddit.svg'
import github from 'super-tiny-icons/images/svg/github.svg'
import logo from './assets/logo.svg'

const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const gitHubUrl = 'https://github.com/tobiasdalhof/sanersocialmedia'

interface Site {
  name: string
  logo: string
}

const sites: Site[] = [
  { name: 'YouTube', logo: youtube },
  { name: 'Twitter', logo: twitter },
  { name: 'Instagram', logo: instagram },
  { name: 'Facebook', logo: facebook },
  { name: 'TikTok', logo: tiktok },
  { name: 'Pinterest', logo: pinterest },
  { name: 'LinkedIn', logo: linkedin },
  { name: 'Twitch', logo: twitch },
  { name: 'Reddit', logo: reddit },
  { name: 'GitHub', logo: github },
]
</script>

<template>
  <header class="flex items-center justify-between p-5 leading-none">
    <div class="flex select-none items-center">
      <img class="mr-4 h-8 w-8" :src="logo" alt="Logo">
      <div>
        <span class="text-lg">Saner Social Media Feed Blocker</span>
      </div>
    </div>
    <a :href="gitHubUrl" class="inline-flex select-none items-center" target="_blank">
      <SSMIcon :icon="mdiGithub" size="32px" />
      <div class="ml-2 hidden sm:block">
        <span class="text-lg">Star us on GitHub</span>
      </div>
    </a>
  </header>
  <main class="mt-5 p-5">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-center text-4xl leading-snug text-yellow-200">
        Block social media distractions and replace them with uplifting quotes to improve your mental well-being.
      </h1>
      <div class="mt-10 text-center">
        <a :href="chromeWebStoreUrl" target="_blank" class="h-58px text-dark-900 inline-flex select-none items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 px-8 text-lg font-semibold leading-none hover:from-yellow-400 hover:to-yellow-600 active:ring">
          <SSMIcon size="32px" :icon="mdiGoogleChrome" class="mr-2" />
          <span>Add to Chrome - It's free</span>
        </a>
      </div>
      <div class="mt-10">
        <h2 class="mb-5 text-center text-lg text-yellow-200">
          It works with
        </h2>
        <div class="mx-auto -mb-2 flex max-w-2xl flex-wrap items-center justify-center space-x-2">
          <div v-for="(site, index) in sites" :key="`site${index}`" class="ring-dark-200 mb-2 flex  select-none items-center rounded-full py-1 pl-1 pr-3 leading-none ring-1">
            <div class="h-5 w-5 rounded-full bg-center" :style="{ backgroundImage: `url(${site.logo})` }" />
            <div class="ml-2">
              <span class="text-sm">{{ site.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-10 max-w-3xl">
      <div />
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="1"
        :space-between="50"
        :navigation="true"
        :loop="true"
        :auto-height="true"
      >
        <SwiperSlide>
          <img src="./assets/screenshots/youtube.png" alt="Block YouTube homepage feed, sidebar and comments" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/twitter.png" alt="Block Twitter homepage feed, trends and follow suggestions in sidebar" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/instagram.png" alt="Block Instagram homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/facebook.png" alt="Block Facebook homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/tiktok.png" alt="Block TikTok homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/pinterest.png" alt="Block Pinterest homepage feed and related pins" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/linkedin.png" alt="Block LinkedIn homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/twitch.png" alt="Block Twitch homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/reddit.png" alt="Block Reddit feed on homepage and all subreddits" class="rounded-xl" loading="lazy">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/github.png" alt="Block GitHub homepage feed" class="rounded-xl" loading="lazy">
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="mx-auto mt-10 max-w-3xl">
      <div class="grid grid-cols-1 space-y-5 space-x-0 text-center sm:grid-cols-2 sm:space-y-0 sm:space-x-5">
        <div>
          <SSMIcon size="24px" class="text-yellow-300" :icon="mdiCommentQuoteOutline" />
          <h3 class="mt-3 mb-1 font-semibold">
            1621 different inspirational quotes
          </h3>
          <p class="opacity-80">
            See inspirational quotes instead of potentially time wasting recommendations.
          </p>
        </div>
        <div>
          <SSMIcon size="24px" class="text-blue-500" :icon="mdiSync" />
          <h3 class="mt-3 mb-1 font-semibold">
            Use on multiple computers
          </h3>
          <p class="opacity-80">
            Extension settings are synced with your Google account.
          </p>
        </div>
      </div>
    </div>
  </main>
  <footer class="mt-15 border-dark-500 border-t p-10">
    <div class="text-center text-sm opacity-70">
      <a href="mailto:sanersocialmedia@gmail.com" class="inline-flex items-center leading-none">
        <span>Email us at sanersocialmedia@gmail.com</span>
      </a>
    </div>
    <div class="mt-1 text-center text-xs opacity-70">
      <span>Imprint: Saner Social Media is a project by Tobias Dalhof, Wolfgangstr. 11, 73479 Ellwangen (Jagst), Germany</span>
    </div>
  </footer>
</template>
