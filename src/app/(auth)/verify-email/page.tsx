'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useVerifyEmail, useResendVerification } from '@/hooks/useContributor'
import { useAuthStore } from '@/stores/authStore'
import { tokenStore } from '@/lib/api/tokenStore'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const setUser = useAuthStore((state) => state.setUser)
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  
  const { mutate: verifyEmail } = useVerifyEmail()
  const { mutate: resendVerification, isPending: isResending } = useResendVerification()

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('Invalid verification link. Please check your email for the correct link.')
      return
    }

    // Verify email with token
    verifyEmail(token, {
      onSuccess: (response) => {
        setStatus('success')
        
        // Auto-login with returned tokens
        if (response.accessToken && response.refreshToken) {
          // Store tokens
          tokenStore.set({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          })
          
          // Update user in store (convert types to match User interface)
          setUser({
            ...response.user,
            avatar: response.user.avatar || undefined,
            role: response.user.role as 'customer' | 'contributor' | 'admin',
            country: response.user.country || undefined,
            countryFlag: response.user.countryFlag || undefined,
            contributorTier: response.user.contributorTier as 'bronze' | 'silver' | 'gold' | 'platinum' | undefined,
          })
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push('/dashboard?contributor_activated=true')
          }, 2000)
        }
      },
      onError: (error: any) => {
        setStatus('error')
        setErrorMessage(
          error.response?.data?.message || 
          'Verification failed. The link may have expired or is invalid.'
        )
      },
    })
  }, [token, verifyEmail, setUser, router])

  const handleResend = () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    resendVerification(email, {
      onSuccess: () => {
        alert('Verification email sent! Please check your inbox.')
      },
      onError: (error: any) => {
        alert(error.response?.data?.message || 'Failed to resend verification email')
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {status === 'verifying' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-[#EE2B24] animate-spin mx-auto mb-4" />
            <h1
              className="text-[24px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Verifying your email...
            </h1>
            <p
              className="text-[14px] text-[#666]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Please wait while we verify your account
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1
              className="text-[24px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Email Verified!
            </h1>
            <p
              className="text-[14px] text-[#666] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Your contributor account is now active. Redirecting to dashboard...
            </p>
            <div className="flex items-center justify-center gap-2 text-[#EE2B24]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[13px]">Redirecting...</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1
              className="text-[24px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Verification Failed
            </h1>
            <p
              className="text-[14px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {errorMessage}
            </p>

            {/* Resend verification */}
            <div className="border-t border-[#F0F0F0] pt-6">
              <p
                className="text-[13px] text-[#666] mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Need a new verification link?
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-[13px] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-lg hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Resend'
                  )}
                </button>
              </div>
            </div>

            {/* Back to home */}
            <button
              onClick={() => router.push('/')}
              className="mt-4 text-[13px] text-[#666] hover:text-[#EE2B24] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] to-white flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#EE2B24] animate-spin mx-auto mb-4" />
          <p className="text-[#888]">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
