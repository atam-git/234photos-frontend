'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="7.5" stroke="#EE2B24" strokeOpacity="0.25" fill="#FFF0F0" />
      <path
        d="M5 8l2 2 4-4"
        stroke="#EE2B24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  currency: string
  discount: number | null
  popular: boolean
  save: string | null
  sortOrder: number
  isActive: boolean
}

export function PricingSection() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['credit-packages'],
    queryFn: () => api.get<CreditPackage[]>('/payments/credit-packages'),
  })

  // Get top 3 packages for homepage
  const displayPackages = packages?.slice(0, 3) || []

  const features = [
    'Commercial license included',
    'High-resolution downloads',
    'No expiration on credits',
    'Use across unlimited projects',
    'Cancel anytime',
  ]

  return (
    <section className="bg-[#F5F5F7] py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col items-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Simple Pricing
          </span>
          <h2
            className="text-[#1A1A1A] text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] max-w-[640px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Pay as you go. <span className="text-[#EE2B24]">No subscriptions.</span>
          </h2>
          <p
            className="text-[#666] text-[16px] leading-[24px] max-w-[520px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Buy credits once, use them forever. Download what you need, when you need it. Bigger packs = bigger savings.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 h-[400px] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full items-start">
              {displayPackages.map((pkg, index) => {
                const priceInNaira = pkg.price / 100000 // Convert from kobo
                const isPopular = pkg.popular

                return (
                  <div
                    key={pkg.id}
                    className={`relative bg-white rounded-2xl flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all duration-300 ${
                      isPopular ? 'border-2 border-[#EE2B24] scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span
                          className="bg-[#EE2B24] text-white text-[12px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          Most popular
                        </span>
                      </div>
                    )}

                    <div className={`flex flex-col gap-6 p-8 ${isPopular ? 'pt-10' : ''}`}>
                      <div className="flex flex-col gap-1">
                        <h3
                          className="text-[#1A1A1A] text-[20px] font-bold leading-[1.3]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          {pkg.name}
                        </h3>
                        <p
                          className="text-[#888] text-[13px] leading-[20px]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          ~{Math.floor(pkg.credits / 10)} standard downloads
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-[#1A1A1A] text-[22px] font-bold"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          ₦
                        </span>
                        <span
                          className="text-[#1A1A1A] text-[48px] font-extrabold leading-none tracking-[-1.5px]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          {priceInNaira.toLocaleString()}
                        </span>
                      </div>

                      {pkg.save && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="bg-gradient-to-r from-[#B5860B] to-[#D4AF37] text-white text-[12px] font-bold px-3 py-1.5 rounded-full"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                          >
                            💰 Save {pkg.save}
                          </span>
                          {pkg.discount && (
                            <span
                              className="text-[#B5860B] text-[13px] font-bold"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                            >
                              {pkg.discount}% off
                            </span>
                          )}
                        </div>
                      )}

                      <a
                        href="/signup"
                        className={`w-full py-3.5 rounded-full text-[14px] font-bold text-center transition-colors ${
                          isPopular
                            ? 'bg-[#EE2B24] text-white hover:bg-[#d42520]'
                            : 'border border-[#D0D0D0] text-[#1A1A1A] hover:border-[#1A1A1A]'
                        }`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        Buy {pkg.credits} credits
                      </a>

                      <ul className="flex flex-col gap-3">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <CheckIcon />
                            <span
                              className="text-[#444] text-[13px] leading-[20px]"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer note */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E8E8] max-w-[800px] w-full">
              <p
                className="text-[#444] text-[14px] text-center leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <span className="font-bold text-[#111]">How it works:</span> Standard license (10 credits) · Enhanced license (30 credits) · Editorial (20 credits) · 
                <a
                  href="/pricing"
                  className="text-[#EE2B24] font-bold hover:underline ml-1"
                >
                  View all packages →
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
