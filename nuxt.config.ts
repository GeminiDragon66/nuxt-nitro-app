// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-30',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY
    }
  }
})
