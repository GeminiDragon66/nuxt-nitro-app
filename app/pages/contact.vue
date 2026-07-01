<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Contact Us
      </h1>
      <p class="text-lg text-gray-400">
        Have a question or want to get in touch? Send us a message!
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
      <!-- Contact Form -->
      <UCard class="lg:col-span-3 bg-gray-900/50 border-gray-800">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5 text-green-400" />
            Send a Message
          </h2>
        </template>

        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
          <UFormField label="Name" name="name" required>
            <UInput
              v-model="state.name"
              placeholder="Your name"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Email" name="email" required>
            <UInput
              v-model="state.email"
              type="email"
              placeholder="your@email.com"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Subject" name="subject" required>
            <USelectMenu
              v-model="state.subject"
              :items="subjects"
              placeholder="Select a subject"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Message" name="message" required>
            <UTextarea
              v-model="state.message"
              placeholder="Your message..."
              :rows="5"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            trailing-icon="i-heroicons-paper-airplane-20-solid"
            class="w-full sm:w-auto"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </UButton>
        </UForm>
      </UCard>

      <!-- Contact Info -->
      <UCard class="lg:col-span-2 bg-gray-900/50 border-gray-800 h-fit">
        <template #header>
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <UIcon name="i-heroicons-information-circle-20-solid" class="w-5 h-5 text-blue-400" />
            Contact Info
          </h2>
        </template>

        <div class="space-y-6">
          <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-3">
            <div class="p-2 rounded-lg bg-gray-800/50 shrink-0">
              <UIcon :name="info.icon" class="w-5 h-5" :class="info.iconColor" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-300">{{ info.label }}</p>
              <p class="text-sm text-gray-500">{{ info.value }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="pt-4 border-t border-gray-800/50">
            <p class="text-sm font-medium text-gray-300 mb-3">Follow us</p>
            <div class="flex gap-3">
              <UButton
                v-for="social in socialLinks"
                :key="social.label"
                :to="social.to"
                target="_blank"
                color="white"
                variant="ghost"
                class="text-gray-400 hover:text-white"
              >
                <template #leading>
                  <UIcon :name="social.icon" class="w-5 h-5" />
                </template>
                {{ social.label }}
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const subjects = [
  'General Inquiry',
  'Technical Support',
  'Feature Request',
  'Bug Report',
  'Other'
]

const contactInfo = [
  {
    label: 'Email',
    value: 'hello@nuxt-nitro-app.dev',
    icon: 'i-heroicons-envelope-20-solid',
    iconColor: 'text-green-400'
  },
  {
    label: 'Location',
    value: 'Budapest, Hungary',
    icon: 'i-heroicons-map-pin-20-solid',
    iconColor: 'text-red-400'
  },
  {
    label: 'Response Time',
    value: 'Usually within 24 hours',
    icon: 'i-heroicons-clock-20-solid',
    iconColor: 'text-yellow-400'
  }
]

const socialLinks = [
  { label: 'GitHub', to: 'https://github.com/GeminiDragon66/nuxt-nitro-app', icon: 'i-heroicons-code-bracket-square-20-solid' },
  { label: 'Nuxt', to: 'https://nuxt.com', icon: 'i-heroicons-globe-alt-20-solid' }
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  subject: undefined,
  message: undefined
})

const isSubmitting = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: event.data.name,
        email: event.data.email,
        subject: event.data.subject,
        message: event.data.message
      }
    })

    toast.add({
      title: 'Message sent!',
      description: "We'll get back to you soon.",
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })

    // Reset form
    state.name = undefined
    state.email = undefined
    state.subject = undefined
    state.message = undefined
  } catch (err: any) {
    toast.add({
      title: 'Failed to send message',
      description: err?.data?.statusMessage || 'Please try again later.',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Contact - Nuxt 4 + Nitro App',
  description: 'Get in touch with us. Send a message or find our contact information.'
})
</script>
