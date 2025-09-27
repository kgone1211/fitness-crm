'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp,
  Target,
  Clock,
  Activity,
  Search
} from 'lucide-react';
import { WorkoutTemplate, Exercise, WorkoutExercise, WorkoutSet } from '@/types';
import { db } from '@/lib/database';

interface WorkoutTemplateBuilderProps {
  template?: WorkoutTemplate;
  onSave: (template: WorkoutTemplate) => void;
  onCancel: () => void;
}

export default function WorkoutTemplateBuilder({ template, onSave, onCancel }: WorkoutTemplateBuilderProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    difficulty: template?.difficulty || 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedDuration: template?.estimatedDuration || 60
  });
  
  const [exercises, setExercises] = useState<WorkoutExercise[]>(template?.exercises || []);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const exerciseData = db.getExercises();
      setAvailableExercises(exerciseData);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const filteredExercises = availableExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroups.some(group => group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      id: `workout_exercise_${Date.now()}`,
      exerciseId: exercise.id,
      exercise,
      sets: [],
      order: exercises.length + 1,
      notes: ''
    };
    setExercises(prev => [...prev, workoutExercise]);
    setShowExerciseLibrary(false);
    setSearchTerm('');
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(prev => {
      const updated = prev.filter(ex => ex.id !== exerciseId);
      // Renumber exercises
      return updated.map((ex, index) => ({ ...ex, order: index + 1 }));
    });
  };

  const updateExercise = (exerciseId: string, updates: Partial<WorkoutExercise>) => {
    setExercises(prev => 
      prev.map(ex => ex.id === exerciseId ? { ...ex, ...updates } : ex)
    );
  };

  const addSetToExercise = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const newSet: WorkoutSet = {
      id: `set_${Date.now()}`,
      setNumber: exercise.sets.length + 1,
      reps: 10,
      weight: 0,
      completed: false,
      restTime: 60,
      notes: ''
    };

    updateExercise(exerciseId, {
      sets: [...exercise.sets, newSet]
    });
  };

  const updateSet = (exerciseId: string, setId: string, updates: Partial<WorkoutSet>) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const updatedSets = exercise.sets.map(set => 
      set.id === setId ? { ...set, ...updates } : set
    );
    updateExercise(exerciseId, { sets: updatedSets });
  };

  const removeSet = (exerciseId: string, setId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const updatedSets = exercise.sets.filter(set => set.id !== setId);
    const renumberedSets = updatedSets.map((set, index) => ({
      ...set,
      setNumber: index + 1
    }));
    updateExercise(exerciseId, { sets: renumberedSets });
  };

  const toggleExerciseExpanded = (exerciseId: string) => {
    setExpandedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Please enter a template name');
      return;
    }

    if (exercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const templateData: WorkoutTemplate = {
      id: template?.id || `template_${Date.now()}`,
      createdBy: '1', // Mock trainer ID
      name: formData.name,
      description: formData.description,
      difficulty: formData.difficulty,
      estimatedDuration: formData.estimatedDuration,
      exercises: exercises,
      createdAt: template?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSave(templateData);
  };

  const calculateTotalDuration = () => {
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const estimatedTimePerSet = 3; // minutes
    return totalSets * estimatedTimePerSet + 10; // +10 for warmup/cooldown
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {template ? 'Edit Workout Template' : 'Create Workout Template'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Template Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Upper Body Strength"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe this workout template..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) || 60 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Calculated: ~{calculateTotalDuration()} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Exercises ({exercises.length})</h3>
                <button
                  onClick={() => setShowExerciseLibrary(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </button>
              </div>

              {exercises.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">No exercises added yet</p>
                  <p className="text-sm">Add exercises to build your workout template</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      {/* Exercise Header */}
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleExerciseExpanded(exercise.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                              {exercise.order}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900">{exercise.exercise.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{exercise.sets.length} sets</span>
                                <span className="text-blue-600">
                                  {exercise.exercise.muscleGroups.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {expandedExercises.has(exercise.id) ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExercise(exercise.id);
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Exercise Details */}
                      {expandedExercises.has(exercise.id) && (
                        <div className="border-t border-gray-200 p-4">
                          {/* Sets */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-medium text-gray-900">Sets</h5>
                              <button
                                onClick={() => addSetToExercise(exercise.id)}
                                className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Set
                              </button>
                            </div>

                            {exercise.sets.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                <p className="text-sm">No sets added yet</p>
                                <button
                                  onClick={() => addSetToExercise(exercise.id)}
                                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  Add your first set
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {exercise.sets.map((set) => (
                                  <div key={set.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                                      {set.setNumber}
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">Reps:</span>
                                      <input
                                        type="number"
                                        value={set.reps}
                                        onChange={(e) => updateSet(exercise.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        min="1"
                                      />
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">Weight:</span>
                                      <input
                                        type="number"
                                        value={set.weight}
                                        onChange={(e) => updateSet(exercise.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                        step="0.5"
                                      />
                                      <span className="text-xs text-gray-500">lbs</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">Rest:</span>
                                      <input
                                        type="number"
                                        value={set.restTime}
                                        onChange={(e) => updateSet(exercise.id, set.id, { restTime: parseInt(e.target.value) || 60 })}
                                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                      />
                                      <span className="text-xs text-gray-500">s</span>
                                    </div>
                                    
                                    <button
                                      onClick={() => removeSet(exercise.id, set.id)}
                                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors ml-auto"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Exercise Notes */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Notes</label>
                            <textarea
                              value={exercise.notes}
                              onChange={(e) => updateExercise(exercise.id, { notes: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={2}
                              placeholder="Add notes for this exercise..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Exercise Library Sidebar */}
          {showExerciseLibrary && (
            <div className="w-80 border-l border-gray-200 bg-gray-50 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Exercise Library</h3>
                <button
                  onClick={() => setShowExerciseLibrary(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search exercises..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => addExercise(exercise)}
                    className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                    <p className="text-sm text-gray-600">{exercise.muscleGroups.join(', ')}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}



