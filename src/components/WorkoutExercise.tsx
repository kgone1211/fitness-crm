'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2, 
  Plus, 
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { WorkoutExercise as WorkoutExerciseType, WorkoutSet as WorkoutSetType } from '@/types';
import WorkoutSet from './WorkoutSet';

interface WorkoutExerciseProps {
  exercise: WorkoutExerciseType;
  onUpdate: (exerciseId: string, updates: Partial<WorkoutExerciseType>) => void;
  onDelete: (exerciseId: string) => void;
  onAddSet: (exerciseId: string) => void;
  onUpdateSet: (setId: string, updates: Partial<WorkoutSetType>) => void;
  onDeleteSet: (setId: string) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export default function WorkoutExercise({ 
  exercise, 
  onUpdate, 
  onDelete, 
  onAddSet, 
  onUpdateSet, 
  onDeleteSet,
  isExpanded,
  onToggleExpanded
}: WorkoutExerciseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    notes: exercise.notes || ''
  });

  const completedSets = exercise.sets.filter(set => set.completed).length;
  const totalSets = exercise.sets.length;
  const isCompleted = completedSets === totalSets && totalSets > 0;

  const handleSave = () => {
    onUpdate(exercise.id, editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({ notes: exercise.notes || '' });
    setIsEditing(false);
  };

  const handleAddSet = () => {
    const newSet: WorkoutSetType = {
      id: `set_${Date.now()}`,
      setNumber: exercise.sets.length + 1,
      reps: 10,
      weight: exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1].weight : 0,
      completed: false,
      restTime: 60,
      notes: ''
    };
    
    onUpdate(exercise.id, {
      sets: [...exercise.sets, newSet]
    });
  };

  const handleUpdateSet = (setId: string, updates: Partial<WorkoutSetType>) => {
    const updatedSets = exercise.sets.map(set => 
      set.id === setId ? { ...set, ...updates } : set
    );
    onUpdate(exercise.id, { sets: updatedSets });
  };

  const handleDeleteSet = (setId: string) => {
    const updatedSets = exercise.sets.filter(set => set.id !== setId);
    // Renumber remaining sets
    const renumberedSets = updatedSets.map((set, index) => ({
      ...set,
      setNumber: index + 1
    }));
    onUpdate(exercise.id, { sets: renumberedSets });
  };

  const handleResetExercise = () => {
    const resetSets = exercise.sets.map(set => ({
      ...set,
      completed: false
    }));
    onUpdate(exercise.id, { sets: resetSets });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Exercise Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{exercise.exercise.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{exercise.sets.length} sets</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : completedSets > 0 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {completedSets}/{totalSets} completed
                </span>
                {exercise.exercise.muscleGroups.length > 0 && (
                  <span className="text-blue-600">
                    {exercise.exercise.muscleGroups.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetExercise();
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Reset exercise"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(exercise.id);
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Exercise Instructions */}
          {exercise.exercise.instructions && (
            <div className="p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions</h4>
              <p className="text-sm text-gray-600">{exercise.exercise.instructions}</p>
            </div>
          )}

          {/* Sets */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">Sets</h4>
              <button
                onClick={handleAddSet}
                className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Set
              </button>
            </div>

            {exercise.sets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No sets added yet</p>
                <button
                  onClick={handleAddSet}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first set
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {exercise.sets.map((set, index) => (
                  <WorkoutSet
                    key={set.id}
                    set={set}
                    onUpdate={handleUpdateSet}
                    onDelete={handleDeleteSet}
                    onAddSet={handleAddSet}
                    isLastSet={index === exercise.sets.length - 1}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Exercise Notes */}
          {isEditing && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Exercise Notes</h4>
              <textarea
                value={editValues.notes}
                onChange={(e) => setEditValues(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Add notes about this exercise..."
              />
              <div className="flex justify-end space-x-3 mt-3">
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
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {/* Exercise Notes Display */}
          {!isEditing && exercise.notes && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Notes</h4>
              <p className="text-sm text-gray-600">{exercise.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
