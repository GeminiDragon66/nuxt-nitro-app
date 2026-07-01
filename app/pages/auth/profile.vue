<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="w-8 h-8 text-green-400 animate-spin" />
    </div>

    <!-- Profile -->
    <template v-else-if="currentUser">
      <div class="text-center mb-10">
        <img
          :src="`https://api.dicebear.com/9.x/initials/svg?seed=${currentUser.name}&backgroundColor=00dc82&textColor=ffffff`"
          :alt="currentUser.name"
          class="w-20 h-20 rounded-full mx-auto mb-4 ring-2 ring-gray-700"
        />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          {{ currentUser.name }}
        </h1>
        <p class="text-gray-400 mt-1">{{ currentUser.email }}</p>
      </div>

      <UCard class="bg-gray-900/50 border-gray-800">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UIcon name="i-heroicons-information-circle-20-solid" class="w-5 h-5 text-blue-400" />
            Account Details
          </h2>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between py-2 border-b border-gray-800/50">
            <span class="text-sm text-gray-400">User ID</span>
            <span class="text-sm text-gray-200 font-mono">{{ currentUser.id.slice(0, 12) }}...</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-800/50">
            <span class="text-sm text-gray-400">Email</span>
            <span class="text-sm text-gray-200">{{ currentUser.email }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-800/50">
            <span class="text-sm text-gray-400">Name</span>
            <span class="text-sm text-gray-200">{{ currentUser.name }}</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-400">Joined</span>
            <span class="text-sm text-gray-200">{{ formatDate(currentUser.createdAt) }}</span>
          </div>
        </div>

        <template #footer>
          <UButton
            color="red"
            variant="ghost"
            class="w-full"
            @click="onLogout"
          >
            <template #leading>
              <UIcon name="i-heroicons-arrow-right-on-rectangle-20-solid" class="w-5 h-5" />
            </template>
            Sign Out
          </UButton>
        </template>
      </UCard>
    </template>

    <!-- Not logged in -->
    <div v-else class="text-center py-16">
      <UIcon name="i-heroicons-user-circle-20-solid" class="w-20 h-20 text-gray-600 mx-auto mb-4" />
      <h2 class="text-2xl font-semibold text-gray-400 mb-2">Not signed in</h2>
      <p class="text-gray-500 mb-8">Sign in to view your profile.</p>
      <UButton to="/auth/login" color="primary" size="lg">
        Sign In
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Profile - Nuxt 4 + Nitro App',
  description: 'Your account profile'
})

const { user: currentUser, loading, fetchUser, logout } = useAuth()
const toast = useToast()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

async function onLogout() {
  await logout()
}

onMounted(fetchUser)
</script>
