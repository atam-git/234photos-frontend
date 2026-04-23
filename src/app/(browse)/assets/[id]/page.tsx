'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Download, Plus, Heart, Share2 } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Footer } from '@/components/shared/Footer'
import { AssetPreview } from '@/components/features/asset/AssetPreview'
import { LicenseSelector } from '@/components/features/asset/LicenseSelector'
import { ContributorCard } from '@/components/features/asset/ContributorCard'
import { AssetMetadata } from '@/components/features/asset/AssetMetadata'
import { AssetTags } from '@/components/features/asset/AssetTags'
import { HorizontalAssetRow } from '@/components/features/asset/HorizontalAssetRow'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { getAssetDetail, getSimilarAssets, getContributorAssets } from '@/lib/mock/assetDetail'
import { getContributorByName } from '@/lib/mock/contributors'
import type { Asset, AssetDetail, ModalState } from '@/types'
import { useAuthStore } from '@/stores/authStore'


export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const asset = getAssetDetail(id)
  const similarAssets = getSimilarAssets(id)
  const contributorAssets = getContributorAssets(asset.contributor || '', id)
  const contributorProfile = getContributorByName(asset.contributor || '')
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const [license, setLicense] = useState<'standard' | 'enhanced' | 'editorial'>('standard')
  const [liked, setLiked] = useState(false)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const closeModal = () => setModal({ type: 'none' })

  const metaRows = [
    { label: 'Dimensions', value: asset.dimensions || 'N/A' },
    { label: 'File size', value: asset.fileSize || 'N/A' },
    { label: 'File type', value: asset.fileType || 'N/A' },
    { label: 'Category', value: asset.category || 'N/A' },
    { label: 'Date added', value: asset.dateAdded || 'N/A' },
    ...(asset.resolution ? [{ label: 'Resolution', value: asset.resolution }] : []),
    ...(asset.aspectRatio ? [{ label: 'Aspect ratio', value: `${asset.aspectRatio}:1` }] : []),
    ...(asset.duration ? [{ label: 'Duration', value: `${Math.floor(asset.duration / 60)}:${(asset.duration % 60).toString().padStart(2, '0')}` }] : []),
    ...(asset.fps ? [{ label: 'Frame rate', value: `${asset.fps} fps` }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header variant="search" />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-6">

        {/* Breadcrumb */}
        <div className="mb-5">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Search', href: '/search' },
              { label: asset.category || 'Assets', href: `/search?q=${(asset.category || '').toLowerCase()}` },
              { label: asset.title || asset.alt || 'Asset' },
            ]}
          />
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">

          {/* Left: preview */}
          <div className="flex-1 min-w-0">
            <AssetPreview
              src={asset.src}
              alt={asset.alt}
              isAI={asset.isAI}
              isEditorial={asset.isEditorial}
            />
            
            {/* Release badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {asset.modelRelease && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] font-semibold text-green-700"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Model Released
                  </span>
                </div>
              )}
              {asset.propertyRelease && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] font-semibold text-blue-700"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Property Released
                  </span>
                </div>
              )}
              {!asset.modelRelease && !asset.isEditorial && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] font-semibold text-gray-600"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    No Model Release
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: info panel */}
          <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-5">

            {/* Title */}
            <div>
              <h1
                className="text-[20px] font-bold text-[#111] leading-snug mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.title}
              </h1>
              <p
                className="text-[13.5px] text-[#666] leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.description}
              </p>
            </div>

            {/* Tags */}
            <AssetTags tags={asset.tags} />

            {/* Divider */}
            <div className="h-px bg-[#F0F0F0]" />

            {/* License selector */}
            <LicenseSelector value={license} onChange={setLicense} />

            {/* Download + actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => isLoggedIn ? setModal({ type: 'download', asset: asset as Asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => isLoggedIn ? setModal({ type: 'board', asset: asset as Asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#D0D0D0] text-[#111] text-[13px] font-semibold rounded-full hover:border-[#999] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  <Plus className="w-4 h-4" />
                  Save to board
                </button>

                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setModal({ type: 'auth', defaultTab: 'login' })
                      return
                    }
                    setLiked(!liked)
                  }}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                    liked ? 'border-[#EE2B24] bg-[#FFF0F0]' : 'border-[#D0D0D0] hover:border-[#999]'
                  }`}
                  aria-label="Like"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-[#EE2B24] text-[#EE2B24]' : 'text-[#444]'}`} />
                </button>

                <button
                  className="w-11 h-11 rounded-full border border-[#D0D0D0] flex items-center justify-center hover:border-[#999] transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4 text-[#444]" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#F0F0F0]" />

            {/* Color Palette */}
            {asset.colors && asset.colors.length > 0 && (
              <>
                <div>
                  <p
                    className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Color Palette
                  </p>
                  <div className="flex gap-2">
                    {asset.colors.slice(0, 5).map((color, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          // TODO: Search by color
                          console.log('Search by color:', color)
                        }}
                        className="group relative flex-1"
                        title={`Search similar colors: ${color}`}
                      >
                        <div
                          className="w-full aspect-square rounded-lg border-2 border-[#E0E0E0] group-hover:border-[#111] transition-colors cursor-pointer"
                          style={{ backgroundColor: color }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-2 py-1 bg-black/80 text-white text-[10px] font-semibold rounded backdrop-blur-sm">
                            {color}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#888] mt-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Click a color to find similar assets
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#F0F0F0]" />
              </>
            )}

            {/* Contributor */}
            <div>
              <p
                className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Contributor
              </p>
              <ContributorCard
                name={asset.contributor}
                avatar={contributorProfile?.avatar}
                country={asset.contributorCountry}
                totalAssets={asset.contributorAssets}
                totalDownloads={asset.contributorDownloads}
                isLoggedIn={isLoggedIn}
                onAuthRequired={() => setModal({ type: 'auth', defaultTab: 'signup' })}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-[#F0F0F0]" />

            {/* Metadata */}
            <div>
              <p
                className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Details
              </p>
              <AssetMetadata rows={metaRows} />
            </div>
          </div>
        </div>

        {/* Similar assets */}
        <div className="mb-12">
          <HorizontalAssetRow
            title="Similar assets"
            assets={similarAssets}
            seeAllHref={`/search?q=${encodeURIComponent(asset.category || '')}`}
          />
        </div>

        {/* More from contributor */}
        <div className="mb-12">
          <HorizontalAssetRow
            title={`More from ${asset.contributor || 'this contributor'}`}
            assets={contributorAssets}
            seeAllHref={`/search?contributor=${encodeURIComponent(asset.contributor || '')}`}
          />
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {modal.type === 'download' && (
        <DownloadModal
          asset={modal.asset}
          onClose={closeModal}
          onConfirm={(options) => {
            console.log('Download:', asset.id, options)
            closeModal()
          }}
        />
      )}
      {modal.type === 'board' && (
        <SaveToBoardModal asset={modal.asset} onClose={closeModal} />
      )}
      {modal.type === 'auth' && (
        <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />
      )}
    </div>
  )
}
