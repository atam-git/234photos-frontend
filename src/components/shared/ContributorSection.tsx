import Link from 'next/link'

const stats = [
  { value: '100K+', label: 'African\ncontributors' },
  { value: '50M+', label: 'Assets in library' },
  { value: '54', label: 'Countries\nearning' },
]

export function ContributorSection() {
  return (
    <section className="relative overflow-hidden min-h-[340px]">
      {/* Background image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/ebfdfe62f45c4733a381f15939c1276b75d29d0c?width=2880"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[340px] py-16 px-5 md:px-10 lg:px-20">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
          {/* Left: text + buttons */}
          <div className="flex flex-col gap-6 max-w-[500px] w-full">
            <h2 className="text-white font-bold text-[34px] leading-[1.2] tracking-[-0.4px] font-jakarta">
              Share your African story
              <br />
              with the world
            </h2>
            <p className="text-white/80 text-[15px] leading-[1.7] font-normal">
              You see Africa differently — through your lens, your community, your culture. Upload your photos, videos and music to 234photos and earn royalties every time your work is downloaded by brands, creators and businesses across the globe.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contribute"
                className="px-[30px] py-[13px] bg-[#EE2B24] text-white text-[14.5px] font-semibold leading-[1.5] rounded-full hover:bg-[#d42520] transition-colors"
              >
                Start contributing
              </Link>
              <Link
                href="/how-it-works"
                className="text-white/80 text-[14.5px] font-medium leading-[1.5] hover:text-white transition-colors"
              >
                How it works →
              </Link>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex items-center gap-9 shrink-0">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col items-center gap-1">
                <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">
                  {stat.value}
                </span>
                <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
