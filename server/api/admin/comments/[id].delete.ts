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
      statusMessage: 'Valid comment ID is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', Number(id))

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete comment'
      })
    }

    return {
      success: true,
      message: 'Comment deleted'
    }
  } catch (err) {
    console.error('Comment delete error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
