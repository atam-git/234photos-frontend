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
import { Asset } from '@/components/features/search/AssetCard'

type ModalState =
  | { type: 'none' }
  | { type: 'download'; asset: Asset }
  | { type: 'board'; asset: Asset }
  | { type: 'auth'; defaultTab?: 'login' | 'signup' }

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const asset = getAssetDetail(id)
  const similarAssets = getSimilarAssets(id)
  const contributorAssets = getContributorAssets(asset.contributor, id)
  const contributorProfile = getContributorByName(asset.contributor)

  const [license, setLicense] = useState<'standard' | 'enhanced' | 'editorial'>('standard')
  const [liked, setLiked] = useState(false)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const closeModal = () => setModal({ type: 'none' })

  const metaRows = [
    { label: 'Dimensions', value: asset.dimensions },
    { label: 'File size', value: asset.fileSize },
    { label: 'File type', value: asset.fileType },
    { label: 'Category', value: asset.category },
    { label: 'Date added', value: asset.dateAdded },
    ...(asset.resolution ? [{ label: 'Resolution', value: asset.resolution }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        variant="search"
        onAuthClick={(tab) => setModal({ type: 'auth', defaultTab: tab })}
      />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-6">

        {/* Breadcrumb */}
        <div className="mb-5">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Search', href: '/search' },
              { label: asset.category, href: `/search?q=${asset.category.toLowerCase()}` },
              { label: asset.title },
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
                onClick={() => setModal({ type: 'download', asset })}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setModal({ type: 'auth', defaultTab: 'login' })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#D0D0D0] text-[#111] text-[13px] font-semibold rounded-full hover:border-[#999] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  <Plus className="w-4 h-4" />
                  Save to board
                </button>

                <button
                  onClick={() => { setLiked(!liked) }}
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
            seeAllHref={`/search?q=${encodeURIComponent(asset.category)}`}
          />
        </div>

        {/* More from contributor */}
        <div className="mb-12">
          <HorizontalAssetRow
            title={`More from ${asset.contributor}`}
            assets={contributorAssets}
            seeAllHref={`/search?contributor=${encodeURIComponent(asset.contributor)}`}
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
