import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Compass,
  Home,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import SearchBar from '@/components/shared/SearchBar';

const trendingSearches = [
  'Lagos skyline',
  'African fintech teams',
  'Wedding portraits',
  'Street markets',
  'Safari landscapes',
];

const featuredCollections = [
  {
    title: 'Modern African Workspaces',
    subtitle: 'Startup teams, meetings, and growth moments from Lagos to Nairobi.',
    href: '/search?q=African%20fintech%20teams',
    accent: 'from-[#101828] via-[#1f2937] to-[#344054]',
  },
  {
    title: 'Culture, Travel, and Celebration',
    subtitle: 'Events, destinations, fashion, and everyday joy across the continent.',
    href: '/search?q=African%20travel',
    accent: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
  },
  {
    title: 'Commerce in Motion',
    subtitle: 'Retail, markets, logistics, and mobile-first buying behavior.',
    href: '/search?q=African%20marketplace',
    accent: 'from-[#052e16] via-[#166534] to-[#22c55e]',
  },
];

const trustSignals = [
  { label: 'Authentic assets', value: '120K+' },
  { label: 'Verified contributors', value: '4.8K+' },
  { label: 'African cities covered', value: '54' },
  { label: 'Buyer teams onboarded', value: '1.2K+' },
];

const testimonials = [
  {
    quote:
      'We replaced generic global stock with imagery that actually reflects our customers. Search quality and licensing clarity were the reasons we stayed.',
    name: 'Mariam Adebayo',
    role: 'Creative Lead, fintech brand',
  },
  {
    quote:
      'The collections and board workflow made it easy for our editorial team to shortlist assets quickly across multiple campaigns.',
    name: 'Joseph K.',
    role: 'Content Director, media company',
  },
  {
    quote:
      'Contributor visibility is much stronger here. Buyers are finding the right categories and our portfolio performance is easier to understand.',
    name: 'Amina Hassan',
    role: 'Top 20 contributor',
  },
];

const contributorPreview = [
  { name: 'Amina Hassan', location: 'Kenya', sales: '1,284 sales', growth: '+18%' },
  { name: 'Tunde Adeyemi', location: 'Nigeria', sales: '1,031 sales', growth: '+11%' },
  { name: 'Zanele Nkosi', location: 'South Africa', sales: '922 sales', growth: '+9%' },
];

const buyerHighlights = [
  {
    title: 'Faster discovery',
    description: 'Search with trending prompts, recent history, and direct entry into curated categories.',
    icon: Compass,
  },
  {
    title: 'Clear licensing',
    description: 'Move from search to asset detail and purchase decisions with simpler license paths.',
    icon: ShieldCheck,
  },
  {
    title: 'Better contributor supply',
    description: 'A contributor-first workflow keeps fresh, culturally relevant content flowing into the marketplace.',
    icon: TrendingUp,
  },
];

const mobileNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Compass },
  { label: 'Boards', href: '/boards', icon: LayoutGrid },
  { label: 'Upload', href: '/upload', icon: Upload },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,166,35,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(232,87,42,0.3),_transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
            <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  Shutterstock-style discovery, built around African content and local buying flows
                </div>
                <h1 className="max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
                  Find stock media that actually reflects Africa.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                  Discover photos, videos, and illustrations with faster search, clearer licensing, curated collections,
                  and contributor supply designed for African brands, publishers, and creative teams.
                </p>

                <div className="mt-10 max-w-4xl">
                  <SearchBar trendingSearches={trendingSearches} />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="font-semibold uppercase tracking-[0.2em] text-white/50">Trending</span>
                  {trendingSearches.map((item) => (
                    <Link
                      key={item}
                      href={`/search?q=${encodeURIComponent(item)}`}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white hover:text-secondary"
                    >
                      {item}
                    </Link>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {trustSignals.map((signal) => (
                    <div key={signal.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-white">{signal.value}</p>
                      <p className="mt-2 text-sm text-white/60">{signal.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 shadow-2xl backdrop-blur-sm">
                  <div className="rounded-[28px] bg-white p-6 text-gray-900 shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Discovery preview</p>
                        <h2 className="mt-2 text-2xl font-semibold">Buyer-ready homepage</h2>
                      </div>
                      <div className="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-primary">MVP</div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-3xl bg-gray-50 p-5">
                        <div className="mb-3 flex items-center gap-3 text-sm font-medium text-gray-500">
                          <BadgeDollarSign className="h-5 w-5 text-primary" />
                          Local buying journeys
                        </div>
                        <p className="text-base text-gray-700">
                          Surface credits, licensing, and campaign-ready content earlier in the path to conversion.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-[#f8f5f2] p-5">
                          <p className="mb-2 text-sm font-semibold text-gray-500">Collections</p>
                          <p className="text-lg font-semibold">Editorial, travel, business, and culture</p>
                        </div>
                        <div className="rounded-3xl bg-[#eef7f1] p-5">
                          <p className="mb-2 text-sm font-semibold text-gray-500">Contributor supply</p>
                          <p className="text-lg font-semibold">Fresh uploads and regional depth</p>
                        </div>
                      </div>

                      <div className="rounded-3xl bg-secondary p-5 text-white">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Campaign spotlight</p>
                        <p className="mt-3 text-xl font-semibold">Back to business across Africa</p>
                        <p className="mt-2 text-sm leading-6 text-white/70">
                          A seasonal collection for banking, fintech, workplace, and commerce campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            {buyerHighlights.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border border-gray-200 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Featured collections</p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
                Launch discovery with curated entry points before search results even load.
              </h2>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
            >
              Explore all collections
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className={`group relative overflow-hidden rounded-[32px] bg-gradient-to-br ${collection.accent} p-8 text-white shadow-xl transition hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
                <div className="relative">
                  <div className="mb-16 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Curated discovery
                  </div>
                  <h3 className="text-2xl font-semibold">{collection.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">{collection.subtitle}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                    View collection
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#faf7f3]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="rounded-[32px] bg-secondary p-8 text-white shadow-xl sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Campaign hero</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Back to business across Africa</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Seasonal collections for fintech, commerce, education, and mobility campaigns. Designed to push buyers
                from homepage to results with intent already shaped.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/search?q=African%20business"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-orange-50"
                >
                  Browse the campaign
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See licensing plans
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contributor preview</p>
                  <h2 className="mt-3 text-2xl font-semibold text-gray-900">Leaderboard momentum</h2>
                </div>
                <Users className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-4">
                {contributorPreview.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center justify-between rounded-3xl bg-gray-50 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-gray-900 shadow-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{contributor.name}</p>
                        <p className="text-sm text-gray-500">{contributor.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{contributor.sales}</p>
                      <p className="text-sm text-green-600">{contributor.growth}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
              >
                Open contributor dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Trust and adoption</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Build credibility for buyers while showing contributors there is demand.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Verified buyer feedback</span>
                </div>
                <p className="text-base leading-7 text-gray-700">“{testimonial.quote}”</p>
                <div className="mt-8 border-t border-gray-100 pt-5">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[40px] bg-primary px-8 py-12 text-white shadow-2xl sm:px-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Next step</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Start the buyer journey now, then expand into search results, asset detail, checkout, and contributor tools.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80">
                This homepage is the first PRD-aligned layer: stronger discovery signals, better market positioning, and direct paths into search, boards, upload, and pricing.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-orange-50"
              >
                Explore assets
              </Link>
              <Link
                href="/upload"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Become a contributor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-full border border-gray-200 bg-white/95 p-2 shadow-2xl backdrop-blur md:hidden">
        <ul className="grid grid-cols-4 gap-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
