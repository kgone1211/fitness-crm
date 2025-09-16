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
  AlertCircle
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

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Analytics"
        description="Deep insights into client progress and business metrics"
        breadcrumbs={[{ name: 'Analytics' }]}
        showBackButton={true}
      >
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </PageHeader>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.weightChange.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Workouts This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.workoutsCompleted.reduce((sum, w) => sum + w.thisMonth, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Utensils className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Meals Tracked</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.mealsTracked.reduce((sum, m) => sum + m.thisMonth, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
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
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weight Progress</h2>
          <Weight className="h-6 w-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.weightChange.map((client) => (
            <div key={client.clientId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{client.clientName}</h3>
                <p className="text-sm text-gray-600">
                  {client.startWeight}lbs → {client.currentWeight}lbs
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    client.change > 0 ? 'text-red-600' : 
                    client.change < 0 ? 'text-green-600' : 'text-gray-600'
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
                    <TrendingDown className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workouts Completed Analytics */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Workout Activity</h2>
          <Activity className="h-6 w-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.workoutsCompleted.map((client) => (
            <div key={client.clientId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{client.clientName}</h3>
                <p className="text-sm text-gray-600">
                  {client.totalWorkouts} total workouts
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.thisWeek}</div>
                  <div className="text-sm text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.thisMonth}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.averageDuration}m</div>
                  <div className="text-sm text-gray-500">Avg Duration</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meals Tracked Analytics */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Nutrition Tracking</h2>
          <Utensils className="h-6 w-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.mealsTracked.map((client) => (
            <div key={client.clientId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{client.clientName}</h3>
                <p className="text-sm text-gray-600">
                  {client.totalMeals} total meals tracked
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.thisWeek}</div>
                  <div className="text-sm text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.thisMonth}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{client.averageCalories}</div>
                  <div className="text-sm text-gray-500">Avg Calories</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Macro Compliance Analytics */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Macro Compliance</h2>
          <Target className="h-6 w-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.macroCompliance.map((client) => (
            <div key={client.clientId} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{client.clientName}</h3>
                <div className="flex items-center">
                  {client.overallCompliance >= 80 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className={`ml-2 text-sm font-medium ${
                    client.overallCompliance >= 80 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {client.overallCompliance.toFixed(0)}% Overall
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {client.proteinCompliance.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-500">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {client.carbsCompliance.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-500">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
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
  );
}
