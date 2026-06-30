<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        About This Project
      </h1>
      <p class="text-lg text-gray-400">
        A modern Nuxt 4 application with Nitro engine and Nuxt UI
      </p>
    </div>

    <div class="grid gap-8">
      <UCard class="bg-gray-900/50 border-gray-800">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UBadge color="green" variant="soft" class="p-1.5">🚀</UBadge>
            Tech Stack
          </h2>
        </template>
        
        <ul class="space-y-3">
          <li v-for="item in techStack" :key="item.name" class="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
            <span class="text-gray-300">{{ item.name }}</span>
            <UBadge :color="item.color" variant="subtle" size="sm">{{ item.version }}</UBadge>
          </li>
        </ul>
      </UCard>

      <UCard class="bg-gray-900/50 border-gray-800">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UBadge color="blue" variant="soft" class="p-1.5">📖</UBadge>
            Features
          </h2>
        </template>
        
        <p class="text-gray-400 mb-6">
          This project showcases the power of Nuxt 4 with the following features:
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="feat in projectFeatures" :key="feat" class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle-16-solid" class="text-green-400 mt-0.5 shrink-0" />
            <span class="text-sm text-gray-300">{{ feat }}</span>
          </div>
        </div>
      </UCard>

      <UCard class="bg-gray-900/50 border-gray-800">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UBadge color="purple" variant="soft" class="p-1.5">🔗</UBadge>
            Links
          </h2>
        </template>
        
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            :target="link.external ? '_blank' : undefined"
            :color="link.color"
            variant="ghost"
            :trailing-icon="link.external ? 'i-heroicons-arrow-top-right-on-square-20-solid' : undefined"
          >
            {{ link.label }}
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const techStack = [
  { name: 'Nuxt', version: '4.4.8', color: 'green' as const },
  { name: 'Nitro', version: '2.13.4', color: 'blue' as const },
  { name: 'Vue', version: '3.5.39', color: 'emerald' as const },
  { name: 'Vite', version: '7.3.6', color: 'yellow' as const },
  { name: 'Nuxt UI', version: '4.x', color: 'sky' as const },
  { name: 'Node.js', version: '24.18.0', color: 'green' as const },
  { name: 'TypeScript', version: '5.x', color: 'blue' as const }
]

const projectFeatures = [
  'Hybrid Rendering (SSR + SSG)',
  'File-based Routing',
  'Auto-imports',
  'Nitro API Endpoints',
  'Nuxt UI Components',
  'Tailwind CSS v4 Styling',
  'Dark Mode by Default',
  'TypeScript Support',
  'Nuxt DevTools',
  'Hot Module Replacement'
]

const links = [
  { label: 'Nuxt Documentation', to: 'https://nuxt.com/docs', external: true, color: 'green' as const },
  { label: 'GitHub Repository', to: 'https://github.com/GeminiDragon66/nuxt-nitro-app', external: true, color: 'gray' as const },
  { label: 'Home', to: '/', color: 'white' as const }
]
</script>
