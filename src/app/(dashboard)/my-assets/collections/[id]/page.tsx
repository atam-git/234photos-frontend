'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Globe, Lock, MoreVertical, Trash2, Edit2, Plus, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { EditCollectionModal } from '@/components/shared/Modals/EditCollectionModal'
import { AddAssetsToCollectionModal } from '@/components/shared/Modals/AddAssetsToCollectionModal'
import { useCollection, useDeleteCollection, useUpdateCollection, useRemoveAssetsFromCollection } from '@/hooks/useCollections'
import { useToast } from '@/components/ui/toast-provider'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function CollectionDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const { showToast } = useToast()
  const [showMenu, setShowMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showAddAssetsModal, setShowAddAssetsModal] = useState(false)
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false)
  const [assetToRemove, setAssetToRemove] = useState<any>(null)
  const isContributor = user?.role === 'contributor' && user?.isContributor

  const { data: collection, isLoading, error } = useCollection(params.id)
  const { mutate: deleteCollection, isPending: isDeleting } = useDeleteCollection()
  const { mutate: updateCollection, isPending: isUpdating } = useUpdateCollection()
  const { mutate: removeAssets, isPending: isRemoving } = useRemoveAssetsFromCollection()

  useEffect(() => {
    if (!isContributor) {
      router.push('/discover?openContributorModal=true')
    }
  }, [isContributor, router])

  if (!isContributor) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#EE2B24]" />
      </div>
    )
  }

  if (error || !collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-semibold text-[#111] mb-2">Collection not found</h2>
        <p className="text-[#666] mb-4">This collection may have been deleted or you don't have access to it</p>
        <Link
          href="/my-assets"
          className="px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Back to My Assets
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    deleteCollection(params.id, {
      onSuccess: () => {
        showToast('success', 'Collection deleted successfully')
        router.push('/my-assets')
      },
      onError: (error: any) => {
        showToast('error', error.message || 'Failed to delete collection')
      },
    })
    setShowDeleteCollectionModal(false)
  }

  const handleToggleVisibility = () => {
    updateCollection(
      {
        id: params.id,
        payload: { isPublic: !collection.isPublic },
      },
      {
        onSuccess: () => {
          showToast('success', `Collection is now ${!collection.isPublic ? 'public' : 'private'}`)
        },
        onError: (error: any) => {
          showToast('error', error.message || 'Failed to update collection')
        },
      }
    )
    setShowMenu(false)
  }

  const handleEditSave = (data: { name: string; description: string; isPublic: boolean }) => {
    updateCollection(
      {
        id: params.id,
        payload: data,
      },
      {
        onSuccess: () => {
          showToast('success', 'Collection updated successfully')
          setShowEditModal(false)
        },
        onError: (error: any) => {
          showToast('error', error.message || 'Failed to update collection')
        },
      }
    )
  }

  const handleRemoveAsset = (assetId: string) => {
    removeAssets(
      {
        id: params.id,
        assetIds: [assetId],
      },
      {
        onSuccess: () => {
          showToast('success', 'Asset removed from collection')
          setAssetToRemove(null)
        },
        onError: (error: any) => {
          showToast('error', error.message || 'Failed to remove asset')
        },
      }
    )
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
            {collection.assetCount} assets · Created {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowAddAssetsModal(true)}
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
                  disabled={isUpdating}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : collection.isPublic ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  {isUpdating ? 'Updating...' : `Make ${collection.isPublic ? 'private' : 'public'}`}
                </button>
                <div className="h-px bg-[#F0F0F0] my-1" />
                <button
                  onClick={() => {
                    setShowMenu(false)
                    setShowDeleteCollectionModal(true)
                  }}
                  disabled={isDeleting}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  {isDeleting ? 'Deleting...' : 'Delete collection'}
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
          <button
            onClick={() => setShowAddAssetsModal(true)}
            className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Add Assets
          </button>
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
                  src={asset.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[11px] font-medium line-clamp-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {asset.title}
                  </p>
                </div>
              </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAssetToRemove(asset)
                  }}
                  disabled={isRemoving}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Add Assets Modal */}
      {showAddAssetsModal && (
        <AddAssetsToCollectionModal
          collectionId={params.id}
          collectionName={collection.name}
          existingAssetIds={collection.assets.map(a => a.id)}
          onClose={() => setShowAddAssetsModal(false)}
        />
      )}

      {/* Delete Collection Confirmation Modal */}
      {showDeleteCollectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-[18px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Delete Collection?
            </h3>
            <p className="text-[14px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Are you sure you want to delete "{collection.name}"? This action cannot be undone. The assets will remain in your library.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteCollectionModal(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
                  'Delete Collection'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Asset Confirmation Modal */}
      {assetToRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-[18px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Remove Asset?
            </h3>
            <p className="text-[14px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Remove "{assetToRemove.title}" from this collection? The asset will remain in your library.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAssetToRemove(null)}
                disabled={isRemoving}
                className="flex-1 py-2.5 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveAsset(assetToRemove.id)}
                disabled={isRemoving}
                className="flex-1 py-2.5 bg-red-600 text-white text-[14px] font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {isRemoving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove Asset'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
