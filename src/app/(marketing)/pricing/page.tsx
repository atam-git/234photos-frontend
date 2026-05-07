'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Check, ChevronDown, Sparkles, Zap, Shield, Infinity } from 'lucide-react'
import { paymentsApi, type CreditPackage } from '@/lib/api/payments'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(kobo: number): string {
  return (kobo / 100).toLocaleString('en-NG', { maximumFractionDigits: 0 })
}

function formatCredits(credits: number): string {
  return credits.toLocaleString('en-NG')
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#F0F0F0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-[14.5px] font-semibold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {q}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#888] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="text-[13.5px] text-[#666] leading-relaxed pb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {a}
        </p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CREDIT_FEATURES = [
  { icon: Shield, text: 'Full commercial license included' },
  { icon: Zap, text: 'High-resolution downloads' },
  { icon: Infinity, text: 'Credits never expire' },
  { icon: Sparkles, text: 'Use across unlimited projects' },
]

const FAQS = [
  {
    q: 'How do credits work?',
    a: 'Each image download costs 1 credit. Purchase a credit package that fits your needs, and use credits whenever you need to download images. Credits never expire, so you can use them at your own pace.',
  },
  {
    q: 'Do credits expire?',
    a: 'No! Your credits never expire. Buy once and use them whenever you need, whether that\'s tomorrow or next year.',
  },
  {
    q: 'Can I get a refund?',
    a: 'We offer refunds within 14 days of purchase if you haven\'t used any credits yet. Once you start downloading images, credits become non-refundable.',
  },
  {
    q: 'What license do I get?',
    a: 'All downloads include a full commercial license. You can use images in any project — websites, apps, marketing materials, products, and more. No attribution required.',
  },
  {
    q: 'Can I share credits with my team?',
    a: 'Credits are tied to your individual account. For team usage, we recommend each team member purchases their own credit package, or contact us about enterprise solutions.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major payment methods through Paystack, including cards, bank transfers, and mobile money. All payments are processed securely.',
  },
]

export default function PricingPage() {
  const [packages, setPackages] = useState<CreditPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await paymentsApi.getPackages()
        setPackages(data)
      } catch (error) {
        console.error('Failed to fetch credit packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-white pt-16 pb-12 px-4 md:px-6 text-center">
          <div className="max-w-[640px] mx-auto">
            <span className="text-[#B5860B] text-[11px] font-bold uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Simple Pricing
            </span>
            <h1 className="text-[#111] text-[36px] md:text-[48px] font-extrabold leading-[1.1] tracking-[-1px] mt-3 mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Pay as you go. No subscriptions.
            </h1>
            <p className="text-[#666] text-[16px] leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Buy credits once, use them forever. Download high-quality African images with full commercial licenses.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-[1200px] mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E8E8E8] p-8 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
                    <div className="h-12 bg-gray-200 rounded w-32 mb-6" />
                    <div className="h-10 bg-gray-200 rounded mb-6" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#888] text-[14px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No credit packages available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-white rounded-2xl flex flex-col gap-6 transition-all duration-300 hover:scale-105 ${
                      pkg.popular
                        ? 'border-2 border-[#EE2B24] pt-10 px-6 pb-8 shadow-lg'
                        : 'border border-[#E8E8E8] p-6 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-[#B5860B] to-[#D4AF37] text-white text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {pkg.discount && pkg.save && (
                      <div className="absolute -top-3 right-4">
                        <span className="bg-[#10B981] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          Save {pkg.save}
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h2 className="text-[18px] font-bold text-[#111] mb-2"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {formatCredits(pkg.credits)} Credits
                      </h2>
                      <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-[16px] font-bold text-[#111]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>₦</span>
                        <span className="text-[32px] font-extrabold text-[#111] tracking-[-1px]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                      {pkg.discount && (
                        <p className="text-[11px] text-[#10B981] font-semibold"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {pkg.discount}% off
                        </p>
                      )}
                    </div>

                    <a
                      href="/signup"
                      className={`w-full py-3 rounded-full text-[13px] font-bold text-center transition-all ${
                        pkg.popular
                          ? 'bg-[#EE2B24] text-white hover:bg-[#d42520] shadow-md hover:shadow-lg'
                          : 'bg-[#111] text-white hover:bg-[#333]'
                      }`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      Buy Now
                    </a>

                    <div className="text-center pt-2 border-t border-[#F0F0F0]">
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        ₦{formatPrice(pkg.price / pkg.credits)} per credit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[24px] font-bold text-[#111] mb-10 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              What you get with every credit package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREDIT_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#EE2B24]/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#EE2B24]" />
                  </div>
                  <p className="text-[14px] text-[#111] font-medium pt-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[24px] font-bold text-[#111] mb-8 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Frequently asked questions
            </h2>
            <div>
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#111] px-4 md:px-6 py-16 text-center">
          <div className="max-w-[560px] mx-auto">
            <h2 className="text-white text-[28px] font-bold mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Ready to get started?
            </h2>
            <p className="text-white/70 text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Buy credits now and start downloading authentic African images for your projects.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="/signup"
                className="px-8 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Buy credits now
              </a>
              <a href="/contact"
                className="px-8 py-3.5 border border-white/30 text-white text-[14px] font-semibold rounded-full hover:border-white/60 transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Contact sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
