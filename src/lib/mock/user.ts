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

export const MOCK_USER: MockUser = {
  id: 'usr_001',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'adaeze@example.com',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'contributor', // change to 'buyer' to test buyer-only view
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: true,
}
