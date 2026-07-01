export default defineEventHandler(async (event) => {
  // Check authentication
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch blog posts'
      })
    }

    const posts = (data || []).map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      categoryColor: post.category_color,
      author: post.author,
      readTime: post.read_time,
      published: post.published,
      date: new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      createdAt: post.created_at,
      updatedAt: post.updated_at
    }))

    return { posts }
  } catch (err) {
    console.error('Admin posts fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
