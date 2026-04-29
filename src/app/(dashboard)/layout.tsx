'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

/**
 * Dashboard layout: rendered ONLY on the client (`ssr: false`) so Zustand can
 * read auth state from `localStorage` synchronously on the very first render.
 * No spinner, no flash, no "Restricted Access" message on reload.
 *
 * Trade-off: the dashboard tree is not server-rendered. That's fine for a
 * logged-in app surface (Linear / Notion / Figma all do this).
 */
const DashboardLayoutClient = dynamic(
  () => import('./DashboardLayoutClient'),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </Suspense>
  )
}
