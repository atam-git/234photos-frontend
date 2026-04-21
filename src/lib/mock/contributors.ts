export interface Contributor {
  username: string
  name: string
  avatar: string
  country: string
  countryFlag: string
  bio: string
  totalAssets: number
  totalDownloads: string
  totalEarnings: string
  joinedYear: number
  specialties: string[]
}

export const CONTRIBUTORS: Record<string, Contributor> = {
  'amara-osei': {
    username: 'amara-osei',
    name: 'Amara Osei',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bio: 'Lagos-based commercial photographer specialising in fintech, corporate and lifestyle photography. 10+ years capturing authentic African business stories.',
    totalAssets: 1240,
    totalDownloads: '48K',
    totalEarnings: '$12,400',
    joinedYear: 2021,
    specialties: ['Business', 'Lifestyle', 'Corporate'],
  },
  'chidi-nwosu': {
    username: 'chidi-nwosu',
    name: 'Chidi Nwosu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bio: 'Documentary and editorial photographer based in Enugu. Focused on telling stories of everyday African life.',
    totalAssets: 890,
    totalDownloads: '32K',
    totalEarnings: '$8,900',
    joinedYear: 2022,
    specialties: ['Documentary', 'Editorial', 'Street'],
  },
  'fatima-diallo': {
    username: 'fatima-diallo',
    name: 'Fatima Diallo',
    avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
    country: 'Senegal',
    countryFlag: '🇸🇳',
    bio: 'Fashion and culture photographer from Dakar. Passionate about showcasing West African fashion and heritage.',
    totalAssets: 640,
    totalDownloads: '21K',
    totalEarnings: '$6,400',
    joinedYear: 2022,
    specialties: ['Fashion', 'Culture', 'Portrait'],
  },
  'kwame-asante': {
    username: 'kwame-asante',
    name: 'Kwame Asante',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    bio: 'Accra-based photographer and videographer. Specialises in urban landscapes and African city life.',
    totalAssets: 1100,
    totalDownloads: '41K',
    totalEarnings: '$11,000',
    joinedYear: 2020,
    specialties: ['Urban', 'Architecture', 'Landscape'],
  },
  'tunde-bakare': {
    username: 'tunde-bakare',
    name: 'Tunde Bakare',
    avatar: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=80',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bio: 'Lagos-based aerial and cityscape photographer. Capturing Nigeria from above and at street level.',
    totalAssets: 560,
    totalDownloads: '19K',
    totalEarnings: '$5,600',
    joinedYear: 2022,
    specialties: ['Aerial', 'Cityscape', 'Urban'],
  },
  'simi-adebayo': {
    username: 'simi-adebayo',
    name: 'Simi Adebayo',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bio: 'Music and entertainment photographer based in Lagos. Documenting the Afrobeats scene.',
    totalAssets: 430,
    totalDownloads: '14K',
    totalEarnings: '$4,300',
    joinedYear: 2023,
    specialties: ['Music', 'Entertainment', 'Events'],
  },
  'ngozi-adeyemi': {
    username: 'ngozi-adeyemi',
    name: 'Ngozi Adeyemi',
    avatar: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bio: 'Food and lifestyle photographer. Showcasing the rich culinary heritage of West Africa.',
    totalAssets: 380,
    totalDownloads: '11K',
    totalEarnings: '$3,800',
    joinedYear: 2023,
    specialties: ['Food', 'Lifestyle', 'Culture'],
  },
  'zanele-dlamini': {
    username: 'zanele-dlamini',
    name: 'Zanele Dlamini',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&q=80',
    country: 'South Africa',
    countryFlag: '🇿🇦',
    bio: 'Johannesburg-based photographer focused on African women in business and leadership.',
    totalAssets: 780,
    totalDownloads: '28K',
    totalEarnings: '$7,800',
    joinedYear: 2021,
    specialties: ['Business', 'Women', 'Leadership'],
  },
}

// Map contributor display names to usernames
export const NAME_TO_USERNAME: Record<string, string> = {
  'Amara Osei': 'amara-osei',
  'Chidi Nwosu': 'chidi-nwosu',
  'Fatima Diallo': 'fatima-diallo',
  'Kwame Asante': 'kwame-asante',
  'Zanele Dlamini': 'zanele-dlamini',
  'Tunde Bakare': 'tunde-bakare',
  'Simi Adebayo': 'simi-adebayo',
  'Ngozi Adeyemi': 'ngozi-adeyemi',
  'Adaeze Okafor': 'adaeze-okafor',
  'Emeka Eze': 'emeka-eze',
  'Aisha Bello': 'aisha-bello',
  'Kofi Mensah': 'kofi-mensah',
  'Yemi Okonkwo': 'yemi-okonkwo',
  'Bola Adesanya': 'bola-adesanya',
  'Nkechi Obi': 'nkechi-obi',
  'Seun Lawal': 'seun-lawal',
  'Chukwu Ibe': 'chukwu-ibe',
  'Amina Sow': 'amina-sow',
  'Dayo Adewale': 'dayo-adewale',
  'Femi Coker': 'femi-coker',
  'Ife Adeyemi': 'ife-adeyemi',
  'Musa Garba': 'musa-garba',
  'Halima Yusuf': 'halima-yusuf',
  'Olu Martins': 'olu-martins',
}

export function getContributor(username: string): Contributor | undefined {
  return CONTRIBUTORS[username]
}

export function getContributorByName(name: string): Contributor | undefined {
  const username = NAME_TO_USERNAME[name]
  return username ? CONTRIBUTORS[username] : undefined
}

// Fallback avatar for unknown contributors
export function getContributorAvatar(name: string): string {
  return getContributorByName(name)?.avatar ?? ''
}

export function getContributorUsername(name: string): string {
  return NAME_TO_USERNAME[name] ?? name.toLowerCase().replace(/\s+/g, '-')
}
