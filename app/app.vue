<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="min-h-screen bg-gray-950 text-white">
      <!-- Navigation -->
      <header class="border-b border-gray-800/50 backdrop-blur-sm bg-gray-950/80 sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Nuxt 4
            </span>
          </NuxtLink>
          
          <div class="flex items-center gap-1">
            <NuxtLink to="/" class="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors">
              About
            </NuxtLink>
            <a href="https://nuxt.com/docs" target="_blank" rel="noopener" class="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors">
              Docs
            </a>
            <a href="https://github.com/GeminiDragon66/nuxt-nitro-app" target="_blank" rel="noopener" class="ml-2">
              <UIcon name="i-heroicons-code-bracket-square-20-solid" class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>
        </nav>
      </header>

      <!-- Page Content -->
      <main>
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-800/50 py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-sm text-gray-500">
            Built with &#9829; using Nuxt 4
          </p>
          <div class="flex justify-center gap-2 mt-2 text-xs text-gray-600">
            <NuxtLink to="https://nuxt.com" external>nuxt.com</NuxtLink>
            <span>&middot;</span>
            <NuxtLink to="https://vuejs.org" external>vuejs.org</NuxtLink>
            <span>&middot;</span>
            <a href="https://github.com/GeminiDragon66/nuxt-nitro-app" target="_blank">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 4 + Nitro App',
  description: 'A modern Nuxt 4 application with Nitro engine, Nuxt UI, and full-stack capabilities'
})
</script>
