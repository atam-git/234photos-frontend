export type UploadFileStatus = 'queued' | 'uploading' | 'processing' | 'complete' | 'error'

export interface UploadSession {
  id: string
  files: UploadFile[]
  status: 'draft' | 'uploading' | 'processing' | 'complete'
  createdAt: string
}

export interface UploadFile {
  id: string
  file?: File
  fileName: string
  fileSize: number
  mimeType: string
  status: UploadFileStatus
  progress: number
  uploadUrl?: string
  thumbnailUrl?: string
  preview?: string
  error?: string
  sessionId?: string // Upload session ID from backend
  assetId?: string // Asset ID after auto-save as draft
  // Metadata fields for tagging
  title: string
  description: string
  category: string
  categoryId: string // Category ID for backend
  tags: string[]
  isAI: boolean
  isEditorial: boolean
  modelRelease: boolean
  propertyRelease: boolean
  // Auto-detected
  dimensions?: { width: number; height: number }
  duration?: number
  aspectRatio?: number
}
