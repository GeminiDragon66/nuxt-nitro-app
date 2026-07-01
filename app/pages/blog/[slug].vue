<template>
  <!-- Loading -->
  <div v-if="loading" class="flex justify-center py-32">
    <UIcon name="i-heroicons-arrow-path-20-solid" class="w-8 h-8 text-green-400 animate-spin" />
  </div>

  <!-- Error -->
  <div v-else-if="notFound" class="max-w-3xl mx-auto px-4 py-32 text-center">
    <UIcon name="i-heroicons-document-text-20-solid" class="w-20 h-20 text-gray-600 mx-auto mb-6" />
    <h1 class="text-3xl font-bold text-gray-300 mb-3">Post not found</h1>
    <p class="text-gray-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
    <UButton to="/blog" color="primary" variant="outline">
      &larr; Back to Blog
    </UButton>
  </div>

  <!-- Post Content -->
  <article v-else-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Back link -->
    <NuxtLink to="/blog" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8">
      <UIcon name="i-heroicons-arrow-left-20-solid" class="w-4 h-4" />
      Back to Blog
    </NuxtLink>

    <!-- Header -->
    <header class="mb-10">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <UBadge :color="post.categoryColor as any" variant="subtle" size="md">
          {{ post.category }}
        </UBadge>
        <span class="text-sm text-gray-500">{{ post.date }}</span>
        <span class="text-sm text-gray-600">&middot;</span>
        <span class="text-sm text-gray-500">{{ post.readTime }} min read</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
        {{ post.title }}
      </h1>

      <p class="text-lg text-gray-400 leading-relaxed max-w-3xl">
        {{ post.excerpt }}
      </p>

      <!-- Author -->
      <div class="flex items-center gap-4 mt-8 pt-6 border-t border-gray-800/50">
        <img
          :src="`https://api.dicebear.com/9.x/initials/svg?seed=${post.author}&backgroundColor=00dc82&textColor=ffffff`"
          :alt="post.author"
          class="w-12 h-12 rounded-full ring-2 ring-gray-800"
        />
        <div>
          <p class="text-sm font-medium text-gray-200">{{ post.author }}</p>
          <p class="text-xs text-gray-500">
            Published {{ post.date }}
            <span v-if="post.updatedAt !== post.createdAt">&middot; Updated {{ formatDate(post.updatedAt) }}</span>
          </p>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-green-400 prose-code:text-green-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white">
      <div class="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {{ post.content || 'No content available for this post.' }}
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-16 pt-8 border-t border-gray-800/50">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Share:</span>
          <UButton
            color="white"
            variant="ghost"
            size="sm"
            class="text-gray-400 hover:text-white"
            @click="copyUrl"
          >
            <template #leading>
              <UIcon name="i-heroicons-link-20-solid" class="w-4 h-4" />
            </template>
            Copy Link
          </UButton>
        </div>
        <UButton to="/blog" color="primary" variant="ghost" size="sm">
          <template #leading>
            <UIcon name="i-heroicons-arrow-left-20-solid" class="w-4 h-4" />
          </template>
          More Articles
        </UButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface BlogPostDetail {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categoryColor: string
  author: string
  readTime: number
  date: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const toast = useToast()

const loading = ref(true)
const notFound = ref(false)
const post = ref<BlogPostDetail | null>(null)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

async function fetchPost() {
  loading.value = true
  notFound.value = false

  try {
    const slug = route.params.slug as string
    const result = await $fetch<{ post: BlogPostDetail }>(`/api/blog/${slug}`)
    post.value = result.post

    useSeoMeta({
      title: `${result.post.title} - Blog`,
      description: result.post.excerpt,
      ogTitle: result.post.title,
      ogDescription: result.post.excerpt
    })
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
}

function copyUrl() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    toast.add({
      title: 'Link copied!',
      description: 'Article URL copied to clipboard.',
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })
  }).catch(() => {
    toast.add({
      title: 'Failed to copy',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  })
}

onMounted(fetchPost)
</script>
