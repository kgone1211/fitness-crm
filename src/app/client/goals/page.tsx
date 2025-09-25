'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Weight, 
  Activity, 
  CheckCircle,
  Edit3,
  Plus
} from 'lucide-react';
import { db } from '@/lib/database';
import { Client } from '@/types';

export default function ClientGoals() {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState({
    weight: '',
    description: '',
    targetDate: ''
  });

  useEffect(() => {
    const loadClientData = async () => {
      try {
        // Get client data from localStorage (set during login)
        const clientData = localStorage.getItem('client-data');
        if (!clientData) {
          // No client data, redirect to login
          window.location.href = '/client/login';
          return;
        }

        const parsedClient = JSON.parse(clientData);
        setClient(parsedClient);
        
        // Set goals from client data
        setGoals({
          weight: parsedClient.goalWeight?.toString() || '',
          description: parsedClient.goals?.description || '',
          targetDate: parsedClient.goals?.targetDate || ''
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading client data:', error);
        setLoading(false);
      }
    };

    loadClientData();
  }, []);

  const handleSaveGoals = async () => {
    // In a real app, this would save to the backend
    console.log('Saving goals:', goals);
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    if (client?.goals) {
      setGoals({
        weight: client.goals.weight?.toString() || '',
        description: client.goals.description || '',
        targetDate: client.goals.targetDate || ''
      });
    }
    setIsEditing(false);
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
          <p className="text-gray-600">Unable to load your goals data.</p>
        </div>
      </div>
    );
  }

  // Calculate progress
  const currentWeight = 150; // This would come from measurements
  const targetWeight = parseFloat(goals.weight) || 0;
  const weightProgress = targetWeight > 0 ? 
    Math.min(100, Math.max(0, ((currentWeight - targetWeight) / Math.abs(currentWeight - targetWeight)) * 50 + 50)) : 0;

  return (
    <div className="bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Goals</h1>
          <p className="text-gray-600">Set and track your fitness objectives</p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Goals</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoals}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weight Goal */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Weight className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Weight Goal</h3>
              <p className="text-sm text-gray-600">Target weight objective</p>
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Weight (lbs)
                </label>
                <input
                  type="number"
                  value={goals.weight}
                  onChange={(e) => setGoals(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter target weight"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {goals.weight ? `${goals.weight} lbs` : 'Not set'}
              </div>
              {goals.weight && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current: {currentWeight} lbs</span>
                    <span>Target: {goals.weight} lbs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${weightProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {weightProgress.toFixed(1)}% progress
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Target Date */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Target Date</h3>
              <p className="text-sm text-gray-600">When you want to achieve your goals</p>
            </div>
          </div>
          
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={goals.targetDate}
                onChange={(e) => setGoals(prev => ({ ...prev, targetDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {goals.targetDate ? 
                  new Date(goals.targetDate).toLocaleDateString() : 
                  'Not set'
                }
              </div>
              {goals.targetDate && (
                <div className="text-sm text-gray-600">
                  {(() => {
                    const target = new Date(goals.targetDate);
                    const today = new Date();
                    const diffTime = target.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays > 0) {
                      return `${diffDays} days remaining`;
                    } else if (diffDays === 0) {
                      return 'Today!';
                    } else {
                      return `${Math.abs(diffDays)} days overdue`;
                    }
                  })()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* General Goals */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-sm text-gray-600">Your fitness objectives</p>
            </div>
          </div>
          
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Description
              </label>
              <textarea
                value={goals.description}
                onChange={(e) => setGoals(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your fitness goals..."
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-700">
                {goals.description || 'No specific goals described yet.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight Progress */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Weight Progress</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Starting Weight</span>
                <span className="font-medium">160 lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Weight</span>
                <span className="font-medium">{currentWeight} lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target Weight</span>
                <span className="font-medium">{goals.weight || 'Not set'} lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="font-medium text-blue-600">
                  {goals.weight ? 
                    `${Math.abs(currentWeight - 160)} lbs ${currentWeight < 160 ? 'lost' : 'gained'}` : 
                    'No target set'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Workout Progress */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Workout Progress</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-medium">3 workouts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-medium">12 workouts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Completed</span>
                <span className="font-medium">45 workouts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Consistency</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quotes */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Today's Motivation</h3>
        <p className="text-blue-100 italic">
          "The only bad workout is the one that didn't happen. Every step forward is progress."
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">Keep pushing towards your goals!</span>
        </div>
      </div>
    </div>
  );
}
