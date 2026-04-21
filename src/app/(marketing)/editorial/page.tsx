import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { ARTICLES } from '@/lib/mock/editorial'

const CATEGORY_COLORS: Record<string, string> = {
  MUSIC: 'bg-[#FFF0F0] text-[#EE2B24]',
  SPORTS: 'bg-[#F0F7FF] text-[#2B6EEE]',
  FASHION: 'bg-[#FFF8F0] text-[#EE8B2B]',
  TECHNOLOGY: 'bg-[#F0FFF4] text-[#2BEE6E]',
  BUSINESS: 'bg-[#F5F0FF] text-[#8B2BEE]',
}

export default function EditorialPage() {
  const featured = ARTICLES.find((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-14">
          <div className="max-w-[1280px] mx-auto">
            <span className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              234photos Editorial
            </span>
            <h1 className="text-[#111] text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] mt-2 mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              African news & entertainment
            </h1>
            <p className="text-[#666] text-[15px] max-w-[480px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Real-time editorial coverage across music, sports, culture and business from every corner of the continent.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 py-12">
          <div className="max-w-[1280px] mx-auto">

            {/* Featured */}
            {featured && (
              <Link href={`/editorial/${featured.slug}`} className="group block mb-12">
                <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[480px] bg-[#111]">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-1 rounded"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {featured.category}
                      </span>
                      <span className="text-white/70 text-[13px]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {featured.source}
                      </span>
                    </div>
                    <h2 className="text-white text-[22px] md:text-[28px] font-bold leading-snug mb-2 max-w-[700px] group-hover:underline underline-offset-2"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {featured.title}
                    </h2>
                    <span className="text-white/60 text-[13px]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {featured.date} · {featured.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link key={article.slug} href={`/editorial/${article.slug}`} className="group flex flex-col">
                  <div className="relative h-[200px] rounded-xl overflow-hidden bg-[#E8E8E8] mb-3">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded ${CATEGORY_COLORS[article.category] ?? 'bg-[#F0F0F0] text-[#555]'}`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-[#888] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {article.source} · {article.date}
                  </p>
                  <h3 className="text-[15px] font-bold text-[#111] leading-snug mb-2 group-hover:text-[#EE2B24] transition-colors line-clamp-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-[#666] leading-relaxed line-clamp-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {article.excerpt}
                  </p>
                  <span className="text-[12px] text-[#999] mt-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {article.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
