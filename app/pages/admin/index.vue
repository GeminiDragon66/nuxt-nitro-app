<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p class="text-gray-400 mt-1">Manage your blog posts</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          to="/admin/posts/new"
          color="primary"
          size="md"
          trailing-icon="i-heroicons-plus-20-solid"
        >
          New Post
        </UButton>
        <UButton
          color="white"
          variant="ghost"
          size="md"
          @click="onLogout"
        >
          <template #leading>
            <UIcon name="i-heroicons-arrow-right-on-rectangle-20-solid" class="w-5 h-5" />
          </template>
          Logout
        </UButton>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <UCard class="bg-gray-900/50 border-gray-800">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-green-500/10">
            <UIcon name="i-heroicons-document-text-20-solid" class="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.total }}</p>
            <p class="text-xs text-gray-400">Total Posts</p>
          </div>
        </div>
      </UCard>
      <UCard class="bg-gray-900/50 border-gray-800">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-500/10">
            <UIcon name="i-heroicons-eye-20-solid" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.published }}</p>
            <p class="text-xs text-gray-400">Published</p>
          </div>
        </div>
      </UCard>
      <UCard class="bg-gray-900/50 border-gray-800">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-yellow-500/10">
            <UIcon name="i-heroicons-clock-20-solid" class="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.drafts }}</p>
            <p class="text-xs text-gray-400">Drafts</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="w-8 h-8 text-green-400 animate-spin" />
    </div>

    <!-- Posts Table -->
    <UCard v-else class="bg-gray-900/50 border-gray-800">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Author</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
              <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in posts"
              :key="post.id"
              class="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
            >
              <td class="py-3 px-4">
                <div>
                  <p class="text-sm font-medium text-white truncate max-w-[200px] lg:max-w-[300px]">
                    {{ post.title }}
                  </p>
                  <p class="text-xs text-gray-500 truncate max-w-[200px] lg:max-w-[300px]">
                    /{{ post.slug }}
                  </p>
                </div>
              </td>
              <td class="py-3 px-4 hidden sm:table-cell">
                <UBadge :color="post.categoryColor as any" variant="subtle" size="sm">
                  {{ post.category }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">
                {{ post.author }}
              </td>
              <td class="py-3 px-4 hidden md:table-cell">
                <UBadge
                  :color="post.published ? 'green' : 'yellow'"
                  variant="subtle"
                  size="sm"
                >
                  {{ post.published ? 'Published' : 'Draft' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-sm text-gray-400 hidden lg:table-cell">
                {{ post.date }}
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <UButton
                    :to="`/admin/posts/${post.id}/edit`"
                    color="primary"
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-pencil-square-20-solid"
                  />
                  <UButton
                    color="red"
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-trash-20-solid"
                    @click="confirmDelete(post)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0" class="text-center py-16">
        <UIcon name="i-heroicons-document-text-20-solid" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-400 mb-2">No posts yet</h2>
        <p class="text-gray-500 mb-6">Create your first blog post to get started.</p>
        <UButton to="/admin/posts/new" color="primary">
          Create First Post
        </UButton>
      </div>
    </UCard>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard class="bg-gray-900 border-gray-800">
        <template #header>
          <h3 class="text-lg font-semibold">Delete Post</h3>
        </template>

        <p class="text-gray-400">
          Are you sure you want to delete <strong class="text-white">{{ deletingPost?.title }}</strong>? This action cannot be undone.
        </p>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="white" variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton
              color="red"
              :loading="deleting"
              @click="onDelete"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

interface AdminPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  categoryColor: string
  author: string
  readTime: number
  published: boolean
  date: string
  createdAt: string
  updatedAt: string
}

const loading = ref(true)
const posts = ref<AdminPost[]>([])
const showDeleteModal = ref(false)
const deletingPost = ref<AdminPost | null>(null)
const deleting = ref(false)
const toast = useToast()

const stats = computed(() => ({
  total: posts.value.length,
  published: posts.value.filter(p => p.published).length,
  drafts: posts.value.filter(p => !p.published).length
}))

async function fetchPosts() {
  loading.value = true
  try {
    const result = await $fetch<{ posts: AdminPost[] }>('/api/admin/posts')
    posts.value = result.posts
  } catch (err: any) {
    if (err?.statusCode === 401) {
      await navigateTo('/admin/login')
    }
  } finally {
    loading.value = false
  }
}

function confirmDelete(post: AdminPost) {
  deletingPost.value = post
  showDeleteModal.value = true
}

async function onDelete() {
  if (!deletingPost.value) return
  deleting.value = true

  try {
    await $fetch(`/api/blog/${deletingPost.value.id}`, { method: 'DELETE' })
    posts.value = posts.value.filter(p => p.id !== deletingPost.value!.id)
    toast.add({
      title: 'Deleted',
      description: `"${deletingPost.value.title}" has been deleted.`,
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })
    showDeleteModal.value = false
  } catch {
    toast.add({
      title: 'Error',
      description: 'Failed to delete post.',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    deleting.value = false
    deletingPost.value = null
  }
}

async function onLogout() {
  try {
    await $fetch('/api/admin/auth', { method: 'DELETE' })
    await navigateTo('/admin/login')
  } catch {
    // ignore
  }
}

onMounted(fetchPosts)
</script>
