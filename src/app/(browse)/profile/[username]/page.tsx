'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import type { Asset, ModalState, ProfileTab, ContributorProfile } from '@/types'
import { MapPin, Calendar, Download, ImageIcon, FolderOpen, Globe, Instagram, Twitter, Facebook } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useUser } from '@/hooks/useUser'
import { useAssets } from '@/hooks/useAssets'
import { useUserCollections } from '@/hooks/useCollections'
import { useIsFollowing, useFollowUser, useUnfollowUser } from '@/hooks/useFollow'
import Link from 'next/link'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [tab, setTab] = useState<ProfileTab>('portfolio')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [page, setPage] = useState(1)
  const [allAssets, setAllAssets] = useState<Asset[]>([])
  const [hasAppendedPage, setHasAppendedPage] = useState<number>(0)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const closeModal = () => setModal({ type: 'none' })
  const observerTarget = useRef<HTMLDivElement>(null)

  // Fetch user profile from API (only contributors have public profiles)
  const { data: profile, isLoading: profileLoading, error: profileError } = useUser(username) as { 
    data: ContributorProfile | undefined, 
    isLoading: boolean, 
    error: Error | null 
  }
  
  // Fetch follow status
  const { data: followStatus } = useIsFollowing(username)
  const followMutation = useFollowUser()
  const unfollowMutation = useUnfollowUser()
  const isFollowing = followStatus?.isFollowing || false
  
  // Fetch user's assets from API with pagination
  const { data: assetsData, isLoading: assetsLoading } = useAssets({ 
    contributorId: profile?.id,
    page,
    limit: 50 
  })
  const assets = assetsData?.data || []
  const meta = assetsData?.meta

  // Fetch user's collections
  const { data: collections = [], isLoading: collectionsLoading } = useUserCollections(username)

  // Use allAssets if populated, otherwise fall back to current page assets
  const displayAssets = allAssets.length > 0 ? allAssets : assets

  // Append new assets when page changes
  useEffect(() => {
    if (assets.length > 0 && page !== hasAppendedPage) {
      setAllAssets(prev => {
        // Avoid duplicates
        const newAssets = assets.filter(a => !prev.some(p => p.id === a.id))
        return [...prev, ...newAssets]
      })
      
      setHasAppendedPage(page)
    }
  }, [assets, page, hasAppendedPage])

  // Reset assets when profile changes
  useEffect(() => {
    setAllAssets([])
    setPage(1)
    setHasAppendedPage(0)
  }, [profile?.id])

  // Infinite scroll observer
  useEffect(() => {
    const currentTarget = observerTarget.current
    if (!currentTarget || !meta) return

    const hasMorePages = page < meta.totalPages
    if (!hasMorePages) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        
        if (entry.isIntersecting && !assetsLoading) {
          setPage(prev => prev + 1)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '800px' // Load 800px before reaching the trigger
      }
    )

    observer.observe(currentTarget)

    return () => {
      observer.disconnect()
    }
  }, [assetsLoading, meta, page])

  const handleFollow = async () => {
    if (!isLoggedIn) {
      setModal({ type: 'auth', defaultTab: 'signup' })
      return
    }

    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(username)
      } else {
        await followMutation.mutateAsync(username)
      }
    } catch (error: any) {
      console.error('Follow error:', error)
    }
  }

  // Loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        {/* Profile hero skeleton */}
        <section className="bg-[#F5F5F7] border-b border-[#E8E8E8]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-pulse">
              
              {/* Avatar skeleton */}
              <div className="w-24 h-24 rounded-full bg-gray-300 shrink-0 ring-4 ring-white shadow-md" />

              {/* Info skeleton */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Name */}
                    <div className="h-7 bg-gray-300 rounded w-48 mb-2" />
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                      <div className="h-4 bg-gray-200 rounded w-28" />
                      <div className="h-5 bg-gray-200 rounded w-16" />
                    </div>
                    
                    {/* Bio */}
                    <div className="space-y-2 max-w-[520px]">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>
                    
                    {/* Social links */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-4 h-4 bg-gray-200 rounded" />
                      <div className="w-4 h-4 bg-gray-200 rounded" />
                      <div className="w-4 h-4 bg-gray-200 rounded" />
                    </div>
                  </div>

                  {/* Follow button skeleton */}
                  <div className="h-10 w-28 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="flex items-center gap-8 mt-8 pt-6 border-t border-[#E8E8E8] flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-300 rounded w-12" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-300 rounded w-12" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Content skeleton */}
        <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-8">
          {/* Tabs skeleton */}
          <div className="flex gap-1 border-b border-[#F0F0F0] mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded-t" />
            <div className="h-10 w-32 bg-gray-100 rounded-t" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Error state
  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-4xl text-red-500">⚠️</div>
            <p className="text-[#666]">Contributor profile not found</p>
            <p className="text-[13px] text-[#888] mt-2">
              This user doesn't exist or isn't a contributor
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
                    {profile.contributorTier && (
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white text-[11px] font-bold rounded-full uppercase">
                        {profile.contributorTier}
                      </span>
                    )}
                  </div>
                  <p className="text-[13.5px] text-[#555] leading-relaxed max-w-[520px]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {profile.bio || 'Professional contributor sharing authentic African visuals on 234photos.'}
                  </p>
                  
                  {/* Social links */}
                  {(profile.website || profile.instagram || profile.twitter || profile.facebook) && (
                    <div className="flex items-center gap-3 mt-3">
                      {profile.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                          className="text-[#666] hover:text-[#EE2B24] transition-colors">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {profile.instagram && (
                        <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                          className="text-[#666] hover:text-[#EE2B24] transition-colors">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {profile.twitter && (
                        <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                          className="text-[#666] hover:text-[#EE2B24] transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {profile.facebook && (
                        <a href={`https://facebook.com/${profile.facebook}`} target="_blank" rel="noopener noreferrer"
                          className="text-[#666] hover:text-[#EE2B24] transition-colors">
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleFollow}
                  disabled={followMutation.isPending || unfollowMutation.isPending}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-[13.5px] font-semibold border transition-colors ${
                    isFollowing
                      ? 'border-[#D0D0D0] text-[#888] bg-white hover:border-[#EE2B24] hover:text-[#EE2B24]'
                      : 'border-[#111] bg-[#111] text-white hover:bg-[#333]'
                  } ${(followMutation.isPending || unfollowMutation.isPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {followMutation.isPending || unfollowMutation.isPending ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-8 pt-6 border-t border-[#E8E8E8] flex-wrap">
            {[
              { icon: ImageIcon, value: (profile.totalAssets || assets.length).toLocaleString(), label: 'Assets' },
              { icon: Download, value: (profile.totalDownloads || 0).toLocaleString(), label: 'Downloads' },
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
            Portfolio ({profile?.totalAssets || 0})
          </button>
          <button
            onClick={() => setTab('collections')}
            className={`px-4 py-2.5 text-[14px] font-semibold border-b-2 transition-colors ${
              tab === 'collections'
                ? 'border-[#EE2B24] text-[#EE2B24]'
                : 'border-transparent text-[#888] hover:text-[#111]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Collections ({collections.length})
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
                {profile?.totalAssets || displayAssets.length} assets
              </span>
            </div>

            {/* Loading state - initial load only */}
            {assetsLoading && allAssets.length === 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Assets grid */}
            {displayAssets.length > 0 && (
              <>
                <MasonryGrid
                  assets={displayAssets}
                  onAssetClick={(asset) => setModal({ type: 'preview', asset })}
                  onDownload={(asset) => setModal({ type: 'download', asset })}
                  onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                  onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
                />

                {/* Infinite scroll trigger */}
                <div 
                  ref={observerTarget} 
                  className="mt-8 flex items-center justify-center py-4"
                >
                  {!meta ? (
                    <div className="flex items-center gap-2 text-[#999]">
                      <div className="w-4 h-4 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
                      <span className="text-[12px]">Loading...</span>
                    </div>
                  ) : page < meta.totalPages ? (
                    assetsLoading && (
                      <div className="flex items-center gap-2 text-[#999]">
                        <div className="w-4 h-4 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
                        <span className="text-[12px]">Loading more...</span>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-[13px] text-[#999]">🎉 You've seen it all!</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Empty state */}
            {!assetsLoading && assets.length === 0 && allAssets.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[15px] font-semibold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No assets yet
                </p>
                <p className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  This contributor hasn't uploaded any assets
                </p>
              </div>
            )}
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
                {collections.length} collections
              </span>
            </div>

            {/* Loading state */}
            {collectionsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    {/* Collection thumbnail skeleton - 2x2 grid */}
                    <div className="aspect-[4/3] bg-gray-200 rounded-t-xl grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="bg-gray-300" />
                      <div className="bg-gray-300" />
                      <div className="bg-gray-300" />
                      <div className="bg-gray-300" />
                    </div>
                    
                    {/* Collection info skeleton */}
                    <div className="bg-white rounded-b-xl border border-t-0 border-[#F0F0F0] p-3.5">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                      <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Collections grid */}
            {!collectionsLoading && collections.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.slug}`}
                    className="group block bg-white rounded-xl border border-[#F0F0F0] overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Collection thumbnail - 2x2 grid with landscape aspect */}
                    <div className="aspect-[4/3] bg-[#F5F5F5] grid grid-cols-2 gap-0.5 p-0.5">
                      {collection.thumbnails.slice(0, 4).map((thumb, idx) => (
                        <div key={idx} className="bg-[#E8E8E8] overflow-hidden">
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                      {/* Fill empty slots if less than 4 thumbnails */}
                      {Array.from({ length: Math.max(0, 4 - collection.thumbnails.length) }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="bg-[#E8E8E8]" />
                      ))}
                    </div>

                    {/* Collection info */}
                    <div className="p-3.5">
                      <h3 className="text-[14px] font-bold text-[#111] mb-1 line-clamp-1 group-hover:text-[#EE2B24] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.name}
                      </h3>
                      {collection.description && (
                        <p className="text-[11.5px] text-[#666] mb-2 line-clamp-2"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {collection.description}
                        </p>
                      )}
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.assetCount} {collection.assetCount === 1 ? 'asset' : 'assets'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!collectionsLoading && collections.length === 0 && (
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
            )}
          </>
        )}
      </main>

      <Footer />

      {modal.type === 'preview' && (
        <QuickPreviewModal asset={modal.asset} assets={displayAssets} onClose={closeModal}
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
