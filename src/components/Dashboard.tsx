'use client';

import React, { useState, useEffect } from 'react';
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
  Heart,
  Users
} from 'lucide-react';
import CoachDashboard from './CoachDashboard';

interface DashboardProps {
  trainerId: string;
}

export default function Dashboard({ trainerId }: DashboardProps) {
  const [userRole, setUserRole] = useState<'coach' | 'client' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would determine the user's role from authentication
    // For now, we'll assume it's a coach for the main dashboard
    setUserRole('coach');
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render coach dashboard
  if (userRole === 'coach') {
    return <CoachDashboard coachId={trainerId} />;
  }

  // Render client dashboard (this would be handled by the client pages)
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight mb-4">
              Welcome to Fitness CRM!
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Your comprehensive fitness management platform
            </p>
          </div>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Client Management</h3>
          </div>
          <p className="text-gray-600">
            Manage your clients, track their progress, and communicate effectively.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Dumbbell className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Workout Templates</h3>
          </div>
          <p className="text-gray-600">
            Create and assign workout templates to your clients with ease.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Utensils className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Macro Tracking</h3>
          </div>
          <p className="text-gray-600">
            Set macro targets and track nutrition progress for your clients.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Check-ins</h3>
          </div>
          <p className="text-gray-600">
            Monitor client mood, energy, sleep, and overall well-being.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Calendar & Goals</h3>
          </div>
          <p className="text-gray-600">
            Track goals and tasks with an intuitive calendar interface.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Target className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Branding</h3>
          </div>
          <p className="text-gray-600">
            Customize your app's appearance with your brand colors and styling.
          </p>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">For Coaches</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Add your first client</li>
              <li>• Create workout templates</li>
              <li>• Set up macro targets</li>
              <li>• Customize your branding</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">For Clients</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Complete your daily check-ins</li>
              <li>• Log your workouts</li>
              <li>• Track your nutrition</li>
              <li>• Monitor your progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
