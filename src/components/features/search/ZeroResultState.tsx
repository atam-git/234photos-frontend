interface ZeroResultStateProps {
  query: string
}

const trendingSearches = [
  'African fintech', 'Lagos skyline', 'Nairobi street', 'Accra market',
  'African fashion', 'Jollof rice', 'African wildlife',
]

export function ZeroResultState({ query }: ZeroResultStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M12.25 21.875C17.5647 21.875 21.875 17.5647 21.875 12.25C21.875 6.93527 17.5647 2.625 12.25 2.625C6.93527 2.625 2.625 6.93527 2.625 12.25C2.625 17.5647 6.93527 21.875 12.25 21.875Z"
            stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round"
          />
          <path d="M25.375 25.375L19.5188 19.5188" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h3
        className="text-[#111] text-[20px] font-bold mb-2"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        No results for &ldquo;{query}&rdquo;
      </h3>
      <p
        className="text-[#888] text-[14px] leading-[21px] max-w-[360px] mb-8"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        Try different keywords, check your spelling, or use fewer filters.
      </p>

      {/* Request content CTA */}
      <div className="bg-[#FFF5F5] border border-[#FFCCC9] rounded-xl px-6 py-4 mb-8 max-w-[360px] w-full">
        <p
          className="text-[#111] text-[13px] font-semibold mb-1"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          📷 Request this content
        </p>
        <p
          className="text-[#888] text-[12px]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          We&apos;ll notify contributors to upload content matching your search.
        </p>
        <button className="mt-3 px-4 py-2 bg-[#EE2B24] text-white text-[12px] font-semibold rounded-full hover:bg-[#d42520] transition-colors">
          Request content
        </button>
      </div>

      {/* Trending searches */}
      <div>
        <p
          className="text-[#888] text-[12px] font-semibold uppercase tracking-[0.8px] mb-3"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          Trending this week
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {trendingSearches.map((term) => (
            <a
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3.5 py-[6px] border border-[#DDD] text-[#444] text-[13px] font-medium rounded-full hover:border-[#EE2B24] hover:text-[#EE2B24] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {term}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
