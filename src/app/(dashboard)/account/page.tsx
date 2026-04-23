'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import { DeleteAccountModal } from '@/components/shared/Modals/DeleteAccountModal'
import { UploadAvatarModal } from '@/components/shared/Modals/UploadAvatarModal'

export default function AccountPage() {
  const user = useAuthStore((state) => state.user)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-[#666]">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Account settings
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Manage your profile, password and billing
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <h2 className="text-[15px] font-bold text-[#111] mb-5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Profile
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#EE2B24] shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-white text-[20px] font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <button
              onClick={() => setShowAvatarModal(true)}
              className="px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:border-[#999] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Change photo
            </button>
            <p className="text-[11.5px] text-[#888] mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              JPG or PNG, max 2MB
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Full name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Username
              </label>
              <input type="text" defaultValue={user.username}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#888] outline-none bg-[#F8F8F8] cursor-not-allowed"
                disabled
                title="Username cannot be changed" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Email address
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Country
              </label>
              <input type="text" defaultValue={`${user.countryFlag} ${user.country}`}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Location (City)
              </label>
              <input type="text" placeholder="e.g. Lagos, Nairobi, Accra"
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
            </div>
          </div>
          {user.role === 'contributor' && user.isContributorApproved && (
            <>
              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself and your photography..."
                  rows={3}
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Website
                  </label>
                  <input type="url" placeholder="https://yourwebsite.com"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Instagram
                  </label>
                  <input type="text" placeholder="@username"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Twitter
                  </label>
                  <input type="text" placeholder="@username"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Facebook
                  </label>
                  <input type="text" placeholder="username or page"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center gap-3 pt-1">
            <button type="submit"
              className="px-6 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {saved ? '✓ Saved' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>



      {/* Password */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <h2 className="text-[15px] font-bold text-[#111] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Password
        </h2>
        <div className="flex flex-col gap-3">
          {['Current password', 'New password', 'Confirm new password'].map((label) => (
            <div key={label}>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {label}
              </label>
              <input type="password" placeholder="••••••••"
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
            </div>
          ))}
          <button className="self-start px-6 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors mt-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Update password
          </button>
        </div>
      </div>



      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h2 className="text-[15px] font-bold text-red-600 mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Danger zone
        </h2>
        <p className="text-[13px] text-[#666] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Permanently delete your account and all associated data.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-5 py-2.5 border border-red-300 text-red-600 text-[13.5px] font-semibold rounded-full hover:bg-red-50 transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Delete account
        </button>
      </div>

      {/* Modals */}
      {showAvatarModal && (
        <UploadAvatarModal
          currentAvatar={user.avatar}
          userName={user.name}
          onClose={() => setShowAvatarModal(false)}
          onUpload={(file) => {
            console.log('Uploading avatar:', file.name)
            // Handle avatar upload
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          userName={user.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            console.log('Account deleted')
            // Handle account deletion - redirect to login
            window.location.href = '/login'
          }}
        />
      )}
    </div>
  )
}
