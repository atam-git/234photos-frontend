'use client'

import { useState } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { CONTACT_TOPICS } from '@/lib/mock/marketing'
import { Mail, MapPin, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [topic, setTopic] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16 text-center">
          <div className="max-w-[560px] mx-auto">
            <h1 className="text-[#111] text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Get in touch
            </h1>
            <p className="text-[#666] text-[15px] leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              We&apos;d love to hear from you. Fill in the form and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

            {/* Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFF0F0] flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-[#EE2B24]" />
                  </div>
                  <h2 className="text-[22px] font-bold text-[#111] mb-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Message sent!
                  </h2>
                  <p className="text-[14px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        First name
                      </label>
                      <input type="text" required placeholder="Adaeze"
                        className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Last name
                      </label>
                      <input type="text" required placeholder="Okafor"
                        className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Email address
                    </label>
                    <input type="email" required placeholder="you@example.com"
                      className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors" />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white appearance-none"
                    >
                      <option value="">Select a topic…</option>
                      {CONTACT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Message
                    </label>
                    <textarea required rows={5} placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#F5F5F7] rounded-2xl p-6 flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF0F0] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#EE2B24]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#111] mb-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Email us</p>
                    <a href="mailto:hello@234photos.com" className="text-[13px] text-[#EE2B24] hover:underline"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      hello@234photos.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF0F0] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#EE2B24]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#111] mb-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Headquarters</p>
                    <p className="text-[13px] text-[#666]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Lagos, Nigeria 🇳🇬
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F5F7] rounded-2xl p-6">
                <p className="text-[13px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Response time</p>
                <p className="text-[13px] text-[#666] leading-relaxed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  We aim to respond to all enquiries within 24 hours on business days (Mon–Fri, WAT).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
