export interface SupportTicket {
  id: string
  userId: string
  subject: string
  message: string
  category: 'technical' | 'billing' | 'content' | 'account' | 'other'
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  attachments?: string[]
  createdAt: string
  updatedAt: string
  resolvedAt?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  category: string
  questions: FAQItem[]
}

export interface ContactOption {
  icon: string
  title: string
  description: string
  action: string
  available: string
}
