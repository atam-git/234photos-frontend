import { api } from './client'
import type { BackendUser } from './auth'

export interface UpdateProfilePayload {
  name?: string
  email?: string
  country?: string
  location?: string
  bio?: string
  portfolioUrl?: string
  instagram?: string
  twitter?: string
  facebook?: string
}

export interface UpdatePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface UpdateAvatarPayload {
  avatarUrl: string
}

export interface DeleteAccountPayload {
  password: string
  reason?: string
}

export interface ProfileField {
  name: string
  label: string
  completed: boolean
  required: boolean
}

export interface ProfileCompletion {
  completionPercentage: number
  completedRequired: number
  totalRequired: number
  isComplete: boolean
  fields: ProfileField[]
}

export const usersApi = {
  updateProfile: (body: UpdateProfilePayload) =>
    api.patch<BackendUser>('/users/me', body),

  updatePassword: (body: UpdatePasswordPayload) =>
    api.patch<{ success: boolean; message: string }>('/users/me/password', body),

  updateAvatar: (body: UpdateAvatarPayload) =>
    api.patch<BackendUser>('/users/me/avatar', body),

  deleteAccount: (body: DeleteAccountPayload) =>
    api.delete<{ success: boolean; message: string }>('/users/me', body),

  getProfileCompletion: () =>
    api.get<ProfileCompletion>('/users/me/profile-completion'),

  getByUsername: (username: string) =>
    api.get<BackendUser>(`/users/${username}`),
}
