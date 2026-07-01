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

    <!-- Comments Section -->
    <div class="mt-16 pt-8 border-t border-gray-800/50">
      <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <UIcon name="i-heroicons-chat-bubble-left-right-20-solid" class="w-6 h-6 text-green-400" />
        Comments
        <span v-if="comments.length > 0" class="text-sm font-normal text-gray-500">({{ comments.length }})</span>
      </h2>

      <!-- Comments List -->
      <div v-if="comments.length > 0" class="space-y-6 mb-10">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <img
                :src="`https://api.dicebear.com/9.x/initials/svg?seed=${comment.authorName}&backgroundColor=6366f1&textColor=ffffff`"
                :alt="comment.authorName"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-sm font-medium text-gray-200">{{ comment.authorName }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ comment.date }}</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">{{ comment.content }}</p>
        </div>
      </div>

      <!-- Empty Comments -->
      <div v-else-if="!commentLoading" class="text-center py-10 mb-6">
        <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-20-solid" class="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p class="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      </div>

      <!-- Comment Form -->
      <UCard class="bg-gray-900/30 border-gray-800/50">
        <template #header>
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <UIcon name="i-heroicons-pencil-20-solid" class="w-5 h-5 text-blue-400" />
            Leave a Comment
          </h3>
        </template>

        <UForm :state="commentForm" class="space-y-4" @submit="submitComment">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Name" name="authorName" required>
              <UInput
                v-model="commentForm.authorName"
                placeholder="Your name"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Email" name="authorEmail" required>
              <UInput
                v-model="commentForm.authorEmail"
                type="email"
                placeholder="your@email.com"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Comment" name="content" required>
            <UTextarea
              v-model="commentForm.content"
              placeholder="Share your thoughts about this article..."
              :rows="4"
              class="w-full"
            />
          </UFormField>

          <div class="flex items-center justify-between">
            <p class="text-xs text-gray-600">Comments are moderated before appearing.</p>
            <UButton
              type="submit"
              color="primary"
              size="md"
              :loading="commentSubmitting"
              :disabled="commentSubmitting"
              trailing-icon="i-heroicons-paper-airplane-20-solid"
            >
              Submit Comment
            </UButton>
          </div>
        </UForm>

        <p v-if="commentSuccess" class="mt-4 text-sm text-green-400 flex items-center gap-2">
          <UIcon name="i-heroicons-check-circle-20-solid" class="w-4 h-4" />
          Comment submitted! It will appear after moderation.
        </p>
      </UCard>
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

interface Comment {
  id: number
  authorName: string
  content: string
  date: string
}

const route = useRoute()
const toast = useToast()

const loading = ref(true)
const notFound = ref(false)
const post = ref<BlogPostDetail | null>(null)

// Comments
const comments = ref<Comment[]>([])
const commentLoading = ref(true)
const commentSubmitting = ref(false)
const commentSuccess = ref(false)
const commentForm = reactive({
  authorName: '',
  authorEmail: '',
  content: ''
})

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

async function fetchComments() {
  if (!post.value) return
  commentLoading.value = true
  try {
    const result = await $fetch<{ comments: Comment[] }>(`/api/comments/${post.value.id}`)
    comments.value = result.comments
  } catch {
    // silently fail
  } finally {
    commentLoading.value = false
  }
}

async function submitComment() {
  if (!post.value) return
  commentSubmitting.value = true
  commentSuccess.value = false

  try {
    await $fetch(`/api/comments/${post.value.id}`, {
      method: 'POST',
      body: {
        authorName: commentForm.authorName,
        authorEmail: commentForm.authorEmail,
        content: commentForm.content
      }
    })

    commentSuccess.value = true
    commentForm.authorName = ''
    commentForm.authorEmail = ''
    commentForm.content = ''
  } catch (err: any) {
    toast.add({
      title: 'Failed to submit comment',
      description: err?.data?.statusMessage || 'Please try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    commentSubmitting.value = false
  }
}

onMounted(() => {
  fetchPost()
})

watch(post, (newPost) => {
  if (newPost) fetchComments()
})
</script>
