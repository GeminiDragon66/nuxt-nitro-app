interface AuthUser {
  id: string
  email: string
  name: string
}

// Reactive auth state
const user = ref<AuthUser | null>(null)
const loading = ref(true)

export function useAuth() {
  const toast = useToast()
  const runtimeConfig = useRuntimeConfig()

  async function fetchUser() {
    loading.value = true
    try {
      const result = await $fetch<{ user: AuthUser }>('/api/auth/me')
      user.value = result.user
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await $fetch<{ user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      user.value = result.user
      toast.add({
        title: 'Welcome!',
        description: 'Successfully logged in.',
        color: 'success',
        icon: 'i-heroicons-check-circle-20-solid'
      })
      return true
    } catch (err: any) {
      toast.add({
        title: 'Login failed',
        description: err?.data?.statusMessage || 'Please try again.',
        color: 'error',
        icon: 'i-heroicons-exclamation-circle-20-solid'
      })
      return false
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: { email, password, name }
      })
      toast.add({
        title: 'Account created!',
        description: 'You can now log in.',
        color: 'success',
        icon: 'i-heroicons-check-circle-20-solid'
      })
      return true
    } catch (err: any) {
      toast.add({
        title: 'Registration failed',
        description: err?.data?.statusMessage || 'Please try again.',
        color: 'error',
        icon: 'i-heroicons-exclamation-circle-20-solid'
      })
      return false
    }
  }

  async function logout() {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      toast.add({
        title: 'Logged out',
        color: 'info',
        icon: 'i-heroicons-check-circle-20-solid'
      })
      await navigateTo('/')
    } catch {
      // ignore
    }
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    fetchUser,
    login,
    register,
    logout
  }
}
