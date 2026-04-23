import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PRIVACY_SECTIONS } from '@/lib/mock/legal'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 md:px-6 py-14">
        <h1 className="text-[32px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Privacy Policy
        </h1>
        <p className="text-[13px] text-[#888] mb-10"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Last updated: April 1, 2026
        </p>
        <div className="flex flex-col gap-8">
          {PRIVACY_SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-[16px] font-bold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {s.title}
              </h2>
              <p className="text-[14px] text-[#555] leading-[1.8]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
