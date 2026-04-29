/**
 * In-memory + localStorage backed token store.
 * Kept outside of React/Zustand so the API client can read tokens
 * during request interception without coupling to UI state.
 */

const ACCESS_KEY = '234p_access'
const REFRESH_KEY = '234p_refresh'

let accessToken: string | null = null
let refreshToken: string | null = null
let hydrated = false

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  try {
    accessToken = window.localStorage.getItem(ACCESS_KEY)
    refreshToken = window.localStorage.getItem(REFRESH_KEY)
  } catch {
    // ignore
  }
  hydrated = true
}

export const tokenStore = {
  getAccess(): string | null {
    hydrate()
    return accessToken
  },
  getRefresh(): string | null {
    hydrate()
    return refreshToken
  },
  set(tokens: { accessToken: string; refreshToken: string }) {
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ACCESS_KEY, tokens.accessToken)
      window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken)
    }
  },
  clear() {
    accessToken = null
    refreshToken = null
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ACCESS_KEY)
      window.localStorage.removeItem(REFRESH_KEY)
    }
  },
}
