import { setCookie, getCookie, deleteCookie } from 'h3'

interface AdminSession {
  authenticated: boolean
  timestamp: number
}

function createSessionToken(): string {
  const session: AdminSession = {
    authenticated: true,
    timestamp: Date.now()
  }
  return Buffer.from(JSON.stringify(session)).toString('base64')
}

function parseSessionToken(token: string): AdminSession | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const session = JSON.parse(decoded) as AdminSession
    // Session expires after 24 hours
    if (session.authenticated && Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
      return session
    }
    return null
  } catch {
    return null
  }
}

export function setAdminSession(event: any) {
  const token = createSessionToken()
  setCookie(event, 'admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })
}

export function clearAdminSession(event: any) {
  deleteCookie(event, 'admin_session', { path: '/' })
}

export function isAdminAuthenticated(event: any): boolean {
  const token = getCookie(event, 'admin_session')
  if (!token) return false
  return parseSessionToken(token) !== null
}
