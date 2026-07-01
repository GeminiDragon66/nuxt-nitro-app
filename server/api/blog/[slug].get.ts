export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    return {
      post: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        categoryColor: data.category_color,
        author: data.author,
        readTime: data.read_time,
        date: new Date(data.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    }
  } catch (err) {
    console.error('Blog post fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
