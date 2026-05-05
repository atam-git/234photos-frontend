'use client'

import type { ReactNode } from 'react'
import { QueryProvider } from './QueryProvider'
import { AuthProvider } from './AuthProvider'
import { ToastProvider } from '../ui/toast-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  )
}
