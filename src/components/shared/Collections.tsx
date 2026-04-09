import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: 'African Landscapes',
    imageCount: 156,
    gradient: 'from-amber-500 to-red-600',
  },
  {
    id: 2,
    title: 'Urban Life',
    imageCount: 243,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    title: 'Traditional Culture',
    imageCount: 189,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Modern Business',
    imageCount: 312,
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 5,
    title: 'Wildlife & Nature',
    imageCount: 278,
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 6,
    title: 'Food & Cuisine',
    imageCount: 167,
    gradient: 'from-red-500 to-rose-600',
  },
]

export function Collections() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Curated Collections</h2>
        <Link
          href="/collections"
          className="text-primary hover:text-primary-dark font-medium"
        >
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group block"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} group-hover:scale-105 transition-transform duration-300`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-white/90">{collection.imageCount} images</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
