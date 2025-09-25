'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Activity, 
  Utensils,
  Weight,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  Award,
  Star,
  Heart,
  Timer,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { db } from '@/lib/database';
import { AnalyticsData } from '@/types';
import PageHeader from '@/components/PageHeader';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  useEffect(() => {
    // Generate mock analytics data
    const clients = db.getClients();
    const measurements = db.getMeasurements();
    const workouts = db.getWorkouts();
    const checkIns = db.getCheckIns();

    // Calculate weight changes
    const weightChanges = clients.map(client => {
      const clientMeasurements = measurements
        .filter(m => m.clientId === client.id && m.type === 'weight')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      
      const startWeight = clientMeasurements[clientMeasurements.length - 1]?.value || 0;
      const currentWeight = clientMeasurements[0]?.value || 0;
      const change = currentWeight - startWeight;
      const changePercent = startWeight > 0 ? (change / startWeight) * 100 : 0;

      return {
        clientId: client.id,
        clientName: client.name,
        startWeight,
        currentWeight,
        change,
        changePercent,
        period: '30 days'
      };
    });

    // Calculate workout statistics
    const workoutsCompleted = clients.map(client => {
      const clientWorkouts = workouts.filter(w => w.clientId === client.id);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const thisWeek = clientWorkouts.filter(w => w.date >= weekAgo && w.status === 'completed').length;
      const thisMonth = clientWorkouts.filter(w => w.date >= monthAgo && w.status === 'completed').length;
      const averageDuration = clientWorkouts.length > 0 
        ? clientWorkouts.reduce((sum, w) => sum + w.duration, 0) / clientWorkouts.length 
        : 0;

      return {
        clientId: client.id,
        clientName: client.name,
        totalWorkouts: clientWorkouts.length,
        thisWeek,
        thisMonth,
        averageDuration: Math.round(averageDuration)
      };
    });

    // Calculate meal tracking statistics (mock data)
    const mealsTracked = clients.map(client => {
      const clientCheckIns = checkIns.filter(c => c.clientId === client.id);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const thisWeek = clientCheckIns.filter(c => c.date >= weekAgo).length;
      const thisMonth = clientCheckIns.filter(c => c.date >= monthAgo).length;
      
      return {
        clientId: client.id,
        clientName: client.name,
        totalMeals: clientCheckIns.length * 3, // Assuming 3 meals per check-in
        thisWeek: thisWeek * 3,
        thisMonth: thisMonth * 3,
        averageCalories: 2000 // Mock average
      };
    });

    // Calculate macro compliance (mock data)
    const macroCompliance = clients.map(client => ({
      clientId: client.id,
      clientName: client.name,
      proteinCompliance: Math.random() * 40 + 60, // 60-100%
      carbsCompliance: Math.random() * 40 + 60,
      fatCompliance: Math.random() * 40 + 60,
      overallCompliance: Math.random() * 30 + 70
    }));

    setAnalyticsData({
      weightChange: weightChanges,
      workoutsCompleted,
      mealsTracked,
      macroCompliance
    });
  }, [selectedPeriod]);

  const handleBackClick = () => {
    window.history.back();
  };

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading analytics...</p>
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
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Analytics
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">Deep insights into client progress and business metrics</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="px-6 py-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <Filter className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.weightChange.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Workouts This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.workoutsCompleted.reduce((sum, w) => sum + w.thisMonth, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Meals Tracked</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.mealsTracked.reduce((sum, m) => sum + m.thisMonth, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Macro Compliance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(analyticsData.macroCompliance.reduce((sum, m) => sum + m.overallCompliance, 0) / analyticsData.macroCompliance.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weight Loss/Gain Analytics */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Weight className="h-5 w-5 mr-2 text-blue-500" />
              Weight Progress
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Track progress</span>
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.weightChange.map((client) => (
              <div key={client.clientId} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Weight className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{client.clientName}</h3>
                      <p className="text-sm text-gray-600">
                        {client.startWeight}lbs → {client.currentWeight}lbs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        client.change > 0 ? 'text-red-600' : 
                        client.change < 0 ? 'text-emerald-600' : 'text-gray-600'
                      }`}>
                        {client.change > 0 ? '+' : ''}{client.change.toFixed(1)}lbs
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.changePercent > 0 ? '+' : ''}{client.changePercent.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center">
                      {client.change > 0 ? (
                        <TrendingUp className="h-5 w-5 text-red-500" />
                      ) : client.change < 0 ? (
                        <TrendingDown className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <div className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workouts Completed Analytics */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-emerald-500" />
              Workout Activity
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Timer className="h-4 w-4" />
              <span>Track activity</span>
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.workoutsCompleted.map((client) => (
              <div key={client.clientId} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{client.clientName}</h3>
                      <p className="text-sm text-gray-600">
                        {client.totalWorkouts} total workouts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.thisWeek}</div>
                      <div className="text-sm text-gray-500">This Week</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.thisMonth}</div>
                      <div className="text-sm text-gray-500">This Month</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.averageDuration}m</div>
                      <div className="text-sm text-gray-500">Avg Duration</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meals Tracked Analytics */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-purple-500" />
              Nutrition Tracking
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Heart className="h-4 w-4" />
              <span>Track nutrition</span>
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.mealsTracked.map((client) => (
              <div key={client.clientId} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Utensils className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{client.clientName}</h3>
                      <p className="text-sm text-gray-600">
                        {client.totalMeals} total meals tracked
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.thisWeek}</div>
                      <div className="text-sm text-gray-500">This Week</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.thisMonth}</div>
                      <div className="text-sm text-gray-500">This Month</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{client.averageCalories}</div>
                      <div className="text-sm text-gray-500">Avg Calories</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Macro Compliance Analytics */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2 text-orange-500" />
              Macro Compliance
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4" />
              <span>Track compliance</span>
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.macroCompliance.map((client) => (
              <div key={client.clientId} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.clientName}</h3>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {client.overallCompliance >= 80 ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className={`ml-2 text-sm font-medium ${
                      client.overallCompliance >= 80 ? 'text-emerald-600' : 'text-yellow-600'
                    }`}>
                      {client.overallCompliance.toFixed(0)}% Overall
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-gray-900">
                      {client.proteinCompliance.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-500">Protein</div>
                  </div>
                  <div className="text-center bg-white/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-gray-900">
                      {client.carbsCompliance.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-500">Carbs</div>
                  </div>
                  <div className="text-center bg-white/50 rounded-lg p-4">
                    <div className="text-lg font-bold text-gray-900">
                      {client.fatCompliance.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-500">Fat</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
