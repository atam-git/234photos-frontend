import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { FEATURED_COLLECTIONS } from '@/lib/mock/marketing'

export default function CollectionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-14">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Curated Collections
            </p>
            <h1 className="text-[#111] text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Browse African collections
            </h1>
            <p className="text-[#666] text-[15px] leading-relaxed max-w-[520px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Hand-curated sets of authentic African imagery — organised by theme, culture and story.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-4 md:px-6 py-12">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group block"
              >
                {/* Mosaic */}
                <div className="flex gap-1 h-[200px] rounded-2xl overflow-hidden mb-3">
                  <div className="flex-[3] relative overflow-hidden">
                    <img src={col.images[0]} alt={col.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex-[2] flex flex-col gap-1">
                    <div className="flex-1 overflow-hidden">
                      <img src={col.images[1]} alt={col.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <img src={col.images[2]} alt={col.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  </div>
                </div>
                <h3 className="text-[15px] font-bold text-[#111] mb-0.5 group-hover:text-[#EE2B24] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {col.title}
                </h3>
                <p className="text-[12.5px] text-[#888] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {col.count} assets
                </p>
                <p className="text-[12.5px] text-[#666] leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {col.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
