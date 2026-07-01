export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, 'postId')

  if (!postId || isNaN(Number(postId))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid post ID is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { data, error } = await supabase
      .from('blog_comments')
      .select('id, author_name, content, created_at')
      .eq('post_id', Number(postId))
      .eq('is_approved', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Comments fetch error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch comments'
      })
    }

    const comments = (data || []).map((c) => ({
      id: c.id,
      authorName: c.author_name,
      content: c.content,
      date: new Date(c.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }))

    return { comments }
  } catch (err) {
    console.error('Comments fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
