'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/shared/Header'
import { AuthModal } from '@/components/shared/Modals/AuthModal'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <AuthModal
        onClose={() => router.push('/')}
        defaultTab="signup"
      />
    </div>
  )
}
