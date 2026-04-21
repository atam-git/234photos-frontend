const categories = [
  {
    name: 'Lagos & Nigeria',
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/20680602b893b12b8fd66eaaa4a2480861ca37aa?width=394',
  },
  {
    name: 'African Fashion',
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/2e1977d90a651adf93ab2391aad9ba7e5fc82a2e?width=394',
  },
  {
    name: 'Entrepreneurs',
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Traditional Culture',
    src: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'African Music',
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Food & Cuisine',
    src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Nature & Wildlife',
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'African Weddings',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Architecture',
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Youth & Lifestyle',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Sports',
    src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=394&q=80',
  },
  {
    name: 'Technology',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=394&q=80',
  },
]

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
            href="/categories"
            className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] whitespace-nowrap hover:underline"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            See all categories →
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
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
