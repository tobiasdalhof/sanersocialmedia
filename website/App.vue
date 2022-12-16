<script setup lang="ts">
import { mdiCommentQuoteOutline, mdiEmail, mdiGithub, mdiGoogleChrome, mdiSync } from '@mdi/js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import type Site from '../src/lib/Site'
import * as _sites from '../src/sites'
import { AppIcon } from './components'

const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const gitHubUrl = 'https://github.com/tobiasdalhof/sanersocialmedia'

const sites: Site[] = [
  _sites.youtube,
  _sites.twitter,
  _sites.instagram,
  _sites.facebook,
  _sites.tiktok,
  _sites.pinterest,
  _sites.linkedin,
  _sites.twitch,
  _sites.reddit,
  _sites.github,
]
</script>

<template>
  <header class="flex items-center justify-between p-5 leading-none">
    <div class="flex items-center select-none">
      <img class="w-8 h-8 mr-4" src="./assets/logo.svg" alt="Logo">
      <div>
        <span class="text-lg">Saner Social Media</span>
      </div>
    </div>
    <a :href="gitHubUrl" class="inline-flex items-center select-none" target="_blank">
      <AppIcon :value="mdiGithub" class="w-8 h-8" />
      <div class="ml-2 hidden sm:block">
        <span class="text-lg">Star us on GitHub</span>
      </div>
    </a>
  </header>
  <main class="mt-5 p-5">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl leading-snug text-center text-yellow-200">
        Replace home feeds, recommendations and other social media distractions with inspirational quotes
      </h1>
      <p class="mt-5 mb-10 max-w-xl mx-auto text-center text-lg">
        Saner Social Media was created for people who need to use social media for work but don't want to be exposed to it's addictive features like home feeds and recommendations.
      </p>
      <div class="text-center">
        <a :href="chromeWebStoreUrl" target="_blank" class="inline-flex items-center justify-center px-8 h-58px leading-none rounded-full from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600  bg-gradient-to-br text-lg font-semibold text-dark-900 select-none active:ring">
          <AppIcon :value="mdiGoogleChrome" class="w-8 h-8 mr-2" />
          <span>Add to Chrome - It's free</span>
        </a>
      </div>
      <div class="mt-10">
        <h2 class="mb-5 text-yellow-200 text-center text-lg">
          It works with
        </h2>
        <div class="flex flex-wrap justify-center items-center space-x-2 max-w-2xl mx-auto -mb-2">
          <div v-for="(site, index) in sites" :key="`site${index}`" class="flex items-center mb-2  pl-1 pr-3 py-1 rounded-full leading-none ring-1 ring-dark-200 select-none">
            <div class="w-5 h-5 bg-center rounded-full" :style="{ backgroundImage: `url(${site.params.logoSvg})` }" />
            <div class="ml-2">
              <span class="text-sm">{{ site.params.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 mx-auto max-w-3xl">
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
          <img src="./assets/screenshots/youtube.png" alt="Hide YouTube homepage feed, sidebar and comments" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/twitter.png" alt="Hide Twitter homepage feed, trends and follow suggestions in sidebar" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/instagram.png" alt="Hide Instagram homepage feed" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/facebook.png" alt="Hide Facebook homepage feed" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/tiktok.png" alt="Hide TikTok homepage feed" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/pinterest.png" alt="Hide Pinterest homepage feed and related pins" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/linkedin.png" alt="Hide LinkedIn homepage feed" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/twitch.png" alt="Hide Twitch homepage feed" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/reddit.png" alt="Hide Reddit feed on homepage and all subreddits" class="rounded-xl">
        </SwiperSlide>
        <SwiperSlide>
          <img src="./assets/screenshots/github.png" alt="Hide GitHub homepage feed" class="rounded-xl">
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="mt-10 mx-auto max-w-3xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 space-y-5 sm:space-y-0 space-x-0 sm:space-x-5 text-center">
        <div>
          <AppIcon class="w-6 h-6 text-yellow-300" :value="mdiCommentQuoteOutline" />
          <h3 class="mt-3 mb-1 font-semibold">
            1621 different inspirational quotes
          </h3>
          <p class="opacity-80">
            See inspirational quotes instead of potentially time wasting recommendations.
          </p>
        </div>
        <div>
          <AppIcon class="w-6 h-6 text-blue-500" :value="mdiSync" />
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
  <footer class="mt-15 p-10 border-t border-dark-500">
    <div class="text-center text-sm opacity-70">
      <a href="mailto:sanersocialmedia@gmail.com" class="inline-flex items-center leading-none">
        <AppIcon :value="mdiEmail" class="w-4 h-4 mr-1" />Contact me at sanersocialmedia@gmail.com
      </a>
    </div>
    <div class="mt-1 text-center text-xs opacity-70">
      <span>Imprint: Saner Social Media is a project by Tobias Dalhof, Wolfgangstr. 11, 73479 Ellwangen (Jagst), Germany</span>
    </div>
  </footer>
</template>
