'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, FolderOpen } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { ASSET_STATUSES as STATUS_OPTIONS, ASSET_STATUS_STYLES, MOCK_COLLECTIONS, MY_ASSETS_WITH_STATS } from '@/lib/mock'
import { useAuthStore } from '@/stores/authStore'
import { CreateCollectionModal } from '@/components/shared/Modals/CreateCollectionModal'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import type { Asset, StatusFilter, MyAssetsTab } from '@/types'
import Link from 'next/link'

export default function MyAssetsPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [tab, setTab] = useState<MyAssetsTab>('assets')
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [selectedAssetForStats, setSelectedAssetForStats] = useState<typeof MY_ASSETS_WITH_STATS[0] | null>(null)
  const isContributor = user?.role === 'contributor' && user?.isContributorApproved

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

  const filtered = filter === 'all' ? MY_ASSETS_WITH_STATS : MY_ASSETS_WITH_STATS.filter(a => a.status === filter)

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId) ? prev.filter(id => id !== assetId) : [...prev, assetId]
    )
  }

  const selectAll = () => {
    setSelectedAssets(filtered.map(a => a.id))
  }

  const deselectAll = () => {
    setSelectedAssets([])
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
            {MY_ASSETS_WITH_STATS.length} assets · {MOCK_COLLECTIONS.length} collections
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
          Collections ({MOCK_COLLECTIONS.length})
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
                  {s} {s !== 'all' && `(${MY_ASSETS_WITH_STATS.filter(a => a.status === s).length})`}
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
            <div className="divide-y divide-[#F8F8F8]">
              {filtered.map((asset) => (
                <div key={asset.id}>
                  <div className="flex items-center gap-4 px-5 py-3.5 group">
                    {selectionMode && (
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={() => toggleAssetSelection(asset.id)}
                        className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]"
                      />
                    )}
                    <button
                      onClick={() => setSelectedAssetForStats(asset)}
                      className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0 hover:ring-2 hover:ring-[#EE2B24] transition-all"
                    >
                      <img src={asset.src} alt={asset.alt} className="w-full h-full object-cover" />
                    </button>
                    <button
                      onClick={() => setSelectedAssetForStats(asset)}
                      className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                    >
                      <p className="text-[13.5px] font-semibold text-[#111] truncate group-hover:text-[#EE2B24] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {asset.alt}
                      </p>
                      <p className="text-[11.5px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Uploaded {asset.uploadedAt}
                      </p>
                    </button>
                    <div className="hidden sm:flex items-center gap-6 shrink-0">
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-[#111]">{asset.views?.toLocaleString() || '—'}</p>
                        <p className="text-[10px] text-[#888]">views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-[#111]">{asset.downloads}</p>
                        <p className="text-[10px] text-[#888]">downloads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-[#111]">₦{Number(asset.earnings).toLocaleString('en-NG')}</p>
                        <p className="text-[10px] text-[#888]">earned</p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${ASSET_STATUS_STYLES[asset.status]}`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {asset.status}
                    </span>
                  </div>
                  
                  {/* Rejection reason */}
                  {asset.status === 'rejected' && (asset as any).rejectionReason && (
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
                            {(asset as any).rejectionReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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

          {MOCK_COLLECTIONS.length === 0 ? (
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
              {MOCK_COLLECTIONS.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/my-assets/collections/${collection.id}`}
                  className="group bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden hover:border-[#EE2B24] transition-colors"
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
                      {collection.assetCount} assets · Created {collection.createdAt}
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
        <CreateCollectionModal
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
        />
      )}
    </div>
  )
}
