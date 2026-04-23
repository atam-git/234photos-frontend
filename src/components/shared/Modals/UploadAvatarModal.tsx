'use client'

import { X, Upload, Check } from 'lucide-react'
import { useState, useRef } from 'react'

interface UploadAvatarModalProps {
  currentAvatar?: string
  userName: string
  onClose: () => void
  onUpload: (file: File) => void
}

export function UploadAvatarModal({ currentAvatar, userName, onClose, onUpload }: UploadAvatarModalProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    onUpload(selectedFile)
    setUploading(false)
    onClose()
  }

  const handleRemove = () => {
    setPreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Change profile photo
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-[#EE2B24] mb-4">
              {preview ? (
                <img src={preview} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-white text-[40px] font-bold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <p className="text-[12px] text-[#888] text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              JPG or PNG, max 2MB
            </p>
          </div>

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full py-3 border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-full hover:border-[#999] hover:bg-[#F8F8F8] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <Upload className="w-4 h-4" />
              Choose photo
            </button>

            {preview && (
              <>
                <button
                  onClick={handleRemove}
                  className="w-full py-3 border border-[#D0D0D0] text-[#666] text-[14px] font-semibold rounded-full hover:border-[#999] hover:bg-[#F8F8F8] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Remove photo
                </button>

                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save photo
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
