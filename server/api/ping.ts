export default defineEventHandler(async (event) => {
  return {
    status: 'ok',
    uptime: process.uptime(),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  }
})
