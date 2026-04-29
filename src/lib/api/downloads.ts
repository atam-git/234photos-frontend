import { api } from './client'
import type { PaginatedResponse } from '@/types/api'

export interface Download {
  id: string
  userId: string
  assetId: string
  asset?: {
    id: string
    title: string
    description?: string
    thumbnailUrl: string
    previewUrl: string
    contributor: {
      id: string
      name: string
      username: string
      avatar?: string
    }
    category?: {
      id: string
      name: string
      slug: string
    }
  }
  licenseType: 'standard' | 'enhanced' | 'editorial'
  format: string
  size: string
  creditsCost: number
  downloadUrl: string
  licenseUrl?: string
  status: 'active' | 'expired' | 'revoked'
  expiresAt: string
  downloadedAt: string
  createdAt: string
  updatedAt: string
}

export interface GetDownloadsParams {
  page?: number
  limit?: number
  search?: string
  licenseType?: 'STANDARD' | 'ENHANCED' | 'EDITORIAL'
}

export interface CreateDownloadDto {
  assetId: string
  licenseType: 'STANDARD' | 'ENHANCED' | 'EDITORIAL'
  format: string
  size: string
}

export interface PricingConfig {
  licenses: {
    STANDARD: {
      credits: number
      label: string
      description: string
    }
    ENHANCED: {
      credits: number
      label: string
      description: string
    }
    EDITORIAL: {
      credits: number
      label: string
      description: string
    }
  }
  sizes: {
    small: {
      extraCredits: number
      label: string
      description: string
    }
    medium: {
      extraCredits: number
      label: string
      description: string
    }
    original: {
      extraCredits: number
      label: string
      description: string
    }
  }
  formats: string[]
}

/**
 * Get download pricing configuration
 */
export async function getPricing(): Promise<PricingConfig> {
  return api.get<PricingConfig>('/downloads/pricing')
}

/**
 * Create a new download (purchase and download asset)
 */
export async function createDownload(dto: CreateDownloadDto): Promise<Download> {
  return api.post<Download>('/downloads', dto)
}

/**
 * Get user's downloads with pagination and filters
 */
export async function getUserDownloads(params?: GetDownloadsParams): Promise<PaginatedResponse<Download>> {
  return api.get<PaginatedResponse<Download>>('/downloads', {
    query: params as Record<string, string | number | boolean | null | undefined>,
  })
}

/**
 * Get a single download by ID
 */
export async function getDownload(downloadId: string): Promise<Download> {
  return api.get<Download>(`/downloads/${downloadId}`)
}
