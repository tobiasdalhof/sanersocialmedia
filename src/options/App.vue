<template>
  <nav class="flex justify-center space-x-5 py-5 text-2xl">
    <router-link :to="{ path: '/' }">Sites</router-link>
    <router-link :to="{ path: '/quotes' }">Quotes</router-link>
    <router-link :to="{ path: '/about' }">About</router-link>
  </nav>
  <main class="container max-w-4xl mx-auto pt-10">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
