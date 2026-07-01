import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters')
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
      .from('contact_messages')
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save message'
      })
    }

    return {
      success: true,
      message: 'Message sent successfully',
      data
    }
  } catch (err) {
    console.error('Contact submit error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
