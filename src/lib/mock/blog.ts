/**
 * Mock data for blog and editorial content
 */

export const FEATURED_ARTICLE = {
  category: 'MUSIC',
  source: 'BBC Africa',
  title: 'Afrobeats Takes Over the World: How Nigerian Artists Dominated Global Charts in 2025',
  date: 'Apr 10, 2026',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  href: '/editorial/afrobeats-global-charts-2025',
}

export const SIDE_ARTICLES = [
  {
    id: 1,
    category: 'SPORTS',
    source: 'Al Jazeera',
    title: 'AFCON 2025: Morocco Lifts the Trophy on Home Soil in Historic Final',
    date: 'Feb 22, 2026',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/afcon-2025-morocco',
  },
  {
    id: 2,
    category: 'FASHION',
    source: 'Vogue Africa',
    title: 'Lagos Fashion Week 2025 Breaks Records with 60+ African Designers on the Runway',
    date: 'Nov 14, 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/lagos-fashion-week-2025',
  },
  {
    id: 3,
    category: 'TECHNOLOGY',
    source: 'TechCabal',
    title: "Africa's Tech Startups Raised $4.3 Billion in 2025 — The Continent's Biggest Year Yet",
    date: 'Jan 8, 2026',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/africa-tech-funding-2025',
  },
  {
    id: 4,
    category: 'BUSINESS',
    source: 'Bloomberg Africa',
    title: 'Pan-African Free Trade Area Hits $10B in Intra-African Trade for the First Time',
    date: 'Mar 31, 2026',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/afcfta-10b-trade',
  },
]

export const CATEGORY_COLORS: Record<string, string> = {
  MUSIC: 'text-[#EE2B24]',
  SPORTS: 'text-[#EE2B24]',
  FASHION: 'text-[#EE2B24]',
  TECHNOLOGY: 'text-[#EE2B24]',
  BUSINESS: 'text-[#EE2B24]',
}
