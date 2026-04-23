import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { LICENSES } from '@/lib/mock/marketing'

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
          Last updated: April 1, 2026
        </p>
        <p className="text-[14px] text-[#555] leading-[1.8] mb-10"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          All assets downloaded from 234photos are licensed, not sold. The licence type you select at the time of download determines how you may use the asset. Please read the terms for each licence type carefully.
        </p>

        <div className="flex flex-col gap-8">
          {LICENSES.map((lic) => (
            <div key={lic.name} className="border border-[#E8E8E8] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-b border-[#E8E8E8]">
                <h2 className="text-[17px] font-bold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {lic.name}
                </h2>
                <span className="text-[13px] font-semibold text-[#EE2B24]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {lic.price}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[13px] text-[#666] mb-4"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {lic.desc}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {lic.features.map((feature) => (
                    <li key={feature} className="text-[13.5px] text-[#444] flex items-start gap-2"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      <span className="text-[#EE2B24] mt-0.5">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
