import { Header } from '@/components/shared/Header'
import { Hero } from '@/components/shared/Hero'
import { StatsBar } from '@/components/shared/StatsBar'
import { CategoryGrid } from '@/components/shared/CategoryGrid'
import { TrendingContent } from '@/components/shared/TrendingContent'
import { Collections } from '@/components/shared/Collections'
import { BlogSection } from '@/components/shared/BlogSection'
import { CreativeTools } from '@/components/shared/CreativeTools'
import { PricingSection } from '@/components/shared/PricingSection'
import { ContributorSection } from '@/components/shared/ContributorSection'
import { Footer } from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CategoryGrid />
        <TrendingContent />
        <Collections />
        <BlogSection />
        <CreativeTools />
        <PricingSection />
        <ContributorSection />
      </main>
      <Footer />
    </div>
  )
}
