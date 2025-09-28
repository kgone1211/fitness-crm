import Layout from '@/components/Layout';
import { Camera, Plus, Download, Eye, Calendar, Users, TrendingUp, Filter, Search } from 'lucide-react';

export default function ProgressPhotosPage() {
  const progressPhotos = [
    {
      id: '1',
      clientName: 'John Doe',
      clientId: '1',
      photos: [
        {
          id: '1',
          url: '/api/placeholder/300/400/',
          type: 'front',
          date: '2024-01-20',
          notes: 'Week 4 progress - noticeable muscle definition',
          weight: 180
        },
        {
          id: '2',
          url: '/api/placeholder/300/400/',
          type: 'side',
          date: '2024-01-20',
          notes: 'Side profile showing improved posture',
          weight: 180
        }
      ],
      latestDate: '2024-01-20',
      totalPhotos: 8,
      progress: '+5 lbs muscle gain'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientId: '2',
      photos: [
        {
          id: '3',
          url: '/api/placeholder/300/400/',
          type: 'front',
          date: '2024-01-19',
          notes: 'Amazing transformation! Waist is much more defined',
          weight: 140
        },
        {
          id: '4',
          url: '/api/placeholder/300/400/',
          type: 'back',
          date: '2024-01-19',
          notes: 'Back muscles showing great definition',
          weight: 140
        }
      ],
      latestDate: '2024-01-19',
      totalPhotos: 12,
      progress: '-8 lbs fat loss'
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      clientId: '3',
      photos: [
        {
          id: '5',
          url: '/api/placeholder/300/400/',
          type: 'front',
          date: '2024-01-18',
          notes: 'Starting to see some definition in the arms',
          weight: 200
        }
      ],
      latestDate: '2024-01-18',
      totalPhotos: 4,
      progress: '-3 lbs weight loss'
    }
  ];

  const getPhotoTypeColor = (type: string) => {
    switch (type) {
      case 'front': return 'bg-blue-100 text-blue-800';
      case 'side': return 'bg-green-100 text-green-800';
      case 'back': return 'bg-purple-100 text-purple-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: string) => {
    if (progress.includes('+')) return 'text-green-600';
    if (progress.includes('-')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Photos</h1>
            <p className="text-gray-600">Track and manage client progress photos</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Request Photos
            </button>
          </div>
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
                <p className="text-2xl font-bold text-gray-900">{progressPhotos.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Camera className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Photos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progressPhotos.reduce((sum, client) => sum + client.totalPhotos, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-500">new photos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">-2 lbs</p>
                <p className="text-sm text-gray-500">per month</p>
              </div>
            </div>
          </div>
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
            <option value="recent">Recent Photos</option>
            <option value="progress">Showing Progress</option>
            <option value="needs-photos">Needs Photos</option>
          </select>
        </div>

        {/* Progress Photos Grid */}
        <div className="space-y-6">
          {progressPhotos.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {client.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.clientName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{client.totalPhotos} photos</span>
                        <span>Latest: {new Date(client.latestDate).toLocaleDateString()}</span>
                        <span className={`font-medium ${getProgressColor(client.progress)}`}>
                          {client.progress}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {client.photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={photo.url}
                          alt={`${client.clientName} - ${photo.type}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                            <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getPhotoTypeColor(photo.type)}`}>
                            {photo.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(photo.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{photo.notes}</p>
                        <p className="text-xs text-gray-500 mt-1">Weight: {photo.weight} lbs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Guidelines</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Front view - arms at sides</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Side view - profile shot</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Back view - rear profile</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Consistent lighting and pose</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Camera className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">John Doe uploaded photos</p>
                  <p className="text-sm text-gray-500">2 new photos • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Jane Smith showing progress</p>
                  <p className="text-sm text-gray-500">Noticeable changes • Yesterday</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Photo request sent</p>
                  <p className="text-sm text-gray-500">Mike Johnson • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Insights</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Clients showing progress</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Photos this month</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3.2</div>
                <div className="text-sm text-gray-600">Avg photos per client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
