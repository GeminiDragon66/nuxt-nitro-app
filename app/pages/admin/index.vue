<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p class="text-gray-400 mt-1">Manage your blog posts and comments</p>
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

    <!-- Tabs -->
    <div class="flex gap-1 mb-6 border-b border-gray-800/50">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px]"
        :class="activeTab === tab.key ? 'text-white border-green-400' : 'text-gray-500 border-transparent hover:text-gray-300'"
        @click="activeTab = tab.key"
      >
        <span class="flex items-center gap-2">
          <UIcon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
          <UBadge v-if="tab.count" :color="tab.badgeColor" variant="subtle" size="xs" class="ml-1">
            {{ tab.count }}
          </UBadge>
        </span>
      </button>
    </div>

    <!-- Posts Tab -->
    <template v-if="activeTab === 'posts'">
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
    </template>

    <!-- Comments Tab -->
    <template v-if="activeTab === 'comments'">
      <UCard class="bg-gray-900/50 border-gray-800">
        <div v-if="commentLoading" class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path-20-solid" class="w-6 h-6 text-green-400 animate-spin" />
        </div>

        <template v-else-if="comments.length > 0">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-800">
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Post</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="comment in comments"
                  :key="comment.id"
                  class="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td class="py-3 px-4">
                    <div>
                      <p class="text-sm font-medium text-white">{{ comment.authorName }}</p>
                      <p class="text-xs text-gray-500">{{ comment.authorEmail }}</p>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <p class="text-sm text-gray-400 line-clamp-2 max-w-[250px]">{{ comment.content }}</p>
                  </td>
                  <td class="py-3 px-4 hidden md:table-cell">
                    <span class="text-sm text-gray-400">{{ comment.postTitle }}</span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-500 hidden lg:table-cell">{{ comment.date }}</td>
                  <td class="py-3 px-4">
                    <UBadge
                      :color="comment.isApproved ? 'green' : 'yellow'"
                      variant="subtle"
                      size="sm"
                    >
                      {{ comment.isApproved ? 'Approved' : 'Pending' }}
                    </UBadge>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <UButton
                        v-if="!comment.isApproved"
                        color="green"
                        variant="ghost"
                        size="sm"
                        icon="i-heroicons-check-20-solid"
                        :loading="commentActionLoading === String(comment.id)"
                        @click="approveComment(comment)"
                      />
                      <UButton
                        v-if="comment.isApproved"
                        color="yellow"
                        variant="ghost"
                        size="sm"
                        icon="i-heroicons-x-mark-20-solid"
                        :loading="commentActionLoading === String(comment.id)"
                        @click="rejectComment(comment)"
                      />
                      <UButton
                        color="red"
                        variant="ghost"
                        size="sm"
                        icon="i-heroicons-trash-20-solid"
                        :loading="commentActionLoading === 'del-' + comment.id"
                        @click="deleteComment(comment)"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-20-solid" class="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p class="text-gray-500">No comments yet.</p>
        </div>
      </UCard>
    </template>

    <!-- Delete Post Confirmation Modal -->
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

interface AdminComment {
  id: number
  authorName: string
  authorEmail: string
  content: string
  isApproved: boolean
  postId: number
  postTitle: string
  postSlug: string
  date: string
}

const loading = ref(true)
const posts = ref<AdminPost[]>([])
const showDeleteModal = ref(false)
const deletingPost = ref<AdminPost | null>(null)
const deleting = ref(false)
const toast = useToast()

// Tabs
const activeTab = ref<'posts' | 'comments'>('posts')

// Comments
const comments = ref<AdminComment[]>([])
const commentLoading = ref(false)
const commentActionLoading = ref<string | null>(null)

const stats = computed(() => ({
  total: posts.value.length,
  published: posts.value.filter(p => p.published).length,
  drafts: posts.value.filter(p => !p.published).length
}))

const pendingComments = computed(() =>
  comments.value.filter(c => !c.isApproved).length
)

const tabs = computed(() => [
  { key: 'posts' as const, label: 'Posts', icon: 'i-heroicons-document-text-20-solid', count: stats.value.total, badgeColor: 'gray' as const },
  { key: 'comments' as const, label: 'Comments', icon: 'i-heroicons-chat-bubble-left-right-20-solid', count: pendingComments.value, badgeColor: 'yellow' as const }
])

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

async function fetchComments() {
  commentLoading.value = true
  try {
    const result = await $fetch<{ comments: AdminComment[] }>('/api/admin/comments')
    comments.value = result.comments
  } catch {
    // silent
  } finally {
    commentLoading.value = false
  }
}

async function approveComment(comment: AdminComment) {
  commentActionLoading.value = String(comment.id)
  try {
    await $fetch(`/api/admin/comments/${comment.id}`, {
      method: 'PUT',
      body: { isApproved: true }
    })
    comment.isApproved = true
    toast.add({
      title: 'Comment approved',
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })
  } catch {
    toast.add({
      title: 'Failed to approve comment',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    commentActionLoading.value = null
  }
}

async function rejectComment(comment: AdminComment) {
  commentActionLoading.value = String(comment.id)
  try {
    await $fetch(`/api/admin/comments/${comment.id}`, {
      method: 'PUT',
      body: { isApproved: false }
    })
    comment.isApproved = false
    toast.add({
      title: 'Comment rejected',
      color: 'warning',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } catch {
    toast.add({
      title: 'Failed to reject comment',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    commentActionLoading.value = null
  }
}

async function deleteComment(comment: AdminComment) {
  commentActionLoading.value = 'del-' + String(comment.id)
  try {
    await $fetch(`/api/admin/comments/${comment.id}`, { method: 'DELETE' })
    comments.value = comments.value.filter(c => c.id !== comment.id)
    toast.add({
      title: 'Comment deleted',
      color: 'success',
      icon: 'i-heroicons-trash-20-solid'
    })
  } catch {
    toast.add({
      title: 'Failed to delete comment',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    commentActionLoading.value = null
  }
}

onMounted(() => {
  fetchPosts()
  fetchComments()
})
</script>
