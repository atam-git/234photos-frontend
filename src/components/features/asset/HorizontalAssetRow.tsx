'use client'

import { useRouter } from 'next/navigation'
import { Asset } from '@/components/features/search/AssetCard'

interface HorizontalAssetRowProps {
  title: string
  assets: Asset[]
  seeAllHref?: string
}

export function HorizontalAssetRow({ title, assets, seeAllHref }: HorizontalAssetRowProps) {
  const router = useRouter()

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-[18px] font-bold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          {title}
        </h2>
        {seeAllHref && (
          <a
            href={seeAllHref}
            className="text-[13px] font-semibold text-[#EE2B24] hover:underline whitespace-nowrap"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            See all →
          </a>
        )}
      </div>

      {/* Scroll row */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => router.push(`/assets/${asset.id}`)}
            className="relative shrink-0 w-[200px] h-[140px] rounded-xl overflow-hidden bg-[#E8E8E8] cursor-pointer group"
          >
            <img
              src={asset.src}
              alt={asset.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            {/* Contributor */}
            <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p
                className="text-white text-[11px] font-semibold truncate drop-shadow"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.contributor}
              </p>
            </div>
            {/* Resolution badge */}
            {asset.resolution && (
              <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                {asset.resolution}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
