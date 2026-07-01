export default defineNuxtRouteMiddleware(async (to) => {
  // Allow login and register pages without auth
  if (to.path.startsWith('/auth/login') || to.path.startsWith('/auth/register')) {
    return
  }

  try {
    await $fetch('/api/auth/me')
  } catch {
    return navigateTo('/auth/login')
  }
})
