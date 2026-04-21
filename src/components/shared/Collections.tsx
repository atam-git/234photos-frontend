import Link from 'next/link'

const categories = [
  {
    label: 'Lagos & Nigeria',
    href: '/categories/lagos-nigeria',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80',
  },
  {
    label: 'African Fashion',
    href: '/categories/african-fashion',
    image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80',
  },
  {
    label: 'Entrepreneurs',
    href: '/categories/entrepreneurs',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
  },
  {
    label: 'Traditional Culture',
    href: '/categories/traditional-culture',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80',
  },
  {
    label: 'African Music',
    href: '/categories/african-music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  },
  {
    label: 'Food & Cuisine',
    href: '/categories/food-cuisine',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
  },
  {
    label: 'Nature & Wildlife',
    href: '/categories/nature-wildlife',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
  },
  {
    label: 'African Weddings',
    href: '/categories/african-weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  },
  {
    label: 'Architecture',
    href: '/categories/architecture',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    label: 'Youth & Lifestyle',
    href: '/categories/youth-lifestyle',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    label: 'Sports',
    href: '/categories/sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
  },
  {
    label: 'Technology',
    href: '/categories/technology',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
  },
]

export function Collections() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[22px] md:text-2xl font-bold text-[#191B26] leading-snug">
            Explore African content by category
          </h2>
          <Link
            href="/categories"
            className="text-[#EE2B24] text-sm font-semibold hover:underline whitespace-nowrap shrink-0 ml-4"
          >
            See all categories →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative block aspect-[4/3] rounded-xl overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* label */}
              <span className="absolute bottom-3 left-3 right-3 text-white text-[13px] font-semibold leading-tight drop-shadow-sm">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
