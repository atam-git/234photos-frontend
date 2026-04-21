import { Header } from '@/components/shared/Header'
import { Hero } from '@/components/shared/Hero'
import { StatsBar } from '@/components/shared/StatsBar'
import { FreeAssets } from '@/components/shared/FreeAssets'
import { EditorChoice } from '@/components/shared/EditorChoice'
import { TrendingContent } from '@/components/shared/TrendingContent'
import { Collections } from '@/components/shared/Collections'
import { BlogSection } from '@/components/shared/BlogSection'
import { CTASection } from '@/components/shared/CTASection'
import { Footer } from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <FreeAssets />
        <EditorChoice />
        <TrendingContent />
        <Collections />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
