import Layout from '@/components/Layout';
import { Calendar, Plus, Clock, Users, MapPin, Video, MessageSquare, CheckCircle } from 'lucide-react';

export default function SchedulePage() {
  const scheduleEvents = [
    {
      id: '1',
      title: 'Personal Training Session',
      client: 'John Doe',
      type: 'in-person',
      date: '2024-01-22',
      time: '09:00',
      duration: 60,
      location: 'Gym Floor A',
      status: 'confirmed',
      notes: 'Focus on upper body strength training'
    },
    {
      id: '2',
      title: 'Nutrition Consultation',
      client: 'Jane Smith',
      type: 'video',
      date: '2024-01-22',
      time: '14:00',
      duration: 30,
      location: 'Video Call',
      status: 'pending',
      notes: 'Review macro targets and meal planning'
    },
    {
      id: '3',
      title: 'Group Workout Class',
      client: 'Multiple Clients',
      type: 'group',
      date: '2024-01-23',
      time: '18:00',
      duration: 45,
      location: 'Studio B',
      status: 'confirmed',
      notes: 'HIIT class for intermediate level'
    },
    {
      id: '4',
      title: 'Progress Check-in',
      client: 'Mike Johnson',
      type: 'phone',
      date: '2024-01-24',
      time: '10:30',
      duration: 20,
      location: 'Phone Call',
      status: 'scheduled',
      notes: 'Weekly progress review and goal adjustment'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'in-person': return <MapPin className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <MessageSquare className="h-4 w-4" />;
      case 'group': return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'in-person': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-green-100 text-green-800';
      case 'phone': return 'bg-purple-100 text-purple-800';
      case 'group': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600">Manage your appointments and training sessions</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Sessions</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-sm text-gray-500">sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {scheduleEvents.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(event.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.client}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time} ({event.duration} min)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      {event.notes && (
                        <p className="text-sm text-gray-500 mt-2">{event.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Schedule</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <MapPin className="h-4 w-4 mr-2" />
                In-Person Session
              </button>
              <button className="w-full flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </button>
              <button className="w-full flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                <MessageSquare className="h-4 w-4 mr-2" />
                Phone Call
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">9:00 AM</p>
                  <p className="text-sm text-gray-600">John Doe - Training</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">2:00 PM</p>
                  <p className="text-sm text-gray-600">Jane Smith - Nutrition</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">6:00 PM</p>
                  <p className="text-sm text-gray-600">Group HIIT Class</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Session completed</p>
                  <p className="text-sm text-gray-500">John Doe • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">New session scheduled</p>
                  <p className="text-sm text-gray-500">Mike Johnson • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Client rescheduled</p>
                  <p className="text-sm text-gray-500">Jane Smith • Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
