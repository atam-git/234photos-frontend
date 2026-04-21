import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'

const COLLECTIONS = [
  { slug: 'african-entrepreneurs', title: 'African Entrepreneurs', count: '320K', desc: 'Business leaders, founders and innovators across the continent.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'] },
  { slug: 'pan-african-festivals', title: 'Pan-African Festivals', count: '180K', desc: 'Celebrations, carnivals and cultural events from Lagos to Cape Town.', images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80', 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80'] },
  { slug: 'modern-african-cities', title: 'Modern African Cities', count: '410K', desc: 'Skylines, streets and architecture of Africa\'s fastest-growing cities.', images: ['https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80'] },
  { slug: 'african-street-style', title: 'African Street Style', count: '250K', desc: 'Fashion-forward looks from Accra, Nairobi, Lagos and beyond.', images: ['https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80', 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'] },
  { slug: 'heritage-culture', title: 'Heritage & Culture', count: '570K', desc: 'Traditional ceremonies, art, crafts and cultural heritage across Africa.', images: ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80', 'https://images.unsplash.com/photo-1542635868-bf8e3c3dd4a9?w=400&q=80', 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&q=80'] },
  { slug: 'african-food-cuisine', title: 'Food & Cuisine', count: '140K', desc: 'Jollof rice, suya, injera and the rich culinary diversity of Africa.', images: ['https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80'] },
  { slug: 'nature-wildlife', title: 'Nature & Wildlife', count: '290K', desc: 'Savannahs, rainforests, and the incredible wildlife of the African continent.', images: ['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=80'] },
  { slug: 'african-weddings', title: 'African Weddings', count: '95K', desc: 'Traditional and modern wedding ceremonies across African cultures.', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80'] },
  { slug: 'african-music', title: 'African Music', count: '110K', desc: 'Afrobeats, highlife, amapiano and the sounds shaping global culture.', images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'] },
  { slug: 'african-sports', title: 'Sports', count: '200K', desc: 'Football, athletics, boxing and the sporting spirit of Africa.', images: ['https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80', 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&q=80', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80'] },
]

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
            {COLLECTIONS.map((col) => (
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
