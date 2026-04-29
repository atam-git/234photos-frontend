import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { authApi, tokenStore } from '@/lib/api'
import { toFrontendUser } from '@/lib/api/userAdapter'
import { MOCK_CUSTOMER_USER, MOCK_CONTRIBUTOR_USER } from '@/lib/mock/user'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  isLoading: boolean
  error: string | null

  /**
   * Legacy mock login (kept for back-compat with existing pages).
   * Pass a boolean to use mock users (no API call).
   * Pass `{ email, password }` to authenticate against the backend.
   */
  login: (
    arg?: boolean | { email: string; password: string },
  ) => Promise<void> | void

  signup: (input: {
    email: string
    name: string
    password: string
    intent?: 'customer' | 'contributor'
  }) => Promise<void>

  /** Hydrate `user` from `/auth/me` if a token exists. Called on app boot. */
  hydrateFromToken: () => Promise<void>

  setUser: (user: User | null) => void
  logout: () => void

  /** @deprecated mock-only — used by ContributorApplicationModal until migrated */
  switchToContributor: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      isLoading: false,
      error: null,

      login: async (arg) => {
        // Legacy mock path: `login()` or `login(true)`
        if (arg === undefined || typeof arg === 'boolean') {
          set({
            isLoggedIn: true,
            user: arg ? MOCK_CONTRIBUTOR_USER : MOCK_CUSTOMER_USER,
            isLoading: false,
            error: null,
          })
          return
        }

        // Real API login
        set({ isLoading: true, error: null })
        try {
          const res = await authApi.login(arg)
          tokenStore.set({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
          set({
            user: toFrontendUser(res.user),
            isLoggedIn: true,
            isLoading: false,
          })
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : 'Login failed',
          })
          throw err
        }
      },

      signup: async (input) => {
        set({ isLoading: true, error: null })
        try {
          const res = await authApi.signup(input)
          if ('accessToken' in res && 'refreshToken' in res) {
            tokenStore.set({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
            set({
              user: toFrontendUser(res.user),
              isLoggedIn: true,
              isLoading: false,
            })
          } else {
            // Contributor intent path: account created, awaiting application + verification
            set({
              user: toFrontendUser(res.user),
              isLoggedIn: false,
              isLoading: false,
            })
          }
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : 'Signup failed',
          })
          throw err
        }
      },

      hydrateFromToken: async () => {
        if (!tokenStore.getAccess()) return
        set({ isLoading: true })
        try {
          const me = await authApi.me()
          set({
            user: toFrontendUser(me),
            isLoggedIn: true,
            isLoading: false,
          })
        } catch {
          tokenStore.clear()
          set({ user: null, isLoggedIn: false, isLoading: false })
        }
      },

      setUser: (user) => set({ user, isLoggedIn: !!user }),

      logout: () => {
        tokenStore.clear()
        set({ user: null, isLoggedIn: false, error: null })
      },

      switchToContributor: () =>
        set({ isLoggedIn: true, user: MOCK_CONTRIBUTOR_USER }),
    }),
    {
      name: 'auth',
      // Only persist user/isLoggedIn flags; tokens live in tokenStore (localStorage already)
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    },
  ),
)
