import Link from 'next/link'

const featuredArticle = {
  category: 'MUSIC',
  source: 'BBC Africa',
  title: 'Afrobeats Takes Over the World: How Nigerian Artists Dominated Global Charts in 2025',
  date: 'Apr 10, 2026',
  image:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  href: '/editorial/afrobeats-global-charts-2025',
}

const sideArticles = [
  {
    id: 1,
    category: 'SPORTS',
    source: 'Al Jazeera',
    title: 'AFCON 2025: Morocco Lifts the Trophy on Home Soil in Historic Final',
    date: 'Feb 22, 2026',
    image:
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/afcon-2025-morocco',
  },
  {
    id: 2,
    category: 'FASHION',
    source: 'Vogue Africa',
    title: 'Lagos Fashion Week 2025 Breaks Records with 60+ African Designers on the Runway',
    date: 'Nov 14, 2025',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/lagos-fashion-week-2025',
  },
  {
    id: 3,
    category: 'TECHNOLOGY',
    source: 'TechCabal',
    title: "Africa's Tech Startups Raised $4.3 Billion in 2025 — The Continent's Biggest Year Yet",
    date: 'Jan 8, 2026',
    image:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/africa-tech-funding-2025',
  },
  {
    id: 4,
    category: 'BUSINESS',
    source: 'Bloomberg Africa',
    title: 'Pan-African Free Trade Area Hits $10B in Intra-African Trade for the First Time',
    date: 'Mar 31, 2026',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    href: '/editorial/afcfta-10b-trade',
  },
]

const categoryColors: Record<string, string> = {
  MUSIC: 'text-[#EE2B24]',
  SPORTS: 'text-[#EE2B24]',
  FASHION: 'text-[#EE2B24]',
  TECHNOLOGY: 'text-[#EE2B24]',
  BUSINESS: 'text-[#EE2B24]',
}

export function BlogSection() {
  return (
    <section className="bg-[#F5F5F7] py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
          <div className="flex flex-col gap-2">
            <span
              className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.2px] leading-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              234Photos Editorial
            </span>
            <h2
              className="text-[#111] text-[28px] md:text-[32px] font-bold leading-tight tracking-[-0.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              African news &amp; entertainment
            </h2>
            <p
              className="text-[#666] text-[14px] leading-[21px] max-w-[380px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Real-time editorial coverage across music, sports, culture and business from every
              corner of the continent.
            </p>
          </div>
          <div className="sm:pt-1 shrink-0">
            <Link
              href="/editorial"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#EE2B24] text-[#EE2B24] rounded-lg text-[13px] font-semibold leading-[19.5px] hover:bg-[#EE2B24] hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Browse editorial →
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] gap-4">
          {/* Featured Article */}
          <Link
            href={featuredArticle.href}
            className="group relative rounded-2xl overflow-hidden bg-[#111] block min-h-[400px] lg:min-h-[500px]"
          >
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span
                className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[1px] px-2 py-1 rounded"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Featured
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-1 rounded"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {featuredArticle.category}
                </span>
                <span
                  className="text-white/70 text-[13px] font-medium"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {featuredArticle.source}
                </span>
              </div>
              <h3
                className="text-white text-[20px] md:text-[22px] font-bold leading-[1.35] mb-3 group-hover:underline underline-offset-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {featuredArticle.title}
              </h3>
              <span
                className="text-white/60 text-[13px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {featuredArticle.date}
              </span>
            </div>
          </Link>

          {/* Side Articles */}
          <div className="flex flex-col gap-3">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group flex items-stretch gap-0 bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative w-[110px] shrink-0 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Editorial badge */}
                  <div className="absolute bottom-2 left-2">
                    <span
                      className="bg-black/75 text-white text-[9px] font-semibold uppercase tracking-[0.5px] px-1.5 py-0.5 rounded"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      Editorial
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center gap-1.5 px-4 py-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-[0.5px] ${categoryColors[article.category] ?? 'text-[#EE2B24]'}`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      {article.category}
                    </span>
                    <span
                      className="text-[#999] text-[11px] font-medium"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      {article.source}
                    </span>
                  </div>
                  <h4
                    className="text-[#111] text-[13px] font-semibold leading-[1.4] line-clamp-2 group-hover:text-[#EE2B24] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {article.title}
                  </h4>
                  <span
                    className="text-[#999] text-[12px]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {article.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
