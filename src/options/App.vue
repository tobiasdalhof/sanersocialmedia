<template>
  <div class="container max-w-4xl mx-auto p-3">
    <div class="flex items-center border-b border-dark-800 py-5">
      <img src="./images/relieved.svg" alt="Sanity" class="w-7 mr-3" />
      <div>Sanity - Saner Social Media</div>
    </div>

    <main class="mt-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
