<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="w-8 h-8 text-green-400 animate-spin" />
    </div>

    <template v-else-if="post">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/admin" class="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4 inline-block">
          &larr; Back to Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Edit Post
        </h1>
        <p class="text-gray-400 mt-1">Update "{{ post.title }}"</p>
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
            <div class="flex items-center gap-3">
              <UButton
                to="/admin"
                color="white"
                variant="ghost"
              >
                Cancel
              </UButton>
              <span class="text-xs text-gray-600">
                Last updated: {{ post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Never' }}
              </span>
            </div>
            <UButton
              type="submit"
              color="primary"
              size="lg"
              :loading="submitting"
              :disabled="submitting"
            >
              {{ submitting ? 'Saving...' : 'Save Changes' }}
            </UButton>
          </div>
        </UForm>
      </UCard>
    </template>

    <!-- Not Found -->
    <div v-else class="text-center py-16">
      <UIcon name="i-heroicons-document-text-20-solid" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-400 mb-2">Post not found</h2>
      <p class="text-gray-500 mb-6">The blog post you're looking for doesn't exist.</p>
      <UButton to="/admin" color="primary">Back to Dashboard</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

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

interface EditPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categoryColor: string
  author: string
  readTime: number
  published: boolean
  updatedAt: string
}

const loading = ref(true)
const submitting = ref(false)
const post = ref<EditPost | null>(null)

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

const state = reactive<Partial<Schema>>({})

async function fetchPost() {
  loading.value = true
  try {
    const result = await $fetch<{ post: EditPost }>(`/api/admin/posts/${route.params.id}`)
    post.value = result.post
    // Populate form state
    state.title = result.post.title
    state.slug = result.post.slug
    state.category = result.post.category
    state.author = result.post.author
    state.readTime = result.post.readTime
    state.excerpt = result.post.excerpt
    state.content = result.post.content
    state.published = result.post.published
  } catch {
    post.value = null
  } finally {
    loading.value = false
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await $fetch(`/api/blog/${route.params.id}`, {
      method: 'PUT',
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
      title: 'Post updated!',
      description: 'Changes have been saved successfully.',
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })

    await navigateTo('/admin')
  } catch (err: any) {
    toast.add({
      title: 'Failed to update post',
      description: err?.data?.statusMessage || 'Please try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    submitting.value = false
  }
}

onMounted(fetchPost)
</script>
