'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Save, Send, Info } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import { assetsApi } from '@/lib/api/assets'
import { useToast } from '@/components/ui/toast-provider'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

export default function EditDraftPage() {
  const router = useRouter()
  const params = useParams()
  const assetId = params.id as string
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isAI, setIsAI] = useState(false)
  const [isEditorial, setIsEditorial] = useState(false)
  const [modelRelease, setModelRelease] = useState(false)
  const [propertyRelease, setPropertyRelease] = useState(false)
  
  // Asset data
  const [asset, setAsset] = useState<any>(null)

  // Load asset data
  useEffect(() => {
    const loadAsset = async () => {
      try {
        const data = await assetsApi.getById(assetId)
        
        // Check if it's a draft
        if (data.status.toLowerCase() !== 'draft') {
          showToast('error', 'Only draft assets can be edited')
          router.push('/my-assets')
          return
        }
        
        setAsset(data)
        setTitle(data.title)
        setDescription(data.description || '')
        setCategoryId(data.category) // This might need adjustment based on API response
        setTags(data.tags || [])
        setIsAI(data.isAI)
        setIsEditorial(data.isEditorial)
        setModelRelease(data.modelRelease || false)
        setPropertyRelease(data.propertyRelease || false)
      } catch (error: any) {
        showToast('error', error.message || 'Failed to load asset')
        router.push('/my-assets')
      } finally {
        setLoading(false)
      }
    }

    loadAsset()
  }, [assetId, router, showToast])

  const addTag = () => {
    if (!newTag.trim()) return
    if (tags.includes(newTag.trim().toLowerCase())) {
      showToast('error', 'Tag already exists')
      return
    }
    setTags([...tags, newTag.trim().toLowerCase()])
    setNewTag('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      showToast('error', 'Title is required')
      return
    }
    if (!categoryId) {
      showToast('error', 'Category is required')
      return
    }

    setSaving(true)
    try {
      await assetsApi.update(assetId, {
        title: title.trim(),
        description: description.trim() || undefined,
        categoryId,
        tags: tags.length > 0 ? tags : undefined,
        isAI,
        isEditorial,
        modelRelease,
        propertyRelease,
      })
      
      // Invalidate React Query cache to refresh My Assets page
      queryClient.invalidateQueries({ queryKey: ['my-assets'] })
      
      showToast('success', 'Draft saved successfully')
      router.push('/my-assets?tab=drafts')
    } catch (error: any) {
      showToast('error', error.message || 'Failed to save draft')
    } finally {
      setSaving(false)
    }
  }

  const handleSubmitForReview = async () => {
    if (!title.trim()) {
      showToast('error', 'Title is required')
      return
    }
    if (!categoryId) {
      showToast('error', 'Category is required')
      return
    }

    setSubmitting(true)
    try {
      // First save the changes
      await assetsApi.update(assetId, {
        title: title.trim(),
        description: description.trim() || undefined,
        categoryId,
        tags: tags.length > 0 ? tags : undefined,
        isAI,
        isEditorial,
        modelRelease,
        propertyRelease,
      })
      
      // Then submit for review
      await assetsApi.submitDraft(assetId)
      
      // Invalidate React Query cache to refresh My Assets page
      queryClient.invalidateQueries({ queryKey: ['my-assets'] })
      
      showToast('success', 'Asset submitted for review!')
      router.push('/my-assets?tab=pending')
    } catch (error: any) {
      showToast('error', error.message || 'Failed to submit asset')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#EE2B24]" />
      </div>
    )
  }

  if (!asset) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#F0F0F0] h-[60px] flex items-center px-4 md:px-6 gap-3">
        <Link href="/my-assets?tab=drafts" className="flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#111] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          ← Back to Drafts
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            disabled={saving || submitting}
            className="px-4 py-2 bg-[#F5F5F5] text-[#111] text-[13px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Draft
              </>
            )}
          </button>
          <button
            onClick={handleSubmitForReview}
            disabled={saving || submitting}
            className="px-4 py-2 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit for Review
              </>
            )}
          </button>
        </div>
      </header>

      <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6 flex flex-col gap-5">
          {/* Asset Preview */}
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
              {asset.thumbnailUrl && (
                <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter asset title..."
                className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this asset for potential buyers..."
              rows={4}
              className="w-full px-3 py-2.5 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Category *
            </label>
            {categoriesLoading ? (
              <div className="flex items-center gap-2 h-[40px] px-3 border border-[#D0D0D0] rounded-xl">
                <Loader2 className="w-4 h-4 animate-spin text-[#EE2B24]" />
                <span className="text-[13px] text-[#888]">Loading categories...</span>
              </div>
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
              >
                <option value="">Select category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F5] text-[#111] text-[12px] font-medium rounded-full"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-[#EE2B24] transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Releases */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <label className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Model Release
                </label>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[280px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <p className="font-semibold mb-1">What is a Model Release?</p>
                    <p className="mb-2">A signed document from people in your photo giving permission to use their image commercially.</p>
                    <p className="text-[10px] text-[#BBB]">
                      <strong>Yes:</strong> Commercial use allowed<br />
                      <strong>No:</strong> Editorial use only
                    </p>
                    <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                  </div>
                </div>
              </div>
              <select
                value={modelRelease ? 'yes' : 'no'}
                onChange={(e) => setModelRelease(e.target.value === 'yes')}
                className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
              >
                <option value="yes">Yes - Commercial use allowed</option>
                <option value="no">No - Editorial use only</option>
              </select>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <label className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Property Release
                </label>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[280px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <p className="font-semibold mb-1">What is a Property Release?</p>
                    <p className="mb-2">A signed document from property owners giving permission to use images of their property commercially.</p>
                    <p className="text-[10px] text-[#BBB]">
                      <strong>Yes:</strong> Commercial use allowed<br />
                      <strong>No:</strong> Editorial use only
                    </p>
                    <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                  </div>
                </div>
              </div>
              <select
                value={propertyRelease ? 'yes' : 'no'}
                onChange={(e) => setPropertyRelease(e.target.value === 'yes')}
                className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
              >
                <option value="yes">Yes - Commercial use allowed</option>
                <option value="no">No - Editorial use only</option>
              </select>
            </div>
          </div>

          {/* Flags */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={isAI}
                onChange={(e) => setIsAI(e.target.checked)}
                className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]"
              />
              <span className="text-[13px] font-medium text-[#111] flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                AI-generated content
                <div className="relative">
                  <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[280px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <p className="font-semibold mb-1">AI-Generated Content</p>
                    <p className="mb-2">Check this box if your image was created or significantly modified using AI tools.</p>
                    <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                  </div>
                </div>
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isEditorial}
                onChange={(e) => setIsEditorial(e.target.checked)}
                className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]"
              />
              <span className="text-[13px] font-medium text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Editorial use only
              </span>
            </label>
          </div>

          {/* File Info */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-[#F8F8F8] rounded-xl">
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Dimensions
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.dimensions || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                File Size
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.fileSize || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                File Type
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.fileType?.toUpperCase() || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
