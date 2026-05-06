'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useMe } from '@/hooks/useMe'
import { useUpdateProfile, useUpdatePassword, useDeleteAccount } from '@/hooks/useUsers'
import { useToast } from '@/components/ui/toast-provider'
import { DeleteAccountModal } from '@/components/shared/Modals/DeleteAccountModal'
import { UploadAvatarModal } from '@/components/shared/Modals/UploadAvatarModal'
import { ProfileUpdateSuccessModal } from '@/components/shared/Modals/ProfileUpdateSuccessModal'

export default function AccountPage() {
  const router = useRouter()
  const { data: user, isLoading, error } = useMe()
  const { showToast } = useToast()
  
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile()
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword()
  const { mutate: deleteAccount, isPending: isDeletingAccount } = useDeleteAccount()
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    country: '',
    location: '',
    bio: '',
    portfolioUrl: '',
    instagram: '',
    twitter: '',
    facebook: '',
  })

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Update form fields when user data loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        country: user.country || '',
        location: (user as any).location || '',
        bio: (user as any).bio || '',
        portfolioUrl: (user as any).portfolioUrl || '',
        instagram: (user as any).instagram || '',
        twitter: (user as any).twitter || '',
        facebook: (user as any).facebook || '',
      })
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-[#666]">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl text-red-500">⚠️</div>
          <p className="text-[#666]">Failed to load profile</p>
          <p className="text-[13px] text-red-500 mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  const isContributor = user.role === 'contributor' && user.isContributor

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    
    updateProfile(profileForm, {
      onSuccess: () => {
        setShowSuccessModal(true)
      },
      onError: (error: any) => {
        showToast('error', error.response?.data?.message || 'Failed to update profile')
      },
    })
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'Passwords do not match')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      showToast('error', 'Password must be at least 8 characters')
      return
    }

    updatePassword(
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () => {
          showToast('success', 'Password updated successfully')
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        },
        onError: (error: any) => {
          showToast('error', error.response?.data?.message || 'Failed to update password')
        },
      }
    )
  }

  const handleDeleteAccount = (password: string, reason?: string) => {
    deleteAccount(
      { password, reason },
      {
        onSuccess: () => {
          showToast('success', 'Account deleted successfully')
          router.push('/login')
        },
        onError: (error: any) => {
          showToast('error', error.response?.data?.message || 'Failed to delete account')
        },
      }
    )
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
          Manage your profile, password and account
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

        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          {/* Basic fields for all users */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Full name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Username
              </label>
              <input
                type="text"
                defaultValue={user.username}
                className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#888] outline-none bg-[#F8F8F8] cursor-not-allowed"
                disabled
                title="Username cannot be changed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Email address
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
            />
          </div>

          {/* Contributor-only fields */}
          {isContributor && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Country
                  </label>
                  <select
                    value={profileForm.country}
                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  >
                    <option value="">Select country</option>
                    <option value="NG">🇳🇬 Nigeria</option>
                    <option value="GH">🇬🇭 Ghana</option>
                    <option value="KE">🇰🇪 Kenya</option>
                    <option value="ZA">🇿🇦 South Africa</option>
                    <option value="EG">🇪🇬 Egypt</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Location (City)
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    placeholder="e.g. Lagos, Nairobi, Accra"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Bio
                </label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
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
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={profileForm.portfolioUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, portfolioUrl: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={profileForm.instagram}
                    onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/username"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={profileForm.twitter}
                    onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                    placeholder="https://twitter.com/username"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={profileForm.facebook}
                    onChange={(e) => setProfileForm({ ...profileForm, facebook: e.target.value })}
                    placeholder="https://facebook.com/username"
                    className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {isUpdatingProfile ? 'Saving...' : 'Save changes'}
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
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-3">
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Current password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              New password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Confirm new password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="self-start px-6 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {isUpdatingPassword ? 'Updating...' : 'Update password'}
          </button>
        </form>
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
          disabled={isDeletingAccount}
          className="px-5 py-2.5 border border-red-300 text-red-600 text-[13.5px] font-semibold rounded-full hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          Delete account
        </button>
      </div>

      {/* Modals */}
      {showSuccessModal && (
        <ProfileUpdateSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      {showAvatarModal && (
        <UploadAvatarModal
          currentAvatar={user.avatar}
          userName={user.name}
          onClose={() => setShowAvatarModal(false)}
          onUpload={(file) => {
            console.log('Uploading avatar:', file.name)
            // TODO: Implement avatar upload to storage
            showToast('info', 'Avatar upload not yet implemented')
            setShowAvatarModal(false)
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          userName={user.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  )
}
