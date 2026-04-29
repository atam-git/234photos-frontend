'use client'

import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function AuthProvider({ children }: { children: ReactNode }) {
  const hydrateFromToken = useAuthStore((s) => s.hydrateFromToken)

  useEffect(() => {
    void hydrateFromToken()
  }, [hydrateFromToken])

  return <>{children}</>
}
