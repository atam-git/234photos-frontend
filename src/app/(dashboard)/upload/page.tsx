'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Check, Tag, ChevronRight, FileImage } from 'lucide-react'
import Link from 'next/link'

type Step = 'drop' | 'uploading' | 'tagging' | 'done'

interface UploadFile {
  id: string
  name: string
  src: string
  progress: number
  status: 'uploading' | 'complete' | 'error'
  tags: string[]
  title: string
  category: string
}

const CATEGORIES = ['Business', 'Fashion', 'Food & Cuisine', 'Nature', 'Sports', 'Technology', 'Culture', 'Architecture', 'Lifestyle', 'Music']

const AI_TAGS: Record<string, string[]> = {
  default: ['africa', 'authentic', 'photography', 'stock', 'creative'],
}

export default function UploadPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('drop')
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [newTag, setNewTag] = useState('')

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    addFiles(dropped)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
  }

  const addFiles = (rawFiles: File[]) => {
    const newFiles: UploadFile[] = rawFiles.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      src: URL.createObjectURL(f),
      progress: 0,
      status: 'uploading',
      tags: [...AI_TAGS.default],
      title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      category: 'Business',
    }))
    setFiles(prev => [...prev, ...newFiles])
    setStep('uploading')
    setActiveFile(newFiles[0]?.id ?? null)

    // Simulate upload progress
    newFiles.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: 100, status: 'complete' } : f))
          setStep('tagging')
        } else {
          setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress } : f))
        }
      }, 300)
    })
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

  const handleSubmit = () => setStep('done')

  const activeFileData = files.find(f => f.id === activeFile)

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#F0F0F0] h-[60px] flex items-center px-4 md:px-6 gap-3">
        <Link href="/dashboard/my-assets" className="flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#111] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          ← Back to My Assets
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {/* Step indicator */}
          {(['drop', 'uploading', 'tagging', 'done'] as Step[]).map((s, i) => (
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

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8">

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
              Supports JPG, PNG, SVG, MP4, MOV. Up to 100 files per batch. Max 4GB per file.
            </p>
            <label className="cursor-pointer px-8 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Browse files
              <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileInput} />
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
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                    <img src={file.src} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#111] truncate mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {file.name}
                    </p>
                    <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EE2B24] rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }} />
                    </div>
                  </div>
                  <div className="shrink-0">
                    {file.status === 'complete'
                      ? <Check className="w-5 h-5 text-green-500" />
                      : <span className="text-[12px] text-[#888]">{Math.round(file.progress)}%</span>
                    }
                  </div>
                </div>
              ))}
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
                        <img src={file.src} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[12px] font-medium text-[#111] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {file.name}
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
                    <img src={activeFileData.src} alt={activeFileData.name} className="w-full h-full object-cover" />
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
                    Category
                  </label>
                  <select value={activeFileData.category}
                    onChange={(e) => updateFile(activeFileData.id, { category: e.target.value })}
                    className="w-full h-[40px] px-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-3.5 h-3.5 text-[#888]" />
                    <label className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Tags
                    </label>
                    <span className="text-[11px] text-[#EE2B24] font-medium ml-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      AI suggested
                    </span>
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
                  <button className="text-[13px] text-[#888] hover:text-[#111] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Apply to all files
                  </button>
                  <button onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Submit for review →
                  </button>
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
              {files.length} asset{files.length > 1 ? 's' : ''} submitted for review!
            </h2>
            <p className="text-[13.5px] text-[#666] mb-8 max-w-[400px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Estimated review time: 24–48 hours. You&apos;ll be notified when your assets go live.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <button onClick={() => { setFiles([]); setStep('drop') }}
                className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Upload more
              </button>
              <Link href="/dashboard/my-assets"
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
