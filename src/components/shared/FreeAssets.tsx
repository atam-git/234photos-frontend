import Link from 'next/link'

const mediaTypes = [
  {
    title: 'Photos',
    count: '4.3M assets',
    href: '/photos',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Illustrations',
    count: '1.12M assets',
    href: '/illustrations',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Vectors',
    count: '160k assets',
    href: '/vectors',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Videos',
    count: '220k assets',
    href: '/videos',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    title: 'Music',
    count: '230k assets',
    href: '/music',
    gradient: 'from-yellow-400 to-red-600',
  },
  {
    title: 'Sound Effects',
    count: '120k assets',
    href: '/sound-effects',
    gradient: 'from-teal-400 to-cyan-600',
  },
  {
    title: '3D Models',
    count: '2k assets',
    href: '/3d-models',
    gradient: 'from-blue-300 to-pink-300',
  },
  {
    title: 'GIFs',
    count: '12k assets',
    href: '/gifs',
    gradient: 'from-rose-400 to-pink-300',
  },
]

export function FreeAssets() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-3xl font-bold text-[#191b26] mb-10">
          Free assets for any project
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mediaTypes.map((type) => (
            <Link
              key={type.title}
              href={type.href}
              className="group block"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.gradient}`}
                />
                <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              <h3 className="font-semibold text-[#191b26] mb-1">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
