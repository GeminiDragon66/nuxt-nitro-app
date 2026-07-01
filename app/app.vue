<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="min-h-screen bg-gray-950 text-white">
      <NavBar />

      <!-- Page Content -->
      <main>
        <NuxtPage />
      </main>

      <AppFooter />
    </div>
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 4 + Nitro App',
  description: 'A modern Nuxt 4 application with Nitro engine, Nuxt UI, and full-stack capabilities'
})
</script>
