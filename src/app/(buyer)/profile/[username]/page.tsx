'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { Asset } from '@/components/features/search/AssetCard'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { getContributor } from '@/lib/mock/contributors'
import { MapPin, Calendar, Download, ImageIcon } from 'lucide-react'

type ModalState =
  | { type: 'none' }
  | { type: 'preview'; asset: Asset }
  | { type: 'download'; asset: Asset }
  | { type: 'board'; asset: Asset }
  | { type: 'auth'; defaultTab?: 'login' | 'signup' }

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [following, setFollowing] = useState(false)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const closeModal = () => setModal({ type: 'none' })

  const handleFollow = () => {
    if (!following) {
      // Require auth to follow
      setModal({ type: 'auth', defaultTab: 'signup' })
      return
    }
    setFollowing(false)
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
      <Header onAuthClick={(tab) => setModal({ type: 'auth', defaultTab: tab })} />

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Portfolio
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
          onSaveToBoard={() => setModal({ type: 'auth', defaultTab: 'login' })}
          onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
        />
      </main>

      <Footer />

      {modal.type === 'preview' && (
        <QuickPreviewModal asset={modal.asset} assets={assets} onClose={closeModal}
          onDownload={(a) => setModal({ type: 'download', asset: a })}
          onSaveToBoard={() => setModal({ type: 'auth', defaultTab: 'login' })}
          onAuthRequired={() => setModal({ type: 'auth' })} />
      )}
      {modal.type === 'download' && <DownloadModal asset={modal.asset} onClose={closeModal} onConfirm={closeModal} />}
      {modal.type === 'auth' && <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />}
    </div>
  )
}
