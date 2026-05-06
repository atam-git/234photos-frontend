'use client'

import { useState } from 'react'
import { X, Plus, Check, Globe, Lock, Loader2, Search } from 'lucide-react'
import { useMyCollections, useCreateCollection, useAddAssetsToCollection } from '@/hooks/useCollections'
import { useToast } from '@/components/ui/toast-provider'
import { formatDistanceToNow } from 'date-fns'

interface AddToCollectionModalProps {
  selectedAssets: string[]
  onClose: () => void
}

export function AddToCollectionModal({ selectedAssets, onClose }: AddToCollectionModalProps) {
  const [view, setView] = useState<'select' | 'create'>('select')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  
  // Create collection form
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  
  const { showToast } = useToast()
  const { data: collections = [], isLoading } = useMyCollections()
  const { mutate: createCollection, isPending: isCreating } = useCreateCollection()
  const { mutate: addAssets, isPending: isAdding } = useAddAssetsToCollection()

  const filteredCollections = collections.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleCollection = (id: string) => {
    setSelectedCollections(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    )
  }

  const handleAddToExisting = () => {
    if (selectedCollections.length === 0) return

    let completed = 0
    let failed = 0

    selectedCollections.forEach((collectionId) => {
      addAssets(
        { id: collectionId, assetIds: selectedAssets },
        {
          onSuccess: () => {
            completed++
            if (completed + failed === selectedCollections.length) {
              if (failed === 0) {
                showToast('success', `Added to ${completed} collection${completed > 1 ? 's' : ''}`)
                onClose()
              } else {
                showToast('error', `Added to ${completed} collection${completed > 1 ? 's' : ''}, ${failed} failed`)
              }
            }
          },
          onError: () => {
            failed++
            if (completed + failed === selectedCollections.length) {
              showToast('error', `Failed to add to ${failed} collection${failed > 1 ? 's' : ''}`)
            }
          },
        }
      )
    })
  }

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault()
    
    createCollection(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        isPublic,
        assetIds: selectedAssets,
      },
      {
        onSuccess: () => {
          showToast('success', `Collection "${name}" created with ${selectedAssets.length} asset${selectedAssets.length > 1 ? 's' : ''}`)
          onClose()
        },
        onError: (error: any) => {
          showToast('error', error.message || 'Failed to create collection')
        },
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0] shrink-0">
          <div>
            <h2 className="text-[16px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Add to Collection
            </h2>
            <p className="text-[12px] text-[#888] mt-0.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 p-2 bg-[#F8F8F8] border-b border-[#F0F0F0] shrink-0">
          <button
            onClick={() => setView('select')}
            className={`flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors ${
              view === 'select' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Existing Collections
          </button>
          <button
            onClick={() => setView('create')}
            className={`flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors ${
              view === 'create' ? 'bg-white text-[#111] shadow-sm' : 'text-[#666] hover:text-[#111]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create New
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {view === 'select' ? (
            <div className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collections..."
                  className="w-full h-[40px] pl-10 pr-4 border border-[#D0D0D0] rounded-xl text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </div>

              {/* Collections List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#EE2B24]" />
                </div>
              ) : filteredCollections.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-5 h-5 text-[#BBBBBB]" />
                  </div>
                  <p className="text-[13px] text-[#666] mb-4"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {searchQuery ? 'No collections found' : 'No collections yet'}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => setView('create')}
                      className="text-[13px] font-semibold text-[#EE2B24] hover:underline"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Create your first collection
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCollections.map((collection) => {
                    const isSelected = selectedCollections.includes(collection.id)
                    return (
                      <button
                        key={collection.id}
                        onClick={() => toggleCollection(collection.id)}
                        className={`w-full flex items-start gap-3 p-3 border-2 rounded-xl transition-all hover:bg-[#F8F8F8] ${
                          isSelected ? 'border-[#EE2B24] bg-[#FFF5F5]' : 'border-[#E0E0E0]'
                        }`}>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-[#EE2B24] border-[#EE2B24]' : 'border-[#D0D0D0]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[14px] font-semibold text-[#111] truncate"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {collection.name}
                            </h3>
                            {collection.isPublic ? (
                              <Globe className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-[#888] shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {collection.assetCount} assets · {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCreateNew} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Collection Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lagos Street Photography"
                  required
                  className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this collection..."
                  rows={3}
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Visibility
                </label>
                <div className="flex gap-2">
                  <label className={`flex-1 flex items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                    isPublic ? 'border-[#EE2B24] bg-[#FFF5F5]' : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                  }`}>
                    <input
                      type="radio"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="w-4 h-4 text-[#EE2B24] focus:ring-[#EE2B24]"
                    />
                    <Globe className="w-4 h-4 text-[#EE2B24]" />
                    <span className="text-[13px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Public
                    </span>
                  </label>

                  <label className={`flex-1 flex items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                    !isPublic ? 'border-[#EE2B24] bg-[#FFF5F5]' : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                  }`}>
                    <input
                      type="radio"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="w-4 h-4 text-[#EE2B24] focus:ring-[#EE2B24]"
                    />
                    <Lock className="w-4 h-4 text-[#888]" />
                    <span className="text-[13px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Private
                    </span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#F0F0F0] shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isAdding || isCreating}
            className="flex-1 px-5 py-3 border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-full hover:border-[#999] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Cancel
          </button>
          {view === 'select' ? (
            <button
              type="button"
              onClick={handleAddToExisting}
              disabled={selectedCollections.length === 0 || isAdding}
              className="flex-1 px-5 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {isAdding && <Loader2 className="w-4 h-4 animate-spin" />}
              {isAdding ? 'Adding...' : `Add to ${selectedCollections.length || ''} Collection${selectedCollections.length !== 1 ? 's' : ''}`}
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleCreateNew}
              disabled={!name.trim() || isCreating}
              className="flex-1 px-5 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isCreating ? 'Creating...' : 'Create & Add Assets'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
