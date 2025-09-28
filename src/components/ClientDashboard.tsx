'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Heart,
  Dumbbell,
  Utensils,
  BarChart3,
  Plus,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function ClientDashboard() {
  const [goals] = useState([
    {
      id: '1',
      title: 'Lose 10 pounds',
      description: 'Target weight loss by end of month',
      targetDate: '2024-02-29',
      progress: 60,
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'Complete 20 workouts',
      description: 'Workout 4 times per week',
      targetDate: '2024-02-29',
      progress: 75,
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Track macros daily',
      description: 'Log all meals and snacks',
      targetDate: '2024-02-15',
      progress: 90,
      status: 'in_progress'
    }
  ]);

  const [recentWorkouts] = useState([
    {
      id: '1',
      name: 'Upper Body Strength',
      date: '2024-01-28',
      duration: '45 min',
      exercises: 8,
      status: 'completed'
    },
    {
      id: '2',
      name: 'Cardio HIIT',
      date: '2024-01-26',
      duration: '30 min',
      exercises: 6,
      status: 'completed'
    },
    {
      id: '3',
      name: 'Lower Body',
      date: '2024-01-24',
      duration: '50 min',
      exercises: 10,
      status: 'completed'
    }
  ]);

  const [upcomingSessions] = useState([
    {
      id: '1',
      type: 'Personal Training',
      date: '2024-01-30',
      time: '10:00 AM',
      duration: '60 min',
      location: 'Gym Studio A'
    },
    {
      id: '2',
      type: 'Nutrition Check-in',
      date: '2024-02-01',
      time: '2:00 PM',
      duration: '30 min',
      location: 'Online'
    }
  ]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return 'bg-green-100';
    if (progress >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Track your fitness journey and progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Log Workout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Dumbbell className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Week</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">workouts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Weight Loss</p>
              <p className="text-2xl font-bold text-gray-900">-5 lbs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Goal Progress</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Goals</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <div key={goal.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-gray-600 mt-1">{goal.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getProgressColor(goal.progress)}`}>
                    {goal.progress}%
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${getProgressBg(goal.progress)}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Workouts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(workout.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{workout.duration}</span>
                      <span className="mx-2">•</span>
                      <Dumbbell className="h-4 w-4 mr-1" />
                      <span>{workout.exercises} exercises</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {workout.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{session.type}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{session.time}</span>
                      <span className="mx-2">•</span>
                      <span>{session.duration}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{session.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Dumbbell className="h-6 w-6 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Log Workout</div>
              <div className="text-sm text-gray-500">Record your exercise session</div>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Utensils className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Log Meal</div>
              <div className="text-sm text-gray-500">Track your nutrition</div>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="h-6 w-6 text-red-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Check-in</div>
              <div className="text-sm text-gray-500">Update your coach</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
