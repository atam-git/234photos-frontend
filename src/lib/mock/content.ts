import { Article, EditorialStory, FeaturedCollection, Campaign } from '@/types'
import { MOCK_ASSETS } from './assets'
import { MOCK_CONTRIBUTOR_SUMMARIES } from './users'

/**
 * Comprehensive mock content data
 * Replaces editorial.ts with properly typed data
 */

// ---------------------------------------------------------------------------
// Blog Articles
// ---------------------------------------------------------------------------

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art_001',
    slug: 'afrobeats-global-charts-2025',
    title: 'Afrobeats Takes Over the World: How Nigerian Artists Dominated Global Charts in 2025',
    excerpt: 'From Burna Boy to Tems, Nigerian artists rewrote the rules of global pop music in 2025, landing on every major chart and collaborating with the world\'s biggest names.',
    content: `
# Afrobeats Takes Over the World

From Burna Boy to Tems, Nigerian artists rewrote the rules of global pop music in 2025, landing on every major chart and collaborating with the world's biggest names.

## The Rise of Afrobeats

The year 2025 marked a turning point for African music on the global stage. Nigerian artists dominated streaming platforms, radio airwaves, and concert venues worldwide.

## Key Achievements

- Burna Boy's "African Giant" tour sold out stadiums across 5 continents
- Tems became the first African woman to headline Coachella
- Wizkid's collaboration with Drake broke streaming records
- Rema's "Calm Down" spent 52 weeks on Billboard Hot 100

## Cultural Impact

The success of Afrobeats has opened doors for African creatives across all industries, from fashion to photography. Brands are increasingly seeking authentic African imagery to connect with global audiences.

## What This Means for African Creatives

The global appetite for African culture has never been higher. Photographers, designers, and artists have unprecedented opportunities to showcase their work to international audiences.
    `,
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    author: {
      name: 'Chioma Nnadi',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      bio: 'Music journalist and cultural critic based in Lagos',
    },
    category: 'Music',
    tags: ['music', 'afrobeats', 'culture', 'nigeria', 'global'],
    date: 'Apr 10, 2026',
    publishedAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-04-10T10:00:00Z',
    readTime: '5 min read',
  },
  {
    id: 'art_002',
    slug: 'afcon-2025-morocco',
    title: 'AFCON 2025: Morocco Lifts the Trophy on Home Soil in Historic Final',
    excerpt: 'Morocco became the first host nation to win AFCON since Egypt in 2006, defeating Senegal 2-1 in a thrilling final in Casablanca.',
    content: `
# AFCON 2025: Morocco's Historic Victory

Morocco became the first host nation to win AFCON since Egypt in 2006, defeating Senegal 2-1 in a thrilling final in Casablanca.

## The Final Match

The Mohammed V Stadium erupted as Morocco scored the winning goal in the 88th minute, sending the home crowd into delirium.

## Tournament Highlights

- Record attendance across all venues
- Stunning performances from emerging African talent
- VAR technology used for the first time in AFCON history
- Morocco's unbeaten run throughout the tournament

## Impact on African Football

This victory cements Morocco's position as a football powerhouse and boosts confidence ahead of their 2030 World Cup hosting duties.
    `,
    coverImage: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
    author: {
      name: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      bio: 'Sports journalist covering African football',
    },
    category: 'Sports',
    tags: ['sports', 'football', 'afcon', 'morocco', 'africa'],
    date: 'Feb 22, 2026',
    publishedAt: '2026-02-22T18:00:00Z',
    updatedAt: '2026-02-22T18:00:00Z',
    readTime: '4 min read',
  },
  {
    id: 'art_003',
    slug: 'lagos-fashion-week-2025',
    title: 'Lagos Fashion Week 2025 Breaks Records with 60+ African Designers on the Runway',
    excerpt: 'The continent\'s biggest fashion event drew global buyers and press, cementing Lagos as a serious player in the international fashion calendar.',
    content: `
# Lagos Fashion Week 2025: A Record-Breaking Event

The continent's biggest fashion event drew global buyers and press, cementing Lagos as a serious player in the international fashion calendar.

## By the Numbers

- 60+ designers showcased collections
- 15,000+ attendees from 40 countries
- ₦4 billion in orders placed during the event
- 500+ international press and buyers

## Standout Collections

From contemporary streetwear to haute couture, designers showcased the diversity and creativity of African fashion.

## Global Recognition

Major fashion houses and retailers are now actively seeking partnerships with African designers, recognizing the commercial potential of African fashion.
    `,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    author: {
      name: 'Adaora Mbelu',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      bio: 'Fashion editor at Vogue Africa',
    },
    category: 'Fashion',
    tags: ['fashion', 'lagos', 'design', 'africa', 'runway'],
    date: 'Nov 14, 2025',
    publishedAt: '2025-11-14T12:00:00Z',
    updatedAt: '2025-11-14T12:00:00Z',
    readTime: '3 min read',
  },
  {
    id: 'art_004',
    slug: 'africa-tech-funding-2025',
    title: "Africa's Tech Startups Raised ₦6.9 Trillion in 2025 — The Continent's Biggest Year Yet",
    excerpt: 'Fintech, healthtech and agritech led the charge as African startups attracted record investment from global VCs and development finance institutions.',
    content: `
# Africa's Tech Boom: ₦6.9 Trillion Raised in 2025

Fintech, healthtech and agritech led the charge as African startups attracted record investment from global VCs and development finance institutions.

## Investment Breakdown

- Fintech: ₦2.9T (42%)
- Healthtech: ₦1.6T (23%)
- Agritech: ₦1.2T (17%)
- E-commerce: ₦860B (13%)
- Other: ₦420B (5%)

## Key Deals

Several African startups achieved unicorn status, with valuations exceeding ₦1.6 trillion.

## Future Outlook

Investors remain bullish on Africa's tech ecosystem, citing young demographics, increasing internet penetration, and innovative solutions to local challenges.
    `,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    author: {
      name: 'Tunde Kehinde',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      bio: 'Tech reporter at TechCabal',
    },
    category: 'Technology',
    tags: ['technology', 'startups', 'funding', 'africa', 'innovation'],
    date: 'Jan 8, 2026',
    publishedAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-01-08T09:00:00Z',
    readTime: '6 min read',
  },
]

// ---------------------------------------------------------------------------
// Editorial Stories
// ---------------------------------------------------------------------------

export const MOCK_EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: 'edit_001',
    slug: 'lagos-tech-ecosystem',
    title: 'Inside Lagos: Africa\'s Silicon Valley',
    description: 'A visual journey through Lagos\' thriving tech ecosystem, from co-working spaces to startup hubs.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    assets: MOCK_ASSETS.slice(0, 8),
    author: MOCK_CONTRIBUTOR_SUMMARIES[0],
    publishedAt: '2026-04-15T10:00:00Z',
    featured: true,
  },
  {
    id: 'edit_002',
    slug: 'african-street-food',
    title: 'Street Food Stories: The Flavors of West Africa',
    description: 'Celebrating the vibrant street food culture across West African cities.',
    coverImage: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=1200&q=80',
    assets: MOCK_ASSETS.slice(3, 7),
    author: MOCK_CONTRIBUTOR_SUMMARIES[5],
    publishedAt: '2026-04-12T14:00:00Z',
    featured: false,
  },
  {
    id: 'edit_003',
    slug: 'african-fashion-renaissance',
    title: 'The African Fashion Renaissance',
    description: 'How African designers are reshaping global fashion with bold prints and innovative designs.',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    assets: MOCK_ASSETS.slice(2, 6),
    author: MOCK_CONTRIBUTOR_SUMMARIES[2],
    publishedAt: '2026-04-08T11:00:00Z',
    featured: true,
  },
]

// ---------------------------------------------------------------------------
// Featured Collections
// ---------------------------------------------------------------------------

export const MOCK_FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: 'feat_001',
    name: 'African Business Excellence',
    description: 'Professional imagery showcasing African business leaders, entrepreneurs, and corporate environments.',
    slug: 'african-business-excellence',
    coverImage: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&q=80',
    assets: MOCK_ASSETS.filter(a => a.category === 'Business'),
    assetCount: MOCK_ASSETS.filter(a => a.category === 'Business').length,
    curator: '234photos Editorial Team',
    featured: true,
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'feat_002',
    name: 'Urban Africa',
    description: 'Stunning cityscapes, street scenes, and architectural photography from African cities.',
    slug: 'urban-africa',
    coverImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
    assets: MOCK_ASSETS.filter(a => a.category === 'Urban'),
    assetCount: MOCK_ASSETS.filter(a => a.category === 'Urban').length,
    curator: '234photos Editorial Team',
    featured: true,
    createdAt: '2026-03-15T00:00:00Z',
  },
  {
    id: 'feat_003',
    name: 'African Culture & Heritage',
    description: 'Celebrating African traditions, festivals, and cultural expressions.',
    slug: 'african-culture-heritage',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    assets: MOCK_ASSETS.filter(a => a.category === 'Culture'),
    assetCount: MOCK_ASSETS.filter(a => a.category === 'Culture').length,
    curator: '234photos Editorial Team',
    featured: false,
    createdAt: '2026-03-01T00:00:00Z',
  },
]

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_001',
    name: 'African Heritage Month',
    description: 'Celebrate African Heritage Month with 50% bonus earnings on cultural and traditional photography.',
    slug: 'african-heritage-month',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    startDate: '2026-05-01T00:00:00Z',
    endDate: '2026-05-31T23:59:59Z',
    bonusRate: 1.5,
    categories: ['Culture', 'Heritage', 'Traditional'],
    featured: true,
    active: true,
  },
  {
    id: 'camp_002',
    name: 'Tech Africa 2026',
    description: 'Showcase Africa\'s tech innovation with double earnings on technology and business photography.',
    slug: 'tech-africa-2026',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
    startDate: '2026-06-01T00:00:00Z',
    endDate: '2026-06-30T23:59:59Z',
    bonusRate: 2.0,
    categories: ['Technology', 'Business', 'Innovation'],
    featured: true,
    active: false,
  },
]

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getArticleBySlug(slug: string): Article | undefined {
  return MOCK_ARTICLES.find(a => a.slug === slug)
}

export function getEditorialStoryBySlug(slug: string): EditorialStory | undefined {
  return MOCK_EDITORIAL_STORIES.find(s => s.slug === slug)
}

export function getFeaturedCollectionBySlug(slug: string): FeaturedCollection | undefined {
  return MOCK_FEATURED_COLLECTIONS.find(c => c.slug === slug)
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return MOCK_CAMPAIGNS.find(c => c.slug === slug)
}

export function getActiveCampaigns(): Campaign[] {
  return MOCK_CAMPAIGNS.filter(c => c.active)
}

export function getFeaturedArticles(): Article[] {
  return MOCK_ARTICLES.slice(0, 3)
}

export function getFeaturedEditorialStories(): EditorialStory[] {
  return MOCK_EDITORIAL_STORIES.filter(s => s.featured)
}

export function getFeaturedCollections(): FeaturedCollection[] {
  return MOCK_FEATURED_COLLECTIONS.filter(c => c.featured)
}

// Backward compatibility export
export const ARTICLES = MOCK_ARTICLES
export function getArticle(slug: string): Article | undefined {
  return getArticleBySlug(slug)
}
