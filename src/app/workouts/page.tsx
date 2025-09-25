'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  Play,
  Edit,
  MoreVertical,
  Activity,
  Dumbbell,
  Zap,
  Target,
  Award,
  Star,
  Heart,
  Timer,
  Users,
  TrendingUp
} from 'lucide-react';
import { db } from '@/lib/database';
import { Workout } from '@/types';

export default function WorkoutsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  const workouts = db.getWorkouts();
  const clients = db.getClients();

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getStatusColor = (status: Workout['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Workout['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const clientName = getClientName(workout.clientId);
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || workout.status === filterStatus;
    
    const now = new Date();
    const workoutDate = new Date(workout.date);
    let matchesDate = true;
    
    if (filterDate === 'today') {
      matchesDate = workoutDate.toDateString() === now.toDateString();
    } else if (filterDate === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = workoutDate >= weekAgo;
    } else if (filterDate === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = workoutDate >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Workouts
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">Track and manage all workout sessions</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Schedule Workout
                </button>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <Activity className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  Quick Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts by name or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className="group flex items-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm">
                <Filter className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Workouts ({filteredWorkouts.length})
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Track your progress</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                {/* Workout Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">{workout.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workout.status)}`}>
                          {getStatusIcon(workout.status)}
                          <span className="ml-1 capitalize">{workout.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                {/* Workout Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    {getClientName(workout.clientId)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                    {new Date(workout.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Timer className="h-4 w-4 mr-2 text-emerald-500" />
                    {workout.duration} minutes
                  </div>
                </div>

                {/* Description */}
                {workout.description && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 bg-white/50 rounded-lg p-3">{workout.description}</p>
                  </div>
                )}

                {/* Exercises */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-orange-500" />
                    Exercises ({workout.exercises.length})
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full border border-blue-200"
                      >
                        {exercise.name}
                      </span>
                    ))}
                    {workout.exercises.length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full border border-gray-300">
                        +{workout.exercises.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {workout.status === 'scheduled' && (
                    <button className="flex-1 px-4 py-3 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                      <Play className="h-4 w-4 mr-1 inline" />
                      Start Workout
                    </button>
                  )}
                  <button className="px-4 py-3 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                    <Edit className="h-4 w-4 mr-1 inline" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredWorkouts.length === 0 && (
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-xl text-center">
            <div className="h-32 w-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Dumbbell className="h-16 w-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm || filterStatus !== 'all' || filterDate !== 'all' ? 'No workouts found' : 'No workouts scheduled'}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {searchTerm || filterStatus !== 'all' || filterDate !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by scheduling your first workout to begin tracking fitness progress'
              }
            </p>
            {(!searchTerm && filterStatus === 'all' && filterDate === 'all') && (
              <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Schedule Your First Workout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
