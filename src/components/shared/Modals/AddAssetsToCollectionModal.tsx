'use client'

import { useState } from 'react'
import { X, Loader2, Check } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import { useMyAssets } from '@/hooks/useMyAssets'
import { useAddAssetsToCollection } from '@/hooks/useCollections'
import { useToast } from '@/components/ui/toast-provider'

interface AddAssetsToCollectionModalProps {
  collectionId: string
  collectionName: string
  existingAssetIds: string[]
  onClose: () => void
}

export function AddAssetsToCollectionModal({
  collectionId,
  collectionName,
  existingAssetIds,
  onClose,
}: AddAssetsToCollectionModalProps) {
  const { showToast } = useToast()
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  
  // Fetch only APPROVED assets
  const { data: assetsData, isLoading } = useMyAssets(1, 100, 'APPROVED')
  const { mutate: addAssets, isPending: isAdding } = useAddAssetsToCollection()
  
  // Filter out assets already in collection
  const availableAssets = (assetsData?.data || []).filter(
    asset => !existingAssetIds.includes(asset.id)
  )

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const selectAll = () => {
    setSelectedAssets(availableAssets.map(a => a.id))
  }

  const deselectAll = () => {
    setSelectedAssets([])
  }

  const handleAdd = () => {
    if (selectedAssets.length === 0) {
      showToast('error', 'Please select at least one asset')
      return
    }

    addAssets(
      {
        id: collectionId,
        assetIds: selectedAssets,
      },
      {
        onSuccess: () => {
          showToast('success', `${selectedAssets.length} asset${selectedAssets.length > 1 ? 's' : ''} added to collection`)
          onClose()
        },
        onError: (error: any) => {
          showToast('error', error.message || 'Failed to add assets')
        },
      }
    )
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#F0F0F0] px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2
              className="text-[18px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Add Assets to {collectionName}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[#666]" />
            </button>
          </div>
          
          {/* Selection controls */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {selectedAssets.length} selected · {availableAssets.length} available (approved assets only)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                disabled={availableAssets.length === 0}
                className="text-[12px] font-medium text-[#666] hover:text-[#111] disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Select all
              </button>
              <button
                onClick={deselectAll}
                disabled={selectedAssets.length === 0}
                className="text-[12px] font-medium text-[#666] hover:text-[#111] disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Deselect all
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#EE2B24]" />
            </div>
          ) : availableAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#BBBBBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No approved assets available
              </h3>
              <p className="text-[13px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                All your approved assets are already in this collection
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => toggleAsset(asset.id)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-[#E8E8E8] group ${
                    selectedAssets.includes(asset.id) ? 'ring-2 ring-[#EE2B24]' : ''
                  }`}
                >
                  {asset.thumbnailUrl && (
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Selection indicator */}
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAssets.includes(asset.id)
                      ? 'bg-[#EE2B24] border-[#EE2B24]'
                      : 'bg-white/80 border-white backdrop-blur-sm'
                  }`}>
                    {selectedAssets.includes(asset.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* Title overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-[10px] font-medium line-clamp-2"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {asset.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 bg-white border-t border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            disabled={isAdding}
            className="px-6 py-2.5 text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={isAdding || selectedAssets.length === 0}
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              `Add ${selectedAssets.length} asset${selectedAssets.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  )
}
