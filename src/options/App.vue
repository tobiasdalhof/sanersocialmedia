<template>
  <div class="p-3">
    <nav class="flex justify-center space-x-5 py-5 text-2xl">
      <router-link v-for="(item, index) in items" :key="'item-' + index" :to="item.to">
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
    <main class="container max-w-4xl mx-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'

interface NavItem {
  name: string
  to: RouteLocationRaw
}

const items: NavItem[] = [
  {
    name: 'Site settings',
    to: { path: '/' },
  },
  {
    name: 'Support this project',
    to: { path: '/support' },
  },
]
</script>
