export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="/help" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="/api" className="text-gray-400 hover:text-white">API Docs</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-white">Terms</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy</a></li>
              <li><a href="/licenses" className="text-gray-400 hover:text-white">Licenses</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest African stock media trends
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="px-4 py-2 bg-primary rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 234photos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
