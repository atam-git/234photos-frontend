export default function ContributorDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Contributor!</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg">Portfolio</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">Upload New</button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-gray-600 mb-2">Earnings</h3>
          <p className="text-3xl font-bold">$1,240</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-gray-600 mb-2">Downloads</h3>
          <p className="text-3xl font-bold">847</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-gray-600 mb-2">Views</h3>
          <p className="text-3xl font-bold">12.4K</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>
      
      {/* Leaderboard position */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Leaderboard Position</h2>
        <p className="text-gray-600">#12 in Kenya (↑3 this week)</p>
      </div>
      
      {/* Recent activity */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity feed */}
      </div>
      
      {/* Top performing assets */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performing Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Asset cards */}
        </div>
      </div>
    </div>
  );
}
