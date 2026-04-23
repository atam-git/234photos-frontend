import type {
  User,
  UserProfile,
  CustomerProfile,
  ContributorProfile,
  ContributorSummary,
  Badge,
} from '@/types'

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------

export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge_top_seller',
    name: 'Top Seller',
    description: 'Achieved over 10,000 lifetime downloads',
    icon: '🏆',
    earnedAt: '2024-06-15T10:00:00Z',
  },
  {
    id: 'badge_rising_star',
    name: 'Rising Star',
    description: 'Fastest growing contributor this quarter',
    icon: '⭐',
    earnedAt: '2024-09-01T08:30:00Z',
  },
  {
    id: 'badge_1k_downloads',
    name: '1K Downloads',
    description: 'Reached 1,000 total downloads',
    icon: '📥',
    earnedAt: '2024-03-20T14:00:00Z',
  },
  {
    id: 'badge_verified',
    name: 'Verified',
    description: 'Identity and portfolio verified by the 234photos team',
    icon: '✅',
    earnedAt: '2024-01-10T09:00:00Z',
  },
  {
    id: 'badge_africa_pioneer',
    name: 'Africa Pioneer',
    description: 'Among the first 100 contributors on 234photos',
    icon: '🌍',
    earnedAt: '2024-02-01T12:00:00Z',
  },
  {
    id: 'badge_trending',
    name: 'Trending',
    description: 'Had an asset in the top 10 trending this month',
    icon: '🔥',
    earnedAt: '2025-01-05T16:00:00Z',
  },
]

// ---------------------------------------------------------------------------
// Primary mock users (Adaeze Okafor)
// ---------------------------------------------------------------------------

export const MOCK_CUSTOMER_USER: User = {
  id: 'usr_001',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'customer@example.com',
  avatar:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'customer',
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: false,
  createdAt: '2023-04-12T09:00:00Z',
  updatedAt: '2025-02-18T11:30:00Z',
}

export const MOCK_CONTRIBUTOR_USER: User = {
  id: 'usr_002',
  name: 'Adaeze Okafor',
  username: 'adaeze-okafor',
  email: 'contributor@example.com',
  avatar:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  country: 'Nigeria',
  countryFlag: '🇳🇬',
  role: 'contributor',
  credits: 12,
  joinedYear: 2023,
  isContributorApproved: true,
  createdAt: '2023-04-12T09:00:00Z',
  updatedAt: '2025-02-18T11:30:00Z',
}

// Backward compatibility
export const MOCK_BUYER_USER = MOCK_CUSTOMER_USER
export const MOCK_USER = MOCK_CUSTOMER_USER

// ---------------------------------------------------------------------------
// Extended profiles for Adaeze
// ---------------------------------------------------------------------------

export const MOCK_CUSTOMER_PROFILE: CustomerProfile = {
  ...MOCK_CUSTOMER_USER,
  bio: 'Creative director sourcing authentic African imagery for global campaigns.',
  location: 'Lagos, Nigeria',
  website: 'https://adaezeokafor.com',
  instagram: '@adaeze.okafor',
  twitter: '@adaeze_ok',
  subscriptionPlan: 'pro',
  subscriptionStatus: 'active',
  totalDownloads: 287,
  totalSpent: 1420,
}

// Backward compatibility
export const MOCK_BUYER_PROFILE = MOCK_CUSTOMER_PROFILE

export const MOCK_CONTRIBUTOR_PROFILE: ContributorProfile = {
  ...MOCK_CONTRIBUTOR_USER,
  bio: 'Corporate and business photographer based in Lagos. Specializing in professional headshots and office environments.',
  location: 'Lagos, Nigeria',
  website: 'https://adaezeokafor.com',
  instagram: '@adaeze.okafor',
  twitter: '@adaeze_ok',
  applicationStatus: 'approved',
  specialties: ['Corporate', 'Business', 'Headshots'],
  totalAssets: 680,
  totalDownloads: 24000,
  totalEarnings: 6800,
  totalViews: 142000,
  availableBalance: 3240,
  pendingBalance: 460,
  rank: 9,
  badges: [MOCK_BADGES[0], MOCK_BADGES[2], MOCK_BADGES[3]],
}

// ---------------------------------------------------------------------------
// Contributor profiles (8 featured contributors)
// ---------------------------------------------------------------------------

export const MOCK_CONTRIBUTOR_PROFILES: Record<string, ContributorProfile> = {
  'amara-osei': {
    id: 'usr_100',
    email: 'amara@example.com',
    name: 'Amara Osei',
    username: 'amara-osei',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    role: 'contributor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    credits: 0,
    joinedYear: 2021,
    isContributorApproved: true,
    createdAt: '2021-03-15T08:00:00Z',
    updatedAt: '2025-03-01T10:00:00Z',
    bio: 'Lagos-based commercial photographer specialising in fintech, corporate and lifestyle photography. 10+ years capturing authentic African business stories.',
    location: 'Lagos, Nigeria',
    website: 'https://amaraosei.ng',
    instagram: '@amara.osei',
    applicationStatus: 'approved',
    specialties: ['Business', 'Lifestyle', 'Corporate'],
    totalAssets: 1240,
    totalDownloads: 48000,
    totalEarnings: 12400,
    totalViews: 310000,
    availableBalance: 5800,
    pendingBalance: 720,
    rank: 1,
    badges: [MOCK_BADGES[0], MOCK_BADGES[2], MOCK_BADGES[3], MOCK_BADGES[4]],
  },
  'chidi-nwosu': {
    id: 'usr_101',
    email: 'chidi@example.com',
    name: 'Chidi Nwosu',
    username: 'chidi-nwosu',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    role: 'contributor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    credits: 0,
    joinedYear: 2022,
    isContributorApproved: true,
    createdAt: '2022-01-20T10:00:00Z',
    updatedAt: '2025-02-10T14:00:00Z',
    bio: 'Documentary and editorial photographer based in Enugu. Focused on telling stories of everyday African life.',
    location: 'Enugu, Nigeria',
    applicationStatus: 'approved',
    specialties: ['Documentary', 'Editorial', 'Street'],
    totalAssets: 890,
    totalDownloads: 32000,
    totalEarnings: 8900,
    totalViews: 198000,
    availableBalance: 4100,
    pendingBalance: 530,
    rank: 3,
    badges: [MOCK_BADGES[2], MOCK_BADGES[3], MOCK_BADGES[4]],
  },
  'fatima-diallo': {
    id: 'usr_102',
    email: 'fatima@example.com',
    name: 'Fatima Diallo',
    username: 'fatima-diallo',
    avatar:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
    role: 'contributor',
    country: 'Senegal',
    countryFlag: '🇸🇳',
    credits: 0,
    joinedYear: 2022,
    isContributorApproved: true,
    createdAt: '2022-05-10T09:00:00Z',
    updatedAt: '2025-01-22T16:30:00Z',
    bio: 'Fashion and culture photographer from Dakar. Passionate about showcasing West African fashion and heritage.',
    location: 'Dakar, Senegal',
    instagram: '@fatima.diallo',
    applicationStatus: 'approved',
    specialties: ['Fashion', 'Culture', 'Portrait'],
    totalAssets: 640,
    totalDownloads: 21000,
    totalEarnings: 6400,
    totalViews: 134000,
    availableBalance: 2900,
    pendingBalance: 380,
    rank: 5,
    badges: [MOCK_BADGES[1], MOCK_BADGES[2], MOCK_BADGES[3]],
  },
  'kwame-asante': {
    id: 'usr_103',
    email: 'kwame@example.com',
    name: 'Kwame Asante',
    username: 'kwame-asante',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    role: 'contributor',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    credits: 0,
    joinedYear: 2020,
    isContributorApproved: true,
    createdAt: '2020-11-05T12:00:00Z',
    updatedAt: '2025-03-10T09:00:00Z',
    bio: 'Accra-based photographer and videographer. Specialises in urban landscapes and African city life.',
    location: 'Accra, Ghana',
    website: 'https://kwameasante.com',
    applicationStatus: 'approved',
    specialties: ['Urban', 'Architecture', 'Landscape'],
    totalAssets: 1100,
    totalDownloads: 41000,
    totalEarnings: 11000,
    totalViews: 275000,
    availableBalance: 5200,
    pendingBalance: 640,
    rank: 2,
    badges: [MOCK_BADGES[0], MOCK_BADGES[2], MOCK_BADGES[3], MOCK_BADGES[4]],
  },
  'tunde-bakare': {
    id: 'usr_104',
    email: 'tunde@example.com',
    name: 'Tunde Bakare',
    username: 'tunde-bakare',
    avatar:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=80',
    role: 'contributor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    credits: 0,
    joinedYear: 2022,
    isContributorApproved: true,
    createdAt: '2022-07-18T08:00:00Z',
    updatedAt: '2025-02-05T13:00:00Z',
    bio: 'Lagos-based aerial and cityscape photographer. Capturing Nigeria from above and at street level.',
    location: 'Lagos, Nigeria',
    applicationStatus: 'approved',
    specialties: ['Aerial', 'Cityscape', 'Urban'],
    totalAssets: 560,
    totalDownloads: 19000,
    totalEarnings: 5600,
    totalViews: 112000,
    availableBalance: 2400,
    pendingBalance: 310,
    rank: 6,
    badges: [MOCK_BADGES[2], MOCK_BADGES[3], MOCK_BADGES[5]],
  },
  'ngozi-adeyemi': {
    id: 'usr_105',
    email: 'ngozi@example.com',
    name: 'Ngozi Adeyemi',
    username: 'ngozi-adeyemi',
    avatar:
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80',
    role: 'contributor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    credits: 0,
    joinedYear: 2023,
    isContributorApproved: true,
    createdAt: '2023-02-14T11:00:00Z',
    updatedAt: '2025-01-30T15:00:00Z',
    bio: 'Food and lifestyle photographer. Showcasing the rich culinary heritage of West Africa.',
    location: 'Ibadan, Nigeria',
    instagram: '@ngozi.food',
    applicationStatus: 'approved',
    specialties: ['Food', 'Lifestyle', 'Culture'],
    totalAssets: 380,
    totalDownloads: 11000,
    totalEarnings: 3800,
    totalViews: 78000,
    availableBalance: 1600,
    pendingBalance: 220,
    rank: 8,
    badges: [MOCK_BADGES[1], MOCK_BADGES[2]],
  },
  'nkechi-obi': {
    id: 'usr_106',
    email: 'nkechi@example.com',
    name: 'Nkechi Obi',
    username: 'nkechi-obi',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    role: 'contributor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    credits: 0,
    joinedYear: 2022,
    isContributorApproved: true,
    createdAt: '2022-09-01T10:00:00Z',
    updatedAt: '2025-02-20T12:00:00Z',
    bio: 'Portrait and lifestyle photographer from Abuja. Capturing authentic moments and African beauty.',
    location: 'Abuja, Nigeria',
    applicationStatus: 'approved',
    specialties: ['Portrait', 'Lifestyle', 'Beauty'],
    totalAssets: 520,
    totalDownloads: 17000,
    totalEarnings: 5200,
    totalViews: 104000,
    availableBalance: 2200,
    pendingBalance: 290,
    rank: 7,
    badges: [MOCK_BADGES[2], MOCK_BADGES[3]],
  },
  'kofi-mensah': {
    id: 'usr_107',
    email: 'kofi@example.com',
    name: 'Kofi Mensah',
    username: 'kofi-mensah',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    role: 'contributor',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    credits: 0,
    joinedYear: 2022,
    isContributorApproved: true,
    createdAt: '2022-04-22T09:00:00Z',
    updatedAt: '2025-03-05T11:00:00Z',
    bio: 'Textile and fashion photographer from Kumasi. Celebrating African fabrics and traditional wear.',
    location: 'Kumasi, Ghana',
    applicationStatus: 'approved',
    specialties: ['Fashion', 'Textiles', 'Culture'],
    totalAssets: 470,
    totalDownloads: 15000,
    totalEarnings: 4700,
    totalViews: 92000,
    availableBalance: 1900,
    pendingBalance: 260,
    rank: 4,
    badges: [MOCK_BADGES[2], MOCK_BADGES[3], MOCK_BADGES[4]],
  },
}

// ---------------------------------------------------------------------------
// Contributor summaries (derived from profiles)
// ---------------------------------------------------------------------------

export const MOCK_CONTRIBUTOR_SUMMARIES: ContributorSummary[] = Object.values(
  MOCK_CONTRIBUTOR_PROFILES
).map((p) => ({
  id: p.id,
  name: p.name,
  username: p.username,
  avatar: p.avatar,
  country: p.country!,
  countryFlag: p.countryFlag!,
  isVerified: p.badges.some((b) => b.id === 'badge_verified'),
}))

// ---------------------------------------------------------------------------
// Name ↔ username mapping
// ---------------------------------------------------------------------------

export const NAME_TO_USERNAME: Record<string, string> = {
  'Adaeze Okafor': 'adaeze-okafor',
  'Amara Osei': 'amara-osei',
  'Chidi Nwosu': 'chidi-nwosu',
  'Fatima Diallo': 'fatima-diallo',
  'Kwame Asante': 'kwame-asante',
  'Tunde Bakare': 'tunde-bakare',
  'Ngozi Adeyemi': 'ngozi-adeyemi',
  'Nkechi Obi': 'nkechi-obi',
  'Kofi Mensah': 'kofi-mensah',
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getContributorProfile(
  username: string
): ContributorProfile | undefined {
  return MOCK_CONTRIBUTOR_PROFILES[username]
}

export function getContributorSummary(
  username: string
): ContributorSummary | undefined {
  return MOCK_CONTRIBUTOR_SUMMARIES.find((s) => s.username === username)
}

export function getContributorByName(
  name: string
): ContributorProfile | undefined {
  const username = NAME_TO_USERNAME[name]
  return username ? MOCK_CONTRIBUTOR_PROFILES[username] : undefined
}

export function getContributorAvatar(name: string): string {
  return getContributorByName(name)?.avatar ?? ''
}

export function getContributorUsername(name: string): string {
  return NAME_TO_USERNAME[name] ?? name.toLowerCase().replace(/\s+/g, '-')
}
