import { notFound } from 'next/navigation'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { getArticle, ARTICLES } from '@/lib/mock/editorial'
import Link from 'next/link'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero image */}
        <div className="relative h-[320px] md:h-[440px] bg-[#111] overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Article content */}
        <div className="max-w-[760px] mx-auto px-4 md:px-6 py-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Editorial', href: '/editorial' }, { label: article.category }]} />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {article.category}
            </span>
            <span className="text-[#888] text-[13px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {article.source}
            </span>
          </div>

          <h1 className="text-[#111] text-[28px] md:text-[36px] font-extrabold leading-[1.2] tracking-[-0.5px] mb-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-[#888] text-[13px] mb-8 pb-8 border-b border-[#F0F0F0]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Article body — mock content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[15px] text-[#444] leading-[1.8] mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {article.excerpt}
            </p>
            <p className="text-[15px] text-[#444] leading-[1.8] mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              The story of African creativity on the global stage is one of persistence, talent and an unshakeable belief in the continent&apos;s cultural power. From the streets of Lagos to the studios of Nairobi, African creators are rewriting the narrative — and the world is finally paying attention.
            </p>
            <p className="text-[15px] text-[#444] leading-[1.8] mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              This shift isn&apos;t happening by accident. It&apos;s the result of years of investment in local talent, the rise of digital platforms that bypass traditional gatekeepers, and a growing global appetite for authentic African stories told on African terms.
            </p>
            <p className="text-[15px] text-[#444] leading-[1.8]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              For brands and creators looking to connect with African audiences — or to bring authentic African perspectives to global campaigns — the message is clear: the content is here, the creators are ready, and the moment is now.
            </p>
          </div>

          {/* Search CTA */}
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
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#F5F5F7] px-4 md:px-6 py-12">
            <div className="max-w-[1280px] mx-auto">
              <h2 className="text-[20px] font-bold text-[#111] mb-6"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                More from {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((a) => (
                  <Link key={a.slug} href={`/editorial/${a.slug}`} className="group bg-white rounded-xl overflow-hidden border border-[#E8E8E8] hover:shadow-md transition-shadow">
                    <div className="h-[160px] overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-[#888] mb-1.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {a.source} · {a.date}
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
