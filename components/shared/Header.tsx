import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white">
              24
            </span>
            <div>
              <p className="text-lg font-semibold text-gray-900">234photos</p>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">African stock marketplace</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/search" className="text-sm font-medium text-gray-600 transition hover:text-primary">
              Explore
            </Link>
            <Link href="/boards" className="text-sm font-medium text-gray-600 transition hover:text-primary">
              Boards
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 transition hover:text-primary">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 transition hover:text-primary">
              Contributors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/upload"
            className="hidden rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            Sell content
          </Link>
          <Link
            href="/search"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:text-primary sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Join free
          </Link>
        </div>
      </div>
    </header>
  );
}
