'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Users, Activity, Target, Calendar, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';

export default function WhopPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWhop = async () => {
      try {
        if (window.parent !== window) {
          console.log('Running in Whop iframe');

          const urlParams = new URLSearchParams(window.location.search);
          const userId = urlParams.get('userId') || urlParams.get('whop_user_id') || urlParams.get('user_id');
          const companyId = urlParams.get('companyId') || urlParams.get('whop_company_id') || urlParams.get('company_id');

          console.log('URL params:', { userId, companyId });

          if (userId) {
            const response = await fetch('/api/whop/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId }),
            });

            if (response.ok) {
              const data = await response.json();
              setUser(data.user);
              setIsAuthenticated(true);
            } else {
              const errorData = await response.json();
              setError(errorData.error || 'Authentication failed');
            }
          } else {
            // Allow access for testing without Whop params in development
            if (process.env.NODE_ENV === 'development') {
              console.log('Development mode: No Whop user ID provided, proceeding with mock user.');
              setUser({ id: 'test_user_dev', name: 'Dev User', email: 'dev@example.com' });
              setIsAuthenticated(true);
            } else {
              setError('No Whop user ID provided. Please access via Whop platform.');
            }
          }
        } else {
          window.location.href = '/'; // Redirect if not in iframe
        }
      } catch (err: any) {
        console.error('Whop initialization error:', err);
        setError(err.message || 'Failed to initialize Whop integration');
      } finally {
        setLoading(false);
      }
    };

    initializeWhop();
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading Fitness CRM...</p>
          <p className="text-sm text-gray-500 mt-2 text-center">Initializing Whop integration...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl text-center">
          <div className="h-16 w-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Integration Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                  <button
                    onClick={handleBackClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-white/50 rounded-xl"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                        Fitness CRM
                      </h1>
                      {user && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <span className="text-sm text-emerald-600 font-medium">Whop Connected</span>
                        </div>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 font-medium">Comprehensive fitness client management system</p>
                    {user && (
                      <p className="text-sm text-gray-500">User ID: {user.id}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View Clients
                </button>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <Calendar className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Workouts</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Fitness CRM</h2>
            <p className="text-gray-600 text-lg mb-6">
              Your comprehensive fitness client management system is ready to help you track progress,
              manage workouts, and achieve your clients' goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}