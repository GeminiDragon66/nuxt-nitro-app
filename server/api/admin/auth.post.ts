export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const adminPassword = config.adminPassword as string

  if (!adminPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin password not configured'
    })
  }

  const body = await readBody(event)
  const { password } = body || {}

  if (!password || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid admin password'
    })
  }

  setAdminSession(event)

  return {
    success: true,
    message: 'Authenticated successfully'
  }
})
