'use client';

import Layout from '@/components/Layout';
import { BarChart3, TrendingUp, TrendingDown, Users, Calendar, Target, Download, Filter, RefreshCw, X } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [isExporting, setIsExporting] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would fetch fresh data from your API
    console.log('Refreshing analytics data...');
    
    setIsRefreshing(false);
    setLastRefresh(new Date());
  };

  const handleFilterPeriod = () => {
    setShowFilterModal(true);
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the report
    console.log('Exporting analytics report...');
    
    // Create a mock CSV content
    const csvContent = `Client Name,Start Weight,Current Weight,Weight Loss,Body Fat Change,Muscle Gain,Workouts Completed,Success Rate
John Doe,185,180,-5,-2.1,1.2,24,85%
Jane Smith,145,140,-5,-1.8,0.8,28,92%
Mike Johnson,205,200,-5,-1.5,0.5,16,65%`;
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setShowFilterModal(false);
    
    // In a real app, this would filter the data based on the selected period
    console.log('Filtering data for period:', period);
  };

  const getPeriodLabel = (period: string) => {
    const labels: { [key: string]: string } = {
      'last-7-days': 'Last 7 Days',
      'last-30-days': 'Last 30 Days',
      'last-3-months': 'Last 3 Months',
      'last-6-months': 'Last 6 Months',
      'last-year': 'Last Year',
      'all-time': 'All Time'
    };
    return labels[period] || 'Last 30 Days';
  };

  const analyticsData = {
    overview: {
      totalClients: 12,
      activeClients: 10,
      inactiveClients: 2,
      totalRevenue: 15600,
      monthlyRevenue: 3200,
      avgClientValue: 1300,
      retentionRate: 83.3
    },
    clientProgress: [
      {
        id: '1',
        name: 'John Doe',
        startWeight: 185,
        currentWeight: 180,
        goalWeight: 170,
        weightLoss: -5,
        bodyFatChange: -2.1,
        muscleGain: 1.2,
        workoutsCompleted: 24,
        checkInsCompleted: 18,
        successRate: 85,
        joinDate: '2024-01-15',
        lastActivity: '2024-01-22'
      },
      {
        id: '2',
        name: 'Jane Smith',
        startWeight: 145,
        currentWeight: 140,
        goalWeight: 135,
        weightLoss: -5,
        bodyFatChange: -1.8,
        muscleGain: 0.8,
        workoutsCompleted: 28,
        checkInsCompleted: 22,
        successRate: 92,
        joinDate: '2024-01-10',
        lastActivity: '2024-01-21'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        startWeight: 205,
        currentWeight: 200,
        goalWeight: 185,
        weightLoss: -5,
        bodyFatChange: -1.5,
        muscleGain: 0.5,
        workoutsCompleted: 16,
        checkInsCompleted: 12,
        successRate: 65,
        joinDate: '2024-01-05',
        lastActivity: '2024-01-20'
      }
    ],
    monthlyStats: [
      { month: 'Oct 2023', clients: 8, revenue: 2400, workouts: 45 },
      { month: 'Nov 2023', clients: 9, revenue: 2700, workouts: 52 },
      { month: 'Dec 2023', clients: 10, revenue: 3000, workouts: 48 },
      { month: 'Jan 2024', clients: 12, revenue: 3200, workouts: 68 }
    ],
    workoutStats: {
      totalWorkouts: 213,
      avgWorkoutsPerClient: 17.8,
      mostPopularWorkout: 'Upper Body Strength',
      avgWorkoutDuration: 45,
      completionRate: 87.5
    },
    nutritionStats: {
      clientsTrackingMacros: 8,
      avgCompliance: 78.5,
      mostCommonGoal: 'Weight Loss',
      avgCalorieDeficit: 350
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600">Comprehensive insights into your fitness business</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-gray-500">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                Period: {getPeriodLabel(selectedPeriod)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg transition-colors ${
                isRefreshing 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <button 
              onClick={handleFilterPeriod}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Period
            </button>
            <button 
              onClick={handleExportReport}
              disabled={isExporting}
              className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                isExporting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-pulse' : ''}`} />
              {isExporting ? 'Exporting...' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Filter Period</h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { value: 'last-7-days', label: 'Last 7 Days' },
                    { value: 'last-30-days', label: 'Last 30 Days' },
                    { value: 'last-3-months', label: 'Last 3 Months' },
                    { value: 'last-6-months', label: 'Last 6 Months' },
                    { value: 'last-year', label: 'Last Year' },
                    { value: 'all-time', label: 'All Time' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="period"
                        value={option.value}
                        checked={selectedPeriod === option.value}
                        onChange={() => handlePeriodChange(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalClients}</p>
                <p className="text-sm text-green-600">+2 this month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${analyticsData.overview.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+6.7% vs last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Retention Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.retentionRate}%</p>
                <p className="text-sm text-green-600">+2.1% improvement</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Client Value</p>
                <p className="text-2xl font-bold text-gray-900">${analyticsData.overview.avgClientValue}</p>
                <p className="text-sm text-green-600">+$50 increase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Progress Analytics */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Client Progress Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Body Fat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Muscle Gain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workouts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.clientProgress.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">Joined {new Date(client.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.startWeight} → {client.currentWeight} lbs</div>
                      <div className={`text-sm font-medium ${getProgressColor(client.weightLoss)}`}>
                        {client.weightLoss > 0 ? '+' : ''}{client.weightLoss} lbs
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getProgressColor(client.bodyFatChange)}`}>
                        {client.bodyFatChange > 0 ? '+' : ''}{client.bodyFatChange}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getProgressColor(client.muscleGain)}`}>
                        +{client.muscleGain} lbs
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.workoutsCompleted}</div>
                      <div className="text-sm text-gray-500">{client.checkInsCompleted} check-ins</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getSuccessRateColor(client.successRate)}`}>
                        {client.successRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(client.lastActivity).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
            <div className="space-y-4">
              {analyticsData.monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{stat.month}</p>
                    <p className="text-sm text-gray-600">{stat.clients} clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${stat.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{stat.workouts} workouts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Total Workouts</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.workoutStats.totalWorkouts}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Avg per Client</p>
                  <p className="text-sm text-gray-600">Monthly average</p>
                </div>
                <div className="text-2xl font-bold text-green-600">{analyticsData.workoutStats.avgWorkoutsPerClient}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Completion Rate</p>
                  <p className="text-sm text-gray-600">Workout adherence</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">{analyticsData.workoutStats.completionRate}%</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Avg Duration</p>
                  <p className="text-sm text-gray-600">Per workout</p>
                </div>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.workoutStats.avgWorkoutDuration} min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Analytics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.nutritionStats.clientsTrackingMacros}</div>
              <div className="text-sm text-gray-600">Clients Tracking Macros</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{analyticsData.nutritionStats.avgCompliance}%</div>
              <div className="text-sm text-gray-600">Avg Compliance</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.nutritionStats.avgCalorieDeficit}</div>
              <div className="text-sm text-gray-600">Avg Calorie Deficit</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{analyticsData.nutritionStats.mostCommonGoal}</div>
              <div className="text-sm text-gray-600">Most Common Goal</div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Revenue Growth</p>
                  <p className="text-sm text-gray-600">Monthly revenue increased by 6.7% compared to last month</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Client Retention</p>
                  <p className="text-sm text-gray-600">83.3% retention rate with 2 new clients this month</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Workout Completion</p>
                  <p className="text-sm text-gray-600">87.5% workout completion rate across all clients</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Nutrition Tracking</p>
                  <p className="text-sm text-gray-600">8 clients actively tracking macros with 78.5% compliance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <p className="font-medium text-gray-900">Focus on Client Engagement</p>
                <p className="text-sm text-gray-600 mt-1">Consider implementing more check-in reminders for clients with lower success rates</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <p className="font-medium text-gray-900">Expand Nutrition Program</p>
                <p className="text-sm text-gray-600 mt-1">High compliance rate suggests opportunity to expand macro tracking to more clients</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                <p className="font-medium text-gray-900">Workout Optimization</p>
                <p className="text-sm text-gray-600 mt-1">Consider adjusting workout duration based on completion rates and client feedback</p>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                <p className="font-medium text-gray-900">Revenue Growth</p>
                <p className="text-sm text-gray-600 mt-1">Strong growth trend indicates potential for premium service offerings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
