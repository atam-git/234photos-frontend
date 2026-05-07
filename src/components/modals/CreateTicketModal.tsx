'use client'

import { useState } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { useCreateTicket } from '@/hooks/useSupport'
import { useToast } from '@/components/ui/toast-provider'

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (ticketId: string) => void
}

export default function CreateTicketModal({ isOpen, onClose, onSuccess }: CreateTicketModalProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('TECHNICAL')
  const { showToast } = useToast()

  const { mutate: createTicket, isPending: isCreating } = useCreateTicket()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createTicket(
      {
        subject,
        message,
        category,
        priority: 'NORMAL',
      },
      {
        onSuccess: (data) => {
          setSubject('')
          setMessage('')
          setCategory('TECHNICAL')
          onSuccess(data.id)
          onClose()
        },
        onError: (error: any) => {
          showToast('error', error.response?.data?.message || 'Failed to create ticket. Please try again.')
        },
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-[20px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create Support Ticket
          </h2>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#111] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <option value="TECHNICAL">Technical Issue</option>
                <option value="BILLING">Billing & Payments</option>
                <option value="CONTENT">Content & Licensing</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What do you need help with?"
                required
                minLength={5}
                maxLength={200}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                required
                minLength={10}
                maxLength={5000}
                rows={8}
                className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all resize-none"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <p className="text-[11px] text-[#888] mt-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {message.length}/5000 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-[#F0F0F0]">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="flex-1 py-3 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
