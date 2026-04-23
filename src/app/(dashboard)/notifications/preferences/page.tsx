'use client'

'use client'

import { useState } from 'react'
import { Bell, Mail, Smartphone, Check } from 'lucide-react'
import { NOTIFICATION_TYPES } from '@/lib/mock'
import Link from 'next/link'
import type { NotificationPreferences } from '@/types'

export default function NotificationPreferencesPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState<NotificationPreferences>({
    email: {
      downloads: true,
      likes: false,
      comments: true,
      follows: true,
      earnings: true,
      system: true,
    },
    push: {
      downloads: true,
      likes: true,
      comments: true,
      follows: true,
      earnings: true,
      system: false,
    },
    inApp: {
      downloads: true,
      likes: true,
      comments: true,
      follows: true,
      earnings: true,
      system: true,
    },
  })

  const handleToggle = (channel: keyof NotificationPreferences, type: keyof NotificationPreferences['email']) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type],
      },
    }))
  }

  const handleSave = () => {
    console.log('Saving notification preferences:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
                  <Smartphone className="w-4 h-4 inline mr-1" />
                  Push
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
                    <button
                      onClick={() => handleToggle('email', type.key)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors mx-auto ${
                        settings.email[type.key]
                          ? 'bg-[#EE2B24] text-white'
                          : 'bg-[#F0F0F0] text-[#888] hover:bg-[#E0E0E0]'
                      }`}>
                      {settings.email[type.key] && <Check className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleToggle('push', type.key)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors mx-auto ${
                        settings.push[type.key]
                          ? 'bg-[#EE2B24] text-white'
                          : 'bg-[#F0F0F0] text-[#888] hover:bg-[#E0E0E0]'
                      }`}>
                      {settings.push[type.key] && <Check className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleToggle('inApp', type.key)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors mx-auto ${
                        settings.inApp[type.key]
                          ? 'bg-[#EE2B24] text-white'
                          : 'bg-[#F0F0F0] text-[#888] hover:bg-[#E0E0E0]'
                      }`}>
                      {settings.inApp[type.key] && <Check className="w-5 h-5" />}
                    </button>
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
          <strong>Email:</strong> Sent to your registered email address · <strong>Push:</strong> Mobile and desktop notifications · <strong>In-App:</strong> Notifications within 234photos
        </p>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {saved ? '✓ Saved' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}
