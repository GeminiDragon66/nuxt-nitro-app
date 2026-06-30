export default defineEventHandler(async (event) => {
  return {
    message: 'Hello from Nuxt Nitro!',
    timestamp: new Date().toISOString(),
    framework: 'Nuxt 4.4.8',
    engine: 'Nitro 2.13.4'
  }
})
