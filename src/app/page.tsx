import { Header } from '@/components/shared/Header'
import { Hero } from '@/components/shared/Hero'
import { FreeAssets } from '@/components/shared/FreeAssets'
import { EditorChoice } from '@/components/shared/EditorChoice'
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
        <FreeAssets />
        <EditorChoice />
        <Collections />
        
        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-gray-600">Assets</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-gray-600">Contributors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-gray-600">Downloads</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">54</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </section>

        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
