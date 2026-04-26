'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import type { SignupStep } from '@/types'
import { SPECIALTIES } from '@/lib/mock/marketing'

function SignupPageInner() {
  const searchParams = useSearchParams()
  const isContributorIntent = searchParams.get('intent') === 'contributor'
  
  const [step, setStep] = useState<SignupStep>('account')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [password, setPassword] = useState('password123')
  
  // Contributor form fields
  const [bio, setBio] = useState('Professional photographer based in Lagos, Nigeria with over 8 years of experience capturing authentic African stories through my lens. I specialize in documentary and lifestyle photography, focusing on everyday moments that showcase the vibrant culture and diversity of African communities.')
  const [location, setLocation] = useState('Lagos')
  const [country, setCountry] = useState('NG')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Business', 'Lifestyle', 'Portrait'])
  const [portfolio, setPortfolio] = useState('https://myportfolio.com')
  const [instagram, setInstagram] = useState('https://instagram.com/photographer')
  
  // Error handling
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/discover')
    }
  }, [isLoggedIn, router])

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          intent: isContributorIntent ? 'contributor' : 'customer'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle email already exists
        if (data.error === 'EMAIL_EXISTS_AS_CUSTOMER' && isContributorIntent) {
          // Smart redirect to login with contributor intent
          router.push(`/login?intent=contributor&email=${encodeURIComponent(email)}`)
          return
        }
        
        if (data.error === 'EMAIL_EXISTS') {
          setError(data.message || 'Email already registered. Please login.')
          return
        }

        setError(data.message || 'Signup failed. Please try again.')
        return
      }

      // Success - proceed based on intent
      if (isContributorIntent) {
        setStep('contributor')
      } else {
        // Regular customer signup - login and redirect
        login(false)
        router.push('/discover')
      }
      
    } catch (err) {
      console.error('Signup error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContributorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/contributor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          bio,
          location,
          country,
          specialties: selectedSpecialties,
          portfolioUrl: portfolio || null,
          instagram: instagram || null,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Application failed. Please try again.')
        return
      }

      // Success - show email verification screen
      setStep('verification')
      
    } catch (err) {
      console.error('Application error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendVerification = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      // Show success message
      alert('Verification email sent!')
    } catch (err) {
      console.error('Resend error:', err)
      alert('Failed to resend email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  const handleSocialSignup = (provider: string) => {
    console.log('Social signup:', provider)
    // Regular signup - login as customer
    login(false)
    router.push('/discover')
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex overflow-hidden">
      
      {/* Left side - Branding (desktop only) - FIXED */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 fixed left-0 top-0 bottom-0 bg-[#111] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-110" style={{ backgroundImage: 'url(/234photosb.png)' }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-md text-center relative z-10">
          <Link href="/" className="inline-block mb-8">
            <img src="/logo/234final1white.png" alt="234photos" className="h-16 mx-auto" />
          </Link>
          {isContributorIntent ? (
            <>
              <h1 className="text-4xl font-bold text-white mb-4">Start Earning Today</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Share your work. Earn royalties. Reach global buyers.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-white mb-4">Join 234photos</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Authentic African imagery at your fingertips.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side - Form - SCROLLABLE */}
      <div className="flex-1 lg:ml-[50%] overflow-y-auto">
        <div className="min-h-screen">
          <div className="w-full h-full relative">
          
          {/* Back button - Left side, outside form */}
          {step === 'contributor' && (
            <button
              onClick={() => setStep('account')}
              className="hidden lg:flex items-center gap-2 text-[#666] hover:text-[#111] text-[14px] font-medium transition-colors absolute left-8 top-8 z-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8 p-4">
            {step === 'contributor' && (
              <button
                onClick={() => setStep('account')}
                className="flex items-center gap-2 text-[#666] hover:text-[#111] text-[14px] font-medium transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <Link href="/" className="inline-block mb-4">
              <img src="/logo/234final1black.png" alt="234photos" className="h-10 mx-auto" />
            </Link>
            {isContributorIntent ? (
              <>
                <h1 className="text-2xl font-bold text-[#111] mb-2">Become a Contributor</h1>
                <p className="text-[#666] text-[14px]">Start earning from your photography</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-[#111] mb-2">Create your account</h1>
                <p className="text-[#666] text-[14px]">Join thousands of creators and buyers</p>
              </>
            )}
          </div>

          {/* Form card */}
          <div className="bg-white h-full flex flex-col justify-center p-8 lg:p-16 max-w-[560px] mx-auto w-full">
          
          {/* Social signup - Only show on account step */}
          {step === 'account' && (
            <>
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('google')}
              className="w-full h-11 flex items-center justify-center gap-3 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F7] transition-colors text-[14px] font-medium text-[#111]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleSocialSignup('facebook')}
              className="w-full h-11 flex items-center justify-center gap-3 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F7] transition-colors text-[14px] font-medium text-[#111]"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E8E8]" />
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="bg-white px-3 text-[#888]">Or sign up with email</span>
            </div>
          </div>
          </>
          )}

          {/* Email/Password form - Step 1: Account */}
          {step === 'account' && (
            <form onSubmit={handleAccountSubmit} className="space-y-4">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-11 pl-10 pr-4 border border-[#D0D0D0] rounded-lg text-[14px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-4 border border-[#D0D0D0] rounded-lg text-[14px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full h-11 pl-10 pr-11 border border-[#D0D0D0] rounded-lg text-[14px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#666]"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-[12px] text-[#666] leading-relaxed">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-[#EE2B24] hover:text-[#d42520]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#EE2B24] hover:text-[#d42520]">
                Privacy Policy
              </Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#EE2B24] hover:bg-[#d42520] text-white font-semibold rounded-lg transition-colors text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Please wait...' : (isContributorIntent ? 'Continue' : 'Create account')}
            </button>
          </form>
          )}

          {/* Step 2: Contributor Form */}
          {step === 'contributor' && (
            <form onSubmit={handleContributorSubmit} className="space-y-5">
              <div className="mb-2">
                <h3 className="text-[18px] font-bold text-[#111] mb-1">
                  Contributor Application
                </h3>
                <p className="text-[13px] text-[#666]">
                  Complete your profile to start uploading and earning
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              {/* Bio */}
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-2">
                  About you <span className="text-[#EE2B24]">*</span>
                </label>
                <textarea
                  required
                  minLength={50}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your photography background and what makes your work unique..."
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent resize-none disabled:opacity-50"
                />
                <p className="text-[11px] text-[#888] mt-1">
                  {bio.length}/50 characters minimum
                </p>
              </div>

              {/* Location & Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold text-[#111] mb-2">
                    City <span className="text-[#EE2B24]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Lagos"
                    disabled={isSubmitting}
                    className="w-full h-10 px-4 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#111] mb-2">
                    Country <span className="text-[#EE2B24]">*</span>
                  </label>
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full h-10 px-4 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="KE">Kenya</option>
                    <option value="ZA">South Africa</option>
                    <option value="EG">Egypt</option>
                    <option value="ET">Ethiopia</option>
                    <option value="TZ">Tanzania</option>
                    <option value="UG">Uganda</option>
                    <option value="SN">Senegal</option>
                    <option value="CI">Côte d'Ivoire</option>
                  </select>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-2">
                  Specialties <span className="text-[#EE2B24]">*</span> 
                  <span className="text-[#888]"> (select at least 2)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      disabled={isSubmitting}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all disabled:opacity-50 ${
                        selectedSpecialties.includes(specialty)
                          ? 'bg-[#EE2B24] text-white'
                          : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-2">
                  Portfolio <span className="text-[#888]">(optional)</span>
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://myportfolio.com"
                  disabled={isSubmitting}
                  className="w-full h-10 px-4 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent disabled:opacity-50"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-2">
                  Instagram <span className="text-[#888]">(optional)</span>
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/username"
                  disabled={isSubmitting}
                  className="w-full h-10 px-4 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#EE2B24] focus:border-transparent disabled:opacity-50"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!bio || bio.length < 50 || !location || !country || selectedSpecialties.length < 2 || isSubmitting}
                className="w-full h-11 bg-[#EE2B24] hover:bg-[#d42520] text-white font-semibold rounded-lg transition-colors text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}

          {/* Step 3: Email Verification */}
          {step === 'verification' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>

              <div>
                <h3 className="text-[20px] font-bold text-[#111] mb-2">
                  Check Your Email
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  We've sent a verification link to:
                </p>
                <p className="text-[14px] font-semibold text-[#111] mt-1">
                  {email}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="text-[13px] text-blue-900 leading-relaxed">
                  Click the link in the email to verify your account and activate your contributor status. 
                  The link expires in 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-[13px] text-[#666]">
                  Didn't receive the email?
                </p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isSubmitting}
                  className="text-[14px] text-[#EE2B24] hover:text-[#d42520] font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Resend verification email'}
                </button>
              </div>

              <div className="pt-4 border-t">
                <Link 
                  href="/login" 
                  className="text-[13px] text-[#666] hover:text-[#111]"
                >
                  Back to login
                </Link>
              </div>
            </div>
          )}

          {/* Login link - Only show on account step */}
          {step === 'account' && (
            <p className="text-center text-[13px] text-[#666] mt-6">
              Already have an account?{' '}
              <Link 
                href={isContributorIntent ? '/login?intent=contributor' : '/login'} 
                className="text-[#EE2B24] hover:text-[#d42520] font-semibold"
              >
                Log in
              </Link>
            </p>
          )}

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center"><div className="text-[#666]">Loading...</div></div>}>
      <SignupPageInner />
    </Suspense>
  )
}
