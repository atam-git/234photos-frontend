'use client'

import { useRouter } from 'next/navigation'
import { AuthModal } from '@/components/shared/Modals/AuthModal'

export default function SignupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AuthModal
        onClose={() => router.push('/')}
        defaultTab="signup"
      />
    </div>
  )
}
