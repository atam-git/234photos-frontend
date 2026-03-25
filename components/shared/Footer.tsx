import Link from 'next/link';

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Enterprise', href: '/team' },
    ],
  },
  {
    title: 'Marketplace',
    links: [
      { label: 'Search', href: '/search' },
      { label: 'Boards', href: '/boards' },
      { label: 'Collections', href: '/search?filters=collections' },
    ],
  },
  {
    title: 'Contributors',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Upload', href: '/upload' },
      { label: 'Leaderboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Licensing', href: '/pricing' },
      { label: 'Trust & Safety', href: '/about' },
      { label: 'Contact', href: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:px-8">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white">
              24
            </span>
            <div>
              <p className="text-lg font-semibold">234photos</p>
              <p className="text-sm text-white/60">Authentic African media for brands, publishers, and creators.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="mb-2 text-sm font-semibold">Stay updated</p>
            <p className="mb-4 text-sm text-white/70">
              Product launches, trending collections, and contributor opportunities.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-11 flex-1 rounded-full border border-white/10 bg-white px-4 text-sm text-gray-900 outline-none placeholder:text-gray-500"
              />
              <button
                type="button"
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2024 234photos. All rights reserved.</p>
          <p>Built for faster discovery, clearer licensing, and better African visual representation.</p>
        </div>
      </div>
    </footer>
  );
}
