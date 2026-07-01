<template>
  <UCard
    class="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
    :ui="{ body: { padding: 'p-6' } }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UBadge :color="badgeColor" variant="soft" class="text-lg p-2">
          {{ icon }}
        </UBadge>
      </div>
    </template>

    <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
    <p class="text-sm text-gray-400 leading-relaxed">{{ description }}</p>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  badgeColor: string
}>()
</script>
