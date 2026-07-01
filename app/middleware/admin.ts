export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check for login page
  if (to.path === '/admin/login') {
    return
  }

  try {
    await $fetch('/api/admin/auth/check')
  } catch {
    return navigateTo('/admin/login')
  }
})
