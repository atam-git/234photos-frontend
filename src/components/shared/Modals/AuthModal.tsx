'use client'

import { X, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ModalBackdrop } from './ModalBackdrop'

interface AuthModalProps {
  onClose: () => void
  defaultTab?: 'login' | 'signup'
}

export function AuthModal({ onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[420px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <img src="/logo3.jpeg" alt="234photos" className="h-7 w-auto" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Title */}
          <h2
            className="text-[22px] font-bold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p
            className="text-[13px] text-[#666] mb-5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {tab === 'login'
              ? 'Sign in to download and save assets.'
              : 'Join 100K+ African creators and buyers.'}
          </p>

          {/* Social buttons */}
          <div className="flex flex-col gap-2.5 mb-5">
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-[#D0D0D0] rounded-full text-[13.5px] font-medium text-[#111] hover:bg-[#F5F5F7] transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-[#D0D0D0] rounded-full text-[13.5px] font-medium text-[#111] hover:bg-[#F5F5F7] transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 0C4.029 0 0 4.029 0 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm2.25 4.5h-1.5C9.336 4.5 9 4.836 9 5.25V6.75h2.25L11.025 9H9v6.75H6.75V9H5.25V6.75H6.75V5.25C6.75 3.594 8.094 2.25 9.75 2.25H11.25V4.5z" fill="#1877F2"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#E8E8E8]" />
            <span className="text-[12px] text-[#999]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>or</span>
            <div className="flex-1 h-px bg-[#E8E8E8]" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            {tab === 'signup' && (
              <div>
                <label className="block text-[12px] font-semibold text-[#444] mb-1.5" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adaeze Okafor"
                  className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder-[#BBB] outline-none focus:border-[#111] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-semibold text-[#444] mb-1.5" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder-[#BBB] outline-none focus:border-[#111] transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#444]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Password
                </label>
                {tab === 'login' && (
                  <a href="#" className="text-[12px] text-[#EE2B24] font-medium hover:underline" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[42px] px-4 pr-11 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder-[#BBB] outline-none focus:border-[#111] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#444] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {tab === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Switch tab */}
          <p
            className="text-center text-[13px] text-[#666] mt-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              className="text-[#EE2B24] font-semibold hover:underline"
            >
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </ModalBackdrop>
  )
}
