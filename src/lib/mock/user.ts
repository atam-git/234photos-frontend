import type { User } from '@/types'

// Customer user for testing
export const MOCK_CUSTOMER_USER: User = {
  id: 'usr_001',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'customer@example.com',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'customer',
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: false,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2026-04-01T00:00:00Z',
}

// Contributor user for testing
export const MOCK_CONTRIBUTOR_USER: User = {
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
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2026-04-01T00:00:00Z',
}

// Backward compatibility
export const MOCK_BUYER_USER = MOCK_CUSTOMER_USER
export const MOCK_USER = MOCK_CUSTOMER_USER
