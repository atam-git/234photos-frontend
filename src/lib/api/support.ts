import { api } from './client';

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
  isInternal: boolean;
  fromUserId?: string;
  fromAdminId?: string;
  fromUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  fromAdmin?: {
    id: string;
    name: string;
  };
}

export interface SupportTicketDetail extends SupportTicket {
  messages: SupportMessage[];
}

export interface CreateTicketData {
  subject: string;
  message: string;
  category: string;
  priority?: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export interface SupportContactInfo {
  email: string;
  responseTime: string;
}

/**
 * Create a new support ticket
 */
export async function createSupportTicket(data: CreateTicketData): Promise<SupportTicket> {
  return api.post('/support/tickets', data);
}

/**
 * Get user's support tickets
 */
export async function getSupportTickets(page: number = 1, limit: number = 20): Promise<{ data: SupportTicket[]; total: number; page: number; limit: number }> {
  return api.get('/support/tickets', { query: { page, limit } });
}

/**
 * Get ticket details with messages
 */
export async function getSupportTicketDetail(ticketId: string): Promise<SupportTicketDetail> {
  return api.get(`/support/tickets/${ticketId}`);
}

/**
 * Add message to ticket
 */
export async function addTicketMessage(ticketId: string, message: string): Promise<SupportMessage> {
  return api.post(`/support/tickets/${ticketId}/messages`, { message });
}

/**
 * Close ticket
 */
export async function closeTicket(ticketId: string): Promise<SupportTicket> {
  return api.post(`/support/tickets/${ticketId}/close`);
}

/**
 * Get support contact information
 */
export async function getSupportContactInfo(): Promise<SupportContactInfo> {
  return api.get('/support/contact-info');
}

/**
 * Get FAQ items
 */
export async function getFAQ(): Promise<FAQCategory[]> {
  return api.get('/support/faq');
}
