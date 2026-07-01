export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid ID is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', Number(id))
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
        published: data.published,
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
    console.error('Admin post fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
