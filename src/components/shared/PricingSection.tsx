'use client'

import { useState } from 'react'
import { HOMEPAGE_PRICING_FEATURES } from '@/lib/mock'

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

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const standardPrice = isAnnual ? Math.round(29 * 0.8) : 29
  const businessPrice = isAnnual ? Math.round(79 * 0.8) : 79

  return (
    <section className="bg-[#F5F5F7] py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col items-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            className="text-[#B5860B] text-[11px] font-bold uppercase tracking-[1.5px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Simple Pricing
          </span>
          <h2
            className="text-[#1A1A1A] text-[32px] md:text-[38px] font-extrabold leading-[1.15] tracking-[-0.8px] max-w-[560px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Find the plan that fits your work
          </h2>
          <p
            className="text-[#888] text-[15px] leading-[22px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Start free. Upgrade when you&apos;re ready. No hidden costs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-3">
          <span
            className={`text-[14px] font-semibold transition-colors ${!isAnnual ? 'text-[#1A1A1A]' : 'text-[#999]'}`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-200 focus:outline-none ${
              isAnnual ? 'bg-[#1A1A1A]' : 'bg-[#D0D0D0]'
            }`}
            aria-label="Toggle billing period"
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform duration-200 ${
                isAnnual ? 'translate-x-[20px]' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`text-[14px] font-semibold transition-colors ${isAnnual ? 'text-[#1A1A1A]' : 'text-[#999]'}`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Annual
          </span>
          <span
            className="bg-[#B5860B] text-white text-[12px] font-bold px-3 py-1 rounded-full"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Save 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full items-start">
          {/* Starter */}
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h3
                className="text-[#1A1A1A] text-[20px] font-bold leading-[1.3]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Starter
              </h3>
              <p
                className="text-[#888] text-[13px] leading-[20px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Perfect for individuals exploring African content.
              </p>
            </div>

            <div>
              <span
                className="text-[#1A1A1A] text-[40px] font-extrabold leading-none tracking-[-1px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Free
              </span>
            </div>

            <a
              href="/signup"
              className="w-full py-3 rounded-full border border-[#D0D0D0] text-[#1A1A1A] text-[14px] font-semibold text-center hover:border-[#1A1A1A] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Get started free
            </a>

            <ul className="flex flex-col gap-3">
              {HOMEPAGE_PRICING_FEATURES.starter.map((feature) => (
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

          {/* Standard — Most popular */}
          <div className="relative bg-white rounded-2xl flex flex-col gap-6 shadow-sm border-2 border-[#EE2B24]">
            {/* Most popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span
                className="bg-[#EE2B24] text-white text-[12px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Most popular
              </span>
            </div>

            <div className="flex flex-col gap-6 p-8 pt-10">
              <div className="flex flex-col gap-1">
                <h3
                  className="text-[#1A1A1A] text-[20px] font-bold leading-[1.3]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Standard
                </h3>
                <p
                  className="text-[#888] text-[13px] leading-[20px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  For creators, marketers and small businesses.
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
                  {standardPrice}
                </span>
                <span
                  className="text-[#888] text-[14px] font-medium"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  /mo
                </span>
              </div>

              <a
                href="/signup?plan=standard"
                className="w-full py-3.5 rounded-full bg-[#EE2B24] text-white text-[14px] font-bold text-center hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Start free trial
              </a>

              <ul className="flex flex-col gap-3">
                {HOMEPAGE_PRICING_FEATURES.standard.map((feature) => (
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

          {/* Business */}
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h3
                className="text-[#1A1A1A] text-[20px] font-bold leading-[1.3]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Business
              </h3>
              <p
                className="text-[#888] text-[13px] leading-[20px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                For agencies, teams and high-volume brands.
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
                {businessPrice}
              </span>
              <span
                className="text-[#888] text-[14px] font-medium"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                /mo
              </span>
            </div>

            <a
              href="/contact"
              className="w-full py-3.5 rounded-full bg-[#1A1A1A] text-white text-[14px] font-bold text-center hover:bg-[#333] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Contact sales
            </a>

            <ul className="flex flex-col gap-3">
              {HOMEPAGE_PRICING_FEATURES.business.map((feature) => (
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

        {/* Footer note */}
        <p
          className="text-[#888] text-[13px] text-center"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          All plans include a standard commercial licence. Need custom volume pricing?{' '}
          <a
            href="/contact"
            className="text-[#EE2B24] font-semibold hover:underline"
          >
            Talk to us →
          </a>
        </p>
      </div>
    </section>
  )
}
