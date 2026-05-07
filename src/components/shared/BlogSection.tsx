'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { articlesApi } from '@/lib/api/articles'
import { CATEGORY_COLORS } from '@/lib/mock'

export function BlogSection() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: () => articlesApi.getFeatured(5),
  })

  const featuredArticle = articles?.[0]
  const sideArticles = articles?.slice(1) || []

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
              Stories from Africa
            </h2>
            <p
              className="text-[#666] text-[14px] leading-[21px] max-w-[420px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Discover the latest in African photography, culture, business and creative industries — told by the people who live it.
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

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] gap-4">
            {/* Featured skeleton */}
            <div className="rounded-2xl overflow-hidden bg-gray-200 min-h-[400px] lg:min-h-[500px] animate-pulse" />
            {/* Side skeletons */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-stretch gap-0 bg-white rounded-xl overflow-hidden h-[120px] animate-pulse">
                  <div className="w-[110px] bg-gray-200" />
                  <div className="flex-1 p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] gap-4">
            {/* Featured Article */}
            {featuredArticle && (
              <Link
                href={`/editorial/${featuredArticle.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-[#111] block min-h-[400px] lg:min-h-[500px]"
              >
                <img
                  src={featuredArticle.coverImage}
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
                    {featuredArticle.category && (
                      <span
                        className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-1 rounded"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        {featuredArticle.category}
                      </span>
                    )}
                    <span
                      className="text-white/70 text-[13px] font-medium"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      {featuredArticle.author.name}
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
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </Link>
            )}

            {/* Side Articles */}
            <div className="flex flex-col gap-3 h-full">
              {sideArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/editorial/${article.slug}`}
                  className="group flex items-stretch gap-0 bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow flex-1"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[110px] shrink-0 overflow-hidden">
                    <img
                      src={article.coverImage}
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
                      {article.category && (
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.5px] ${CATEGORY_COLORS[article.category] ?? 'text-[#EE2B24]'}`}
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          {article.category}
                        </span>
                      )}
                      <span
                        className="text-[#999] text-[11px] font-medium"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        {article.author.name}
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
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#666] text-[15px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              No articles available yet
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
