export default defineEventHandler(async (event) => {
  const authenticated = isAdminAuthenticated(event)

  if (!authenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  return {
    authenticated: true
  }
})
