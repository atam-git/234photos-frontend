import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { BUYER_STEPS, CONTRIBUTOR_STEPS } from '@/lib/mock/marketing'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16 text-center">
          <div className="max-w-[600px] mx-auto">
            <h1 className="text-[#111] text-[38px] md:text-[48px] font-extrabold leading-[1.1] tracking-[-1px] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              How 234photos works
            </h1>
            <p className="text-[#666] text-[15px] leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Whether you&apos;re buying assets or selling your creative work, here&apos;s everything you need to know.
            </p>
          </div>
        </section>

        {/* For buyers */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="bg-[#EE2B24] text-white text-[11px] font-bold uppercase tracking-[1px] px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                For Buyers
              </span>
              <h2 className="text-[24px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Find and license African assets
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BUYER_STEPS.map((step) => (
                <div key={step.n} className="flex flex-col gap-3 p-5 rounded-2xl border border-[#E8E8E8]">
                  <span className="text-[#EE2B24] text-[28px] font-extrabold leading-none"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.n}</span>
                  <h3 className="text-[15px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/search"
                className="inline-block px-8 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Start searching →
              </Link>
            </div>
          </div>
        </section>

        {/* For contributors */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="bg-[#111] text-white text-[11px] font-bold uppercase tracking-[1px] px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                For Contributors
              </span>
              <h2 className="text-[24px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Upload your work and earn
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONTRIBUTOR_STEPS.map((step) => (
                <div key={step.n} className="flex flex-col gap-3 p-5 rounded-2xl border border-[#E8E8E8] bg-white">
                  <span className="text-[#111] text-[28px] font-extrabold leading-none"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.n}</span>
                  <h3 className="text-[15px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contribute"
                className="inline-block px-8 py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-full hover:bg-[#333] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Start contributing →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
