import { api } from './client'

export interface InitiateUploadPayload {
  fileName: string
  fileSize: number
  mimeType: string
  metadata?: {
    title?: string
    description?: string
    categoryId?: string
    tags?: string[]
  }
}

export interface InitiateUploadResponse {
  sessionId: string
  uploadId: string
  s3Key: string
  partUrls: string[]
  expiresAt: string
}

export interface CompleteUploadPayload {
  uploadId: string
  parts: Array<{
    PartNumber: number
    ETag: string
  }>
}

export interface CompleteUploadResponse {
  success: boolean
  sessionId: string
  s3Key: string
  fileUrl: string
}

export interface CreateAssetPayload {
  uploadSessionId: string
  title: string
  description?: string
  categoryId: string
  tags?: string[]
  isAI?: boolean
  isEditorial?: boolean
  modelRelease?: boolean
  propertyRelease?: boolean
  isDraft?: boolean // Save as draft instead of submitting for review
}

export interface UploadStatusResponse {
  sessionId: string
  status: 'PENDING' | 'UPLOADING' | 'COMPLETED' | 'FAILED' | 'ABORTED'
  progress: number
  uploadedParts: number
  totalParts: number
  expiresAt: string
}

export const uploadApi = {
  /**
   * Initiate multipart upload
   */
  initiateUpload: (payload: InitiateUploadPayload) =>
    api.post<InitiateUploadResponse>('/upload/initiate', payload),

  /**
   * Complete multipart upload
   */
  completeUpload: (payload: CompleteUploadPayload) =>
    api.post<CompleteUploadResponse>('/upload/complete', payload),

  /**
   * Abort upload
   */
  abortUpload: (sessionId: string) =>
    api.delete<{ success: boolean; message: string }>(`/upload/${sessionId}/abort`),

  /**
   * Get upload status
   */
  getUploadStatus: (sessionId: string) =>
    api.get<UploadStatusResponse>(`/upload/${sessionId}/status`),

  /**
   * Upload file part directly to S3 using presigned URL
   */
  uploadPart: async (url: string, data: Blob): Promise<string> => {
    const response = await fetch(url, {
      method: 'PUT',
      body: data,
      // Don't set Content-Type for multipart uploads - S3 handles it
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to upload part: ${response.statusText} - ${errorText}`)
    }

    // Get ETag from response headers
    const etag = response.headers.get('ETag')
    if (!etag) {
      throw new Error('No ETag returned from S3')
    }

    return etag.replace(/"/g, '') // Remove quotes from ETag
  },
}
