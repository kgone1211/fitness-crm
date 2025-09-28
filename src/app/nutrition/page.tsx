import Layout from '@/components/Layout';
import { Utensils, Plus, Target, TrendingUp, Users, Calendar } from 'lucide-react';

export default function NutritionPage() {
  const macroTargets = [
    {
      id: '1',
      clientName: 'John Doe',
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
      compliance: 85,
      lastUpdate: '2024-01-20',
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      calories: 1800,
      protein: 120,
      carbs: 200,
      fats: 60,
      compliance: 92,
      lastUpdate: '2024-01-19',
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      calories: 2200,
      protein: 180,
      carbs: 280,
      fats: 75,
      compliance: 78,
      lastUpdate: '2024-01-18',
    },
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nutrition Management</h1>
            <p className="text-gray-600">Set macro targets and track client nutrition progress</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Set Macro Targets
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{macroTargets.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Compliance</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Utensils className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Meals Logged</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-500">this week</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-gray-900">+12%</p>
                <p className="text-sm text-gray-500">vs last week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Targets Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Client Macro Targets</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Protein (g)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carbs (g)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fats (g)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {macroTargets.map((target) => (
                  <tr key={target.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {target.clientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{target.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.calories}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.protein}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.carbs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {target.fats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getComplianceColor(target.compliance)}`}>
                        {target.compliance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(target.lastUpdate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Nutrition Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Utensils className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">John Doe logged breakfast</p>
                <p className="text-sm text-gray-500">450 calories, 25g protein • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Updated macro targets for Jane Smith</p>
                <p className="text-sm text-gray-500">Increased protein to 120g • 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Mike Johnson hit weekly protein goal</p>
                <p className="text-sm text-gray-500">1260g protein this week • Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
