'use client'

import { useState } from 'react'
import { Ticket, Clock, CheckCircle, XCircle, AlertCircle, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useGetTickets } from '@/hooks/useSupport'
import { formatDistanceToNow } from 'date-fns'
import CreateTicketModal from '@/components/modals/CreateTicketModal'
import TicketSuccessModal from '@/components/modals/TicketSuccessModal'

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

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdTicketId, setCreatedTicketId] = useState<string>('')
  
  const { data: ticketsData, isLoading } = useGetTickets()

  const tickets = ticketsData?.data || []

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleTicketCreated = (ticketId: string) => {
    setCreatedTicketId(ticketId)
    setShowSuccessModal(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Support Tickets
          </h1>
          <p className="text-[14px] text-[#666]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            View and manage your support requests
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              className="w-full h-[42px] pl-10 pr-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <option value="all">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WAITING_USER">Waiting for You</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-[#CCC]" />
          </div>
          <h3 className="text-[16px] font-bold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {searchQuery || statusFilter !== 'all' ? 'No tickets found' : 'No support tickets yet'}
          </h3>
          <p className="text-[13px] text-[#666] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your filters'
              : 'Create your first support ticket to get help'}
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <Plus className="w-4 h-4" />
              Create Ticket
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const statusConfig = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG]
            const StatusIcon = statusConfig.icon
            const priorityConfig = PRIORITY_CONFIG[ticket.priority as keyof typeof PRIORITY_CONFIG]
            const categoryConfig = CATEGORY_CONFIG[ticket.category as keyof typeof CATEGORY_CONFIG]

            return (
              <Link
                key={ticket.id}
                href={`/support/tickets/${ticket.id}`}
                className="block bg-white rounded-2xl border border-[#F0F0F0] p-6 hover:border-[#EE2B24] hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-bold text-[#111] mb-2 truncate"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {ticket.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusConfig.color}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>

                      {/* Category */}
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${categoryConfig.color}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {categoryConfig.label}
                      </span>

                      {/* Priority */}
                      <span className={`text-[11px] font-semibold ${priorityConfig.color}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {priorityConfig.label} Priority
                      </span>
                    </div>
                  </div>

                  {/* Ticket ID */}
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Ticket ID
                    </p>
                    <p className="text-[12px] font-mono font-semibold text-[#111]">
                      {ticket.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
                  <p className="text-[12px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Created {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                  </p>
                  <p className="text-[12px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Updated {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleTicketCreated}
      />

      {/* Success Modal */}
      <TicketSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        ticketId={createdTicketId}
      />
    </div>
  )
}
