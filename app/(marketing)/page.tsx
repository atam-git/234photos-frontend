export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[600px] bg-gradient-to-br from-primary to-primary-dark">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Africa's Stock Media Marketplace</h1>
          <p className="text-xl mb-8">Discover authentic African imagery</p>
          {/* Search bar component will go here */}
        </div>
      </div>
      
      {/* Trending searches section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6">Trending Searches</h2>
        {/* Trending content */}
      </section>
      
      {/* Featured collections */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6">Featured Collections</h2>
        {/* Collections grid */}
      </section>
    </div>
  );
}
