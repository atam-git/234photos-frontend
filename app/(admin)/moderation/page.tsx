export default function ModerationQueuePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Moderation Queue</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg">Approve (0)</button>
          <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg">Reject</button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="border rounded px-3 py-2">
          <option>All Media</option>
          <option>Photos</option>
          <option>Videos</option>
          <option>Vectors</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All</option>
          <option>AI Generated</option>
          <option>Human Only</option>
        </select>
      </div>
      
      {/* Moderation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Moderation cards */}
      </div>
    </div>
  );
}
