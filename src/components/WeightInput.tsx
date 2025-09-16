'use client';

import React, { useState } from 'react';
import { Scale, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

interface WeightInputProps {
  clientId?: string;
  onWeightAdded?: (weight: number, date: string, notes?: string) => void;
}

export default function WeightInput({ clientId, onWeightAdded }: WeightInputProps) {
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for recent weight entries
  const [recentWeights, setRecentWeights] = useState<WeightEntry[]>([
    {
      id: '1',
      date: '2024-01-14',
      weight: 143.7,
      notes: 'Morning weight'
    },
    {
      id: '2',
      date: '2024-01-12',
      weight: 144.4,
      notes: 'After workout'
    },
    {
      id: '3',
      date: '2024-01-10',
      weight: 145.1,
      notes: 'Weekly check-in'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !date) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date,
      weight: parseFloat(weight),
      notes: notes || undefined
    };

    setRecentWeights(prev => [newEntry, ...prev]);
    
    if (onWeightAdded) {
      onWeightAdded(parseFloat(weight), date, notes || undefined);
    }

    // Reset form
    setWeight('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setShowForm(false);
    setIsSubmitting(false);
  };

  const getWeightChange = () => {
    if (recentWeights.length < 2) return null;
    const latest = recentWeights[0].weight;
    const previous = recentWeights[1].weight;
    return latest - previous;
  };

  const weightChange = getWeightChange();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Scale className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Weight Tracking</h3>
            <p className="text-sm text-gray-600">Log your daily weight measurements</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Weight</span>
        </button>
      </div>

      {/* Current Weight Display */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-gray-900">
            {recentWeights[0]?.weight.toFixed(1)} lbs
          </div>
          {weightChange !== null && (
            <div className={`flex items-center space-x-1 ${
              weightChange > 0 ? 'text-red-600' : 
              weightChange < 0 ? 'text-green-600' : 
              'text-gray-600'
            }`}>
              {weightChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : weightChange < 0 ? (
                <TrendingDown className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Last updated: {recentWeights[0]?.date ? new Date(recentWeights[0].date).toLocaleDateString() : 'Never'}
        </p>
      </div>

      {/* Weight Input Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="143.7"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Morning weight, after workout, etc."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !weight || !date}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Save Weight</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Weight History */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Entries</h4>
        <div className="space-y-3">
          {recentWeights.slice(0, 5).map((entry, index) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-lg font-semibold text-gray-900">
                  {entry.weight.toFixed(1)} lbs
                </div>
                {index > 0 && (
                  <div className={`text-sm ${
                    entry.weight > recentWeights[index - 1].weight ? 'text-red-600' : 
                    entry.weight < recentWeights[index - 1].weight ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {entry.weight > recentWeights[index - 1].weight ? '+' : ''}
                    {(entry.weight - recentWeights[index - 1].weight).toFixed(1)} lbs
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
                {entry.notes && (
                  <div className="text-xs text-gray-600">{entry.notes}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
