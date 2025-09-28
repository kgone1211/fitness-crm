'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWhopAuth } from '@/contexts/WhopAuthContext';
import Layout from '@/components/Layout';
import {
  Activity,
  Target,
  Calendar,
  BarChart3,
  Plus,
  X,
  Weight,
  TrendingUp,
  Clock,
  CheckCircle,
  Dumbbell,
  Utensils,
  Scale,
  Heart
} from 'lucide-react';
import { useGoals } from '@/contexts/GoalsContext';

export default function ClientDashboard() {
  const { user, isLoading, isAuthenticated } = useWhopAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading if (!isLoading) {if (!isLoading) { isAuthenticated if (!isLoading) {if (!isLoading) { user) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'client') {
        router.push('/');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role !== 'client') {
    return null;
  }

  return (
    <Layout userRole="client">
      <ClientDashboardContent user={user} />
    </Layout>
  );
}

function ClientDashboardContent({ user }: { user: any }) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showProgressPictureModal, setShowProgressPictureModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'nutrition' | 'workouts'>('overview');
  const { goals, updateGoalStatus } = useGoals();

  useEffect(() => {
    // Load client data from localStorage (set during login)
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get client data from localStorage (set during login)
      const clientData = localStorage.getItem('client-data');
      if (clientData) {
        const parsedClient = JSON.parse(clientData);
        setClient({
          ...parsedClient,
          joinDate: '2024-01-15', // Default join date
          avatar: null,
          currentWeight: parsedClient.currentWeight || 180,
          goalWeight: parsedClient.goalWeight || 160,
          name: parsedClient.name || user.name
        });
      } else {
        // Create default client data
        setClient({
          id: user.id,
          name: user.name,
          email: user.email,
          joinDate: '2024-01-15',
          avatar: null,
          currentWeight: 180,
          goalWeight: 160
        });
      }

      // Simulate loading additional data
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleAddWorkout = () => {
    setShowWorkoutModal(true);
  };

  const handleAddNutrition = () => {
    setShowNutritionModal(true);
  };

  const handleAddProgressPicture = () => {
    setShowProgressPictureModal(true);
  };

  const handleCloseModals = () => {
    setShowWorkoutModal(false);
    setShowNutritionModal(false);
    setShowProgressPictureModal(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-blue-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
          <p className="text-gray-600">Unable to load your dashboard data.</p>
        </div>
      </div>
    );
  }

  const clientGoals = goals.filter(goal => goal.clientId === client.id);
  const weightLoss = client.goalWeight ? client.currentWeight - client.goalWeight : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight mb-4">
              Welcome back, {client.name}!
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Here's your fitness progress and upcoming activities.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'calendar'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-2" />
            Calendar & Goals
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'nutrition'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Utensils className="h-4 w-4 inline mr-2" />
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'workouts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Dumbbell className="h-4 w-4 inline mr-2" />
            Workouts
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Current Weight */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Current Weight</p>
                      <p className="text-2xl font-bold text-gray-900">{client.currentWeight} lbs</p>
                    </div>
                  </div>
                </div>

                {/* Goal Progress */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Goal Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{weightLoss} lbs to go</p>
                    </div>
                  </div>
                </div>

                {/* Workouts This Week */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Dumbbell className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">This Week</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-500">workouts</p>
                    </div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">85%</p>
                      <p className="text-sm text-gray-500">goal completion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleAddWorkout}
                    className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Dumbbell className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Log Workout</span>
                  </button>
                  <button
                    onClick={handleAddNutrition}
                    className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Utensils className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium text-gray-900">Track Nutrition</span>
                  </button>
                  <button
                    onClick={handleAddProgressPicture}
                    className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Plus className="h-6 w-6 text-orange-600 mr-3" />
                    <span className="font-medium text-gray-900">Add Progress Pic</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Completed morning workout</p>
                      <p className="text-sm text-gray-500">45 minutes • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Utensils className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Logged breakfast</p>
                      <p className="text-sm text-gray-500">450 calories • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Scale className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Updated weight</p>
                      <p className="text-sm text-gray-500">180 lbs • Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Goals</h2>
              {clientGoals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clientGoals.map((goal) => (
                    <div key={goal.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                        <span>Target: {goal.targetValue} {goal.unit}</span>
                        <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div
                          className={`h-2.5 rounded-full ${getGoalProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-right">{goal.progress}% Complete</p>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => updateGoalStatus(goal.id, goal.status === 'Completed' ? 'In Progress' : 'Completed')}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            goal.status === 'Completed'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {goal.status === 'Completed' ? 'Mark In Progress' : 'Mark Complete'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Goals Assigned Yet</h3>
                  <p className="text-gray-600">Your coach will assign goals for you to track here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nutrition Tracking</h3>
                <p className="text-gray-600">Track your daily macros and meal plans here.</p>
                <button
                  onClick={handleAddNutrition}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Start Tracking
                </button>
              </div>
            </div>
          )}

          {activeTab === 'workouts' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Workout Tracking</h3>
                <p className="text-gray-600">Log your workouts and track your progress here.</p>
                <button
                  onClick={handleAddWorkout}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Log Workout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals remain the same as before */}
      {/* Workout Logging Modal */}
      {showWorkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Workout</h3>
              <button
                onClick={handleCloseModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter workout name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Log Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Nutrition Tracking Modal */}
      {showNutritionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Track Nutrition</h3>
              <button
                onClick={handleCloseModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Log Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Picture Modal */}
      {showProgressPictureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Progress Picture</h3>
              <button
                onClick={handleCloseModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any notes about your progress..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
                >
                  Upload Picture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
