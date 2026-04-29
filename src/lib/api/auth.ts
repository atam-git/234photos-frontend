import { api } from './client'

/**
 * Backend user response (matches UserResponseDto from backend)
 * After Section 2 alignment, this now includes all fields frontend needs
 */
export interface BackendUser {
  id: string
  email: string
  name: string
  username: string
  avatar?: string | null
  role: string  // Normalized to lowercase: 'customer' | 'contributor' | 'admin'
  country?: string | null
  countryFlag?: string | null  // Computed by backend
  credits: number
  joinedYear: number  // Computed by backend
  isContributor: boolean
  emailVerified: boolean
  contributorTier?: string | null  // Normalized to lowercase: 'bronze' | 'silver' | 'gold' | 'platinum'
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  email: string
  name: string
  password: string
  intent?: 'customer' | 'contributor'
}

export interface ContributorApplicationPayload {
  email: string
  bio: string
  location: string
  country: string
  specialties: string[]
  portfolioUrl?: string
  instagram?: string
}

export type AuthResponse = AuthTokens & { user: BackendUser }

export const authApi = {
  login: (body: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', body, { skipAuth: true }),

  signup: (body: SignupPayload) =>
    api.post<AuthResponse | { user: BackendUser; message: string; requiresProfileCompletion: true }>(
      '/auth/signup',
      body,
      { skipAuth: true },
    ),

  refresh: (refreshToken: string) =>
    api.post<AuthTokens>('/auth/refresh', { refreshToken }, { skipAuth: true }),

  me: () => api.get<BackendUser>('/auth/me'),

  applyContributor: (body: ContributorApplicationPayload) =>
    api.post<{ success: boolean; message: string }>(
      '/auth/contributor/apply',
      body,
      { skipAuth: true },
    ),

  verifyEmail: (token: string) =>
    api.get<AuthTokens & { success: boolean; message: string; redirectTo: string }>(
      '/auth/verify-email',
      { query: { token }, skipAuth: true },
    ),

  resendVerification: (email: string) =>
    api.post<{ success: boolean; message: string }>(
      '/auth/resend-verification',
      { email },
      { skipAuth: true },
    ),
}
