export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export interface APIError {
  code: string
  message: string
  details?: Record<string, any>
  statusCode: number
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: APIError
  meta?: Record<string, any>
}

export interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'queued' | 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}
