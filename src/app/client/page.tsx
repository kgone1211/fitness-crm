'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  Target, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  Utensils,
  X
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  currentWeight: number;
  goalWeight: number;
  height: number;
  joinDate: string;
  avatar?: string;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  status: 'completed' | 'scheduled' | 'missed';
  exercises: string[];
}

interface MacroEntry {
  id: string;
  date: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface ProgressPicture {
  id: string;
  date: string;
  imageUrl: string;
  notes?: string;
  type: 'front' | 'side' | 'back';
}

export default function ClientDashboard() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [macroEntries, setMacroEntries] = useState<MacroEntry[]>([]);
  const [progressPictures, setProgressPictures] = useState<ProgressPicture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showProgressPictureModal, setShowProgressPictureModal] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClient({
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        currentWeight: 145,
        goalWeight: 135,
        height: 65,
        joinDate: '2024-01-15',
        avatar: null
      });

      setWorkouts([
        {
          id: '1',
          name: 'Upper Body Strength',
          date: '2024-01-20',
          duration: 45,
          status: 'completed',
          exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press']
        },
        {
          id: '2',
          name: 'Cardio HIIT',
          date: '2024-01-22',
          duration: 30,
          status: 'scheduled',
          exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats']
        },
        {
          id: '3',
          name: 'Leg Day',
          date: '2024-01-18',
          duration: 60,
          status: 'completed',
          exercises: ['Squats', 'Deadlifts', 'Lunges']
        }
      ]);

      setMacroEntries([
        {
          id: '1',
          date: '2024-01-20',
          protein: 120,
          carbs: 180,
          fats: 65,
          calories: 1685
        },
        {
          id: '2',
          date: '2024-01-19',
          protein: 135,
          carbs: 165,
          fats: 70,
          calories: 1725
        }
      ]);

      setProgressPictures([
        {
          id: '1',
          date: '2024-01-20',
          imageUrl: '/api/placeholder/300/400/',
          notes: 'Front view - Week 2',
          type: 'front'
        },
        {
          id: '2',
          date: '2024-01-20',
          imageUrl: '/api/placeholder/300/400/',
          notes: 'Side view - Week 2',
          type: 'side'
        },
        {
          id: '3',
          date: '2024-01-13',
          imageUrl: '/api/placeholder/300/400/',
          notes: 'Front view - Week 1',
          type: 'front'
        },
        {
          id: '4',
          date: '2024-01-13',
          imageUrl: '/api/placeholder/300/400/',
          notes: 'Side view - Week 1',
          type: 'side'
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
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
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">Unable to load your dashboard. Please try again.</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const weightLoss = client.currentWeight - client.goalWeight;
  const recentWorkouts = workouts.filter(w => 
    new Date(w.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const completedWorkouts = recentWorkouts.filter(w => w.status === 'completed').length;
  const totalCalories = macroEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const avgCalories = macroEntries.length > 0 ? Math.round(totalCalories / macroEntries.length) : 0;

  // Button handlers
  const handleViewAllWorkouts = () => {
    router.push('/client/workouts');
  };

  const handleAddNutritionEntry = () => {
    setShowNutritionModal(true);
  };

  const handleLogWorkout = () => {
    setShowWorkoutModal(true);
  };

  const handleTrackNutrition = () => {
    setShowNutritionModal(true);
  };

  const handleViewProgress = () => {
    router.push('/client/progress');
  };

  const handleAddProgressPicture = () => {
    setShowProgressPictureModal(true);
  };

  const handleCloseModals = () => {
    setShowWorkoutModal(false);
    setShowNutritionModal(false);
    setShowProgressPictureModal(false);
  };

  return (
    <>
      {/* Full-width banner that aligns with sidebar - positioned absolutely */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {client.name}!</h1>
            <p className="text-blue-100 text-lg">
              Here's your fitness progress and upcoming activities.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Workouts This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{completedWorkouts}</p>
                </div>
              </div>
            </div>

            {/* Average Calories */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Utensils className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg Daily Calories</p>
                  <p className="text-2xl font-bold text-gray-900">{avgCalories}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Workouts */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Workouts</h2>
                  <button 
                    onClick={handleViewAllWorkouts}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {workouts.slice(0, 3).map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          workout.status === 'completed' ? 'bg-green-100' : 
                          workout.status === 'scheduled' ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          {workout.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : workout.status === 'scheduled' ? (
                            <Clock className="h-4 w-4 text-blue-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{workout.name}</p>
                          <p className="text-sm text-gray-600">{workout.date} • {workout.duration} min</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        workout.status === 'completed' ? 'bg-green-100 text-green-800' :
                        workout.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workout.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition Tracking */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Nutrition Tracking</h2>
                  <button 
                    onClick={handleAddNutritionEntry}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Add Entry
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {macroEntries.slice(0, 2).map((entry) => (
                    <div key={entry.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-gray-900">{entry.date}</p>
                        <p className="text-sm font-medium text-gray-600">{entry.calories} cal</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500">Protein</p>
                          <p className="font-semibold text-gray-900">{entry.protein}g</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Carbs</p>
                          <p className="font-semibold text-gray-900">{entry.carbs}g</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Fats</p>
                          <p className="font-semibold text-gray-900">{entry.fats}g</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Pictures */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Progress Pictures</h2>
                  <button 
                    onClick={handleAddProgressPicture}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Add Picture
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {progressPictures.slice(0, 4).map((picture) => (
                    <div key={picture.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={picture.imageUrl} 
                          alt={picture.notes}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                          <p className="text-xs font-medium">{picture.type}</p>
                          <p className="text-xs">{picture.date}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 truncate">{picture.notes}</p>
                        <p className="text-xs text-gray-400">{picture.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {progressPictures.length > 4 && (
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => router.push('/client/progress')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All Pictures ({progressPictures.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button 
                onClick={handleLogWorkout}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Plus className="h-6 w-6 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Log Workout</span>
              </button>
              <button 
                onClick={handleTrackNutrition}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Utensils className="h-6 w-6 text-green-600 mr-3" />
                <span className="font-medium text-gray-900">Track Nutrition</span>
              </button>
              <button 
                onClick={handleViewProgress}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <BarChart3 className="h-6 w-6 text-purple-600 mr-3" />
                <span className="font-medium text-gray-900">View Progress</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any notes about your workout"
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
                  Meal Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Breakfast, Lunch, Dinner"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein (g)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs (g)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fats (g)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
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
                  Track Nutrition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Picture Upload Modal */}
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
                  Picture Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="front">Front View</option>
                  <option value="side">Side View</option>
                  <option value="back">Back View</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any notes about this progress picture"
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
    </>
  );
}