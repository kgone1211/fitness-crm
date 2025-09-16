'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Weight, 
  Calendar,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { db } from '@/lib/database';
import { Client, Measurement, WorkoutSession } from '@/types';

export default function ClientProgress() {
  const [client, setClient] = useState<Client | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  useEffect(() => {
    const loadClientData = async () => {
      try {
        const clientId = '1';
        
        const clients = await db.getClients();
        const clientData = clients.find(c => c.id === clientId);
        setClient(clientData || null);

        const clientMeasurements = await db.getMeasurements(clientId);
        setMeasurements(clientMeasurements);

        const clientWorkouts = await db.getWorkoutSessions('1', clientId);
        setWorkouts(clientWorkouts);

        setLoading(false);
      } catch (error) {
        console.error('Error loading client data:', error);
        setLoading(false);
      }
    };

    loadClientData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
          <p className="text-gray-600">Unable to load your progress data.</p>
        </div>
      </div>
    );
  }

  // Process weight data for chart
  const weightData = measurements
    .filter(m => m.type === 'weight' && m.unit === 'lbs')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(m => ({
      date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: m.value,
      fullDate: m.date
    }));

  // Process workout data for chart
  const workoutData = workouts
    .filter(w => w.status === 'completed')
    .reduce((acc, workout) => {
      const date = new Date(workout.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const existing = acc.find(item => item.date === date);
      if (existing) {
        existing.workouts += 1;
      } else {
        acc.push({ date, workouts: 1 });
      }
      return acc;
    }, [] as { date: string; workouts: number }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate stats
  const currentWeight = weightData[weightData.length - 1]?.weight || 0;
  const startingWeight = weightData[0]?.weight || currentWeight;
  const totalWeightChange = currentWeight - startingWeight;
  const totalWorkouts = workouts.filter(w => w.status === 'completed').length;

  // This month's stats
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const thisMonthWorkouts = workouts.filter(w => 
    new Date(w.startTime) >= thisMonth && w.status === 'completed'
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-600">Track your fitness journey and achievements</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Weight className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Weight</p>
              <p className="text-2xl font-bold text-gray-900">{currentWeight} lbs</p>
              {totalWeightChange !== 0 && (
                <div className={`flex items-center text-sm ${
                  totalWeightChange > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {totalWeightChange > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(totalWeightChange).toFixed(1)} lbs total
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{totalWorkouts}</p>
              <p className="text-sm text-gray-500">completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{thisMonthWorkouts}</p>
              <p className="text-sm text-gray-500">workouts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Goal Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {client.goals?.weight ? 
                  `${Math.round((currentWeight / client.goals.weight) * 100)}%` : 
                  'N/A'
                }
              </p>
              <p className="text-sm text-gray-500">weight goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weight Progress</h3>
            <div className="flex items-center space-x-2">
              <Weight className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">lbs</span>
            </div>
          </div>
          {weightData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`${value} lbs`, 'Weight']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Weight className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p>No weight data available</p>
              </div>
            </div>
          )}
        </div>

        {/* Workout Activity Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Workout Activity</h3>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">workouts</span>
            </div>
          </div>
          {workoutData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`${value}`, 'Workouts']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar dataKey="workouts" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p>No workout data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Measurements */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Measurements</h3>
        </div>
        <div className="p-6">
          {measurements.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {measurements
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 10)
                    .map((measurement, index) => {
                      const previousMeasurement = measurements
                        .filter(m => m.type === measurement.type && m.unit === measurement.unit)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        [index + 1];
                      
                      const change = previousMeasurement ? 
                        measurement.value - previousMeasurement.value : 0;

                      return (
                        <tr key={measurement.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(measurement.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {measurement.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {measurement.value} {measurement.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {change !== 0 && (
                              <span className={`inline-flex items-center ${
                                change > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {change > 0 ? (
                                  <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                )}
                                {Math.abs(change).toFixed(1)} {measurement.unit}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No measurements recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
