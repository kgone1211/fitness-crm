import Layout from '@/components/Layout';
import { Heart, Users, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

export default function CheckInsPage() {
  const checkIns = [
    {
      id: '1',
      clientName: 'John Doe',
      date: '2024-01-22',
      mood: 4,
      energy: 3,
      sleep: 7.5,
      water: 8,
      weight: 180,
      notes: 'Feeling great today! Had a productive workout and feeling motivated.',
      completed: true,
      submittedAt: '2024-01-22T08:30:00Z'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      date: '2024-01-22',
      mood: 5,
      energy: 4,
      sleep: 8,
      water: 10,
      weight: 140,
      notes: 'Excellent day! Hit all my macro targets and had amazing energy.',
      completed: true,
      submittedAt: '2024-01-22T09:15:00Z'
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      date: '2024-01-21',
      mood: 2,
      energy: 2,
      sleep: 5,
      water: 4,
      weight: 200,
      notes: 'Struggling with motivation today. Had a stressful day at work.',
      completed: true,
      submittedAt: '2024-01-21T20:45:00Z'
    },
    {
      id: '4',
      clientName: 'Sarah Wilson',
      date: '2024-01-22',
      mood: 3,
      energy: 3,
      sleep: 6,
      water: 6,
      weight: null,
      notes: 'Average day. Need to focus on hydration and sleep.',
      completed: false,
      submittedAt: null
    }
  ];

  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1: return '😞';
      case 2: return '😐';
      case 3: return '😊';
      case 4: return '😄';
      case 5: return '🤩';
      default: return '😊';
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return 'text-green-600';
    if (mood >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEnergyEmoji = (energy: number) => {
    switch (energy) {
      case 1: return '😴';
      case 2: return '😑';
      case 3: return '😌';
      case 4: return '😃';
      case 5: return '⚡';
      default: return '😌';
    }
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 4) return 'text-green-600';
    if (energy >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSleepColor = (sleep: number) => {
    if (sleep >= 7) return 'text-green-600';
    if (sleep >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWaterColor = (water: number) => {
    if (water >= 8) return 'text-green-600';
    if (water >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Check-ins</h1>
            <p className="text-gray-600">Monitor client daily wellness and progress</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4 mr-2" />
              Filter by Date
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Reminder
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
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Mood</p>
                <p className="text-2xl font-bold text-gray-900">3.5</p>
                <p className="text-sm text-gray-500">out of 5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Check-ins List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Check-ins</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {checkIns.map((checkIn) => (
              <div key={checkIn.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {checkIn.clientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{checkIn.clientName}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(checkIn.date).toLocaleDateString()}
                        </span>
                        {checkIn.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      
                      {/* Wellness Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className={`text-2xl mb-1 ${getMoodColor(checkIn.mood)}`}>
                            {getMoodEmoji(checkIn.mood)}
                          </div>
                          <div className="text-sm text-gray-600">Mood: {checkIn.mood}/5</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl mb-1 ${getEnergyColor(checkIn.energy)}`}>
                            {getEnergyEmoji(checkIn.energy)}
                          </div>
                          <div className="text-sm text-gray-600">Energy: {checkIn.energy}/5</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-semibold mb-1 ${getSleepColor(checkIn.sleep)}`}>
                            {checkIn.sleep}h
                          </div>
                          <div className="text-sm text-gray-600">Sleep</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-semibold mb-1 ${getWaterColor(checkIn.water)}`}>
                            {checkIn.water}
                          </div>
                          <div className="text-sm text-gray-600">Water glasses</div>
                        </div>
                      </div>

                      {/* Weight and Notes */}
                      <div className="flex items-center space-x-4 mb-2">
                        {checkIn.weight && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Weight:</span> {checkIn.weight} lbs
                          </div>
                        )}
                        {checkIn.submittedAt && (
                          <div className="text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            Submitted {new Date(checkIn.submittedAt).toLocaleTimeString()}
                          </div>
                        )}
                      </div>

                      {checkIn.notes && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {checkIn.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    {!checkIn.completed && (
                      <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors">
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Average Sleep Quality</p>
                  <p className="text-sm text-gray-600">6.6 hours this week</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Hydration Rate</p>
                  <p className="text-sm text-gray-600">7.5 glasses average</p>
                </div>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Mood Stability</p>
                  <p className="text-sm text-gray-600">Needs improvement</p>
                </div>
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Concerns</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <p className="font-medium text-gray-900">Mike Johnson</p>
                <p className="text-sm text-gray-600">Low mood and energy - needs support</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <p className="font-medium text-gray-900">Sarah Wilson</p>
                <p className="text-sm text-gray-600">Missing check-ins - send reminder</p>
                <p className="text-xs text-gray-500 mt-1">Today</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <p className="font-medium text-gray-900">Jane Smith</p>
                <p className="text-sm text-gray-600">Excellent progress - keep it up!</p>
                <p className="text-xs text-gray-500 mt-1">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
