import { z } from 'zod'

const bodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().default(''),
  category: z.string().min(1, 'Category is required'),
  categoryColor: z.string().default('green'),
  author: z.string().default('Admin'),
  readTime: z.number().int().positive().default(5),
  published: z.boolean().default(false)
})

export default defineEventHandler(async (event) => {
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

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        category: parsed.data.category,
        category_color: parsed.data.categoryColor,
        author: parsed.data.author,
        read_time: parsed.data.readTime,
        published: parsed.data.published
      })
      .select('id, title, slug, created_at')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create blog post',
        data: error
      })
    }

    return {
      success: true,
      message: 'Blog post created',
      data
    }
  } catch (err) {
    console.error('Blog post create error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
