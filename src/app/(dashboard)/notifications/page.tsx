'use client'

import { Download, Upload, LayoutGrid, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useNotifications, useMarkAllNotificationsAsRead } from '@/hooks/useNotifications'
import { useToast } from '@/components/ui/toast-provider'

// Icon mapping for notification types
const NOTIFICATION_ICONS: Record<string, { emoji: string; bg: string }> = {
  ASSET_APPROVED: { emoji: '✅', bg: '#E8F5E9' },
  ASSET_REJECTED: { emoji: '❌', bg: '#FFEBEE' },
  DOWNLOAD_COMPLETED: { emoji: '⬇️', bg: '#E3F2FD' },
  SALE_MADE: { emoji: '💰', bg: '#FFF3E0' },
  PAYOUT_PROCESSED: { emoji: '💳', bg: '#F3E5F5' },
  FOLLOW_NEW: { emoji: '👤', bg: '#E0F2F1' },
  LIKE: { emoji: '❤️', bg: '#FCE4EC' },
  KYC_APPROVED: { emoji: '✓', bg: '#E8F5E9' },
  KYC_REJECTED: { emoji: '✗', bg: '#FFEBEE' },
  SYSTEM_ANNOUNCEMENT: { emoji: '📢', bg: '#FFF9C4' },
}

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications(1, 50, false)
  const { mutate: markAllAsRead, isPending: isMarkingAllRead } = useMarkAllNotificationsAsRead()
  const { showToast } = useToast()

  const notifications = data?.data || []
  const unreadCount = data?.unreadCount || 0
  const hasUnread = unreadCount > 0

  const handleMarkAllAsRead = () => {
    markAllAsRead(undefined, {
      onSuccess: () => {
        showToast('success', 'All notifications marked as read')
      },
      onError: () => {
        showToast('error', 'Failed to mark notifications as read')
      },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EE2B24] text-white text-[11px] font-bold">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Stay updated with your activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/notifications/preferences"
            className="px-4 py-2 text-[13px] font-semibold text-[#111] hover:bg-[#F8F8F8] rounded-lg transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Preferences
          </Link>
          <button 
            onClick={handleMarkAllAsRead}
            disabled={!hasUnread || isMarkingAllRead}
            className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#EE2B24] hover:bg-[#FFF0F0] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {isMarkingAllRead ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Marking...
              </>
            ) : (
              'Mark all as read'
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#EE2B24]" />
        </div>
      )}

      {/* Notifications List */}
      {!isLoading && notifications.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
          {notifications.map((notification) => {
            const iconConfig = NOTIFICATION_ICONS[notification.type] || { emoji: '📬', bg: '#F5F5F5' }
            
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 px-5 py-4 border-b border-[#F8F8F8] last:border-b-0 transition-colors ${
                  !notification.isRead ? 'bg-[#FFFAFA]' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0`} style={{ backgroundColor: iconConfig.bg }}>
                  <span className="text-[18px]">{iconConfig.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#111] leading-snug mb-1"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <span className="font-semibold">{notification.title}</span>
                    {notification.message && <> {notification.message}</>}
                  </p>
                  <p className="text-[12px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {new Date(notification.createdAt).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EE2B24] shrink-0 mt-2" />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && notifications.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-[#BBBBBB]" />
          </div>
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            You&apos;re all caught up!
          </p>
          <p className="text-[13px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No new notifications
          </p>
        </div>
      )}
    </div>
  )
}
