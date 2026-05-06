'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, FolderOpen, Edit2, Send } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { AddToCollectionModal } from '@/components/shared/Modals/AddToCollectionModal'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { useMyAssets } from '@/hooks/useMyAssets'
import { useMyCollections } from '@/hooks/useCollections'
import { assetsApi } from '@/lib/api/assets'
import { useToast } from '@/components/ui/toast-provider'
import type { MyAssetsTab } from '@/types'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const STATUS_OPTIONS = ['all', 'live', 'pending', 'rejected', 'drafts'] as const
type StatusFilter = typeof STATUS_OPTIONS[number]

const STATUS_MAP: Record<StatusFilter, 'APPROVED' | 'PENDING' | 'REJECTED' | 'DRAFT' | undefined> = {
  all: undefined,
  live: 'APPROVED',
  pending: 'PENDING',
  rejected: 'REJECTED',
  drafts: 'DRAFT',
}

const ASSET_STATUS_STYLES = {
  APPROVED: 'bg-green-50 text-green-700',
  PENDING: 'bg-yellow-50 text-yellow-700',
  REJECTED: 'bg-red-50 text-red-600',
  DRAFT: 'bg-gray-50 text-gray-700',
}

export default function MyAssetsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const { showToast } = useToast()
  const [tab, setTab] = useState<MyAssetsTab>('assets')
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [selectedAssetForStats, setSelectedAssetForStats] = useState<any>(null)
  const [assetToDelete, setAssetToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [submittingDraft, setSubmittingDraft] = useState<string | null>(null)
  const isContributor = user?.role === 'contributor' && user?.isContributor

  // Fetch assets with real API
  const { data: assetsData, isLoading: assetsLoading } = useMyAssets(1, 100, STATUS_MAP[filter])
  const assets = assetsData?.data || []
  const totalAssets = assetsData?.total || 0

  // Fetch counts for each status (for tab badges)
  const { data: allAssetsData } = useMyAssets(1, 1, undefined) // Fetch all to get total count
  const { data: liveAssetsData } = useMyAssets(1, 1, 'APPROVED')
  const { data: pendingAssetsData } = useMyAssets(1, 1, 'PENDING')
  const { data: rejectedAssetsData } = useMyAssets(1, 1, 'REJECTED')
  const { data: draftAssetsData } = useMyAssets(1, 1, 'DRAFT')

  // Fetch collections with real API
  const { data: collections, isLoading: collectionsLoading } = useMyCollections()
  const collectionsCount = collections?.length || 0

  useEffect(() => {
    if (!isContributor) {
      router.push('/discover?openContributorModal=true')
    }
  }, [isContributor, router])

  if (!isContributor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔒</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Contributor Access Required</h2>
          <p className="text-[#666] mb-4">Apply to become a contributor to access this page</p>
          <button
            onClick={() => router.push('/discover?openContributorModal=true')}
            className="inline-block px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    )
  }

  // Format currency (kobo to naira)
  const formatCurrency = (kobo: number) => {
    const naira = kobo / 100
    return naira.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  // Format upload date
  const formatUploadDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return dateString
    }
  }

  // Count by status using fetched data
  const countByStatus = (status: StatusFilter) => {
    switch (status) {
      case 'all':
        return allAssetsData?.total || totalAssets
      case 'live':
        return liveAssetsData?.total || 0
      case 'pending':
        return pendingAssetsData?.total || 0
      case 'rejected':
        return rejectedAssetsData?.total || 0
      case 'drafts':
        return draftAssetsData?.total || 0
      default:
        return 0
    }
  }

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId) ? prev.filter(id => id !== assetId) : [...prev, assetId]
    )
  }

  const selectAll = () => {
    setSelectedAssets(assets.map(a => a.id))
  }

  const deselectAll = () => {
    setSelectedAssets([])
  }

  const handleSubmitDraft = async (assetId: string) => {
    setSubmittingDraft(assetId)
    try {
      await assetsApi.submitDraft(assetId)
      showToast('success', 'Draft submitted for review!')
      // Refresh the assets list
      window.location.reload()
    } catch (error: any) {
      showToast('error', error.message || 'Failed to submit draft')
    } finally {
      setSubmittingDraft(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            My Assets
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {totalAssets} assets · {collectionsCount} collections
          </p>
        </div>
        <Link href="/my-assets/upload"
          className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          + Upload new
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#F0F0F0]">
        <button
          onClick={() => { setTab('assets'); setSelectionMode(false); setSelectedAssets([]) }}
          className={`px-4 py-2.5 text-[13.5px] font-semibold border-b-2 transition-colors ${
            tab === 'assets'
              ? 'border-[#EE2B24] text-[#EE2B24]'
              : 'border-transparent text-[#888] hover:text-[#111]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Assets
        </button>
        <button
          onClick={() => { setTab('collections'); setSelectionMode(false); setSelectedAssets([]) }}
          className={`px-4 py-2.5 text-[13.5px] font-semibold border-b-2 transition-colors ${
            tab === 'collections'
              ? 'border-[#EE2B24] text-[#EE2B24]'
              : 'border-transparent text-[#888] hover:text-[#111]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Collections ({collectionsCount})
        </button>
      </div>

      {/* Assets Tab */}
      {tab === 'assets' && (
        <>
          {/* Filter tabs + Selection mode */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {STATUS_OPTIONS.map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors capitalize ${
                    filter === s ? 'bg-[#111] border-[#111] text-white font-semibold' : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {s} {s !== 'all' && `(${countByStatus(s)})`}
                </button>
              ))}
            </div>
            
            {!selectionMode ? (
              <button
                onClick={() => setSelectionMode(true)}
                className="px-4 py-1.5 text-[13px] font-medium text-[#EE2B24] hover:underline"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Select assets
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {selectedAssets.length} selected
                </span>
                <button
                  onClick={selectAll}
                  className="px-3 py-1.5 text-[12px] font-medium text-[#666] hover:text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Select all
                </button>
                <button
                  onClick={deselectAll}
                  className="px-3 py-1.5 text-[12px] font-medium text-[#666] hover:text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Deselect all
                </button>
                {selectedAssets.length > 0 && (
                  <button
                    onClick={() => setShowCreateCollection(true)}
                    className="px-4 py-1.5 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Add to collection
                  </button>
                )}
                <button
                  onClick={() => { setSelectionMode(false); setSelectedAssets([]) }}
                  className="px-3 py-1.5 text-[12px] font-medium text-[#888] hover:text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Asset table */}
          <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
            {assetsLoading ? (
              // Loading skeleton
              <div className="divide-y divide-[#F8F8F8]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 w-48 bg-gray-200 rounded mb-1" />
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="hidden sm:flex gap-6">
                      <div className="w-12 h-8 bg-gray-200 rounded" />
                      <div className="w-12 h-8 bg-gray-200 rounded" />
                      <div className="w-16 h-8 bg-gray-200 rounded" />
                    </div>
                    <div className="w-16 h-6 bg-gray-200 rounded-full" />
                  </div>
                ))}
              </div>
            ) : assets.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#BBBBBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {filter === 'all' ? 'No assets yet' : `No ${filter} assets`}
                </h3>
                <p className="text-[13px] text-[#666] mb-4"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {filter === 'all' ? 'Upload your first asset to get started' : `You don't have any ${filter} assets`}
                </p>
                {filter === 'all' && (
                  <Link href="/my-assets/upload"
                    className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Upload now
                  </Link>
                )}
              </div>
            ) : (
              <div className="divide-y divide-[#F8F8F8]">
                {assets.map((asset) => {
                  const isSelected = selectedAssets.includes(asset.id)
                  return (
                    <div key={asset.id}>
                      <div 
                        className={`flex items-center gap-4 px-5 py-3.5 group transition-colors ${
                          selectionMode 
                            ? `cursor-pointer hover:bg-[#F8F8F8] ${isSelected ? 'bg-[#FFF5F5]' : ''}` 
                            : ''
                        }`}
                        onClick={() => {
                          if (selectionMode) {
                            toggleAssetSelection(asset.id)
                          }
                        }}
                      >
                        {selectionMode && (
                          <div className="shrink-0">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#EE2B24] border-[#EE2B24]' : 'border-[#D0D0D0]'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            if (!selectionMode) {
                              e.stopPropagation()
                              setSelectedAssetForStats(asset)
                            }
                          }}
                          className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0 hover:ring-2 hover:ring-[#EE2B24] transition-all"
                        >
                          {asset.thumbnailUrl ? (
                            <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#999]">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            if (!selectionMode) {
                              e.stopPropagation()
                              setSelectedAssetForStats(asset)
                            }
                          }}
                          className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                        >
                          <p className="text-[13.5px] font-semibold text-[#111] truncate group-hover:text-[#EE2B24] transition-colors"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {asset.title}
                          </p>
                          <p className="text-[11.5px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            Uploaded {formatUploadDate(asset.uploadedAt)}
                          </p>
                        </button>
                        <div className="hidden sm:flex items-center gap-6 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {asset.status.toUpperCase() === 'DRAFT' ? (
                            // Draft actions - Edit and Delete
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/my-assets/edit/${asset.id}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D0D0D0] text-[#111] text-[12px] font-semibold rounded-full hover:border-[#999] transition-colors"
                                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                                <Edit2 className="w-3.5 h-3.5" />
                                Edit
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setAssetToDelete(asset)
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 text-[12px] font-semibold rounded-full hover:bg-red-50 transition-colors"
                                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        ) : (
                          // Stats for non-draft assets
                          <>
                            <div className="text-center">
                              <p className="text-[13px] font-bold text-[#111]">{asset.views?.toLocaleString() || '0'}</p>
                              <p className="text-[10px] text-[#888]">views</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[13px] font-bold text-[#111]">{asset.downloads || '0'}</p>
                              <p className="text-[10px] text-[#888]">downloads</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[13px] font-bold text-[#111]">₦{formatCurrency(asset.earnings || 0)}</p>
                              <p className="text-[10px] text-[#888]">earned</p>
                            </div>
                          </>
                        )}
                      </div>
                      <span className={`shrink-0 text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${ASSET_STATUS_STYLES[asset.status.toUpperCase() as keyof typeof ASSET_STATUS_STYLES] || 'bg-gray-50 text-gray-700'}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {asset.status === 'APPROVED' ? 'live' : asset.status === 'DRAFT' ? 'draft' : asset.status.toLowerCase()}
                      </span>
                    </div>
                    
                    {/* Rejection reason */}
                    {asset.status === 'REJECTED' && asset.rejectionReason && (
                      <div className="px-5 pb-3.5 pl-[76px]">
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                          <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-red-900 uppercase tracking-[0.5px] mb-0.5"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              Rejection Reason
                            </p>
                            <p className="text-[12px] text-red-800 leading-relaxed"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {asset.rejectionReason}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Collections Tab */}
      {tab === 'collections' && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Showcase your best work with curated collections
            </p>
            <button
              onClick={() => setShowCreateCollection(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <Plus className="w-4 h-4" />
              New collection
            </button>
          </div>

          {collectionsLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-4">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : !collections || collections.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
                <FolderOpen className="w-7 h-7 text-[#BBBBBB]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No collections yet
              </h3>
              <p className="text-[13px] text-[#666] mb-4 max-w-[400px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Create collections to showcase themed portfolios on your public profile
              </p>
              <button
                onClick={() => setShowCreateCollection(true)}
                className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Create your first collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/my-assets/collections/${collection.id}`}
                  className="group bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden hover:border-[#EE2B24] transition-colors"
                >
                  {/* Photo collage */}
                  <div className="aspect-[4/3] bg-[#E8E8E8] overflow-hidden grid grid-cols-2 gap-0.5">
                    {collection.thumbnails.length > 0 ? (
                      collection.thumbnails.slice(0, 4).map((thumb, i) => (
                        <div key={i} className="relative overflow-hidden bg-[#E8E8E8]">
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 flex items-center justify-center">
                        <FolderOpen className="w-12 h-12 text-[#BBBBBB]" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-[14px] font-bold text-[#111] line-clamp-1"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.name}
                      </h3>
                      <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full ${
                        collection.isPublic ? 'bg-green-50 text-green-700' : 'bg-[#F0F0F0] text-[#888]'
                      }`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collection.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {collection.assetCount} assets · Created {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <AddToCollectionModal
          selectedAssets={selectedAssets}
          onClose={() => {
            setShowCreateCollection(false)
            setSelectionMode(false)
            setSelectedAssets([])
          }}
        />
      )}

      {/* Asset Stats Modal */}
      {selectedAssetForStats && (
        <AssetStatsModal
          asset={selectedAssetForStats}
          onClose={() => setSelectedAssetForStats(null)}
          onDelete={() => {
            setSelectedAssetForStats(null)
            // Invalidate the query cache to refetch assets
            queryClient.invalidateQueries({ queryKey: ['my-assets'] })
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {assetToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-[18px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Delete Asset?
            </h3>
            <p className="text-[14px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              This action cannot be undone. The asset "{assetToDelete.title}" will be permanently removed from your portfolio.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAssetToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsDeleting(true)
                  try {
                    await assetsApi.delete(assetToDelete.id)
                    showToast('success', 'Asset deleted successfully')
                    setAssetToDelete(null)
                    queryClient.invalidateQueries({ queryKey: ['my-assets'] })
                  } catch (error: any) {
                    showToast('error', error.message || 'Failed to delete asset')
                  } finally {
                    setIsDeleting(false)
                  }
                }}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 text-white text-[14px] font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Asset'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
