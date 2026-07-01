export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  try {
    const supabase = useSupabaseServer()

    // Fetch comments with post info via two queries for reliability
    const { data: commentsData, error: commentsError } = await supabase
      .from('blog_comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (commentsError) {
      console.error('Admin comments fetch error:', commentsError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch comments'
      })
    }

    if (!commentsData || commentsData.length === 0) {
      return { comments: [] }
    }

    // Fetch related post titles
    const postIds = [...new Set(commentsData.map((c) => c.post_id))]
    const { data: postsData } = await supabase
      .from('blog_posts')
      .select('id, title, slug')
      .in('id', postIds)

    const postMap = new Map((postsData || []).map((p) => [p.id, { title: p.title, slug: p.slug }]))

    const comments = commentsData.map((c) => ({
      id: c.id,
      authorName: c.author_name,
      authorEmail: c.author_email,
      content: c.content,
      isApproved: c.is_approved,
      postId: c.post_id,
      postTitle: postMap.get(c.post_id)?.title || 'Unknown',
      postSlug: postMap.get(c.post_id)?.slug || '',
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
    console.error('Admin comments fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
