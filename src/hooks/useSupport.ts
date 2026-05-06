import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSupportTicket,
  getSupportTickets,
  getSupportTicketDetail,
  addTicketMessage,
  closeTicket,
  getFAQ,
  getSupportContactInfo,
  type CreateTicketData,
} from '@/lib/api/support';

/**
 * Hook to create a support ticket
 */
export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketData) => createSupportTicket(data),
    onSuccess: () => {
      // Invalidate tickets list
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
    },
  });
}

/**
 * Hook to get support tickets
 */
export function useGetTickets(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['support-tickets', page, limit],
    queryFn: () => getSupportTickets(page, limit),
  });
}

/**
 * Hook to get ticket details
 */
export function useGetTicketDetail(ticketId: string) {
  return useQuery({
    queryKey: ['support-ticket', ticketId],
    queryFn: () => getSupportTicketDetail(ticketId),
    enabled: !!ticketId,
  });
}

/**
 * Hook to add message to ticket
 */
export function useAddTicketMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, message }: { ticketId: string; message: string }) =>
      addTicketMessage(ticketId, message),
    onSuccess: (_, variables) => {
      // Invalidate ticket detail to refresh messages
      queryClient.invalidateQueries({ queryKey: ['support-ticket', variables.ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
    },
  });
}

/**
 * Hook to close ticket
 */
export function useCloseTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId: string) => closeTicket(ticketId),
    onSuccess: (_, ticketId) => {
      // Invalidate both ticket detail and tickets list
      queryClient.invalidateQueries({ queryKey: ['support-ticket', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
    },
  });
}

/**
 * Hook to get FAQ
 */
export function useFAQ() {
  return useQuery({
    queryKey: ['faq'],
    queryFn: getFAQ,
    staleTime: 1000 * 60 * 30, // 30 minutes - FAQ doesn't change often
  });
}

/**
 * Hook to get support contact info
 */
export function useSupportContactInfo() {
  return useQuery({
    queryKey: ['support-contact-info'],
    queryFn: getSupportContactInfo,
    staleTime: 1000 * 60 * 60, // 1 hour - contact info rarely changes
  });
}
