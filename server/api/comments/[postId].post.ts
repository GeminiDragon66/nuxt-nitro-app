import { z } from 'zod'

const bodySchema = z.object({
  authorName: z.string().min(2, 'Name must be at least 2 characters'),
  authorEmail: z.string().email('Invalid email address'),
  content: z.string().min(3, 'Comment must be at least 3 characters').max(2000, 'Comment is too long')
})

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, 'postId')

  if (!postId || isNaN(Number(postId))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid post ID is required'
    })
  }

  const body = await readBody(event)
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten().fieldErrors
    })
  }

  try {
    const supabase = useSupabaseServer()

    // Verify the post exists and is published
    const { data: post } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', Number(postId))
      .eq('published', true)
      .single()

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }

    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: Number(postId),
        author_name: parsed.data.authorName,
        author_email: parsed.data.authorEmail,
        content: parsed.data.content,
        is_approved: false
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('Comment insert error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to submit comment'
      })
    }

    return {
      success: true,
      message: 'Comment submitted for approval',
      data
    }
  } catch (err) {
    console.error('Comment submit error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
