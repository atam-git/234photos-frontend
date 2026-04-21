import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

const SECTIONS = [
  { title: 'What are cookies?', body: 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.' },
  { title: 'How we use cookies', body: 'We use cookies to keep you signed in, remember your preferences (such as language and currency), understand how you use our site so we can improve it, and show you relevant content and advertising.' },
  { title: 'Types of cookies we use', body: 'Essential cookies: Required for the site to function. Cannot be disabled. Performance cookies: Help us understand how visitors interact with our site (via PostHog analytics). Preference cookies: Remember your settings and preferences. Marketing cookies: Used to show you relevant advertising on and off our platform.' },
  { title: 'Managing cookies', body: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.' },
  { title: 'Contact us', body: 'If you have any questions about our use of cookies, please contact us at privacy@234photos.com.' },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 md:px-6 py-14">
        <h1 className="text-[32px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Cookie Policy
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
