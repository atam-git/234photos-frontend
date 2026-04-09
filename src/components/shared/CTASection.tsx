import Link from 'next/link'
import { Trophy, Upload } from 'lucide-react'

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contests Card */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white">
          <div className="relative z-10">
            <Trophy className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Join Our Contests</h3>
            <p className="mb-6 text-white/90">
              Showcase your talent and win amazing prizes. New contests every month with cash rewards and featured placements.
            </p>
            <Link
              href="/contests"
              className="inline-block px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Contests
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        </div>

        {/* Upload Card */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-700 p-8 text-white">
          <div className="relative z-10">
            <Upload className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Share Your Work</h3>
            <p className="mb-6 text-white/90">
              Join thousands of creators earning from their content. Upload your photos, illustrations, and videos today.
            </p>
            <Link
              href="/upload"
              className="inline-block px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Uploading
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
        </div>
      </div>
    </section>
  )
}
