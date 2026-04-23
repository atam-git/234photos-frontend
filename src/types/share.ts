export interface ShareLink {
  id: string
  resourceType: 'board' | 'collection' | 'asset'
  resourceId: string
  token: string
  url: string
  expiresAt?: string
  password?: string
  viewCount: number
  createdAt: string
}
