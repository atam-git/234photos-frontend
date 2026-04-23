import Link from 'next/link'
import { CATEGORIES } from '@/lib/mock'

export function CategoryGrid() {
  return (
    <section className="bg-white py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h2
            className="text-[#1A1A1A] text-[22px] font-extrabold leading-[33px] tracking-[-0.3px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Explore African content by category
          </h2>
          <a
            href="/search"
            className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] whitespace-nowrap hover:underline"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            See all categories →
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
          {CATEGORIES.map((category) => (
            <a
              key={category.name}
              href={`/search?q=${encodeURIComponent(category.name)}`}
              className="relative block rounded-xl overflow-hidden aspect-[4/3] group shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] bg-[#1A1A1A]"
            >
              {/* Image */}
              <img
                src={category.src}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/18 to-black/65" />

              {/* Label */}
              <span
                className="absolute bottom-0 left-0 w-full px-[10px] py-[9px] text-white text-[12px] font-bold leading-[15.6px] tracking-[0.1px]"
                style={{
                  fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
