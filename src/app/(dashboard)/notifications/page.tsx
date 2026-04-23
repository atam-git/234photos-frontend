'use client'

import { useState } from 'react'
import { Download, Upload, LayoutGrid, Check } from 'lucide-react'
import { MOCK_NOTIFICATIONS } from '@/lib/mock/notifications'
import Link from 'next/link'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const hasUnread = notifications.some(n => !n.isRead)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Notifications
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
            onClick={markAllAsRead}
            disabled={!hasUnread}
            className="px-4 py-2 text-[13px] font-semibold text-[#EE2B24] hover:bg-[#FFF0F0] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        {notifications.map((notification) => {
          return (
            <Link
              key={notification.id}
              href={notification.link || '#'}
              className={`flex items-start gap-4 px-5 py-4 border-b border-[#F8F8F8] last:border-b-0 transition-colors ${
                !notification.isRead ? 'bg-[#FFFAFA] hover:bg-[#FFF5F5]' : 'hover:bg-[#F8F8F8]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0`} style={{ backgroundColor: notification.iconBg }}>
                <span className="text-[18px]">{notification.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#111] leading-snug mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <span className="font-semibold">{notification.title}</span> {notification.message}
                </p>
                <p className="text-[12px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {notification.time}
                </p>
              </div>
              {!notification.isRead && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#EE2B24] shrink-0 mt-2" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Empty state (if no notifications) */}
      {notifications.length === 0 && (
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
