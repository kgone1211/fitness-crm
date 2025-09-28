import Layout from '@/components/Layout';
import { Scale, Plus, TrendingUp, TrendingDown, Calendar, Users, BarChart3, Download, Edit, Trash2 } from 'lucide-react';

export default function MeasurementsPage() {
  const measurements = [
    {
      id: '1',
      clientName: 'John Doe',
      clientId: '1',
      latestMeasurements: {
        date: '2024-01-20',
        weight: 180,
        bodyFat: 15.2,
        muscleMass: 153,
        waist: 34,
        chest: 42,
        arms: 15.5,
        thighs: 24,
        hips: 38
      },
      previousMeasurements: {
        date: '2024-01-13',
        weight: 182,
        bodyFat: 16.1,
        muscleMass: 152,
        waist: 35,
        chest: 41.5,
        arms: 15.2,
        thighs: 23.8,
        hips: 38.5
      },
      progress: {
        weight: -2,
        bodyFat: -0.9,
        muscleMass: +1,
        waist: -1,
        chest: +0.5,
        arms: +0.3,
        thighs: +0.2,
        hips: -0.5
      },
      totalMeasurements: 8
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientId: '2',
      latestMeasurements: {
        date: '2024-01-19',
        weight: 140,
        bodyFat: 18.5,
        muscleMass: 114,
        waist: 28,
        chest: 36,
        arms: 12.5,
        thighs: 22,
        hips: 36
      },
      previousMeasurements: {
        date: '2024-01-12',
        weight: 142,
        bodyFat: 19.2,
        muscleMass: 113,
        waist: 29,
        chest: 35.5,
        arms: 12.2,
        thighs: 21.8,
        hips: 36.5
      },
      progress: {
        weight: -2,
        bodyFat: -0.7,
        muscleMass: +1,
        waist: -1,
        chest: +0.5,
        arms: +0.3,
        thighs: +0.2,
        hips: -0.5
      },
      totalMeasurements: 6
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      clientId: '3',
      latestMeasurements: {
        date: '2024-01-18',
        weight: 200,
        bodyFat: 22.1,
        muscleMass: 156,
        waist: 40,
        chest: 44,
        arms: 16,
        thighs: 26,
        hips: 42
      },
      previousMeasurements: {
        date: '2024-01-11',
        weight: 203,
        bodyFat: 23.0,
        muscleMass: 155,
        waist: 41,
        chest: 43.5,
        arms: 15.8,
        thighs: 25.8,
        hips: 42.5
      },
      progress: {
        weight: -3,
        bodyFat: -0.9,
        muscleMass: +1,
        waist: -1,
        chest: +0.5,
        arms: +0.2,
        thighs: +0.2,
        hips: -0.5
      },
      totalMeasurements: 4
    }
  ];

  const getProgressIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-blue-600" />;
    return <div className="h-4 w-4" />;
  };

  const getProgressColor = (value: number, isGood: boolean = true) => {
    if (value > 0) return isGood ? 'text-green-600' : 'text-red-600';
    if (value < 0) return isGood ? 'text-blue-600' : 'text-red-600';
    return 'text-gray-600';
  };

  const getProgressBgColor = (value: number, isGood: boolean = true) => {
    if (value > 0) return isGood ? 'bg-green-50' : 'bg-red-50';
    if (value < 0) return isGood ? 'bg-blue-50' : 'bg-red-50';
    return 'bg-gray-50';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Body Measurements</h1>
            <p className="text-gray-600">Track client body measurements and progress</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Measurement
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
                <p className="text-2xl font-bold text-gray-900">{measurements.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Scale className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Weight Loss</p>
                <p className="text-2xl font-bold text-gray-900">-2.3 lbs</p>
                <p className="text-sm text-gray-500">this week</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Muscle Gain</p>
                <p className="text-2xl font-bold text-gray-900">+1.0 lbs</p>
                <p className="text-sm text-gray-500">avg per client</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Body Fat</p>
                <p className="text-2xl font-bold text-gray-900">-0.8%</p>
                <p className="text-sm text-gray-500">avg reduction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Measurements List */}
        <div className="space-y-6">
          {measurements.map((client) => (
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
                        <span>{client.totalMeasurements} measurements</span>
                        <span>Latest: {new Date(client.latestMeasurements.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <BarChart3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{client.latestMeasurements.weight} lbs</div>
                    <div className="text-sm text-gray-600">Weight</div>
                    <div className={`text-sm font-medium ${getProgressColor(client.progress.weight, false)}`}>
                      {client.progress.weight > 0 ? '+' : ''}{client.progress.weight} lbs
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{client.latestMeasurements.bodyFat}%</div>
                    <div className="text-sm text-gray-600">Body Fat</div>
                    <div className={`text-sm font-medium ${getProgressColor(client.progress.bodyFat, false)}`}>
                      {client.progress.bodyFat > 0 ? '+' : ''}{client.progress.bodyFat}%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{client.latestMeasurements.muscleMass} lbs</div>
                    <div className="text-sm text-gray-600">Muscle Mass</div>
                    <div className={`text-sm font-medium ${getProgressColor(client.progress.muscleMass, true)}`}>
                      {client.progress.muscleMass > 0 ? '+' : ''}{client.progress.muscleMass} lbs
                    </div>
                  </div>
                </div>

                {/* Detailed Measurements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Body Measurements</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Waist', value: client.latestMeasurements.waist, unit: 'inches', progress: client.progress.waist, isGood: false },
                        { label: 'Chest', value: client.latestMeasurements.chest, unit: 'inches', progress: client.progress.chest, isGood: true },
                        { label: 'Arms', value: client.latestMeasurements.arms, unit: 'inches', progress: client.progress.arms, isGood: true },
                        { label: 'Thighs', value: client.latestMeasurements.thighs, unit: 'inches', progress: client.progress.thighs, isGood: true },
                        { label: 'Hips', value: client.latestMeasurements.hips, unit: 'inches', progress: client.progress.hips, isGood: false }
                      ].map((measurement) => (
                        <div key={measurement.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getProgressIcon(measurement.progress)}
                            <span className="font-medium text-gray-900">{measurement.label}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {measurement.value} {measurement.unit}
                            </div>
                            <div className={`text-sm font-medium ${getProgressColor(measurement.progress, measurement.isGood)}`}>
                              {measurement.progress > 0 ? '+' : ''}{measurement.progress} {measurement.unit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Progress Summary</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${getProgressBgColor(client.progress.weight, false)}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Weight Change</span>
                          <span className={`font-semibold ${getProgressColor(client.progress.weight, false)}`}>
                            {client.progress.weight > 0 ? '+' : ''}{client.progress.weight} lbs
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {client.previousMeasurements.weight} → {client.latestMeasurements.weight} lbs
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${getProgressBgColor(client.progress.bodyFat, false)}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Body Fat Change</span>
                          <span className={`font-semibold ${getProgressColor(client.progress.bodyFat, false)}`}>
                            {client.progress.bodyFat > 0 ? '+' : ''}{client.progress.bodyFat}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {client.previousMeasurements.bodyFat}% → {client.latestMeasurements.bodyFat}%
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${getProgressBgColor(client.progress.muscleMass, true)}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Muscle Mass Change</span>
                          <span className={`font-semibold ${getProgressColor(client.progress.muscleMass, true)}`}>
                            {client.progress.muscleMass > 0 ? '+' : ''}{client.progress.muscleMass} lbs
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {client.previousMeasurements.muscleMass} → {client.latestMeasurements.muscleMass} lbs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurement Guidelines</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">Measure at the same time of day</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">Use consistent measuring tools</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">Measure in the same clothing</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">Take measurements weekly</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Scale className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">John Doe measurements updated</p>
                  <p className="text-sm text-gray-500">Weight: 180 lbs • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Jane Smith showing progress</p>
                  <p className="text-sm text-gray-500">Muscle mass increased • Yesterday</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Measurement reminder sent</p>
                  <p className="text-sm text-gray-500">Mike Johnson • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Insights</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Clients showing progress</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">-2.3 lbs</div>
                <div className="text-sm text-gray-600">Avg weight loss</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">+1.0 lbs</div>
                <div className="text-sm text-gray-600">Avg muscle gain</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
