<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <UCard class="w-full max-w-md bg-gray-900/50 border-gray-800">
      <template #header>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-lock-closed-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold">Welcome Back</h1>
          <p class="text-sm text-gray-400 mt-1">Sign in to your account</p>
        </div>
      </template>

      <UForm :state="form" class="space-y-4" @submit="onLogin">
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          type="submit"
          color="primary"
          size="lg"
          :loading="submitting"
          :disabled="submitting"
          class="w-full"
        >
          {{ submitting ? 'Signing in...' : 'Sign In' }}
        </UButton>
      </UForm>

      <p class="mt-6 text-center text-sm text-gray-500">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-green-400 hover:text-green-300 font-medium">
          Sign up
        </NuxtLink>
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sign In - Nuxt 4 + Nitro App',
  description: 'Sign in to your account'
})

const { login } = useAuth()
const submitting = ref(false)
const form = reactive({
  email: '',
  password: ''
})

async function onLogin() {
  submitting.value = true
  const success = await login(form.email, form.password)
  submitting.value = false
  if (success) {
    await navigateTo('/auth/profile')
  }
}
</script>
