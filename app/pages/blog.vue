<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Blog
      </h1>
      <p class="text-lg text-gray-400">
        Latest articles and updates about Nuxt and full-stack development
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="w-8 h-8 text-green-400 animate-spin" />
    </div>

    <!-- Blog Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard
        v-for="post in posts"
        :key="post.slug || post.title"
        class="bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
        :ui="{ body: { padding: 'p-0' } }"
        @click="navigateTo(`/blog/${post.slug}`)"
      >
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <UBadge :color="post.categoryColor" variant="subtle" size="sm">
              {{ post.category }}
            </UBadge>
            <span class="text-xs text-gray-500">{{ post.date }}</span>
          </div>

          <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2">{{ post.title }}</h3>
          <p class="text-sm text-gray-400 mb-4 line-clamp-3">{{ post.excerpt }}</p>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-800/50">
            <img
              :src="`https://api.dicebear.com/9.x/initials/svg?seed=${post.author}&backgroundColor=00dc82&textColor=ffffff`"
              :alt="post.author"
              class="w-8 h-8 rounded-full"
            />
            <div>
              <p class="text-sm font-medium text-gray-300">{{ post.author }}</p>
              <p class="text-xs text-gray-500">{{ post.readTime }} min read</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && posts.length === 0" class="text-center py-16">
      <UIcon name="i-heroicons-document-text-20-solid" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-400 mb-2">No posts yet</h2>
      <p class="text-gray-500">Check back later for new content.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  author: string
  readTime: number
}

const loading = ref(true)

// Start with empty array, will be populated from API or fallback
const posts = ref<BlogPost[]>([])

// Fallback static data if API is unavailable
const fallbackPosts: BlogPost[] = [
  {
    id: 0,
    slug: 'getting-started-nuxt-4',
    title: 'Getting Started with Nuxt 4: A Comprehensive Guide',
    excerpt: 'Learn how to set up your first Nuxt 4 project with the new directory structure, Nitro engine, and automatic imports. Everything you need to know to get started.',
    category: 'Getting Started',
    categoryColor: 'green',
    date: 'Jun 28, 2026',
    author: 'Alex',
    readTime: 8
  },
  {
    id: 0,
    slug: 'understanding-nitro-engine',
    title: 'Understanding the Nitro Engine in Nuxt 4',
    excerpt: 'Deep dive into the Nitro server engine that powers Nuxt 4. Learn about API routes, middleware, and hybrid rendering capabilities.',
    category: 'Nitro',
    categoryColor: 'blue',
    date: 'Jun 25, 2026',
    author: 'Sarah',
    readTime: 12
  },
  {
    id: 0,
    slug: 'building-uis-nuxt-ui-v4',
    title: 'Building Beautiful UIs with Nuxt UI v4',
    excerpt: 'Explore the modern component library that comes with Nuxt UI v4. Discover how to leverage Tailwind CSS v4 for stunning, accessible interfaces.',
    category: 'UI/UX',
    categoryColor: 'purple',
    date: 'Jun 22, 2026',
    author: 'Alex',
    readTime: 6
  },
  {
    id: 0,
    slug: 'fullstack-nuxt-4-nitro',
    title: 'Full-Stack Development with Nuxt 4 and Nitro',
    excerpt: 'Combine the power of Vue frontend with Nitro backend to build complete full-stack applications without leaving the Nuxt ecosystem.',
    category: 'Full-Stack',
    categoryColor: 'orange',
    date: 'Jun 18, 2026',
    author: 'Mike',
    readTime: 10
  },
  {
    id: 0,
    slug: 'typescript-best-practices-nuxt',
    title: 'TypeScript Best Practices for Nuxt Projects',
    excerpt: 'Improve your Nuxt development experience with TypeScript. Learn about type-safe routes, auto-generated types, and composable patterns.',
    category: 'TypeScript',
    categoryColor: 'indigo',
    date: 'Jun 15, 2026',
    author: 'Sarah',
    readTime: 7
  },
  {
    id: 0,
    slug: 'deploying-nuxt-4-edge',
    title: 'Deploying Nuxt 4 Applications to the Edge',
    excerpt: 'Learn how to deploy your Nuxt 4 apps to edge networks for optimal performance worldwide. Compare Vercel, Netlify, and Cloudflare options.',
    category: 'Deployment',
    categoryColor: 'teal',
    date: 'Jun 12, 2026',
    author: 'Mike',
    readTime: 9
  }
]

async function fetchPosts() {
  loading.value = true
  apiError.value = false

  try {
    const result = await $fetch<{ posts: BlogPost[] }>('/api/blog', {
      responseType: 'json'
    })

    if (result.posts && result.posts.length > 0) {
      posts.value = result.posts
    } else {
      // API returned no posts, show fallback
      posts.value = fallbackPosts
    }
  } catch {
    // API unavailable, use fallback data
    console.warn('Blog API unavailable, using static data')
    posts.value = fallbackPosts
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})

useSeoMeta({
  title: 'Blog - Nuxt 4 + Nitro App',
  description: 'Latest articles about Nuxt 4, Nitro engine, and full-stack web development'
})
</script>
