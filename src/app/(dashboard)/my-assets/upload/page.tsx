'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Check, Tag, ChevronRight, Loader2, CheckCircle2, FileCheck, Info } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useCategories } from '@/hooks/useCategories'
import { useFileUpload, useCreateAsset } from '@/hooks/useUpload'
import { useToast } from '@/components/ui/toast-provider'
import Link from 'next/link'
import type { UploadStep, UploadFile } from '@/types'

export default function UploadPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const { showToast } = useToast()
  const isContributor = user?.role === 'contributor' && user?.isContributor
  
  // Fetch real categories
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  
  // Upload hooks
  const { uploads, uploadFile, clearAllUploads } = useFileUpload()
  const { createAsset, isCreating } = useCreateAsset()
  
  const [step, setStep] = useState<UploadStep>('drop')
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [newTag, setNewTag] = useState('')
  const [uploadResult, setUploadResult] = useState<{ successful: number; total: number; failed: number } | null>(null)
  const autoSaveTriggeredRef = useRef(false)

  const addFiles = useCallback((rawFiles: File[]) => {
    const newFiles: UploadFile[] = rawFiles.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      fileName: f.name,
      fileSize: f.size,
      mimeType: f.type,
      status: 'uploading' as const,
      progress: 0,
      preview: URL.createObjectURL(f),
      thumbnailUrl: URL.createObjectURL(f),
      tags: [],
      title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      description: '',
      category: categories[0]?.id || '',
      categoryId: categories[0]?.id || '',
      isAI: false,
      isEditorial: false,
      modelRelease: false,
      propertyRelease: false,
      dimensions: { width: 0, height: 0 },
      aspectRatio: 1,
      sessionId: undefined, // Will be set after upload
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    setStep('uploading')
    setActiveFile(newFiles[0]?.id ?? null)

    // Detect image dimensions for each file
    newFiles.forEach(async (fileData) => {
      if (fileData.file && fileData.file.type.startsWith('image/')) {
        try {
          const img = new Image()
          img.src = fileData.preview || ''
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              // Update dimensions
              setFiles(prev => prev.map(f => 
                f.id === fileData.id 
                  ? { 
                      ...f, 
                      dimensions: { width: img.width, height: img.height },
                      aspectRatio: img.width / img.height
                    }
                  : f
              ))
              resolve(true)
            }
            img.onerror = reject
          })
        } catch (error) {
          console.error('Failed to load image dimensions:', error)
        }
      }
    })

    // Start uploading files to S3
    newFiles.forEach(async (fileData) => {
      if (!fileData.file) {
        console.error('No file object for:', fileData.fileName)
        return
      }
      
      try {
        const sessionId = await uploadFile(fileData.file)
        
        // Update file with sessionId
        setFiles(prev => prev.map(f => 
          f.id === fileData.id 
            ? { ...f, sessionId, status: 'complete' as const, progress: 100 }
            : f
        ))
      } catch (error: any) {
        console.error('Upload failed:', error)
        setFiles(prev => prev.map(f => 
          f.id === fileData.id 
            ? { ...f, status: 'complete' as const, progress: 0 }
            : f
        ))
        showToast('error', `Failed to upload ${fileData.fileName}`)
      }
    })
  }, [uploadFile, categories, showToast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    addFiles(dropped)
  }, [addFiles])

  // Auto-transition from uploading to tagging when all files complete
  useEffect(() => {
    if (step === 'uploading' && files.length > 0 && files.every(f => f.status === 'complete')) {
      const timer = setTimeout(() => {
        setStep('tagging')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [step, files])

  // Sync upload progress from hook to files state
  // Create a stable key based on upload progress to avoid infinite loops
  const uploadProgressKey = useMemo(() => 
    uploads.map(u => `${u.fileName}:${u.progress}`).join('|'),
    [uploads]
  )
  
  useEffect(() => {
    if (uploads.length === 0) return
    
    setFiles(prev => {
      let hasChanges = false
      const updated = prev.map(f => {
        const upload = uploads.find(u => u.fileName === f.fileName)
        if (upload && upload.status === 'uploading' && f.progress !== upload.progress) {
          hasChanges = true
          return { ...f, progress: upload.progress }
        }
        return f
      })
      
      return hasChanges ? updated : prev
    })
  }, [uploadProgressKey]) // Only re-run when progress actually changes

  // Auto-save as draft when upload completes and user reaches tagging step
  useEffect(() => {
    const autoSaveDrafts = async () => {
      // Only auto-save once when transitioning to tagging step
      if (step !== 'tagging') return
      
      // Prevent duplicate auto-saves
      if (autoSaveTriggeredRef.current) return
      
      // Check if files have sessionIds but haven't been saved yet
      const unsavedFiles = files.filter(f => f.sessionId && !f.assetId)
      if (unsavedFiles.length === 0) return

      // Mark as triggered to prevent duplicate saves
      autoSaveTriggeredRef.current = true

      console.log(`Auto-saving ${unsavedFiles.length} file(s) as draft...`)

      // Auto-save all uploaded files as drafts
      for (const file of unsavedFiles) {
        if (!file.sessionId || !file.categoryId) {
          console.warn(`Skipping file ${file.fileName}: missing sessionId or categoryId`)
          continue
        }
        
        try {
          const asset = await createAsset({
            uploadSessionId: file.sessionId,
            title: file.title,
            description: file.description || undefined,
            categoryId: file.categoryId,
            tags: file.tags.length > 0 ? file.tags : undefined,
            isAI: file.isAI,
            isEditorial: file.isEditorial,
            modelRelease: file.modelRelease,
            propertyRelease: file.propertyRelease,
            isDraft: true, // Auto-save as draft
          })
          
          console.log(`Auto-saved ${file.fileName} as draft with ID: ${asset.id}`)
          
          // Mark file as saved by storing assetId
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, assetId: asset.id } : f
          ))
        } catch (error) {
          console.error(`Failed to auto-save draft for ${file.fileName}:`, error)
        }
      }
      
      // Show subtle notification
      if (unsavedFiles.length > 0) {
        showToast('success', `${unsavedFiles.length} file${unsavedFiles.length > 1 ? 's' : ''} auto-saved as draft`)
      }
    }

    autoSaveDrafts()
  }, [step, files, createAsset, showToast]) // Include all dependencies

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
          <p className="text-[#666] mb-4">Apply to become a contributor to upload assets</p>
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
  }

  const addTag = (fileId: string) => {
    if (!newTag.trim()) return
    setFiles(prev => prev.map(f =>
      f.id === fileId ? { ...f, tags: [...f.tags, newTag.trim().toLowerCase()] } : f
    ))
    setNewTag('')
  }

  const removeTag = (fileId: string, tag: string) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId ? { ...f, tags: f.tags.filter(t => t !== tag) } : f
    ))
  }

  const updateFile = (fileId: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updates } : f))
  }

  const applyToAllFiles = () => {
    if (!activeFileData) return
    
    // Copy these fields to all files (but keep unique titles)
    const sharedMetadata = {
      description: activeFileData.description,
      category: activeFileData.category,
      isAI: activeFileData.isAI,
      isEditorial: activeFileData.isEditorial,
      modelRelease: activeFileData.modelRelease,
      propertyRelease: activeFileData.propertyRelease,
      tags: activeFileData.tags,
    }
    
    setFiles(prev => prev.map(f => ({ ...f, ...sharedMetadata })))
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setStep('done')
    
    let successful = 0
    let failed = 0
    
    // Create asset records for each uploaded file
    for (const file of files) {
      // If file was already auto-saved as draft, update it with current form values
      if (file.assetId) {
        try {
          // Import the API functions
          const { assetsApi } = await import('@/lib/api/assets')
          
          // Update the draft with edited fields
          await assetsApi.update(file.assetId, {
            title: file.title,
            description: file.description || undefined,
            categoryId: file.categoryId,
            tags: file.tags.length > 0 ? file.tags : undefined,
            isAI: file.isAI,
            isEditorial: file.isEditorial,
            modelRelease: file.modelRelease,
            propertyRelease: file.propertyRelease,
          })
          
          // If submitting for review (not saving as draft), submit the draft
          if (!isDraft) {
            await assetsApi.submitDraft(file.assetId)
            console.log(`Updated and submitted draft ${file.assetId} for review`)
          } else {
            console.log(`Updated draft ${file.assetId} with new values`)
          }
          
          successful++
          continue
        } catch (error: any) {
          console.error(`Failed to update draft ${file.assetId}:`, error)
          failed++
          continue
        }
      }
      
      if (!file.sessionId) {
        console.error(`No sessionId for file: ${file.fileName}`)
        failed++
        continue
      }
      
      try {
        await createAsset({
          uploadSessionId: file.sessionId,
          title: file.title,
          description: file.description || undefined,
          categoryId: file.categoryId,
          tags: file.tags.length > 0 ? file.tags : undefined,
          isAI: file.isAI,
          isEditorial: file.isEditorial,
          modelRelease: file.modelRelease,
          propertyRelease: file.propertyRelease,
          isDraft, // Pass draft flag
        })
        successful++
      } catch (error: any) {
        console.error(`Failed to create asset for ${file.fileName}:`, error)
        failed++
      }
    }
    
    setUploadResult({
      successful,
      failed,
      total: files.length,
    })
    
    if (successful > 0) {
      if (isDraft) {
        showToast('success', `${successful} asset${successful > 1 ? 's' : ''} saved as draft!`)
        // Redirect to My Assets drafts tab
        setTimeout(() => {
          router.push('/my-assets?tab=drafts')
        }, 500)
      } else {
        showToast('success', `${successful} asset${successful > 1 ? 's' : ''} submitted for review!`)
      }
    }
    if (failed > 0) {
      showToast('error', `${failed} asset${failed > 1 ? 's' : ''} failed to upload`)
    }
  }

  const activeFileData = files.find(f => f.id === activeFile)

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#F0F0F0] h-[60px] flex items-center px-4 md:px-6 gap-3">
        <Link href="/my-assets" className="flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#111] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          ← Back to My Assets
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {/* Step indicator */}
          {(['drop', 'uploading', 'tagging', 'done'] as UploadStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />}
              <span className={`text-[12px] font-semibold capitalize ${step === s ? 'text-[#EE2B24]' : 'text-[#BBBBBB]'}`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {s === 'drop' ? 'Select' : s === 'uploading' ? 'Upload' : s === 'tagging' ? 'Tag' : 'Done'}
              </span>
            </div>
          ))}
        </div>
      </header>

      <div className="px-4 md:px-6 py-8">

        {/* Step: Drop */}
        {step === 'drop' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-24 px-8 text-center transition-colors ${
              dragging ? 'border-[#EE2B24] bg-[#FFF5F5]' : 'border-[#D0D0D0] bg-white hover:border-[#BBBBBB]'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#FFF0F0] flex items-center justify-center mb-5">
              <Upload className="w-7 h-7 text-[#EE2B24]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Drag & drop your files here
            </h2>
            <p className="text-[13.5px] text-[#666] mb-6 max-w-[400px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Supports JPG, PNG, WEBP. Max 4GB per file.
            </p>
            <label className="cursor-pointer px-8 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Browse files
              <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileInput} />
            </label>
          </div>
        )}

        {/* Step: Uploading */}
        {step === 'uploading' && (
          <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Uploading {files.length} file{files.length > 1 ? 's' : ''}
              </h2>
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {files.filter(f => f.status === 'complete').length}/{files.length} complete
              </span>
            </div>
            <div className="divide-y divide-[#F8F8F8]">
              {files.map((file) => {
                const isUploading = file.status === 'uploading' || (file.progress > 0 && file.progress < 100)
                const isComplete = file.status === 'complete' && file.progress === 100
                
                return (
                  <div key={file.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0 relative">
                      <img src={file.preview} alt={file.fileName} className="w-full h-full object-cover" />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[13px] font-semibold text-[#111] truncate"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {file.fileName}
                        </p>
                        <span className="text-[11px] text-[#888] ml-2 shrink-0"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {isComplete 
                            ? 'Complete' 
                            : isUploading 
                              ? `${Math.round(file.progress)}%` 
                              : 'Waiting...'
                          }
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            isComplete ? 'bg-green-500' : 'bg-[#EE2B24]'
                          }`}
                          style={{ width: `${file.progress}%` }} 
                        />
                      </div>
                      {isUploading && (
                        <p className="text-[10px] text-[#999] mt-1"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {file.progress < 30 
                            ? 'Preparing upload...' 
                            : file.progress < 90 
                              ? 'Uploading to cloud...' 
                              : 'Finalizing...'
                          }
                        </p>
                      )}
                    </div>
                    <div className="shrink-0">
                      {isComplete ? (
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                      ) : isUploading ? (
                        <div className="w-8 h-8 rounded-full bg-[#FFF0F0] flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-[#EE2B24] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-[#CCCCCC]" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step: Tagging */}
        {step === 'tagging' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* File list */}
            <div className="w-full lg:w-[220px] shrink-0">
              <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#F0F0F0]">
                  <p className="text-[12px] font-bold text-[#888] uppercase tracking-[0.5px]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {files.length} files
                  </p>
                </div>
                <div className="divide-y divide-[#F8F8F8]">
                  {files.map((file) => (
                    <button key={file.id} onClick={() => setActiveFile(file.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors ${
                        activeFile === file.id ? 'bg-[#FFF0F0]' : 'hover:bg-[#F8F8F8]'
                      }`}>
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                        <img src={file.preview} alt={file.fileName} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[12px] font-medium text-[#111] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {file.fileName}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag editor */}
            {activeFileData && (
              <div className="flex-1 bg-white rounded-2xl border border-[#F0F0F0] p-6 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
                    <img src={activeFileData.preview} alt={activeFileData.fileName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Title
                    </label>
                    <input type="text" value={activeFileData.title}
                      onChange={(e) => updateFile(activeFileData.id, { title: e.target.value })}
                      className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Description
                  </label>
                  <textarea value={activeFileData.description}
                    onChange={(e) => updateFile(activeFileData.id, { description: e.target.value })}
                    placeholder="Describe this asset for potential buyers..."
                    rows={3}
                    className="w-full px-3 py-2.5 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Category
                    </label>
                    {categoriesLoading ? (
                      <div className="flex items-center gap-2 h-[40px] px-3 border border-[#D0D0D0] rounded-xl">
                        <Loader2 className="w-4 h-4 animate-spin text-[#EE2B24]" />
                        <span className="text-[13px] text-[#888]">Loading categories...</span>
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="p-3 bg-[#FFF5F5] border border-[#FFE5E5] rounded-xl">
                        <p className="text-[13px] text-[#EE2B24]">No categories available</p>
                      </div>
                    ) : (
                      <select value={activeFileData.categoryId}
                        onChange={(e) => updateFile(activeFileData.id, { categoryId: e.target.value, category: e.target.value })}
                        className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white">
                        <option value="">Select category...</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

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
                    <select value={activeFileData.modelRelease ? 'yes' : 'no'}
                      onChange={(e) => updateFile(activeFileData.id, { modelRelease: e.target.value === 'yes' })}
                      className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white">
                      <option value="yes">Yes - Commercial use allowed</option>
                      <option value="no">No - Editorial use only</option>
                    </select>
                    <p className="text-[11px] text-[#888] mt-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Required if people are recognizable in the photo
                    </p>
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
                    <select value={activeFileData.propertyRelease ? 'yes' : 'no'}
                      onChange={(e) => updateFile(activeFileData.id, { propertyRelease: e.target.value === 'yes' })}
                      className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white">
                      <option value="yes">Yes - Commercial use allowed</option>
                      <option value="no">No - Editorial use only</option>
                    </select>
                    <p className="text-[11px] text-[#888] mt-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Required for identifiable private property
                    </p>
                  </div>
                </div>

                {/* File info (read-only) */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-[#F8F8F8] rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Dimensions
                    </p>
                    <p className="text-[12px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {activeFileData.dimensions ? `${activeFileData.dimensions.width} × ${activeFileData.dimensions.height}px` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      File Size
                    </p>
                    <p className="text-[12px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {(activeFileData.fileSize / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      File Type
                    </p>
                    <p className="text-[12px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {activeFileData.mimeType.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Flags */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={activeFileData.isAI}
                      onChange={(e) => updateFile(activeFileData.id, { isAI: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]" />
                    <span className="text-[13px] font-medium text-[#111] flex items-center gap-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      AI-generated content
                      <div className="relative">
                        <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[280px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          <p className="font-semibold mb-1">AI-Generated Content</p>
                          <p className="mb-2">Check this box if your image was created or significantly modified using AI tools like Midjourney, DALL-E, Stable Diffusion, or similar.</p>
                          <p className="text-[10px] text-[#BBB] italic">
                            Transparency about AI-generated content helps buyers make informed decisions and ensures compliance with platform policies.
                          </p>
                          <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                        </div>
                      </div>
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={activeFileData.isEditorial}
                      onChange={(e) => updateFile(activeFileData.id, { isEditorial: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]" />
                    <span className="text-[13px] font-medium text-[#111] flex items-center gap-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Editorial use only
                      <div className="relative">
                        <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[320px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          <p className="font-semibold mb-2">What is Editorial Use?</p>
                          <p className="mb-2">Editorial use means the image can only be used for news, education, or commentary purposes - NOT for advertising or promoting products/services.</p>
                          <div className="space-y-1 mb-2">
                            <p className="text-[10px] text-green-300">✓ Allowed: News articles, blog posts, documentaries, textbooks</p>
                            <p className="text-[10px] text-red-300">✗ Not allowed: Advertisements, product packaging, promotional materials</p>
                          </div>
                          <p className="text-[10px] text-[#BBB] italic">
                            Check this if your image doesn't have model/property releases but documents newsworthy events or public interest topics.
                          </p>
                          <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                        </div>
                      </div>
                    </span>
                  </label>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-3.5 h-3.5 text-[#888]" />
                    <label className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Tags
                    </label>
                    <div className="group relative">
                      <Info className="w-3.5 h-3.5 text-[#888] cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[280px] p-3 bg-[#111] text-white text-[11px] leading-relaxed rounded-lg shadow-lg z-50"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <p className="font-semibold mb-1">AI Auto-Tagging</p>
                        <p>After your asset is uploaded and processed, our AI will automatically suggest relevant tags to improve discoverability.</p>
                        <p className="text-[10px] text-[#BBB] mt-2 italic">
                          You can add manual tags now, and AI tags will be added in the background after upload completes.
                        </p>
                        <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {activeFileData.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-[#F5F5F7] text-[#444] text-[12px] font-medium rounded-full">
                        {tag}
                        <button onClick={() => removeTag(activeFileData.id, tag)} className="text-[#BBBBBB] hover:text-[#EE2B24] transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(activeFileData.id) } }}
                      placeholder="Add a tag…"
                      className="flex-1 h-[38px] px-3 border border-[#D0D0D0] rounded-xl text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                    <button onClick={() => addTag(activeFileData.id)}
                      className="px-4 py-2 bg-[#111] text-white text-[13px] font-semibold rounded-xl hover:bg-[#333] transition-colors"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0]">
                  <button 
                    onClick={applyToAllFiles}
                    className="text-[13px] text-[#888] hover:text-[#111] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Apply to all files
                  </button>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleSubmit(true)}
                      disabled={isCreating}
                      className="px-6 py-2.5 border border-[#D0D0D0] text-[#111] text-[13.5px] font-semibold rounded-full hover:border-[#999] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {isCreating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          Save as Draft
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => handleSubmit(false)}
                      disabled={isCreating}
                      className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {isCreating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit for review →
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step: Done */}
        {step === 'done' && (
          <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-[22px] font-bold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {uploadResult?.successful || files.length} asset{(uploadResult?.successful || files.length) > 1 ? 's' : ''} submitted for review!
            </h2>
            <p className="text-[13.5px] text-[#666] mb-8 max-w-[400px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {uploadResult?.failed && uploadResult.failed > 0 
                ? `${uploadResult.successful} of ${uploadResult.total} assets were submitted successfully. ${uploadResult.failed} failed.`
                : "Estimated review time: 24–48 hours. You'll be notified when your assets go live."
              }
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <button onClick={() => { 
                setFiles([]); 
                setStep('drop'); 
                clearAllUploads(); 
                setUploadResult(null);
                autoSaveTriggeredRef.current = false; // Reset auto-save flag for next batch
              }}
                className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Upload more
              </button>
              <Link href="/my-assets"
                className="px-6 py-2.5 border border-[#D0D0D0] text-[#111] text-[13.5px] font-semibold rounded-full hover:border-[#999] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Go to My Assets
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
