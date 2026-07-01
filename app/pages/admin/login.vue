<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <UCard class="w-full max-w-md bg-gray-900/50 border-gray-800">
      <template #header>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-lock-closed-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold">Admin Login</h1>
          <p class="text-sm text-gray-400 mt-1">Enter your admin password to continue</p>
        </div>
      </template>

      <UForm :state="{ password: password }" class="space-y-4" @submit="onLogin">
        <UFormField label="Password" name="password" required>
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter admin password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          type="submit"
          color="primary"
          size="lg"
          :loading="loading"
          :disabled="loading"
          class="w-full"
        >
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </UButton>
      </UForm>

      <p v-if="error" class="mt-4 text-sm text-red-400 text-center">{{ error }}</p>
    </UCard>

    <div class="text-center mt-8 w-full">
      <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">
        &larr; Back to home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const password = ref('')
const loading = ref(false)
const error = ref('')
const toast = useToast()

async function onLogin() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/auth', {
      method: 'POST',
      body: { password: password.value }
    })

    toast.add({
      title: 'Welcome!',
      description: 'Successfully authenticated.',
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })

    await navigateTo('/admin')
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>
