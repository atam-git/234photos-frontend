import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'

const STEPS = [
  { n: '01', title: 'Create your account', desc: 'Sign up free in under 2 minutes. No approval needed to get started.' },
  { n: '02', title: 'Upload your work', desc: 'Drag and drop up to 100 files at once. We support JPG, PNG, SVG, MP4 and MOV.' },
  { n: '03', title: 'Add metadata', desc: 'Our AI suggests tags automatically. Review, edit and submit for review.' },
  { n: '04', title: 'Get approved & earn', desc: 'Assets go live within 24–48 hours. Earn royalties every time your work is downloaded.' },
]

const STATS = [
  { value: '100K+', label: 'Active contributors' },
  { value: '54', label: 'African countries' },
  { value: '$2M+', label: 'Paid to contributors' },
  { value: '50M+', label: 'Assets in library' },
]

const FAQS = [
  { q: 'How much do I earn per download?', a: 'Contributors earn 30–50% royalty per download depending on your contributor tier and the license type purchased.' },
  { q: 'What content can I upload?', a: 'Photos, vectors, illustrations, footage and music with African subjects or created by African creators. Content must be original and you must own the rights.' },
  { q: 'How long does review take?', a: 'Most submissions are reviewed within 24–48 hours. You\'ll receive a notification when your assets go live or if any are rejected with feedback.' },
  { q: 'Do I need a model release?', a: 'Yes, for any identifiable people in your images. We provide a model release template you can use.' },
  { q: 'When and how do I get paid?', a: 'Earnings are paid monthly via bank transfer, PayPal or mobile money once you reach the ₦5,000 minimum threshold.' },
]

export default function ContributePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#111] py-24 px-4 md:px-6 text-center">
          <div className="relative z-10 max-w-[680px] mx-auto">
            <span className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              For Contributors
            </span>
            <h1 className="text-white text-[38px] md:text-[52px] font-extrabold leading-[1.1] tracking-[-1px] mt-3 mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Share your African story with the world
            </h1>
            <p className="text-white/70 text-[16px] leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Upload your photos, videos and music. Earn royalties every time your work is downloaded by brands and creators worldwide.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/signup?role=contributor"
                className="px-8 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Start contributing
              </Link>
              <Link href="/how-it-works"
                className="px-8 py-3.5 border border-white/30 text-white text-[14px] font-semibold rounded-full hover:border-white/60 transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                How it works →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-12">
          <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-[#EE2B24] text-[36px] font-extrabold tracking-[-1px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{s.value}</p>
                <p className="text-[#666] text-[13px] mt-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[28px] font-bold text-[#111] mb-10 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step) => (
                <div key={step.n} className="flex flex-col gap-3">
                  <span className="text-[#EE2B24] text-[32px] font-extrabold leading-none"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.n}</span>
                  <h3 className="text-[16px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                  <p className="text-[13.5px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[24px] font-bold text-[#111] mb-8 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Contributor FAQ
            </h2>
            <div className="flex flex-col gap-0">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-[#E8E8E8] py-4">
                  <p className="text-[14px] font-semibold text-[#111] mb-1.5"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{faq.q}</p>
                  <p className="text-[13.5px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 md:px-6 py-16 text-center">
          <div className="max-w-[520px] mx-auto">
            <h2 className="text-[28px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Ready to start earning?
            </h2>
            <p className="text-[#666] text-[14px] mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Join 100,000+ African creators already earning on 234photos.
            </p>
            <Link href="/signup?role=contributor"
              className="inline-block px-10 py-4 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Create contributor account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
