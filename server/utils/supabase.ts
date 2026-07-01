import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function useSupabaseServer() {
  if (supabaseClient) return supabaseClient

  const config = useRuntimeConfig()
  const url = config.supabaseUrl as string
  const serviceKey = config.supabaseServiceKey as string

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase environment variables. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_SERVICE_KEY.')
  }

  supabaseClient = createClient(url, serviceKey)
  return supabaseClient
}
