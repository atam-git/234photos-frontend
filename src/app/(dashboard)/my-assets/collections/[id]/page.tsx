'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Globe, Lock, MoreVertical, Trash2, Edit2, Plus } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { MOCK_COLLECTION_DETAIL } from '@/lib/mock'
import { useAuthStore } from '@/stores/authStore'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { EditCollectionModal } from '@/components/shared/Modals/EditCollectionModal'
import Link from 'next/link'

export default function CollectionDetailPage() {
  useParams<{ id: string }>() // Get id from URL params
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [showMenu, setShowMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [collection, setCollection] = useState(MOCK_COLLECTION_DETAIL)
  const [selectedAsset, setSelectedAsset] = useState<typeof MOCK_COLLECTION_DETAIL.assets[0] | null>(null)
  const isContributor = user?.role === 'contributor' && user?.isContributorApproved

  useEffect(() => {
    if (!isContributor) {
      router.push('/discover?openContributorModal=true')
    }
  }, [isContributor, router])

  if (!isContributor) {
    return null
  }

  const handleDelete = () => {
    if (confirm(`Delete "${collection.name}"? This cannot be undone.`)) {
      console.log('Deleting collection...')
      router.push('/my-assets')
    }
  }

  const handleToggleVisibility = () => {
    setCollection(prev => ({ ...prev, isPublic: !prev.isPublic }))
    setShowMenu(false)
  }

  const handleEditSave = (data: { name: string; description: string; isPublic: boolean }) => {
    setCollection(prev => ({
      ...prev,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
    }))
  }

  const handleRemoveAsset = (assetId: string) => {
    if (confirm('Remove this asset from the collection?')) {
      setCollection(prev => ({
        ...prev,
        assets: prev.assets.filter(a => a.id !== assetId),
        assetCount: prev.assetCount - 1,
      }))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link
            href="/my-assets"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#111] transition-colors mb-3"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to My Assets
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[22px] font-extrabold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {collection.name}
            </h1>
            <span className={`text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${
              collection.isPublic ? 'bg-green-50 text-green-700' : 'bg-[#F0F0F0] text-[#888]'
            }`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {collection.isPublic ? (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Public
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Private
                </span>
              )}
            </span>
          </div>
          {collection.description && (
            <p className="text-[13.5px] text-[#666] leading-relaxed max-w-[600px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {collection.description}
            </p>
          )}
          <p className="text-[12px] text-[#888] mt-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {collection.assetCount} assets · Created {collection.createdAt}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 relative">
          <button
            className="px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-semibold rounded-full hover:border-[#999] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <Plus className="w-4 h-4 inline mr-1" />
            Add assets
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full border border-[#D0D0D0] flex items-center justify-center hover:border-[#999] transition-colors">
            <MoreVertical className="w-4 h-4 text-[#888]" />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-xl shadow-lg border border-[#F0F0F0] py-2 z-50">
                <button
                  onClick={() => {
                    setShowMenu(false)
                    setShowEditModal(true)
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Edit2 className="w-4 h-4" />
                  Edit details
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleToggleVisibility()
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {collection.isPublic ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  Make {collection.isPublic ? 'private' : 'public'}
                </button>
                <div className="h-px bg-[#F0F0F0] my-1" />
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Trash2 className="w-4 h-4" />
                  Delete collection
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Assets grid */}
      {collection.assets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-16 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
            <Plus className="w-7 h-7 text-[#BBBBBB]" />
          </div>
          <h3 className="text-[16px] font-bold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No assets in this collection
          </h3>
          <p className="text-[13px] text-[#666] mb-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Add assets from your library to build this collection
          </p>
          <Link
            href="/my-assets"
            className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Go to My Assets
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {collection.assets.map((asset) => (
            <div key={asset.id} className="group relative aspect-square rounded-xl overflow-hidden bg-[#E8E8E8]">
              <button
                onClick={() => setSelectedAsset(asset)}
                className="w-full h-full"
              >
                <img
                  src={asset.src}
                  alt={asset.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[11px] font-medium line-clamp-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {asset.alt}
                  </p>
                </div>
              </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveAsset(asset.id)
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 pointer-events-auto"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#EE2B24]" />
                </button>
            </div>
          ))}
        </div>
      )}

      {/* Asset Stats Modal */}
      {selectedAsset && (
        <AssetStatsModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}

      {/* Edit Collection Modal */}
      {showEditModal && (
        <EditCollectionModal
          collection={collection}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  )
}
