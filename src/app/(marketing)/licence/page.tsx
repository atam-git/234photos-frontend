import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Check, X } from 'lucide-react'

export default function LicencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[900px] mx-auto px-4 md:px-6 py-14">
        <h1 className="text-[32px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Licence Agreement
        </h1>
        <p className="text-[13px] text-[#888] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Last updated: May 6, 2026
        </p>
        <p className="text-[14px] text-[#555] leading-[1.8] mb-10"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          All assets downloaded from 234photos include a full commercial license. You pay once per download (1 credit = 1 download) and can use the asset forever under the terms below.
        </p>

        {/* Commercial License */}
        <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-b border-[#E8E8E8]">
            <h2 className="text-[17px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Commercial License
            </h2>
            <span className="text-[13px] font-semibold text-[#EE2B24]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              1 Credit per download
            </span>
          </div>
          <div className="p-6">
            <p className="text-[13px] text-[#666] mb-6"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Every download includes a perpetual, worldwide, non-exclusive commercial license. Use the asset in any project, for any purpose, forever.
            </p>
            
            <h3 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              ✓ You can:
            </h3>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                'Use in websites, apps, and digital products',
                'Use in social media, blogs, and online content',
                'Use in marketing materials and advertisements',
                'Use in print materials (brochures, magazines, books)',
                'Use in presentations and templates',
                'Use in products for resale (t-shirts, mugs, posters, etc.)',
                'Use in broadcast, streaming, and video content',
                'Use in unlimited projects with no time limit',
                'Modify, crop, and edit the asset',
              ].map((item) => (
                <li key={item} className="text-[13.5px] text-[#444] flex items-start gap-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              ✗ You cannot:
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                'Resell or redistribute the original asset file',
                'Use in trademark, logo, or service mark',
                'Claim ownership or authorship of the asset',
                'Use in defamatory, pornographic, or illegal content',
                'Share your download with others (each user needs their own license)',
              ].map((item) => (
                <li key={item} className="text-[13.5px] text-[#444] flex items-start gap-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <X className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Editorial License */}
        <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-b border-[#E8E8E8]">
            <h2 className="text-[17px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Editorial License
            </h2>
            <span className="text-[13px] font-semibold text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              For editorial content only
            </span>
          </div>
          <div className="p-6">
            <p className="text-[13px] text-[#666] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Some assets are marked as "Editorial Use Only" and can only be used in news, commentary, or educational contexts. These assets cannot be used for commercial purposes.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                'News articles and journalism',
                'Educational materials and textbooks',
                'Documentary projects',
                'Blog posts and commentary',
                'Non-commercial use only',
              ].map((item) => (
                <li key={item} className="text-[13.5px] text-[#444] flex items-start gap-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <span className="text-[#EE2B24] mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Terms */}
        <div className="bg-[#F5F5F7] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-[#111] mb-3"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Additional Terms
          </h3>
          <ul className="flex flex-col gap-2 text-[13px] text-[#555] leading-relaxed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <li><strong>No attribution required:</strong> You don't need to credit the photographer, but it's always appreciated.</li>
            <li><strong>Model & property releases:</strong> Check the asset details page for release information. You're responsible for obtaining additional releases if needed.</li>
            <li><strong>Sensitive use:</strong> If using images depicting people in sensitive contexts (health, politics, etc.), you may need additional permissions.</li>
            <li><strong>License transfer:</strong> Licenses are non-transferable. Each user needs their own account and credits.</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[13px] text-[#666] mb-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Questions about licensing?
          </p>
          <a href="/contact"
            className="inline-block px-8 py-3 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Contact us
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
