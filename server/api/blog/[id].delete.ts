export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid ID is required'
    })
  }

  try {
    const supabase = useSupabaseServer()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', Number(id))

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete blog post',
        data: error
      })
    }

    return {
      success: true,
      message: 'Blog post deleted'
    }
  } catch (err) {
    console.error('Blog post delete error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
