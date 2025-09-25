'use client';

import { useState, useEffect } from 'react';
import { Users, Activity, Target, Calendar, BarChart3, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

interface WhopUser {
  id: string;
  email: string;
  company_id: string;
  subscription_status: 'active' | 'inactive' | 'cancelled';
}

export default function WhopPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'workouts' | 'schedule' | 'progress' | 'measurements' | 'analytics' | 'settings'>('dashboard');
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [whopUser, setWhopUser] = useState<WhopUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'workouts', label: 'Workouts', icon: Target },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  useEffect(() => {
    initializeWhopUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeWhopUser = async () => {
    try {
      setLoading(true);
      
      // Get Whop user ID from URL parameters or Whop context
      const urlParams = new URLSearchParams(window.location.search);
      let whopUserId = urlParams.get('userId') || urlParams.get('whop_user_id') || urlParams.get('user_id');
      
      // Development mode - use test user if no user ID provided
      if (!whopUserId && process.env.NODE_ENV === 'development') {
        whopUserId = 'test_user_123';
        console.log('Development mode: Using test user ID');
      }
      
      if (!whopUserId) {
        setError('No Whop user ID provided');
        setLoading(false);
        return;
      }

      // Validate user with Whop API
      const response = await fetch(`/api/whop/auth?userId=${whopUserId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to authenticate with Whop');
        setLoading(false);
        return;
      }

      const { user: whopUserData } = await response.json();
      setWhopUser(whopUserData);

      // Create or get local user
      const localUserResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: whopUserData.email }),
      });

      if (localUserResponse.ok) {
        const { userId } = await localUserResponse.json();
        setUser({ id: userId, email: whopUserData.email });
      }

    } catch (error) {
      console.error('Whop initialization error:', error);
      setError('Failed to initialize Whop integration');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connecting to Whop...</h2>
          <p className="text-gray-600">Please wait while we authenticate your account.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user || !whopUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No User Found</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 py-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fitness CRM</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Whop Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'clients' && <div>Clients content here</div>}
        {activeTab === 'workouts' && <div>Workouts content here</div>}
        {activeTab === 'schedule' && <div>Schedule content here</div>}
        {activeTab === 'analytics' && <div>Analytics content here</div>}
      </main>
    </div>
  );
}