import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, type UpdateProfilePayload, type UpdatePasswordPayload, type UpdateAvatarPayload, type DeleteAccountPayload } from '@/lib/api/users';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook to fetch profile completion status
 */
export function useProfileCompletion() {
  return useQuery({
    queryKey: ['profile-completion'],
    queryFn: () => usersApi.getProfileCompletion(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => usersApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update auth store (convert null to undefined)
      setUser({
        ...updatedUser,
        avatar: updatedUser.avatar || undefined,
        role: updatedUser.role as 'customer' | 'contributor' | 'admin',
        country: updatedUser.country || undefined,
        countryFlag: updatedUser.countryFlag || undefined,
        contributorTier: updatedUser.contributorTier as 'bronze' | 'silver' | 'gold' | 'platinum' | undefined,
      });
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['profile-completion'] });
    },
  });
}

/**
 * Hook to update password
 */
export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordPayload) => usersApi.updatePassword(data),
  });
}

/**
 * Hook to update avatar
 */
export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateAvatarPayload) => usersApi.updateAvatar(data),
    onSuccess: (updatedUser) => {
      // Update auth store (convert null to undefined)
      setUser({
        ...updatedUser,
        avatar: updatedUser.avatar || undefined,
        role: updatedUser.role as 'customer' | 'contributor' | 'admin',
        country: updatedUser.country || undefined,
        countryFlag: updatedUser.countryFlag || undefined,
        contributorTier: updatedUser.contributorTier as 'bronze' | 'silver' | 'gold' | 'platinum' | undefined,
      });
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

/**
 * Hook to delete account
 */
export function useDeleteAccount() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: (data: DeleteAccountPayload) => usersApi.deleteAccount(data),
    onSuccess: () => {
      // Logout and redirect
      logout();
    },
  });
}
