import { useState, useCallback } from 'react'
import { uploadApi, InitiateUploadPayload, CreateAssetPayload } from '@/lib/api/upload'
import { assetsApi } from '@/lib/api/assets'

const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB chunks

export interface UploadProgress {
  sessionId: string
  fileName: string
  progress: number
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

/**
 * Hook for uploading files with multipart upload to S3
 */
export function useFileUpload() {
  const [uploads, setUploads] = useState<Map<string, UploadProgress>>(new Map())

  const updateUpload = useCallback((sessionId: string, updates: Partial<UploadProgress>) => {
    setUploads(prev => {
      const newMap = new Map(prev)
      const existing = newMap.get(sessionId)
      if (existing) {
        newMap.set(sessionId, { ...existing, ...updates })
      }
      return newMap
    })
  }, [])

  const uploadFile = useCallback(async (
    file: File,
    metadata?: InitiateUploadPayload['metadata']
  ): Promise<string> => {
    try {
      // 1. Initiate upload
      const initPayload: InitiateUploadPayload = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        metadata,
      }

      const { sessionId, uploadId, partUrls } = await uploadApi.initiateUpload(initPayload)

      // Track upload progress
      setUploads(prev => new Map(prev).set(sessionId, {
        sessionId,
        fileName: file.name,
        progress: 0,
        status: 'uploading',
      }))

      // 2. Split file into chunks and upload each part
      const totalParts = partUrls.length
      const uploadedParts: Array<{ PartNumber: number; ETag: string }> = []

      for (let i = 0; i < totalParts; i++) {
        const start = i * CHUNK_SIZE
        const end = Math.min(start + CHUNK_SIZE, file.size)
        const chunk = file.slice(start, end)

        // Upload part to S3
        const etag = await uploadApi.uploadPart(partUrls[i], chunk)
        uploadedParts.push({
          PartNumber: i + 1,
          ETag: etag,
        })

        // Update progress
        const progress = Math.round(((i + 1) / totalParts) * 100)
        updateUpload(sessionId, { progress })
      }

      // 3. Complete upload
      updateUpload(sessionId, { status: 'processing', progress: 100 })
      await uploadApi.completeUpload({
        uploadId,
        parts: uploadedParts,
      })

      updateUpload(sessionId, { status: 'complete' })
      return sessionId

    } catch (error: any) {
      const sessionId = (error as any).sessionId || 'unknown'
      updateUpload(sessionId, {
        status: 'error',
        error: error.message || 'Upload failed',
      })
      throw error
    }
  }, [updateUpload])

  const abortUpload = useCallback(async (sessionId: string) => {
    try {
      await uploadApi.abortUpload(sessionId)
      setUploads(prev => {
        const newMap = new Map(prev)
        newMap.delete(sessionId)
        return newMap
      })
    } catch (error) {
      console.error('Failed to abort upload:', error)
    }
  }, [])

  const clearUpload = useCallback((sessionId: string) => {
    setUploads(prev => {
      const newMap = new Map(prev)
      newMap.delete(sessionId)
      return newMap
    })
  }, [])

  const clearAllUploads = useCallback(() => {
    setUploads(new Map())
  }, [])

  return {
    uploads: Array.from(uploads.values()),
    uploadFile,
    abortUpload,
    clearUpload,
    clearAllUploads,
  }
}

/**
 * Hook for creating asset after upload completes
 */
export function useCreateAsset() {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createAsset = useCallback(async (payload: CreateAssetPayload) => {
    setIsCreating(true)
    setError(null)
    try {
      const asset = await assetsApi.create(payload)
      return asset
    } catch (err: any) {
      setError(err.message || 'Failed to create asset')
      throw err
    } finally {
      setIsCreating(false)
    }
  }, [])

  return {
    createAsset,
    isCreating,
    error,
  }
}
