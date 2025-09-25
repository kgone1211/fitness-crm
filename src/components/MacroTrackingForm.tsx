'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Target, 
  Calendar, 
  Utensils, 
  Trash2, 
  Edit3,
  Save,
  X,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface MacroTrackingFormProps {
  clientId: string;
  onClose: () => void;
}

interface MacroData {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null;
  logs: Array<{
    id: string;
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    date: string;
    notes?: string;
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export default function MacroTrackingForm({ clientId, onClose }: MacroTrackingFormProps) {
  const [macroData, setMacroData] = useState<MacroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'targets' | 'logs'>('targets');
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
  const [editingLog, setEditingLog] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Form states
  const [targetForm, setTargetForm] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const [logForm, setLogForm] = useState({
    mealName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    notes: '',
  });

  // Fetch macro data
  const fetchMacroData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/macros?clientId=${clientId}&date=${selectedDate}`);
      if (!response.ok) throw new Error('Failed to fetch macro data');
      const data = await response.json();
      setMacroData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch macro data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMacroData();
  }, [clientId, selectedDate]);

  // Save macro targets
  const handleSaveTargets = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/macros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          type: 'targets',
          targets: {
            calories: parseInt(targetForm.calories),
            protein: parseInt(targetForm.protein),
            carbs: parseInt(targetForm.carbs),
            fats: parseInt(targetForm.fats),
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to save targets');
      await fetchMacroData();
      setShowTargetForm(false);
      setTargetForm({ calories: '', protein: '', carbs: '', fats: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save targets');
    }
  };

  // Save macro log
  const handleSaveLog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingLog ? `/api/macros?logId=${editingLog}` : '/api/macros';
      const method = editingLog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          type: 'log',
          targets: {
            mealName: logForm.mealName,
            calories: parseInt(logForm.calories),
            protein: parseInt(logForm.protein),
            carbs: parseInt(logForm.carbs),
            fats: parseInt(logForm.fats),
            date: selectedDate,
            notes: logForm.notes,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to save log');
      await fetchMacroData();
      setShowLogForm(false);
      setEditingLog(null);
      setLogForm({ mealName: '', calories: '', protein: '', carbs: '', fats: '', notes: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save log');
    }
  };

  // Delete macro log
  const handleDeleteLog = async (logId: string) => {
    try {
      const response = await fetch(`/api/macros?logId=${logId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete log');
      await fetchMacroData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete log');
    }
  };

  // Edit macro log
  const handleEditLog = (log: any) => {
    setLogForm({
      mealName: log.mealName,
      calories: log.calories.toString(),
      protein: log.protein.toString(),
      carbs: log.carbs.toString(),
      fats: log.fats.toString(),
      notes: log.notes || '',
    });
    setEditingLog(log.id);
    setShowLogForm(true);
  };

  // Calculate progress percentages
  const getProgressPercentage = (current: number, target: number) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = getProgressPercentage(current, target);
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading macro data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Utensils className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Macro Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date Selector */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('targets')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'targets'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Target className="h-4 w-4 inline mr-2" />
            Targets
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'logs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Utensils className="h-4 w-4 inline mr-2" />
            Daily Logs
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {activeTab === 'targets' && (
            <div className="space-y-6">
              {/* Current Targets Display */}
              {macroData?.targets ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Current Targets</h3>
                    <button
                      onClick={() => setShowTargetForm(true)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Targets
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{macroData.targets.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{macroData.targets.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{macroData.targets.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{macroData.targets.fats}g</div>
                      <div className="text-sm text-gray-600">Fats</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No targets set</h3>
                  <p className="text-gray-600 mb-4">Set macro targets to start tracking nutrition</p>
                  <button
                    onClick={() => setShowTargetForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Set Targets
                  </button>
                </div>
              )}

              {/* Target Form */}
              {showTargetForm && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {macroData?.targets ? 'Edit' : 'Set'} Macro Targets
                  </h3>
                  <form onSubmit={handleSaveTargets} className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Calories
                        </label>
                        <input
                          type="number"
                          value={targetForm.calories}
                          onChange={(e) => setTargetForm(prev => ({ ...prev, calories: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="2000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Protein (g)
                        </label>
                        <input
                          type="number"
                          value={targetForm.protein}
                          onChange={(e) => setTargetForm(prev => ({ ...prev, protein: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="150"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Carbs (g)
                        </label>
                        <input
                          type="number"
                          value={targetForm.carbs}
                          onChange={(e) => setTargetForm(prev => ({ ...prev, carbs: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="250"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fats (g)
                        </label>
                        <input
                          type="number"
                          value={targetForm.fats}
                          onChange={(e) => setTargetForm(prev => ({ ...prev, fats: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="65"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowTargetForm(false)}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Targets
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              {/* Daily Progress */}
              {macroData?.targets && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Progress</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getProgressColor(macroData.totalCalories, macroData.targets.calories)}`}>
                        {macroData.totalCalories}
                      </div>
                      <div className="text-sm text-gray-600">/ {macroData.targets.calories} Calories</div>
                      <div className="text-xs text-gray-500">
                        {getProgressPercentage(macroData.totalCalories, macroData.targets.calories).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getProgressColor(macroData.totalProtein, macroData.targets.protein)}`}>
                        {macroData.totalProtein}g
                      </div>
                      <div className="text-sm text-gray-600">/ {macroData.targets.protein}g Protein</div>
                      <div className="text-xs text-gray-500">
                        {getProgressPercentage(macroData.totalProtein, macroData.targets.protein).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getProgressColor(macroData.totalCarbs, macroData.targets.carbs)}`}>
                        {macroData.totalCarbs}g
                      </div>
                      <div className="text-sm text-gray-600">/ {macroData.targets.carbs}g Carbs</div>
                      <div className="text-xs text-gray-500">
                        {getProgressPercentage(macroData.totalCarbs, macroData.targets.carbs).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getProgressColor(macroData.totalFats, macroData.targets.fats)}`}>
                        {macroData.totalFats}g
                      </div>
                      <div className="text-sm text-gray-600">/ {macroData.targets.fats}g Fats</div>
                      <div className="text-xs text-gray-500">
                        {getProgressPercentage(macroData.totalFats, macroData.targets.fats).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Log Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowLogForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </button>
              </div>

              {/* Log Form */}
              {showLogForm && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingLog ? 'Edit' : 'Add'} Meal Log
                  </h3>
                  <form onSubmit={handleSaveLog} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meal Name
                        </label>
                        <input
                          type="text"
                          value={logForm.mealName}
                          onChange={(e) => setLogForm(prev => ({ ...prev, mealName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Breakfast, Lunch, Dinner, Snack"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Calories
                        </label>
                        <input
                          type="number"
                          value={logForm.calories}
                          onChange={(e) => setLogForm(prev => ({ ...prev, calories: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Protein (g)
                        </label>
                        <input
                          type="number"
                          value={logForm.protein}
                          onChange={(e) => setLogForm(prev => ({ ...prev, protein: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="25"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Carbs (g)
                        </label>
                        <input
                          type="number"
                          value={logForm.carbs}
                          onChange={(e) => setLogForm(prev => ({ ...prev, carbs: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fats (g)
                        </label>
                        <input
                          type="number"
                          value={logForm.fats}
                          onChange={(e) => setLogForm(prev => ({ ...prev, fats: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="15"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes (optional)
                        </label>
                        <input
                          type="text"
                          value={logForm.notes}
                          onChange={(e) => setLogForm(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Any additional notes"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowLogForm(false);
                          setEditingLog(null);
                          setLogForm({ mealName: '', calories: '', protein: '', carbs: '', fats: '', notes: '' });
                        }}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingLog ? 'Update' : 'Save'} Meal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Meal Logs List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Meal Logs</h3>
                {macroData?.logs && macroData.logs.length > 0 ? (
                  macroData.logs.map((log) => (
                    <div key={log.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <h4 className="font-medium text-gray-900">{log.mealName}</h4>
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>{log.calories} cal</span>
                              <span>{log.protein}g protein</span>
                              <span>{log.carbs}g carbs</span>
                              <span>{log.fats}g fats</span>
                            </div>
                          </div>
                          {log.notes && (
                            <p className="text-sm text-gray-500 mt-1">{log.notes}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditLog(log)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLog(log.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Utensils className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No meals logged for this date</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


