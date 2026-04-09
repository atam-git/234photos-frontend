'use client'

import { Heart, Download, Bookmark } from 'lucide-react'

const images = [
  { id: 1, height: 400, user: 'John Doe', likes: 234, downloads: 1200 },
  { id: 2, height: 300, user: 'Jane Smith', likes: 456, downloads: 2300 },
  { id: 3, height: 500, user: 'Mike Johnson', likes: 789, downloads: 3400 },
  { id: 4, height: 350, user: 'Sarah Williams', likes: 123, downloads: 890 },
  { id: 5, height: 450, user: 'David Brown', likes: 567, downloads: 1500 },
  { id: 6, height: 300, user: 'Emma Davis', likes: 890, downloads: 2100 },
  { id: 7, height: 400, user: 'Chris Wilson', likes: 345, downloads: 1800 },
  { id: 8, height: 350, user: 'Lisa Anderson', likes: 678, downloads: 2700 },
  { id: 9, height: 420, user: 'Tom Harris', likes: 234, downloads: 1100 },
  { id: 10, height: 380, user: 'Amy Clark', likes: 567, downloads: 1900 },
]

export function EditorChoice() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-3xl font-bold text-[#191b26] mb-4">
          Over 6 million+ high quality stock images, videos and music shared by our talented community.
        </h2>
        
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-200">
                <div
                  className="w-full bg-gradient-to-br from-gray-300 to-gray-400"
                  style={{ height: `${image.height}px` }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                      <Bookmark className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1">
                      <Heart className="w-5 h-5 text-white" />
                      <span className="text-white text-sm">{image.likes}</span>
                    </button>
                    <button className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-medium mb-1">{image.user}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{image.likes}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{image.downloads}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/editors-choice"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            See more Editor&apos;s Choice
          </a>
        </div>
      </div>
    </section>
  )
}
