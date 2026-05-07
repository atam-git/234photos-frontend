'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { tokenStore } from '@/lib/api'
import { Loader2 } from 'lucide-react'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUser = useAuthStore((state) => state.setUser)
  const hydrateFromToken = useAuthStore((state) => state.hydrateFromToken)

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (accessToken && refreshToken) {
      // Store tokens using tokenStore
      tokenStore.set({ accessToken, refreshToken })

      // Hydrate user from token
      hydrateFromToken()
        .then(() => {
          const user = useAuthStore.getState().user
          
          // Redirect based on user role
          if (user?.isContributor) {
            router.push('/dashboard')
          } else {
            router.push('/home')
          }
        })
        .catch((error) => {
          console.error('Failed to fetch user:', error)
          router.push('/login?error=auth_failed')
        })
    } else {
      // No tokens, redirect to login
      router.push('/login?error=no_tokens')
    }
  }, [searchParams, setUser, hydrateFromToken, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#EE2B24] animate-spin mx-auto mb-4" />
        <h2 className="text-[18px] font-bold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Completing sign in...
        </h2>
        <p className="text-[14px] text-[#666]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Please wait while we set up your account
        </p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
        <Loader2 className="w-12 h-12 text-[#EE2B24] animate-spin" />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
