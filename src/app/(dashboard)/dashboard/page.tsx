import { redirect } from 'next/navigation'
import { MOCK_USER } from '@/lib/mock/user'

export default function DashboardIndex() {
  // Redirect to the right default section based on role
  if (MOCK_USER.role === 'contributor' && MOCK_USER.isContributorApproved) {
    redirect('/dashboard/overview')
  }
  redirect('/dashboard/downloads')
}
