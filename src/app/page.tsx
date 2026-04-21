import { Header } from '@/components/shared/Header'
import { Hero } from '@/components/shared/Hero'
import { StatsBar } from '@/components/shared/StatsBar'
import { CategoryGrid } from '@/components/shared/CategoryGrid'
import { FreeAssets } from '@/components/shared/FreeAssets'
import { EditorChoice } from '@/components/shared/EditorChoice'
import { TrendingContent } from '@/components/shared/TrendingContent'
import { Collections } from '@/components/shared/Collections'
import { BlogSection } from '@/components/shared/BlogSection'
import { CreativeTools } from '@/components/shared/CreativeTools'
import { PricingSection } from '@/components/shared/PricingSection'
import { CTASection } from '@/components/shared/CTASection'
import { Footer } from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CategoryGrid />
        {/* <FreeAssets /> */}
        {/* <EditorChoice /> */}
        <TrendingContent />
        <Collections />
        <BlogSection />
        <CreativeTools />
        <PricingSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </div>
  )
}
