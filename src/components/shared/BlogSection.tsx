import Link from 'next/link'
import { Calendar } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Celebrating African Creativity: Top Contributors of 2024',
    excerpt: 'Meet the talented photographers and artists who are shaping the visual narrative of Africa.',
    date: '2024-03-15',
    image: 'from-purple-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'How to Use African Stock Photos in Your Marketing',
    excerpt: 'Best practices for incorporating authentic African imagery into your brand campaigns.',
    date: '2024-03-10',
    image: 'from-red-600 to-red-700',
  },
  {
    id: 3,
    title: 'New Features: Enhanced Search and AI-Powered Recommendations',
    excerpt: 'Discover how our latest updates make finding the perfect image easier than ever.',
    date: '2024-03-05',
    image: 'from-green-500 to-teal-600',
  },
]

export function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">What's new on 234photos?</h2>
          <Link
            href="/blog"
            className="text-primary hover:text-primary-dark font-medium"
          >
            View all posts
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`aspect-video bg-gradient-to-br ${post.image}`} />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
