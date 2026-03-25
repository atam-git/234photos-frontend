export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">
              234photos
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/search" className="text-gray-700 hover:text-primary">
              Explore
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-primary">
              Pricing
            </a>
            <a href="/contributors" className="text-gray-700 hover:text-primary">
              Become a Contributor
            </a>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary">
              Login
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
