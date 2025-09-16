'use client';

import React, { useState } from 'react';
import { Check, Edit3, Trash2, Plus, Minus } from 'lucide-react';
import { WorkoutSet as WorkoutSetType } from '@/types';

interface WorkoutSetProps {
  set: WorkoutSetType;
  onUpdate: (setId: string, updates: Partial<WorkoutSetType>) => void;
  onDelete: (setId: string) => void;
  onAddSet: () => void;
  isLastSet: boolean;
}

export default function WorkoutSet({ set, onUpdate, onDelete, onAddSet, isLastSet }: WorkoutSetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    reps: set.reps,
    weight: set.weight,
    restTime: set.restTime || 60,
    notes: set.notes || ''
  });

  const handleSave = () => {
    onUpdate(set.id, editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      reps: set.reps,
      weight: set.weight,
      restTime: set.restTime || 60,
      notes: set.notes || ''
    });
    setIsEditing(false);
  };

  const handleComplete = () => {
    onUpdate(set.id, { completed: !set.completed });
  };

  const incrementWeight = () => {
    const newWeight = set.weight + 2.5;
    onUpdate(set.id, { weight: newWeight });
  };

  const decrementWeight = () => {
    const newWeight = Math.max(0, set.weight - 2.5);
    onUpdate(set.id, { weight: newWeight });
  };

  const incrementReps = () => {
    const newReps = set.reps + 1;
    onUpdate(set.id, { reps: newReps });
  };

  const decrementReps = () => {
    const newReps = Math.max(1, set.reps - 1);
    onUpdate(set.id, { reps: newReps });
  };

  return (
    <>
      <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
        set.completed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      } transition-colors`}>
        {/* Set Number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
          {set.setNumber}
        </div>

        {/* Reps */}
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementReps}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={set.reps <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{set.reps}</span>
          <button
            onClick={incrementReps}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-500">reps</span>
        </div>

        {/* Weight */}
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementWeight}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={set.weight <= 0}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-16 text-center font-medium">{set.weight}</span>
          <button
            onClick={incrementWeight}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-500">lbs</span>
        </div>

        {/* Rest Time */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rest:</span>
          <span className="w-12 text-center text-sm">{set.restTime || 60}s</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          <button
            onClick={handleComplete}
            className={`p-2 rounded-full transition-colors ${
              set.completed
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Check className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>

          <button
            onClick={() => onDelete(set.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Add Set Button */}
        {isLastSet && (
          <button
            onClick={onAddSet}
            className="ml-4 p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
              <input
                type="number"
                value={editValues.reps}
                onChange={(e) => setEditValues(prev => ({ ...prev, reps: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
              <input
                type="number"
                value={editValues.weight}
                onChange={(e) => setEditValues(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rest (seconds)</label>
              <input
                type="number"
                value={editValues.restTime}
                onChange={(e) => setEditValues(prev => ({ ...prev, restTime: parseInt(e.target.value) || 60 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                type="text"
                value={editValues.notes}
                onChange={(e) => setEditValues(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional notes"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}