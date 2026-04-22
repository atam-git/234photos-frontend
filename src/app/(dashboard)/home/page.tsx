'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

export default function DashboardIndex() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (user) {
      if (user.role === 'contributor' && user.isContributorApproved) {
        router.push('/dashboard')
      } else {
        router.push('/discover')
      }
    }
  }, [user, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-4xl">⏳</div>
        <p className="text-[#666]">Redirecting...</p>
      </div>
    </div>
  )
}
