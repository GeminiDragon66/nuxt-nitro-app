import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'supabase_session')

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  try {
    const supabase = useSupabaseServer()
    const { data, error } = await supabase.auth.getUser(accessToken)

    if (error || !data.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid session'
      })
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
        createdAt: data.user.created_at
      }
    }
  } catch (err: any) {
    if (err.statusCode) throw err
    console.error('Auth check error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
