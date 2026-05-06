'use client'

import { useState, useEffect } from 'react'
import { Bell, Mail, Smartphone, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useNotificationPreferences, useUpdateNotificationPreferences } from '@/hooks/useNotifications'
import { useToast } from '@/components/ui/toast-provider'
import type { NotificationPreferences } from '@/lib/api/notifications'

const NOTIFICATION_TYPES = [
  { key: 'sales' as const, label: 'Sales & Earnings', desc: 'When you make a sale or receive earnings', email: true, inApp: true },
  { key: 'uploads' as const, label: 'Upload Updates', desc: 'Asset approval, rejection, and upload status', email: true, inApp: true },
  { key: 'likes' as const, label: 'Likes', desc: 'When someone likes your content', email: false, inApp: true },
  { key: 'follows' as const, label: 'New Followers', desc: 'When someone follows you', email: false, inApp: true },
  { key: 'weekly' as const, label: 'Weekly Summary', desc: 'Weekly performance summary email', email: true, inApp: false },
  { key: 'marketing' as const, label: 'Marketing & Updates', desc: 'Product updates and promotional emails', email: true, inApp: false },
]

export default function NotificationPreferencesPage() {
  const { data: preferences, isLoading } = useNotificationPreferences()
  const { mutate: updatePreferences, isPending: isSaving } = useUpdateNotificationPreferences()
  const { showToast } = useToast()
  const [settings, setSettings] = useState<NotificationPreferences | null>(null)

  // Initialize settings from API data
  useEffect(() => {
    if (preferences) {
      setSettings(preferences)
    }
  }, [preferences])

  const handleToggle = (channel: 'email' | 'inApp', key: string) => {
    if (!settings) return

    setSettings(prev => {
      if (!prev) return prev
      return {
        ...prev,
        [channel]: {
          ...prev[channel],
          [key]: !prev[channel][key as keyof typeof prev[typeof channel]],
        },
      }
    })
  }

  const handleSave = () => {
    if (!settings) return

    updatePreferences(settings, {
      onSuccess: () => {
        showToast('success', 'Notification preferences saved')
      },
      onError: () => {
        showToast('error', 'Failed to save preferences')
      },
    })
  }

  if (isLoading || !settings) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Notification Preferences
          </h1>
        </div>
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#EE2B24]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/notifications"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#111] transition-colors mb-3"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          ← Back to Notifications
        </Link>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Notification Preferences
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Choose how you want to be notified
        </p>
      </div>

      {/* Preferences table */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                <th className="text-left px-5 py-4 text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Notification Type
                </th>
                <th className="text-center px-4 py-4 text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </th>
                <th className="text-center px-4 py-4 text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Bell className="w-4 h-4 inline mr-1" />
                  In-App
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F8F8]">
              {NOTIFICATION_TYPES.map((type) => (
                <tr key={type.key} className="hover:bg-[#F8F8F8] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-[13.5px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {type.label}
                    </p>
                    <p className="text-[12px] text-[#888] mt-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {type.desc}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {type.email ? (
                      <button
                        onClick={() => handleToggle('email', type.key)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors mx-auto ${
                          settings.email[type.key as keyof typeof settings.email]
                            ? 'bg-[#EE2B24] text-white'
                            : 'bg-[#F0F0F0] text-[#888] hover:bg-[#E0E0E0]'
                        }`}>
                        {settings.email[type.key as keyof typeof settings.email] && <Check className="w-5 h-5" />}
                      </button>
                    ) : (
                      <span className="text-[#CCC]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {type.inApp ? (
                      <button
                        onClick={() => handleToggle('inApp', type.key)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors mx-auto ${
                          settings.inApp[type.key as keyof typeof settings.inApp]
                            ? 'bg-[#EE2B24] text-white'
                            : 'bg-[#F0F0F0] text-[#888] hover:bg-[#E0E0E0]'
                        }`}>
                        {settings.inApp[type.key as keyof typeof settings.inApp] && <Check className="w-5 h-5" />}
                      </button>
                    ) : (
                      <span className="text-[#CCC]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-[#F8F8F8] rounded-xl">
        <p className="text-[12px] text-[#666] leading-relaxed"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          <strong>Email:</strong> Sent to your registered email address · <strong>In-App:</strong> Notifications within 234photos
        </p>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </button>
      </div>
    </div>
  )
}
