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

  const body = await readBody(event)

  if (typeof body.isApproved !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'isApproved boolean field is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { error } = await supabase
      .from('blog_comments')
      .update({ is_approved: body.isApproved })
      .eq('id', Number(id))

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update comment'
      })
    }

    return {
      success: true,
      message: body.isApproved ? 'Comment approved' : 'Comment rejected'
    }
  } catch (err) {
    console.error('Comment update error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
