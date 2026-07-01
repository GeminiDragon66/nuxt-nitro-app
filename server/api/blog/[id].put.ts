import { z } from 'zod'

const bodySchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().optional(),
  category: z.string().min(1).optional(),
  categoryColor: z.string().optional(),
  author: z.string().optional(),
  readTime: z.number().int().positive().optional(),
  published: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid ID is required'
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

    // Map camelCase to snake_case for database columns
    const updateData: Record<string, unknown> = {}
    if (parsed.data.title !== undefined) updateData.title = parsed.data.title
    if (parsed.data.slug !== undefined) updateData.slug = parsed.data.slug
    if (parsed.data.excerpt !== undefined) updateData.excerpt = parsed.data.excerpt
    if (parsed.data.content !== undefined) updateData.content = parsed.data.content
    if (parsed.data.category !== undefined) updateData.category = parsed.data.category
    if (parsed.data.categoryColor !== undefined) updateData.category_color = parsed.data.categoryColor
    if (parsed.data.author !== undefined) updateData.author = parsed.data.author
    if (parsed.data.readTime !== undefined) updateData.read_time = parsed.data.readTime
    if (parsed.data.published !== undefined) updateData.published = parsed.data.published

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', Number(id))
      .select('id, title, slug, updated_at')
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update blog post',
        data: error
      })
    }

    return {
      success: true,
      message: 'Blog post updated',
      data
    }
  } catch (err) {
    console.error('Blog post update error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
