export default function BoardsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Boards</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg">
          Create Board
        </button>
      </div>
      
      {/* Boards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Board cards */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="aspect-video bg-gray-100 rounded mb-4"></div>
          <h3 className="font-semibold mb-2">Campaign Q3 2024</h3>
          <p className="text-sm text-gray-600 mb-2">12 assets</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>5 collaborators</span>
          </div>
        </div>
      </div>
    </div>
  );
}
