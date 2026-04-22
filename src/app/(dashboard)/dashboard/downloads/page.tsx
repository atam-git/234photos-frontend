import { Download, FileImage, ExternalLink } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import Link from 'next/link'

const DOWNLOADS = MOCK_ASSETS.slice(0, 10).map((asset, i) => ({
  ...asset,
  licensedOn: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026', 'Mar 20, 2026',
    'Mar 15, 2026', 'Mar 8, 2026', 'Feb 22, 2026', 'Feb 14, 2026', 'Feb 1, 2026'][i],
  license: i % 3 === 0 ? 'Enhanced' : 'Standard',
  format: 'JPG',
  size: `${(Math.random() * 8 + 2).toFixed(1)} MB`,
}))

export default function DownloadsPage() {
  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Downloads
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Your licensed assets — re-download anytime
        </p>
      </div>

      {DOWNLOADS.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <FileImage className="w-10 h-10 text-[#DDDDDD] mb-4" />
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No downloads yet
          </p>
          <p className="text-[13px] text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Assets you license will appear here
          </p>
          <Link href="/search"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
          <div className="divide-y divide-[#F8F8F8]">
            {DOWNLOADS.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#111] truncate"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {item.alt}
                  </p>
                  <p className="text-[12px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {item.license} · {item.format} · {item.size} · Licensed {item.licensedOn}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/assets/${item.id}`}
                    className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#999] transition-colors"
                    title="View asset">
                    <ExternalLink className="w-3.5 h-3.5 text-[#666]" />
                  </Link>
                  <button
                    className="w-8 h-8 rounded-full bg-[#EE2B24] flex items-center justify-center hover:bg-[#d42520] transition-colors"
                    title="Re-download">
                    <Download className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
