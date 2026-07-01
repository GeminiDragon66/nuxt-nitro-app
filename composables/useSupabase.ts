import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function useSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const anonKey = config.public.supabaseAnonKey as string

  if (!url || !anonKey) {
    throw new Error('Missing Supabase environment variables. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_ANON_KEY.')
  }

  supabaseClient = createClient(url, anonKey)
  return supabaseClient
}
