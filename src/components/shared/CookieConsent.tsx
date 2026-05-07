'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie, Settings } from 'lucide-react'
import { 
  hasGivenConsent, 
  acceptAllCookies, 
  acceptNecessaryCookies,
  setCookieConsent,
  getCookieConsent,
  type CookieConsent as CookieConsentType
} from '@/lib/cookies'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookieConsentType>({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  })

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = hasGivenConsent()
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setIsVisible(false)
  }

  const handleDecline = () => {
    acceptNecessaryCookies()
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    setCookieConsent(preferences)
    setIsVisible(false)
  }

  const togglePreference = (key: keyof CookieConsentType) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[9998] animate-in fade-in duration-300" />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:max-w-[480px] bg-[#1A1A1A] border-t md:border border-[#2A2A2A] md:rounded-2xl shadow-2xl z-[9999] animate-in slide-in-from-bottom duration-300">
        
        {/* Simple Banner View */}
        {!showSettings ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EE2B24]/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-[#EE2B24]" />
                </div>
                <h3 className="text-white text-[18px] font-bold"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  We use cookies
                </h3>
              </div>
            </div>

            {/* Content */}
            <p className="text-[#999] text-[14px] leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              We use cookies to personalise content, run analytics, and improve your experience. By continuing you agree to our{' '}
              <Link href="/cookies" className="text-[#EE2B24] hover:text-[#d42520] underline">
                Cookie Policy
              </Link>.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Accept all
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-6 py-3 bg-[#2A2A2A] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Decline
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-3 bg-[#2A2A2A] text-white rounded-full hover:bg-[#333] transition-colors"
                aria-label="Cookie settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Settings View */
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-white text-[18px] font-bold mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Cookie preferences
                </h3>
                <p className="text-[#999] text-[13px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Choose which cookies you want to accept
                </p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[#999] hover:text-white transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-4 mb-6">
              {/* Necessary */}
              <div className="bg-[#222] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white text-[15px] font-bold mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Necessary cookies
                    </h4>
                    <p className="text-[#999] text-[12px] leading-relaxed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Essential for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-[#EE2B24] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-60">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-[#222] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white text-[15px] font-bold mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Analytics cookies
                    </h4>
                    <p className="text-[#999] text-[12px] leading-relaxed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className="ml-4"
                    aria-label="Toggle analytics cookies"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics ? 'bg-[#EE2B24] justify-end' : 'bg-[#444] justify-start'
                    } px-1`}>
                      <div className="w-4 h-4 bg-white rounded-full transition-transform" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Marketing */}
              <div className="bg-[#222] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white text-[15px] font-bold mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Marketing cookies
                    </h4>
                    <p className="text-[#999] text-[12px] leading-relaxed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Used to deliver personalized advertisements.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className="ml-4"
                    aria-label="Toggle marketing cookies"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing ? 'bg-[#EE2B24] justify-end' : 'bg-[#444] justify-start'
                    } px-1`}>
                      <div className="w-4 h-4 bg-white rounded-full transition-transform" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-[#222] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white text-[15px] font-bold mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Preference cookies
                    </h4>
                    <p className="text-[#999] text-[12px] leading-relaxed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Remember your preferences like language and region.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('preferences')}
                    className="ml-4"
                    aria-label="Toggle preference cookies"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.preferences ? 'bg-[#EE2B24] justify-end' : 'bg-[#444] justify-start'
                    } px-1`}>
                      <div className="w-4 h-4 bg-white rounded-full transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Save preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-[#2A2A2A] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Accept all
              </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-[#666] text-[12px] mt-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Learn more in our{' '}
              <Link href="/cookies" className="text-[#EE2B24] hover:text-[#d42520] underline">
                Cookie Policy
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
