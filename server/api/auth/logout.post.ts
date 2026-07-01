import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'supabase_session', { path: '/' })

  return {
    success: true,
    message: 'Logged out successfully'
  }
})
