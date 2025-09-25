'use client';

import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Calendar,
  Flame,
  Zap,
  Droplets,
  Apple
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { db } from '@/lib/database';
import { MacroTarget, MacroLog } from '@/types';

export default function ClientNutrition() {
  const [macroTargets, setMacroTargets] = useState<MacroTarget | null>(null);
  const [macroLogs, setMacroLogs] = useState<MacroLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const loadNutritionData = async () => {
      try {
        // Get client data from localStorage (set during login)
        const clientData = localStorage.getItem('client-data');
        if (!clientData) {
          // No client data, redirect to login
          window.location.href = '/client/login';
          return;
        }

        const parsedClient = JSON.parse(clientData);
        const macroData = db.getMacroData(parsedClient.id);
        setMacroTargets(macroData.targets);
        setMacroLogs(macroData.logs);
        setLoading(false);
      } catch (error) {
        console.error('Error loading nutrition data:', error);
        setLoading(false);
      }
    };

    loadNutritionData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get today's macro log
  const todayLog = macroLogs.find(log => 
    new Date(log.date).toDateString() === new Date(selectedDate).toDateString()
  );

  // Calculate daily totals
  const dailyTotals = {
    calories: todayLog?.calories || 0,
    protein: todayLog?.protein || 0,
    carbs: todayLog?.carbs || 0,
    fat: todayLog?.fat || 0,
    fiber: todayLog?.fiber || 0,
    sugar: todayLog?.sugar || 0
  };

  // Calculate progress percentages
  const progress = {
    calories: macroTargets ? (dailyTotals.calories / macroTargets.calories) * 100 : 0,
    protein: macroTargets ? (dailyTotals.protein / macroTargets.protein) * 100 : 0,
    carbs: macroTargets ? (dailyTotals.carbs / macroTargets.carbs) * 100 : 0,
    fat: macroTargets ? (dailyTotals.fat / macroTargets.fat) * 100 : 0,
    fiber: macroTargets ? (dailyTotals.fiber / macroTargets.fiber) * 100 : 0,
    sugar: macroTargets ? (dailyTotals.sugar / macroTargets.sugar) * 100 : 0
  };

  // Prepare data for charts
  const macroChartData = [
    { name: 'Protein', value: dailyTotals.protein, color: '#3B82F6', target: macroTargets?.protein || 0 },
    { name: 'Carbs', value: dailyTotals.carbs, color: '#10B981', target: macroTargets?.carbs || 0 },
    { name: 'Fat', value: dailyTotals.fat, color: '#F59E0B', target: macroTargets?.fat || 0 }
  ];

  const weeklyData = macroLogs
    .slice(0, 7)
    .reverse()
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
      calories: log.calories,
      protein: log.protein,
      carbs: log.carbs,
      fat: log.fat
    }));

  const MacroProgressBar = ({ 
    label, 
    current, 
    target, 
    unit, 
    color, 
    icon: Icon 
  }: { 
    label: string; 
    current: number; 
    target: number; 
    unit: string; 
    color: string; 
    icon: any;
  }) => {
    const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
    const isOverTarget = current > target;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className={isOverTarget ? 'text-red-600' : 'text-gray-900'}>
              {current.toFixed(1)}
            </span>
            <span className="text-gray-500"> / {target.toFixed(1)} {unit}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isOverTarget ? 'bg-red-500' : color
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500">
          {percentage.toFixed(1)}% of daily target
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracking</h1>
          <p className="text-gray-600">Monitor your daily macro and calorie intake</p>
        </div>
        <div className="flex space-x-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Log Food</span>
          </button>
        </div>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-gray-900">{dailyTotals.calories}</p>
              <p className="text-sm text-gray-500">
                {macroTargets ? `of ${macroTargets.calories} target` : 'No target set'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Protein</p>
              <p className="text-2xl font-bold text-gray-900">{dailyTotals.protein}g</p>
              <p className="text-sm text-gray-500">
                {macroTargets ? `${progress.protein.toFixed(1)}% of target` : 'No target set'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Apple className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Carbs</p>
              <p className="text-2xl font-bold text-gray-900">{dailyTotals.carbs}g</p>
              <p className="text-sm text-gray-500">
                {macroTargets ? `${progress.carbs.toFixed(1)}% of target` : 'No target set'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Droplets className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fat</p>
              <p className="text-2xl font-bold text-gray-900">{dailyTotals.fat}g</p>
              <p className="text-sm text-gray-500">
                {macroTargets ? `${progress.fat.toFixed(1)}% of target` : 'No target set'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Progress */}
      {macroTargets && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Macro Progress</h3>
          <div className="space-y-6">
            <MacroProgressBar
              label="Calories"
              current={dailyTotals.calories}
              target={macroTargets.calories}
              unit="kcal"
              color="bg-orange-500"
              icon={Flame}
            />
            <MacroProgressBar
              label="Protein"
              current={dailyTotals.protein}
              target={macroTargets.protein}
              unit="g"
              color="bg-blue-500"
              icon={Zap}
            />
            <MacroProgressBar
              label="Carbohydrates"
              current={dailyTotals.carbs}
              target={macroTargets.carbs}
              unit="g"
              color="bg-green-500"
              icon={Apple}
            />
            <MacroProgressBar
              label="Fat"
              current={dailyTotals.fat}
              target={macroTargets.fat}
              unit="g"
              color="bg-yellow-500"
              icon={Droplets}
            />
            <MacroProgressBar
              label="Fiber"
              current={dailyTotals.fiber}
              target={macroTargets.fiber}
              unit="g"
              color="bg-purple-500"
              icon={Target}
            />
            <MacroProgressBar
              label="Sugar"
              current={dailyTotals.sugar}
              target={macroTargets.sugar}
              unit="g"
              color="bg-pink-500"
              icon={Utensils}
            />
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Macro Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}g`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {macroChartData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#F59E0B" name="Calories" />
                <Bar dataKey="protein" fill="#3B82F6" name="Protein" />
                <Bar dataKey="carbs" fill="#10B981" name="Carbs" />
                <Bar dataKey="fat" fill="#F59E0B" name="Fat" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Food Logs</h3>
        </div>
        <div className="p-6">
          {macroLogs.length > 0 ? (
            <div className="space-y-4">
              {macroLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {new Date(log.date).toLocaleDateString()}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {log.calories} calories • {log.protein}g protein • {log.carbs}g carbs • {log.fat}g fat
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {log.meals?.length || 0} meals
                    </div>
                    <div className="text-xs text-gray-500">
                      {log.notes || 'No notes'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No food logs recorded yet</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Log Your First Meal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Plus className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Log Breakfast</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Plus className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Log Lunch</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <Plus className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Log Dinner</span>
          </button>
        </div>
      </div>
    </div>
  );
}
