export default function AssetDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        Home / Search / Category
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image preview */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-gray-100 rounded-lg">
            {/* Watermarked preview */}
          </div>
        </div>
        
        {/* Asset info sidebar */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Asset Title</h1>
            <p className="text-gray-600">Description goes here</p>
          </div>
          
          {/* License selector */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Select License</h3>
            {/* License options */}
          </div>
          
          {/* Download button */}
          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
            Download
          </button>
          
          {/* Contributor info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Contributor</h3>
            {/* Contributor details */}
          </div>
          
          {/* Metadata */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Details</h3>
            {/* Metadata list */}
          </div>
        </div>
      </div>
      
      {/* Similar assets */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Similar Assets</h2>
        {/* Horizontal scroll grid */}
      </section>
    </div>
  );
}
