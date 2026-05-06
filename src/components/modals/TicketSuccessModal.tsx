'use client'

import { CheckCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TicketSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  ticketId: string
}

export default function TicketSuccessModal({ isOpen, onClose, ticketId }: TicketSuccessModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleViewTicket = () => {
    router.push(`/support/tickets/${ticketId}`)
    onClose()
  }

  const handleViewAllTickets = () => {
    router.push('/support/tickets')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888] hover:text-[#111] transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-[20px] font-extrabold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Ticket Created Successfully!
          </h2>
          <p className="text-[14px] text-[#666] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Your support ticket has been submitted.
          </p>
          <p className="text-[13px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            We'll get back to you within 24 hours.
          </p>
        </div>

        {/* Ticket ID */}
        <div className="bg-[#F8F8F8] rounded-xl p-3 mb-6 text-center">
          <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Ticket ID
          </p>
          <p className="text-[13px] font-mono font-semibold text-[#111]">
            {ticketId.slice(0, 8).toUpperCase()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleViewTicket}
            className="w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            View Ticket
          </button>
          <button
            onClick={handleViewAllTickets}
            className="w-full py-3 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            View All Tickets
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-[#666] text-[13px] font-medium hover:text-[#111] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
