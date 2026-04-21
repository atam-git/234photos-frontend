import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

const SECTIONS = [
  { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, payment information, and any content you upload. We also collect information automatically when you use our services, including log data, device information, and cookies.' },
  { title: '2. How We Use Your Information', body: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information; send promotional communications (with your consent); respond to comments and questions; and monitor and analyse trends and usage.' },
  { title: '3. Information Sharing', body: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to provide our services (e.g., payment processors), comply with the law, enforce our policies, or protect rights and safety. We may share aggregated, non-personally identifiable information publicly.' },
  { title: '4. Data Retention', body: 'We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time by contacting us at privacy@234photos.com.' },
  { title: '5. Cookies', body: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.' },
  { title: '6. Your Rights', body: 'Depending on your location, you may have rights regarding your personal data including the right to access, correct, or delete your data; the right to object to or restrict processing; and the right to data portability. To exercise these rights, contact us at privacy@234photos.com.' },
  { title: '7. Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at privacy@234photos.com or write to us at 234photos Inc., Lagos, Nigeria.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 md:px-6 py-14">
        <h1 className="text-[32px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Privacy Policy
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
