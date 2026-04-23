import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { TEAM_MEMBERS, COMPANY_VALUES } from '@/lib/mock/marketing'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-20 text-center">
          <div className="max-w-[680px] mx-auto">
            <span className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              About 234photos
            </span>
            <h1 className="text-[#111] text-[38px] md:text-[50px] font-extrabold leading-[1.1] tracking-[-1px] mt-3 mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Africa's creative asset library
            </h1>
            <p className="text-[#555] text-[16px] leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              234photos is building the world's largest library of authentic African stock media — created by Africans, for the world.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[28px] font-bold text-[#111] mb-5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Our mission
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.8] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              For too long, Africa has been represented in global media through a narrow, often inaccurate lens. When brands search for "African business" or "Lagos street", they find images shot by outsiders that miss the nuance, energy and diversity of real African life.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.8]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              234photos exists to change that. We connect African photographers, videographers and illustrators with the global brands and creators who need authentic African visuals — and we make sure the creators get paid fairly for their work.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[28px] font-bold text-[#111] mb-10 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              What we stand for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {COMPANY_VALUES.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-[#E8E8E8]">
                  <h3 className="text-[16px] font-bold text-[#111] mb-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{v.title}</h3>
                  <p className="text-[13.5px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[28px] font-bold text-[#111] mb-10 text-center"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              The team
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center gap-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[#E8E8E8]">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{member.name}</p>
                    <p className="text-[12.5px] text-[#666]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{member.role}</p>
                    <p className="text-[12px] text-[#999] mt-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{member.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#111] px-4 md:px-6 py-16 text-center">
          <div className="max-w-[520px] mx-auto">
            <h2 className="text-white text-[26px] font-bold mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Join the movement
            </h2>
            <p className="text-white/70 text-[14px] mb-8"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Whether You&apos;re a customer, contributor or just curious — You&apos;re welcome here.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/signup"
                className="px-8 py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Get started free
              </Link>
              <Link href="/contact"
                className="px-8 py-3.5 border border-white/30 text-white text-[14px] font-semibold rounded-full hover:border-white/60 transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
