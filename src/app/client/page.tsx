'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  CheckCircle
} from 'lucide-react';

export default function ClientDashboard() {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showProgressPictureModal, setShowProgressPictureModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load client data from localStorage (set during login)
    const loadData = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get client data from localStorage (set during login)
      const clientData = localStorage.getItem('client-data');
      if (clientData) {
        const parsedClient = JSON.parse(clientData);
        setClient({
          ...parsedClient,
          joinDate: '2024-01-15', // Default join date
          avatar: null
        });
      } else {
        // No client data, redirect to login
        router.push('/client/login');
        return;
      }

      // Simulate loading additional data
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, [router]);

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
          <p className="text-gray-600">Unable to load your dashboard data.</p>
        </div>
      </div>
    );
  }

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

      {/* Main content */}
      <div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Weight */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
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
                <Calendar className="h-6 w-6 text-purple-600" />
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
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleAddWorkout}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Activity className="h-6 w-6 text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">Log Workout</span>
            </button>
            <button 
              onClick={handleAddNutrition}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
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
      </div>

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