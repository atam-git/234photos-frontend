import Link from 'next/link'
import { FEATURED_ARTICLE, SIDE_ARTICLES, CATEGORY_COLORS } from '@/lib/mock'

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
            href={FEATURED_ARTICLE.href}
            className="group relative rounded-2xl overflow-hidden bg-[#111] block min-h-[400px] lg:min-h-[500px]"
          >
            <img
              src={FEATURED_ARTICLE.image}
              alt={FEATURED_ARTICLE.title}
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
                  {FEATURED_ARTICLE.category}
                </span>
                <span
                  className="text-white/70 text-[13px] font-medium"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {FEATURED_ARTICLE.source}
                </span>
              </div>
              <h3
                className="text-white text-[20px] md:text-[22px] font-bold leading-[1.35] mb-3 group-hover:underline underline-offset-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {FEATURED_ARTICLE.title}
              </h3>
              <span
                className="text-white/60 text-[13px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {FEATURED_ARTICLE.date}
              </span>
            </div>
          </Link>

          {/* Side Articles */}
          <div className="flex flex-col gap-3">
            {SIDE_ARTICLES.map((article) => (
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
                      className={`text-[11px] font-bold uppercase tracking-[0.5px] ${CATEGORY_COLORS[article.category] ?? 'text-[#EE2B24]'}`}
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
