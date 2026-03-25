export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">About 234photos</h1>
      <p className="text-lg text-gray-600 mb-8">
        Africa's premier stock media marketplace connecting authentic African imagery with global buyers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">10K+</div>
          <p className="text-gray-600">Assets</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">500+</div>
          <p className="text-gray-600">Contributors</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">2K+</div>
          <p className="text-gray-600">Buyers</p>
        </div>
      </div>
    </div>
  );
}
