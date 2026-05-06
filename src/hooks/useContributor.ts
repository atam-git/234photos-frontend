import { useMutation } from '@tanstack/react-query';
import { authApi, type ContributorApplicationPayload } from '@/lib/api/auth';

/**
 * Hook to submit contributor application
 */
export function useApplyContributor() {
  return useMutation({
    mutationFn: (data: ContributorApplicationPayload) => authApi.applyContributor(data),
  });
}

/**
 * Hook to verify email with token
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
  });
}

/**
 * Hook to resend verification email
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerification(email),
  });
}
