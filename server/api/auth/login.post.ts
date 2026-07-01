import { z } from 'zod'
import { setCookie } from 'h3'

const bodySchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password
    })

    if (error) {
      throw createError({
        statusCode: 401,
        statusMessage: error.message === 'Invalid login credentials'
          ? 'Invalid email or password'
          : error.message
      })
    }

    // Set session cookie
    if (data.session) {
      setCookie(event, 'supabase_session', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    return {
      success: true,
      message: 'Logged in successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    }
  } catch (err: any) {
    if (err.statusCode) throw err
    console.error('Login error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
