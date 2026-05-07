/**
 * Cookie consent management utilities
 */

export type CookieConsent = {
  necessary: boolean // Always true
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_CONSENT_KEY = '234photos_cookie_consent'
const COOKIE_CONSENT_VERSION = '1.0'

/**
 * Get current cookie consent preferences
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)
    if (data.version !== COOKIE_CONSENT_VERSION) return null

    return data.consent
  } catch {
    return null
  }
}

/**
 * Save cookie consent preferences
 */
export function setCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        version: COOKIE_CONSENT_VERSION,
        consent,
        timestamp: new Date().toISOString(),
      })
    )

    // Apply consent immediately
    applyConsent(consent)
  } catch (error) {
    console.error('Failed to save cookie consent:', error)
  }
}

/**
 * Check if user has given consent
 */
export function hasGivenConsent(): boolean {
  return getCookieConsent() !== null
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  setCookieConsent({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  })
}

/**
 * Accept only necessary cookies
 */
export function acceptNecessaryCookies(): void {
  setCookieConsent({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })
}

/**
 * Apply consent settings (enable/disable tracking scripts)
 */
function applyConsent(consent: CookieConsent): void {
  // Analytics (Google Analytics, etc.)
  if (consent.analytics) {
    enableAnalytics()
  } else {
    disableAnalytics()
  }

  // Marketing (Facebook Pixel, Google Ads, etc.)
  if (consent.marketing) {
    enableMarketing()
  } else {
    disableMarketing()
  }

  // Preferences (theme, language, etc.)
  if (consent.preferences) {
    enablePreferences()
  } else {
    disablePreferences()
  }
}

/**
 * Enable analytics tracking
 */
function enableAnalytics(): void {
  // TODO: Initialize Google Analytics or other analytics tools
  console.log('Analytics enabled')
  
  // Example: Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'granted'
  //   })
  // }
}

/**
 * Disable analytics tracking
 */
function disableAnalytics(): void {
  console.log('Analytics disabled')
  
  // Example: Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'denied'
  //   })
  // }
}

/**
 * Enable marketing tracking
 */
function enableMarketing(): void {
  console.log('Marketing enabled')
  
  // Example: Facebook Pixel, Google Ads
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('consent', 'grant')
  // }
}

/**
 * Disable marketing tracking
 */
function disableMarketing(): void {
  console.log('Marketing disabled')
  
  // Example: Facebook Pixel, Google Ads
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('consent', 'revoke')
  // }
}

/**
 * Enable preferences cookies
 */
function enablePreferences(): void {
  console.log('Preferences enabled')
}

/**
 * Disable preferences cookies
 */
function disablePreferences(): void {
  console.log('Preferences disabled')
}

/**
 * Reset cookie consent (for testing)
 */
export function resetCookieConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(COOKIE_CONSENT_KEY)
}
