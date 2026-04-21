import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

const SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing or using 234photos, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.' },
  { title: '2. Use Licence', body: 'Permission is granted to temporarily download one copy of the materials on 234photos for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on 234photos; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.' },
  { title: '3. Content Licence', body: 'All assets downloaded from 234photos are licensed under the terms specified at the time of download. Standard licences cover web, social media and print use up to 500,000 copies. Enhanced licences cover unlimited print, resale and broadcast use. Editorial licences are restricted to news and editorial use only.' },
  { title: '4. Contributor Terms', body: 'Contributors retain copyright of their uploaded content but grant 234photos a worldwide, non-exclusive, royalty-bearing licence to distribute, display and sublicense their content to buyers. Contributors are responsible for ensuring they have all necessary rights, releases and permissions for submitted content.' },
  { title: '5. Prohibited Uses', body: 'You may not use 234photos content in a manner that is defamatory, obscene, or otherwise objectionable; in connection with hate speech or discrimination; to create deepfakes or misleading synthetic media; or in any way that violates applicable law.' },
  { title: '6. Disclaimer', body: '234photos makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.' },
  { title: '7. Governing Law', body: 'These terms and conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.' },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 md:px-6 py-14">
        <h1 className="text-[32px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Terms of Service
        </h1>
        <p className="text-[13px] text-[#888] mb-10"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Last updated: April 1, 2026
        </p>
        <div className="flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-[16px] font-bold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {s.title}
              </h2>
              <p className="text-[14px] text-[#555] leading-[1.8]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
