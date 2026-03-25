export default function TeamManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg">
          Invite Member
        </button>
      </div>
      
      {/* Team stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Team Quota</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-sm text-gray-600">650/1000 downloads used this month</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Team Members</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-600">Active members</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Billing</h3>
          <p className="text-xl font-bold">$500/month</p>
          <p className="text-sm text-gray-600">Enterprise Pro</p>
        </div>
      </div>
      
      {/* Team members list */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        {/* Members table */}
      </div>
    </div>
  );
}
