<template>
  <header class="border-b border-gray-800/50 backdrop-blur-sm bg-gray-950/80 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Nuxt 4
        </span>
      </NuxtLink>

      <div class="flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :external="link.external"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener' : undefined"
          class="px-4 py-2 text-sm rounded-lg transition-colors"
          :class="isActive(link.to) ? 'text-white bg-gray-800/50' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          href="https://github.com/GeminiDragon66/nuxt-nitro-app"
          target="_blank"
          rel="noopener"
          class="ml-2"
        >
          <UIcon name="i-heroicons-code-bracket-square-20-solid" class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

interface NavLink {
  label: string
  to: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
  { label: 'Admin', to: '/admin' },
  { label: 'Docs', to: 'https://nuxt.com/docs', external: true }
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
