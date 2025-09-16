'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar, 
  Weight, 
  Flame,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { db } from '@/lib/database';
import { Client, Measurement, WorkoutSession } from '@/types';

export default function ClientDashboard() {
  const [client, setClient] = useState<Client | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClientData = async () => {
      try {
        // In a real app, this would come from authentication context
        const clientId = '1'; // Alice Johnson's ID
        
        // Load client data
        const clients = await db.getClients();
        const clientData = clients.find(c => c.id === clientId);
        setClient(clientData || null);

        // Load measurements
        const clientMeasurements = await db.getMeasurements(clientId);
        setMeasurements(clientMeasurements);

        // Load recent workouts
        const workouts = await db.getWorkoutSessions('1', clientId);
        setRecentWorkouts(workouts.slice(0, 3)); // Last 3 workouts

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
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
          <p className="text-gray-600">Unable to load your profile data.</p>
        </div>
      </div>
    );
  }

  // Calculate weight change
  const currentWeight = measurements.find(m => m.type === 'weight' && m.unit === 'lbs')?.value || 0;
  const previousWeight = measurements
    .filter(m => m.type === 'weight' && m.unit === 'lbs')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[1]?.value || currentWeight;
  
  const weightChange = currentWeight - previousWeight;
  const weightChangePercent = previousWeight > 0 ? ((weightChange / previousWeight) * 100) : 0;

  // Calculate this week's stats
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const thisWeekWorkouts = recentWorkouts.filter(w => 
    new Date(w.startTime) >= oneWeekAgo
  ).length;

  const completedWorkouts = recentWorkouts.filter(w => w.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {client.name}!</h1>
        <p className="text-blue-100">
          Here's your fitness progress and upcoming activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Weight */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Weight className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Weight</p>
              <p className="text-2xl font-bold text-gray-900">{currentWeight} lbs</p>
              {weightChange !== 0 && (
                <div className={`flex items-center text-sm ${
                  weightChange > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    weightChange > 0 ? 'rotate-180' : ''
                  }`} />
                  {Math.abs(weightChange).toFixed(1)} lbs
                  {weightChangePercent !== 0 && (
                    <span className="ml-1">({Math.abs(weightChangePercent).toFixed(1)}%)</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* This Week's Workouts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{thisWeekWorkouts}</p>
              <p className="text-sm text-gray-500">workouts completed</p>
            </div>
          </div>
        </div>

        {/* Total Workouts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedWorkouts}</p>
              <p className="text-sm text-gray-500">workouts</p>
            </div>
          </div>
        </div>

        {/* Next Workout */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Workout</p>
              <p className="text-lg font-bold text-gray-900">Tomorrow</p>
              <p className="text-sm text-gray-500">Upper Body</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Workouts</h3>
          </div>
          <div className="p-6">
            {recentWorkouts.length > 0 ? (
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{workout.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(workout.startTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        workout.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : workout.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workout.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {workout.exercises.length} exercises
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent workouts</p>
              </div>
            )}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Goal Progress</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Weight Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Weight Goal</span>
                  <span className="text-sm text-gray-500">
                    {client.goals?.weight ? `${client.goals.weight} lbs` : 'Not set'}
                  </span>
                </div>
                {client.goals?.weight && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, Math.max(0, (currentWeight / client.goals.weight) * 100))}%` 
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Weekly Workout Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Weekly Workouts</span>
                  <span className="text-sm text-gray-500">{thisWeekWorkouts}/3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (thisWeekWorkouts / 3) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* General Goals */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Goals</h4>
                <div className="space-y-2">
                  {client.goals?.description ? (
                    <p className="text-sm text-gray-600">{client.goals.description}</p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No specific goals set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Activity className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Start Workout</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Weight className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Log Weight</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <Target className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Update Goals</span>
          </button>
        </div>
      </div>
    </div>
  );
}
