<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-green-500/5 via-blue-500/5 to-transparent pointer-events-none" />
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center relative">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 mb-8">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Nuxt 4.4.8 + Nitro 2.13.4 + Nuxt UI
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          <span class="block">Build your</span>
          <span class="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">next application</span>
          <span class="block">with Nuxt</span>
        </h1>

        <p class="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
          The intuitive Vue framework for building full-stack web applications.
          Fast, modular, and ready for production.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            to="https://nuxt.com/docs/1.getting-started/installation"
            target="_blank"
            size="lg"
            color="primary"
            variant="solid"
            trailing-icon="i-heroicons-arrow-right-20-solid"
          >
            Get started
          </UButton>
          <UButton
            to="https://nuxt.com/docs"
            target="_blank"
            size="lg"
            color="white"
            variant="outline"
          >
            Documentation
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.desc"
          :icon="feature.icon"
          :badge-color="feature.badgeColor"
        />
      </div>
    </section>

    <!-- API Demo -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Nitro API Demo</h2>
        <p class="text-gray-400">Try the built-in API endpoints</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <UCard class="bg-gray-900/50 border-gray-800">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">GET /api/hello</h3>
              <UBadge color="green" variant="subtle" size="sm">GET</UBadge>
            </div>
          </template>
          <p class="text-sm text-gray-400 mb-4">Returns a friendly greeting message</p>
          <UButton
            to="/api/hello"
            target="_blank"
            color="primary"
            variant="ghost"
            size="sm"
            trailing-icon="i-heroicons-arrow-top-right-on-square-20-solid"
          >
            Try it
          </UButton>
        </UCard>

        <UCard class="bg-gray-900/50 border-gray-800">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">GET /api/ping</h3>
              <UBadge color="green" variant="subtle" size="sm">GET</UBadge>
            </div>
          </template>
          <p class="text-sm text-gray-400 mb-4">Health check endpoint with server info</p>
          <UButton
            to="/api/ping"
            target="_blank"
            color="primary"
            variant="ghost"
            size="sm"
            trailing-icon="i-heroicons-arrow-top-right-on-square-20-solid"
          >
            Try it
          </UButton>
        </UCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Hybrid Rendering',
    desc: 'Mix SSG, SSR, and static generation in a single application for optimal performance.',
    icon: '⚡',
    badgeColor: 'green' as const
  },
  {
    title: 'Auto-imports',
    desc: 'Components, composables, and utilities are automatically imported. No manual imports needed.',
    icon: '⚙️',
    badgeColor: 'blue' as const
  },
  {
    title: 'File-based Routing',
    desc: 'Every page in your pages/ directory becomes a route with its own URL. Simple and intuitive.',
    icon: '🔗',
    badgeColor: 'purple' as const
  },
  {
    title: 'Nitro Engine',
    desc: 'Built-in server engine with API routes, middleware, and edge deployment support.',
    icon: '⚡',
    badgeColor: 'orange' as const
  },
  {
    title: 'TypeScript Ready',
    desc: 'First-class TypeScript support with automatic type generation for your routes and data.',
    icon: '📝',
    badgeColor: 'indigo' as const
  },
  {
    title: 'Nuxt UI',
    desc: 'Beautiful, accessible UI components built with Tailwind CSS and Headless UI.',
    icon: '🎨',
    badgeColor: 'teal' as const
  }
]
</script>
