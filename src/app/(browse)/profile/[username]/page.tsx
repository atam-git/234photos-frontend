'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import type { Asset, ModalState, ProfileTab } from '@/types'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { PROFILE_COLLECTIONS } from '@/lib/mock'
import { getContributor } from '@/lib/mock/contributors'
import { MapPin, Calendar, Download, ImageIcon, FolderOpen, Globe, Instagram, Twitter, Facebook } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import Link from 'next/link'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [tab, setTab] = useState<ProfileTab>('portfolio')
  const [following, setFollowing] = useState(false)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const closeModal = () => setModal({ type: 'none' })

  const handleFollow = () => {
    if (!isLoggedIn) {
      // Require auth to follow
      setModal({ type: 'auth', defaultTab: 'signup' })
      return
    }
    // Toggle follow state when logged in
    setFollowing(!following)
  }

  // Use real data or build a graceful fallback
  const profile = getContributor(username) ?? {
    username,
    name: username.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    avatar: '',
    country: 'Africa',
    countryFlag: '🌍',
    bio: 'African creative contributing authentic visuals to 234photos.',
    totalAssets: MOCK_ASSETS.length,
    totalDownloads: '—',
    totalEarnings: '—',
    joinedYear: 2024,
    specialties: [] as string[],
  }

  const assets = MOCK_ASSETS.slice(0, 18)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Profile hero */}
      <section className="bg-[#F5F5F7] border-b border-[#E8E8E8]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#E8E8E8] shrink-0 ring-4 ring-white shadow-md">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#EE2B24] flex items-center justify-center">
                  <span className="text-white text-[28px] font-bold">
                    {profile.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-[24px] font-extrabold text-[#111] leading-tight mb-1"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-3 text-[13px] text-[#666] mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {profile.countryFlag} {profile.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Member since {profile.joinedYear}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#555] leading-relaxed max-w-[520px]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {profile.bio}
                  </p>
                  {profile.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {profile.specialties.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 bg-white border border-[#E0E0E0] text-[#444] text-[12px] font-medium rounded-full"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Social links */}
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-[#EE2B24] hover:underline font-medium"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>
                    )}
                    {profile.instagram && (
                      <a
                        href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-[#EE2B24] hover:underline font-medium"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        {profile.instagram}
                      </a>
                    )}
                    {profile.twitter && (
                      <a
                        href={`https://twitter.com/${profile.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-[#EE2B24] hover:underline font-medium"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        <Twitter className="w-3.5 h-3.5" />
                        {profile.twitter}
                      </a>
                    )}
                    {profile.facebook && (
                      <a
                        href={`https://facebook.com/${profile.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-[#EE2B24] hover:underline font-medium"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        Facebook
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleFollow}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-[13.5px] font-semibold border transition-colors ${
                    following
                      ? 'border-[#D0D0D0] text-[#888] bg-white hover:border-[#EE2B24] hover:text-[#EE2B24]'
                      : 'border-[#111] bg-[#111] text-white hover:bg-[#333]'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-8 pt-6 border-t border-[#E8E8E8] flex-wrap">
            {[
              { icon: ImageIcon, value: profile.totalAssets.toLocaleString(), label: 'Assets' },
              { icon: Download, value: profile.totalDownloads, label: 'Downloads' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#EE2B24]" />
                <span className="text-[18px] font-extrabold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {value}
                </span>
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets grid */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#F0F0F0] mb-6">
          <button
            onClick={() => setTab('portfolio')}
            className={`px-4 py-2.5 text-[14px] font-semibold border-b-2 transition-colors ${
              tab === 'portfolio'
                ? 'border-[#EE2B24] text-[#EE2B24]'
                : 'border-transparent text-[#888] hover:text-[#111]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Portfolio ({assets.length})
          </button>
          <button
            onClick={() => setTab('collections')}
            className={`px-4 py-2.5 text-[14px] font-semibold border-b-2 transition-colors ${
              tab === 'collections'
                ? 'border-[#EE2B24] text-[#EE2B24]'
                : 'border-transparent text-[#888] hover:text-[#111]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Collections ({PROFILE_COLLECTIONS.length})
          </button>
        </div>

        {/* Portfolio Tab */}
        {tab === 'portfolio' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                All Assets
              </h2>
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {assets.length} assets
              </span>
            </div>
            <MasonryGrid
              assets={assets}
              onAssetClick={(asset) => setModal({ type: 'preview', asset })}
              onDownload={(asset) => setModal({ type: 'download', asset })}
              onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
              onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
            />
          </>
        )}

        {/* Collections Tab */}
        {tab === 'collections' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Curated Collections
              </h2>
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {PROFILE_COLLECTIONS.length} collections
              </span>
            </div>

            {PROFILE_COLLECTIONS.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
                  <FolderOpen className="w-7 h-7 text-[#BBBBBB]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No public collections yet
                </h3>
                <p className="text-[13px] text-[#666]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  This contributor hasn't created any public collections
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROFILE_COLLECTIONS.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${username}/${collection.id}`}
                    className="group bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden hover:border-[#EE2B24] hover:shadow-lg transition-all"
                  >
                    {/* Photo collage */}
                    <div className="aspect-[4/3] bg-[#E8E8E8] overflow-hidden grid grid-cols-2 gap-0.5">
                      {collection.thumbnails.slice(0, 4).map((thumb, i) => (
                        <div key={i} className="relative overflow-hidden bg-[#E8E8E8]">
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-bold text-[#111] mb-1 line-clamp-1"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.name}
                      </h3>
                      <p className="text-[13px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.assetCount} assets
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {modal.type === 'preview' && (
        <QuickPreviewModal asset={modal.asset} assets={assets} onClose={closeModal}
          onDownload={(a) => setModal({ type: 'download', asset: a })}
          onSaveToBoard={(a) => isLoggedIn ? setModal({ type: 'board', asset: a }) : setModal({ type: 'auth', defaultTab: 'login' })}
          onAuthRequired={() => setModal({ type: 'auth' })} />
      )}
      {modal.type === 'download' && <DownloadModal asset={modal.asset} onClose={closeModal} onConfirm={closeModal} />}
      {modal.type === 'board' && <SaveToBoardModal asset={modal.asset} onClose={closeModal} />}
      {modal.type === 'auth' && <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />}
    </div>
  )
}
