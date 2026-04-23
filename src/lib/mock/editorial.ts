import type { Article } from '@/types'

export const CATEGORY_COLORS: Record<string, string> = {
  MUSIC: 'bg-[#FFF0F0] text-[#EE2B24]',
  SPORTS: 'bg-[#F0F7FF] text-[#2B6EEE]',
  FASHION: 'bg-[#FFF8F0] text-[#EE8B2B]',
  TECHNOLOGY: 'bg-[#F0FFF4] text-[#2BEE6E]',
  BUSINESS: 'bg-[#F5F0FF] text-[#8B2BEE]',
}

export const ARTICLES: Article[] = [
  { 
    id: '1',
    slug: 'afrobeats-global-charts-2025', 
    category: 'MUSIC', 
    source: 'BBC Africa', 
    title: 'Afrobeats Takes Over the World: How Nigerian Artists Dominated Global Charts in 2025', 
    excerpt: 'From Burna Boy to Tems, Nigerian artists rewrote the rules of global pop music in 2025, landing on every major chart and collaborating with the world\'s biggest names.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    author: {
      name: 'BBC Africa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['music', 'afrobeats', 'culture'],
    date: 'Apr 10, 2026',
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-10',
    readTime: '5 min read', 
    featured: true 
  },
  { 
    id: '2',
    slug: 'afcon-2025-morocco', 
    category: 'SPORTS', 
    source: 'Al Jazeera', 
    title: 'AFCON 2025: Morocco Lifts the Trophy on Home Soil in Historic Final', 
    excerpt: 'Morocco became the first host nation to win AFCON since Egypt in 2006, defeating Senegal 2-1 in a thrilling final in Casablanca.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
    author: {
      name: 'Al Jazeera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['sports', 'football', 'afcon'],
    date: 'Feb 22, 2026',
    publishedAt: '2026-02-22',
    updatedAt: '2026-02-22',
    readTime: '4 min read'
  },
  { 
    id: '3',
    slug: 'lagos-fashion-week-2025', 
    category: 'FASHION', 
    source: 'Vogue Africa', 
    title: 'Lagos Fashion Week 2025 Breaks Records with 60+ African Designers on the Runway', 
    excerpt: 'The continent\'s biggest fashion event drew global buyers and press, cementing Lagos as a serious player in the international fashion calendar.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    author: {
      name: 'Vogue Africa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['fashion', 'design', 'culture'],
    date: 'Nov 14, 2025',
    publishedAt: '2025-11-14',
    updatedAt: '2025-11-14',
    readTime: '3 min read'
  },
  { 
    id: '4',
    slug: 'africa-tech-funding-2025', 
    category: 'TECHNOLOGY', 
    source: 'TechCabal', 
    title: "Africa's Tech Startups Raised ₦6.9 Trillion in 2025 — The Continent's Biggest Year Yet", 
    excerpt: 'Fintech, healthtech and agritech led the charge as African startups attracted record investment from global VCs and development finance institutions.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    author: {
      name: 'TechCabal',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['technology', 'startups', 'investment'],
    date: 'Jan 8, 2026',
    publishedAt: '2026-01-08',
    updatedAt: '2026-01-08',
    readTime: '6 min read'
  },
  { 
    id: '5',
    slug: 'afcfta-10b-trade', 
    category: 'BUSINESS', 
    source: 'Bloomberg Africa', 
    title: 'Pan-African Free Trade Area Hits ₦16 Trillion in Intra-African Trade for the First Time', 
    excerpt: 'The AfCFTA milestone marks a turning point for African economic integration, with manufacturing and agriculture leading cross-border trade growth.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80',
    author: {
      name: 'Bloomberg Africa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['business', 'trade', 'economics'],
    date: 'Mar 31, 2026',
    publishedAt: '2026-03-31',
    updatedAt: '2026-03-31',
    readTime: '4 min read'
  },
  { 
    id: '6',
    slug: 'nairobi-silicon-savannah-2026', 
    category: 'TECHNOLOGY', 
    source: 'TechCrunch Africa', 
    title: 'Nairobi\'s Silicon Savannah Is Now Africa\'s Fastest-Growing Tech Hub', 
    excerpt: 'With over 400 active startups and a new government-backed innovation district, Nairobi is challenging Lagos and Cape Town for tech supremacy.',
    content: 'Full article content would go here...',
    coverImage: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80',
    author: {
      name: 'TechCrunch Africa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    tags: ['technology', 'startups', 'nairobi'],
    date: 'Apr 5, 2026',
    publishedAt: '2026-04-05',
    updatedAt: '2026-04-05',
    readTime: '5 min read'
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
