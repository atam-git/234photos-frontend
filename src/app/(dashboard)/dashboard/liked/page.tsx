import { Heart } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import Link from 'next/link'

const LIKED = MOCK_ASSETS.slice(0, 8)

export default function LikedPage() {
  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Liked assets
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Assets you&apos;ve saved as favourites
        </p>
      </div>

      {LIKED.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-10 h-10 text-[#DDDDDD] mb-4" />
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No liked assets yet
          </p>
          <p className="text-[13px] text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Heart any asset while browsing to save it here
          </p>
          <Link href="/search"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {LIKED.map((asset) => (
            <Link key={asset.id} href={`/assets/${asset.id}`}
              className="block relative group rounded-xl overflow-hidden bg-[#E8E8E8] break-inside-avoid mb-3">
              <img src={asset.src} alt={asset.alt} className="w-full h-auto block transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 fill-[#EE2B24] text-[#EE2B24]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
