export interface Invoice {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'draft' | 'paid' | 'void' | 'uncollectible'
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  paidAt?: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  pdfUrl: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  amount: number
}
