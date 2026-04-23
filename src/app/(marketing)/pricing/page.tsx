'use client'

import { useState } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { Check, Minus, ChevronDown } from 'lucide-react'
import type { BillingPeriod } from '@/types'
import { PRICING_PLANS, PRICING_FEATURES, PRICING_FAQS } from '@/lib/mock/marketing'
import { formatCurrency } from '@/lib/utils'

// ─── Sub-components ───────────────────────────────────────────────────────────

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-[#EE2B24] mx-auto" />
  if (value === false) return <Minus className="w-4 h-4 text-[#D0D0D0] mx-auto" />
  return (
    <span className="text-[13px] font-medium text-[#111]"
      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
      {value}
    </span>
  )
}

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

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly')

  const price = (base: number | null) => {
    if (base === null) return null
    return billing === 'annual' ? Math.round(base * 0.8) : base
  }

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
              Find the plan that fits your work
            </h1>
            <p className="text-[#666] text-[16px] leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Start free. Upgrade when you&apos;re ready. No hidden costs, no surprises.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-[#F5F5F7] rounded-full p-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-colors ${
                  billing === 'monthly' ? 'bg-white text-[#111] shadow-sm' : 'text-[#888]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-colors flex items-center gap-2 ${
                  billing === 'annual' ? 'bg-white text-[#111] shadow-sm' : 'text-[#888]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Annual
                <span className="bg-[#B5860B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PRICING_PLANS.map((plan) => {
              const p = price(plan.monthlyPrice)
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl flex flex-col gap-6 shadow-sm ${
                    plan.badge ? 'border-2 border-[#EE2B24] pt-10 px-8 pb-8' : 'border border-[#E8E8E8] p-8'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#EE2B24] text-white text-[12px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <h2 className="text-[20px] font-bold text-[#111] mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {plan.name}
                    </h2>
                    <p className="text-[13px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {plan.desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    {p === null ? (
                      <span className="text-[42px] font-extrabold text-[#111] tracking-[-1px]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-[20px] font-bold text-[#111]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>₦</span>
                        <span className="text-[48px] font-extrabold text-[#111] tracking-[-1.5px]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {formatCurrency(p)}
                        </span>
                        <span className="text-[14px] text-[#888]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>/mo</span>
                      </>
                    )}
                  </div>

                  <a
                    href={plan.href}
                    className={`w-full py-3.5 rounded-full text-[14px] font-bold text-center transition-colors ${
                      plan.ctaVariant === 'red'
                        ? 'bg-[#EE2B24] text-white hover:bg-[#d42520]'
                        : plan.ctaVariant === 'dark'
                        ? 'bg-[#111] text-white hover:bg-[#333]'
                        : 'border border-[#D0D0D0] text-[#111] hover:border-[#111]'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {plan.cta}
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-[24px] font-bold text-[#111] mb-8 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Compare all features
            </h2>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E8E8]">
              {/* Table header */}
              <div className="grid grid-cols-4 border-b border-[#F0F0F0]">
                <div className="p-4" />
                {PRICING_PLANS.map((plan) => (
                  <div key={plan.id} className="p-4 text-center border-l border-[#F0F0F0]">
                    <p className="text-[14px] font-bold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {plan.name}
                    </p>
                  </div>
                ))}
              </div>

              {PRICING_FEATURES.map((group) => (
                <div key={group.category}>
                  {/* Category header */}
                  <div className="bg-[#FAFAFA] px-4 py-2.5 border-b border-[#F0F0F0]">
                    <span className="text-[11px] font-bold text-[#888] uppercase tracking-[0.8px]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {group.category}
                    </span>
                  </div>
                  {group.rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-4 border-b border-[#F0F0F0] last:border-0">
                      <div className="px-4 py-3">
                        <span className="text-[13px] text-[#444]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {row.label}
                        </span>
                      </div>
                      {(['starter', 'standard', 'business'] as const).map((plan) => (
                        <div key={plan} className="px-4 py-3 text-center border-l border-[#F0F0F0] flex items-center justify-center">
                          <CellValue value={row[plan]} />
                        </div>
                      ))}
                    </div>
                  ))}
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
              {PRICING_FAQS.map((faq) => (
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
              Still not sure which plan?
            </h2>
            <p className="text-white/70 text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Start with the free plan — no credit card needed. Upgrade anytime when you&apos;re ready.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="/signup"
                className="px-8 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Get started free
              </a>
              <a href="/contact"
                className="px-8 py-3.5 border border-white/30 text-white text-[14px] font-semibold rounded-full hover:border-white/60 transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
