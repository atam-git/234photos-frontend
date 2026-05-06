import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';

/**
 * Hook to fetch dashboard stats
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch top performing assets
 */
export function useTopAssets(limit: number = 4) {
  return useQuery({
    queryKey: ['dashboard', 'top-assets', limit],
    queryFn: () => dashboardApi.getTopAssets(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch recent activity
 */
export function useRecentActivity(limit: number = 5) {
  return useQuery({
    queryKey: ['dashboard', 'recent-activity', limit],
    queryFn: () => dashboardApi.getRecentActivity(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
