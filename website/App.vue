<script setup lang="ts">
import { mdiCommentQuoteOutline, mdiEmail, mdiGithub, mdiGoogleChrome, mdiSync } from '@mdi/js'
import type Site from '../src/lib/Site'
import * as _sites from '../src/sites'
import { AppIcon } from './components'

const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/saner-social-media/opnoobcmpioggidgaejfkbopdphbfkkk'
const gitHubUrl = 'https://github.com/tobidalhof/sanersocialmedia'

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

function generateSiteDescription(site: Site): string {
  const actionNames = site.params.siteActions.map(action => action.params.name)
  return `${actionNames.join(', ')}.`
}
</script>

<template>
  <header class="p-5">
    <div class="flex items-center mb-15">
      <img class="w-8 mr-4" src="./assets/logo.svg" alt="Logo">
      <div>
        <span class="text-lg">Saner Social Media</span>
      </div>
    </div>
    <div class="container mx-auto max-w-4xl text-center">
      <h1 class="text-3xl leading-snug text-yellow-200">
        Hide homepage feeds, recommendations and other distractions on {{ sites.length }} different social media sites
      </h1>
      <p class="mt-5 mb-10 text-lg max-w-xl mx-auto">
        Saner Social Media is a Chrome extension that helps you to regain focus, stop wasting time and improve mental health.
      </p>
      <div>
        <a :href="chromeWebStoreUrl" target="_blank" class="inline-flex items-center justify-center px-8 h-58px leading-none rounded-full from-yellow-200 to-yellow-400 hover:from-yellow-300 hover:to-yellow-500  bg-gradient-to-br text-lg font-semibold text-dark-900 select-none active:ring">
          <app-icon :value="mdiGoogleChrome" class="w-8 mr-2" />
          <span>Add to Chrome - It's free</span>
        </a>
      </div>
      <div class="mt-10">
        <img src="./assets/youtube-home.png" alt="YouTube home without recommendations" class="rounded">
      </div>
    </div>
  </header>
  <main class="mt-15 pt-15 border-t border-dark-800">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-2xl text-center">
        Feature highlights & supported sites
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 mt-10">
        <div class="p-5">
          <app-icon class="w-8 text-yellow-300" :value="mdiCommentQuoteOutline" />
          <h3 class="mt-3 mb-1 font-semibold">
            1621 inspirational quotes
          </h3>
          <p class="opacity-80">
            We will show you inspirational quotes instead of potentially time wasting recommendations.
          </p>
        </div>
        <div class="p-5">
          <app-icon class="w-8 text-blue-500" :value="mdiSync" />
          <h3 class="mt-3 mb-1 font-semibold">
            Use on multiple computers
          </h3>
          <p class="opacity-80">
            Extension settings are synced with your Google account.
          </p>
        </div>
        <div v-for="(site, siteIndex) in sites" :key="'site-' + siteIndex" class="p-5">
          <div class="w-8 h-8 bg-center rounded-full" :style="{ backgroundImage: `url(${site.params.logoSvg})` }" />
          <h3 class="mt-3 mb-1 font-semibold">
            Support for {{ site.params.name }}
          </h3>
          <p class="opacity-80">
            {{ generateSiteDescription(site) }}
          </p>
        </div>
      </div>
    </div>
  </main>
  <footer class="bg-black mt-15 p-10 ">
    <div class="md:flex md:space-x-5 justify-center">
      <a href="mailto:sanersocialmedia@gmail.com" class="inline-flex items-center leading-none">
        <app-icon :value="mdiEmail" class="w-4 mr-2" />
        <div>
          <span>sanersocialmedia@gmail.com</span>
        </div>
      </a>
      <a :href="gitHubUrl" class="inline-flex items-center leading-none">
        <app-icon :value="mdiGithub" class="w-4 mr-2" />
        <div>
          <span>View source code on GitHub</span>
        </div>
      </a>
    </div>
    <div class="text-center mt-5 opacity-50">
      <span>Saner Social Media is a project by Tobias Dalhof, Wolfgangstraße 11, 73479 Ellwangen (Jagst), Germany</span>
    </div>
  </footer>
</template>
