export interface Article {
  slug: string
  category: string
  source: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const ARTICLES: Article[] = [
  { slug: 'afrobeats-global-charts-2025', category: 'MUSIC', source: 'BBC Africa', title: 'Afrobeats Takes Over the World: How Nigerian Artists Dominated Global Charts in 2025', excerpt: 'From Burna Boy to Tems, Nigerian artists rewrote the rules of global pop music in 2025, landing on every major chart and collaborating with the world\'s biggest names.', date: 'Apr 10, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80', featured: true },
  { slug: 'afcon-2025-morocco', category: 'SPORTS', source: 'Al Jazeera', title: 'AFCON 2025: Morocco Lifts the Trophy on Home Soil in Historic Final', excerpt: 'Morocco became the first host nation to win AFCON since Egypt in 2006, defeating Senegal 2-1 in a thrilling final in Casablanca.', date: 'Feb 22, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80' },
  { slug: 'lagos-fashion-week-2025', category: 'FASHION', source: 'Vogue Africa', title: 'Lagos Fashion Week 2025 Breaks Records with 60+ African Designers on the Runway', excerpt: 'The continent\'s biggest fashion event drew global buyers and press, cementing Lagos as a serious player in the international fashion calendar.', date: 'Nov 14, 2025', readTime: '3 min read', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'africa-tech-funding-2025', category: 'TECHNOLOGY', source: 'TechCabal', title: "Africa's Tech Startups Raised $4.3 Billion in 2025 — The Continent's Biggest Year Yet", excerpt: 'Fintech, healthtech and agritech led the charge as African startups attracted record investment from global VCs and development finance institutions.', date: 'Jan 8, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80' },
  { slug: 'afcfta-10b-trade', category: 'BUSINESS', source: 'Bloomberg Africa', title: 'Pan-African Free Trade Area Hits $10B in Intra-African Trade for the First Time', excerpt: 'The AfCFTA milestone marks a turning point for African economic integration, with manufacturing and agriculture leading cross-border trade growth.', date: 'Mar 31, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80' },
  { slug: 'nairobi-silicon-savannah-2026', category: 'TECHNOLOGY', source: 'TechCrunch Africa', title: 'Nairobi\'s Silicon Savannah Is Now Africa\'s Fastest-Growing Tech Hub', excerpt: 'With over 400 active startups and a new government-backed innovation district, Nairobi is challenging Lagos and Cape Town for tech supremacy.', date: 'Apr 5, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80' },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
