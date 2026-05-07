'use client'

import { use, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { articlesApi } from '@/lib/api/articles'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { marked } from 'marked'

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getBySlug(slug),
  })

  const { data: relatedData } = useQuery({
    queryKey: ['articles', 'related', article?.category],
    queryFn: () => articlesApi.getAll({ category: article?.category || undefined, limit: 4 }),
    enabled: !!article?.category,
  })

  const related = relatedData?.articles.filter(a => a.slug !== slug).slice(0, 3) || []

  // Parse markdown to HTML
  const contentHtml = useMemo(() => {
    if (!article?.content) return ''
    return marked.parse(article.content) as string
  }, [article?.content])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link 
              href="/editorial"
              className="inline-block px-6 py-2.5 bg-[#EE2B24] text-white text-sm font-bold rounded-full hover:bg-[#d42520] transition-colors"
            >
              Back to Editorial
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero image */}
        <div className="relative h-[320px] md:h-[440px] bg-[#111] overflow-hidden">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Article content */}
        <div className="max-w-[760px] mx-auto px-4 md:px-6 py-10">
          <div className="mb-6">
            <Breadcrumb items={[
              { label: 'Home', href: '/' }, 
              { label: 'Editorial', href: '/editorial' }, 
              { label: article.category || 'Article' }
            ]} />
          </div>

          <div className="flex items-center gap-2 mb-4">
            {article.category && (
              <span className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {article.category}
              </span>
            )}
            <span className="text-[#888] text-[13px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {article.author.name}
            </span>
          </div>

          <h1 className="text-[#111] text-[28px] md:text-[36px] font-extrabold leading-[1.2] tracking-[-0.5px] mb-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-[#888] text-[13px] mb-8 pb-8 border-b border-[#F0F0F0]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
            <span>·</span>
            <span>{article.readTime} min read</span>
            <span>·</span>
            <span>{article.views.toLocaleString()} views</span>
          </div>

          {/* Article body */}
          <div className="prose prose-lg max-w-none">
            {article.excerpt && (
              <p className="text-[16px] text-[#333] leading-[1.8] mb-6 font-medium"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {article.excerpt}
              </p>
            )}
            <div 
              className="article-content text-[15px] text-[#444] leading-[1.8]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          <style jsx global>{`
            .article-content h1,
            .article-content h2,
            .article-content h3,
            .article-content h4,
            .article-content h5,
            .article-content h6 {
              font-family: var(--font-jakarta), Plus Jakarta Sans, sans-serif;
              font-weight: 700;
              color: #111;
              margin-top: 2em;
              margin-bottom: 0.75em;
              line-height: 1.3;
            }

            .article-content h1 { font-size: 2em; }
            .article-content h2 { font-size: 1.5em; }
            .article-content h3 { font-size: 1.25em; }
            .article-content h4 { font-size: 1.1em; }

            .article-content p {
              margin-bottom: 1.5em;
            }

            .article-content strong {
              font-weight: 700;
              color: #222;
            }

            .article-content em {
              font-style: italic;
            }

            .article-content ul,
            .article-content ol {
              margin: 1.5em 0;
              padding-left: 1.5em;
            }

            .article-content li {
              margin-bottom: 0.75em;
              line-height: 1.8;
            }

            .article-content ul {
              list-style-type: disc;
            }

            .article-content ol {
              list-style-type: decimal;
            }

            .article-content a {
              color: #EE2B24;
              text-decoration: underline;
              transition: color 0.2s;
            }

            .article-content a:hover {
              color: #d42520;
            }

            .article-content blockquote {
              border-left: 4px solid #EE2B24;
              padding-left: 1.5em;
              margin: 2em 0;
              font-style: italic;
              color: #555;
            }

            .article-content code {
              background: #f5f5f7;
              padding: 0.2em 0.4em;
              border-radius: 3px;
              font-size: 0.9em;
              font-family: 'Courier New', monospace;
            }

            .article-content pre {
              background: #f5f5f7;
              padding: 1.5em;
              border-radius: 8px;
              overflow-x: auto;
              margin: 2em 0;
            }

            .article-content pre code {
              background: none;
              padding: 0;
            }

            .article-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 2em 0;
            }

            .article-content hr {
              border: none;
              border-top: 1px solid #e0e0e0;
              margin: 3em 0;
            }
          `}</style>

          {/* Search CTA */}
          {article.category && (
            <div className="mt-10 p-6 bg-[#F5F5F7] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Find images for this story
                </p>
                <p className="text-[13px] text-[#666]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Browse authentic African stock photos related to {article.category.toLowerCase()}.
                </p>
              </div>
              <Link href={`/search?q=${encodeURIComponent(article.category.toLowerCase())}`}
                className="shrink-0 px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Search images →
              </Link>
            </div>
          )}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#F5F5F7] px-4 md:px-6 py-12">
            <div className="max-w-[1280px] mx-auto">
              <h2 className="text-[20px] font-bold text-[#111] mb-6"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                More from {article.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((a) => (
                  <Link key={a.slug} href={`/editorial/${a.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[#E8E8E8] hover:shadow-md transition-shadow">
                    <div className="h-[160px] overflow-hidden">
                      <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-[#888] mb-1.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {a.author.name} · {new Date(a.publishedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <h3 className="text-[13.5px] font-bold text-[#111] leading-snug line-clamp-2 group-hover:text-[#EE2B24] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
