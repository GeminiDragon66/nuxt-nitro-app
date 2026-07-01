<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink to="/admin" class="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4 inline-block">
        &larr; Back to Dashboard
      </NuxtLink>
      <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Create New Post
      </h1>
      <p class="text-gray-400 mt-1">Write a new blog post</p>
    </div>

    <!-- Form -->
    <UCard class="bg-gray-900/50 border-gray-800">
      <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField label="Title" name="title" required>
          <UInput
            v-model="state.title"
            placeholder="Post title"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField label="Slug" name="slug" required>
          <UInput
            v-model="state.slug"
            placeholder="post-url-slug"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <UFormField label="Category" name="category" required>
            <USelectMenu
              v-model="state.category"
              :items="categories"
              placeholder="Select category"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Author" name="author" required>
            <UInput
              v-model="state.author"
              placeholder="Author name"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Read Time (min)" name="readTime">
            <UInput
              v-model.number="state.readTime"
              type="number"
              min="1"
              class="w-full"
              size="lg"
            />
          </UFormField>
        </div>

        <UFormField label="Excerpt" name="excerpt" required>
          <UTextarea
            v-model="state.excerpt"
            placeholder="Brief summary of the post..."
            :rows="3"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField label="Content" name="content">
          <UTextarea
            v-model="state.content"
            placeholder="Write your post content here..."
            :rows="15"
            class="w-full font-mono text-sm"
            size="lg"
          />
        </UFormField>

        <UFormField label="Status" name="published">
          <div class="flex items-center gap-3">
            <UToggle v-model="state.published" />
            <span class="text-sm text-gray-400">
              {{ state.published ? 'Published (visible to everyone)' : 'Draft (hidden from public)' }}
            </span>
          </div>
        </UFormField>

        <div class="flex items-center justify-between pt-4 border-t border-gray-800/50">
          <UButton
            to="/admin"
            color="white"
            variant="ghost"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            :loading="submitting"
            :disabled="submitting"
          >
            {{ submitting ? 'Creating...' : 'Create Post' }}
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const categories = [
  'Getting Started', 'Nitro', 'UI/UX', 'Full-Stack', 'TypeScript', 'Deployment'
]

const categoryColorMap: Record<string, string> = {
  'Getting Started': 'green',
  'Nitro': 'blue',
  'UI/UX': 'purple',
  'Full-Stack': 'orange',
  'TypeScript': 'indigo',
  'Deployment': 'teal'
}

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  readTime: z.number().int().positive().default(5),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().default(''),
  published: z.boolean().default(false)
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  slug: undefined,
  category: undefined,
  author: undefined,
  readTime: 5,
  excerpt: undefined,
  content: undefined,
  published: false
})

const submitting = ref(false)
const toast = useToast()

// Auto-generate slug from title
watch(() => state.title, (title) => {
  if (title && !state.slug) {
    state.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await $fetch('/api/blog', {
      method: 'POST',
      body: {
        title: event.data.title,
        slug: event.data.slug,
        excerpt: event.data.excerpt,
        content: event.data.content,
        category: event.data.category,
        categoryColor: categoryColorMap[event.data.category] || 'green',
        author: event.data.author,
        readTime: event.data.readTime,
        published: event.data.published
      }
    })

    toast.add({
      title: 'Post created!',
      description: 'The blog post has been created successfully.',
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })

    await navigateTo('/admin')
  } catch (err: any) {
    toast.add({
      title: 'Failed to create post',
      description: err?.data?.statusMessage || 'Please try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    submitting.value = false
  }
}
</script>
