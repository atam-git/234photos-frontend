import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

const LICENSES = [
  {
    name: 'Standard Licence',
    price: '1 credit',
    uses: ['Website and app use', 'Social media posts', 'Blog and editorial content', 'Print up to 500,000 copies', 'Presentations and internal documents', 'Advertising (digital and print)'],
    notAllowed: ['Resale or redistribution of the asset itself', 'Use in merchandise for resale', 'Broadcast or film use', 'Print runs exceeding 500,000 copies'],
  },
  {
    name: 'Enhanced Licence',
    price: '3 credits',
    uses: ['Everything in Standard', 'Unlimited print runs', 'Merchandise and products for resale', 'Broadcast and film use', 'Out-of-home advertising', 'Template products for resale'],
    notAllowed: ['Resale of the original asset file', 'Use in a way that implies endorsement by the contributor'],
  },
  {
    name: 'Editorial Licence',
    price: '1 credit',
    uses: ['News articles and journalism', 'Documentary content', 'Educational materials', 'Blog posts about real events'],
    notAllowed: ['Commercial advertising', 'Product promotion', 'Any commercial use'],
  },
]

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <p className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-3"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    ✅ Permitted uses
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {lic.uses.map((u) => (
                      <li key={u} className="text-[13.5px] text-[#444] flex items-start gap-2"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <span className="text-[#EE2B24] mt-0.5">•</span> {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-3"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    ❌ Not permitted
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {lic.notAllowed.map((u) => (
                      <li key={u} className="text-[13.5px] text-[#444] flex items-start gap-2"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <span className="text-[#888] mt-0.5">•</span> {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
