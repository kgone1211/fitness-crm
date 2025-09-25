'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Activity, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  Plus,
  ExternalLink,
  User,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { db } from '@/lib/database';
import WeightInput from './WeightInput';
import ProgressPhotos from './ProgressPhotos';

interface DashboardProps {
  trainerId: string;
}

export default function Dashboard({ trainerId }: DashboardProps) {
  const stats = db.getDashboardStats(trainerId);
  
  // Sample data for charts
  const weightProgressData = [
    { name: 'Week 1', weight: 143 },
    { name: 'Week 2', weight: 142.8 },
    { name: 'Week 3', weight: 142.5 },
    { name: 'Week 4', weight: 142.2 },
  ];

  const workoutData = [
    { name: 'Mon', workouts: 3 },
    { name: 'Tue', workouts: 2 },
    { name: 'Wed', workouts: 4 },
    { name: 'Thu', workouts: 3 },
    { name: 'Fri', workouts: 5 },
    { name: 'Sat', workouts: 2 },
    { name: 'Sun', workouts: 1 },
  ];

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    changeType,
    gradient = 'from-blue-500 to-blue-600'
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ComponentType<any>; 
    change?: number; 
    changeType?: 'positive' | 'negative' | 'neutral';
    gradient?: string;
  }) => (
    <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center">
              {changeType === 'positive' ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : changeType === 'negative' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <div className="h-4 w-4" />
              )}
              <span className={`text-sm ml-1 font-medium ${
                changeType === 'positive' ? 'text-emerald-600' : 
                changeType === 'negative' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">Welcome back! Here's what's happening with your clients.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/clients/add" className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Client
              </Link>
              <Link href="/workouts" className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                Schedule Workout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          change={12}
          changeType="positive"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Clients"
          value={stats.activeClients}
          icon={CheckCircle}
          change={8}
          changeType="positive"
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Workouts This Week"
          value={stats.workoutsThisWeek}
          icon={Activity}
          change={-5}
          changeType="negative"
          gradient="from-orange-500 to-orange-600"
        />
        <StatCard
          title="Avg. Workout Duration"
          value={`${stats.averageWorkoutDuration} min`}
          icon={Clock}
          change={3}
          changeType="positive"
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Weight Input Section */}
      <WeightInput />

      {/* Progress Photos Section */}
      <ProgressPhotos />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Weight Progress</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">
                Last 4 weeks
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: any) => [`${value} lbs`, 'Weight']}
                labelFormatter={(label) => `Week: ${label}`}
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

        {/* Weekly Workouts Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Weekly Workouts</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium">
                This week
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="workouts" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Client Progress Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Client Progress</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.clientProgress.map((client) => (
                <tr key={client.clientId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {client.clientName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.clientName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {client.weightChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : client.weightChange < 0 ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                      <span className={`ml-2 text-sm ${
                        client.weightChange > 0 ? 'text-red-600' : 
                        client.weightChange < 0 ? 'text-green-600' : 
                        'text-gray-600'
                      }`}>
                        {client.weightChange > 0 ? '+' : ''}{client.weightChange.toFixed(1)} lbs
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.lastCheckIn.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Portal Access */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Client Portal</h3>
            <p className="text-purple-100 mb-4">
              Your clients can access their personal fitness dashboard to track progress, view workouts, and manage their goals.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/client/login"
                className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Client Login
              </Link>
              <Link
                href="/client"
                className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Portal
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/workouts" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Schedule Workout</div>
              <div className="text-sm text-gray-600">Book a new session</div>
            </div>
          </Link>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Target className="h-8 w-8 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Add Measurement</div>
              <div className="text-sm text-gray-600">Log weight or body measurements</div>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Check-in</div>
              <div className="text-sm text-gray-600">Client progress update</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
