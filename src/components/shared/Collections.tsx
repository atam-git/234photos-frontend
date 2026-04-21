import Link from 'next/link'

const collections = [
  {
    title: 'African Entrepreneurs',
    count: '320K images',
    href: '/collections/african-entrepreneurs',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    ],
  },
  {
    title: 'Pan-African Festivals',
    count: '180K images',
    href: '/collections/pan-african-festivals',
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=300&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80',
    ],
  },
  {
    title: 'Modern African Cities',
    count: '410K images',
    href: '/collections/modern-african-cities',
    images: [
      'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80',
    ],
  },
  {
    title: 'African Street Style',
    count: '250K images',
    href: '/collections/african-street-style',
    images: [
      'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&q=80',
      'https://images.unsplash.com/photo-1613521973937-efce85e8d4a3?w=300&q=80',
    ],
  },
  {
    title: 'Heritage & Culture',
    count: '570K images',
    href: '/collections/heritage-culture',
    images: [
      'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80',
      'https://images.unsplash.com/photo-1542635868-bf8e3c3dd4a9?w=300&q=80',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=300&q=80',
    ],
  },
]

export function Collections() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[22px] md:text-2xl font-bold text-[#191B26] leading-snug">
            Curated African collections
          </h2>
          <Link
            href="/collections"
            className="text-[#EE2B24] text-sm font-semibold hover:underline whitespace-nowrap shrink-0 ml-4"
          >
            Browse all collections →
          </Link>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group block"
            >
              {/* Mosaic image grid */}
              <div className="flex gap-1 h-[180px] rounded-xl overflow-hidden mb-3">
                {/* Large image — left */}
                <div className="flex-[3] relative overflow-hidden">
                  <img
                    src={col.images[0]}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Two stacked images — right */}
                <div className="flex-[2] flex flex-col gap-1">
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={col.images[1]}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={col.images[2]}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <h3 className="text-[14px] font-semibold text-[#191B26] leading-snug mb-0.5 group-hover:text-[#EE2B24] transition-colors">
                {col.title}
              </h3>
              <p className="text-[13px] text-[#999]">{col.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
