import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { MOCK_CUSTOMER_USER, MOCK_CONTRIBUTOR_USER } from '@/lib/mock/user'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  login: (asContributor?: boolean) => void
  logout: () => void
  switchToContributor: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (asContributor = false) => 
        set({ 
          isLoggedIn: true, 
          user: asContributor ? MOCK_CONTRIBUTOR_USER : MOCK_CUSTOMER_USER 
        }),
      logout: () => set({ isLoggedIn: false, user: null }),
      switchToContributor: () => 
        set({ 
          isLoggedIn: true, 
          user: MOCK_CONTRIBUTOR_USER 
        }),
    }),
    { name: 'auth' }
  )
)

