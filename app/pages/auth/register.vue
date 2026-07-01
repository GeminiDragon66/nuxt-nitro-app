<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <UCard class="w-full max-w-md bg-gray-900/50 border-gray-800">
      <template #header>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-user-plus-20-solid" class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold">Create Account</h1>
          <p class="text-sm text-gray-400 mt-1">Sign up for a new account</p>
        </div>
      </template>

      <UForm :state="form" class="space-y-4" @submit="onRegister">
        <UFormField label="Name" name="name" required>
          <UInput
            v-model="form.name"
            placeholder="Your name"
            class="w-full"
            size="lg"
          />
        </UFormField>

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
            placeholder="At least 6 characters"
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
          {{ submitting ? 'Creating account...' : 'Create Account' }}
        </UButton>
      </UForm>

      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-green-400 hover:text-green-300 font-medium">
          Sign in
        </NuxtLink>
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sign Up - Nuxt 4 + Nitro App',
  description: 'Create a new account'
})

const { register } = useAuth()
const submitting = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

async function onRegister() {
  submitting.value = true
  const success = await register(form.email, form.password, form.name)
  submitting.value = false
  if (success) {
    await navigateTo('/auth/login')
  }
}
</script>
