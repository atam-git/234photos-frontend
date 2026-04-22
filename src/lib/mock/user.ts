export type UserRole = 'buyer' | 'contributor'

export interface MockUser {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  country: string
  countryFlag: string
  role: UserRole
  credits: number
  joinedYear: number
  isContributorApproved: boolean
}

// Buyer user for testing
export const MOCK_BUYER_USER: MockUser = {
  id: 'usr_001',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'buyer@example.com',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'buyer',
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: false,
}

// Contributor user for testing
export const MOCK_CONTRIBUTOR_USER: MockUser = {
  id: 'usr_002',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'contributor@example.com',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'contributor',
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: true,
}

// Default export for backward compatibility
export const MOCK_USER = MOCK_BUYER_USER

