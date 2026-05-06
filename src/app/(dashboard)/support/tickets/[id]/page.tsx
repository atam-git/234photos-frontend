'use client'

import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle, XCircle, AlertCircle, Clock, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useGetTicketDetail, useAddTicketMessage, useCloseTicket } from '@/hooks/useSupport'
import { formatDistanceToNow, format } from 'date-fns'
import { useToast } from '@/components/ui/toast-provider'

const STATUS_CONFIG = {
  OPEN: { label: 'Open', color: 'text-blue-700 bg-blue-50', icon: AlertCircle },
  IN_PROGRESS: { label: 'In Progress', color: 'text-yellow-700 bg-yellow-50', icon: Clock },
  WAITING_USER: { label: 'Waiting for You', color: 'text-orange-700 bg-orange-50', icon: Clock },
  RESOLVED: { label: 'Resolved', color: 'text-green-700 bg-green-50', icon: CheckCircle },
  CLOSED: { label: 'Closed', color: 'text-gray-700 bg-gray-50', icon: XCircle },
}

const PRIORITY_CONFIG = {
  LOW: { label: 'Low', color: 'text-gray-600' },
  NORMAL: { label: 'Normal', color: 'text-blue-600' },
  HIGH: { label: 'High', color: 'text-orange-600' },
  URGENT: { label: 'Urgent', color: 'text-red-600' },
}

const CATEGORY_CONFIG = {
  TECHNICAL: { label: 'Technical', color: 'bg-purple-50 text-purple-700' },
  BILLING: { label: 'Billing', color: 'bg-green-50 text-green-700' },
  CONTENT: { label: 'Content', color: 'bg-blue-50 text-blue-700' },
  OTHER: { label: 'Other', color: 'bg-gray-50 text-gray-700' },
}

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ticketId = params.id as string
  const [newMessage, setNewMessage] = useState('')
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)

  const { data: ticket, isLoading } = useGetTicketDetail(ticketId)
  const { mutate: addMessage, isPending: isSending } = useAddTicketMessage()
  const { mutate: closeTicket, isPending: isClosing } = useCloseTicket()
  const { showToast } = useToast()

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    addMessage(
      { ticketId, message: newMessage },
      {
        onSuccess: () => {
          setNewMessage('')
          showToast('success', 'Message sent successfully')
        },
        onError: () => {
          showToast('error', 'Failed to send message')
        },
      }
    )
  }

  const handleCloseTicket = () => {
    closeTicket(ticketId, {
      onSuccess: () => {
        setShowCloseConfirm(false)
        showToast('success', 'Ticket closed successfully')
        router.push('/support/tickets')
      },
      onError: () => {
        showToast('error', 'Failed to close ticket')
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-[16px] text-[#666] mb-4">Ticket not found</p>
        <Link
          href="/support/tickets"
          className="text-[14px] text-[#EE2B24] font-semibold hover:underline">
          Back to Tickets
        </Link>
      </div>
    )
  }

  const statusConfig = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG]
  const StatusIcon = statusConfig.icon
  const priorityConfig = PRIORITY_CONFIG[ticket.priority as keyof typeof PRIORITY_CONFIG]
  const categoryConfig = CATEGORY_CONFIG[ticket.category as keyof typeof CATEGORY_CONFIG]
  const isClosed = ticket.status === 'CLOSED'

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/support/tickets"
          className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#EBEBEB] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#111]" />
        </Link>
        <div className="flex-1">
          <h1 className="text-[24px] font-extrabold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {ticket.subject}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusConfig.color}`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${categoryConfig.color}`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {categoryConfig.label}
            </span>
            <span className={`text-[11px] font-semibold ${priorityConfig.color}`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {priorityConfig.label} Priority
            </span>
          </div>
        </div>
        {!isClosed && (
          <button
            onClick={() => setShowCloseConfirm(true)}
            className="px-4 py-2 bg-[#F5F5F5] text-[#111] text-[13px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Close Ticket
          </button>
        )}
      </div>

      {/* Ticket Info */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Ticket ID
            </p>
            <p className="text-[13px] font-mono font-semibold text-[#111]">
              {ticket.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Created
            </p>
            <p className="text-[13px] font-semibold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Last Updated
            </p>
            <p className="text-[13px] font-semibold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Messages
            </p>
            <p className="text-[13px] font-semibold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {ticket.messages?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <h2 className="text-[16px] font-bold text-[#111] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Conversation
        </h2>

        <div className="space-y-4 mb-6">
          {ticket.messages && ticket.messages.length > 0 ? (
            ticket.messages.map((message) => {
              const isFromUser = !!message.fromUserId
              const isFromAdmin = !!message.fromAdminId

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isFromUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isFromAdmin ? 'bg-[#EE2B24] text-white' : 'bg-[#F5F5F5] text-[#111]'
                  }`}>
                    <span className="text-[14px] font-bold"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {isFromAdmin ? 'S' : message.fromUser?.name?.charAt(0) || 'U'}
                    </span>
                  </div>

                  {/* Message */}
                  <div className={`flex-1 ${isFromUser ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-[13px] font-semibold text-[#111] ${isFromUser ? 'ml-auto' : ''}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {isFromAdmin ? 'Support Team' : message.fromUser?.name || 'You'}
                      </p>
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                      isFromUser
                        ? 'bg-[#EE2B24] text-white'
                        : 'bg-[#F8F8F8] text-[#111]'
                    }`}>
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-[13px] text-[#888] text-center py-8">
              No messages yet
            </p>
          )}
        </div>

        {/* Reply Form */}
        {!isClosed && (
          <form onSubmit={handleSendMessage} className="border-t border-[#F0F0F0] pt-4">
            <div className="flex gap-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                disabled={isSending}
                className="flex-1 px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all resize-none disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className="h-[42px] px-5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 self-end"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {isClosed && (
          <div className="border-t border-[#F0F0F0] pt-4">
            <p className="text-[13px] text-[#888] text-center">
              This ticket is closed. You cannot add new messages.
            </p>
          </div>
        )}
      </div>

      {/* Close Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowCloseConfirm(false)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#111] transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-[18px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Close Ticket?
            </h3>
            <p className="text-[14px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Are you sure you want to close this ticket? You won't be able to add new messages after closing.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCloseConfirm(false)}
                className="flex-1 py-2.5 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Cancel
              </button>
              <button
                onClick={handleCloseTicket}
                disabled={isClosing}
                className="flex-1 py-2.5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {isClosing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Closing...
                  </>
                ) : (
                  'Close Ticket'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
