import Layout from '@/components/Layout';
import { Users, Plus, Search, Filter, MoreVertical, Eye, Edit, MessageSquare } from 'lucide-react';

export default function ClientsPage() {
  // Mock clients data
  const clients = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      isActive: true,
      currentWeight: 180,
      goalWeight: 160,
      lastCheckIn: '2024-01-20',
      workoutsThisWeek: 3,
      successRate: 85,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-01-10',
      isActive: true,
      currentWeight: 140,
      goalWeight: 130,
      lastCheckIn: '2024-01-19',
      workoutsThisWeek: 4,
      successRate: 92,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-01-05',
      isActive: false,
      currentWeight: 200,
      goalWeight: 180,
      lastCheckIn: '2024-01-15',
      workoutsThisWeek: 1,
      successRate: 65,
    },
  ];

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600">Manage your clients and track their progress</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Clients</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(client.isActive)}`}>
                    {client.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight Progress</span>
                  <span className="font-medium">
                    {client.currentWeight} → {client.goalWeight} lbs
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Workouts This Week</span>
                  <span className="font-medium">{client.workoutsThisWeek}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className={`font-medium ${getSuccessRateColor(client.successRate)}`}>
                    {client.successRate}%
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
