'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Users, 
  Clock, 
  Target,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';

interface WorkoutTemplateManagerProps {
  coachId: string;
}

interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
  restTime?: number;
  notes?: string;
}

interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  order: number;
  notes?: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
  createdBy: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function WorkoutTemplateManager({ coachId }: WorkoutTemplateManagerProps) {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WorkoutTemplate | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  // Form state
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    difficulty: 'intermediate' as WorkoutTemplate['difficulty'],
    estimatedDuration: 60,
    muscleGroups: [] as string[],
    exercises: [] as WorkoutExercise[],
  });

  // Assignment form state
  const [assignmentForm, setAssignmentForm] = useState({
    clientId: '',
    scheduledDate: '',
    notes: '',
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in a real app, these would be API calls
      const mockTemplates: WorkoutTemplate[] = [
        {
          id: '1',
          name: 'Upper Body Strength',
          description: 'Focus on chest, shoulders, and arms',
          exercises: [],
          estimatedDuration: 60,
          difficulty: 'intermediate',
          muscleGroups: ['chest', 'shoulders', 'arms'],
          createdBy: coachId,
          isPublic: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Lower Body Power',
          description: 'Squats, deadlifts, and leg exercises',
          exercises: [],
          estimatedDuration: 75,
          difficulty: 'advanced',
          muscleGroups: ['legs', 'glutes'],
          createdBy: coachId,
          isPublic: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const mockClients: Client[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
      ];

      const mockExercises: Exercise[] = [
        { id: '1', name: 'Bench Press', muscleGroups: ['chest', 'arms'], instructions: 'Lie flat on bench, lower bar to chest, press up' },
        { id: '2', name: 'Squat', muscleGroups: ['legs', 'glutes'], instructions: 'Stand with feet shoulder-width apart, lower until thighs parallel' },
        { id: '3', name: 'Deadlift', muscleGroups: ['legs', 'back'], instructions: 'Lift bar from ground to hip level' },
        { id: '4', name: 'Overhead Press', muscleGroups: ['shoulders', 'arms'], instructions: 'Press weight overhead from shoulder level' },
        { id: '5', name: 'Pull-ups', muscleGroups: ['back', 'arms'], instructions: 'Hang from bar, pull body up until chin over bar' },
      ];

      setTemplates(mockTemplates);
      setClients(mockClients);
      setExercises(mockExercises);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coachId]);

  // Handle template form submission
  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTemplate: WorkoutTemplate = {
      id: editingTemplate?.id || Date.now().toString(),
      name: templateForm.name,
      description: templateForm.description,
      exercises: templateForm.exercises,
      estimatedDuration: templateForm.estimatedDuration,
      difficulty: templateForm.difficulty,
      muscleGroups: templateForm.muscleGroups,
      createdBy: coachId,
      isPublic: false,
      createdAt: editingTemplate?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? newTemplate : t));
    } else {
      setTemplates(prev => [...prev, newTemplate]);
    }

    setShowTemplateForm(false);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      description: '',
      difficulty: 'intermediate',
      estimatedDuration: 60,
      muscleGroups: [],
      exercises: [],
    });
  };

  // Handle template assignment
  const handleAssignTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    console.log('Assigning template:', {
      templateId: selectedTemplate?.id,
      clientId: assignmentForm.clientId,
      scheduledDate: assignmentForm.scheduledDate,
      notes: assignmentForm.notes,
    });

    setShowAssignModal(false);
    setSelectedTemplate(null);
    setAssignmentForm({
      clientId: '',
      scheduledDate: '',
      notes: '',
    });
  };

  // Add exercise to template
  const addExerciseToTemplate = (exercise: Exercise) => {
    const newWorkoutExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exercise,
      sets: [
        {
          id: Date.now().toString(),
          setNumber: 1,
          reps: 10,
          weight: 0,
          completed: false,
          restTime: 60,
        },
      ],
      order: templateForm.exercises.length + 1,
    };

    setTemplateForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, newWorkoutExercise],
    }));
  };

  // Remove exercise from template
  const removeExerciseFromTemplate = (exerciseId: string) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId),
    }));
  };

  // Add set to exercise
  const addSetToExercise = (exerciseId: string) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => {
        if (ex.id === exerciseId) {
          const newSet: WorkoutSet = {
            id: Date.now().toString(),
            setNumber: ex.sets.length + 1,
            reps: 10,
            weight: 0,
            completed: false,
            restTime: 60,
          };
          return { ...ex, sets: [...ex.sets, newSet] };
        }
        return ex;
      }),
    }));
  };

  // Remove set from exercise
  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => {
        if (ex.id === exerciseId) {
          return { ...ex, sets: ex.sets.filter(set => set.id !== setId) };
        }
        return ex;
      }),
    }));
  };

  // Update set data
  const updateSetData = (exerciseId: string, setId: string, field: keyof WorkoutSet, value: any) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map(set => {
              if (set.id === setId) {
                return { ...set, [field]: value };
              }
              return set;
            }),
          };
        }
        return ex;
      }),
    }));
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workout Templates</h2>
          <p className="text-gray-600">Create and manage workout templates for your clients</p>
        </div>
        <button
          onClick={() => setShowTemplateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </button>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map(template => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {template.description && (
                    <p className="text-gray-600">{template.description}</p>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {template.estimatedDuration} min
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowAssignModal(true);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Assign to client"
                >
                  <Users className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingTemplate(template);
                    setTemplateForm({
                      name: template.name,
                      description: template.description || '',
                      difficulty: template.difficulty,
                      estimatedDuration: template.estimatedDuration,
                      muscleGroups: template.muscleGroups,
                      exercises: template.exercises,
                    });
                    setShowTemplateForm(true);
                  }}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit template"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {expandedTemplate === template.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Template Details */}
            {expandedTemplate === template.id && (
              <div className="border-t border-gray-200 pt-4">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Muscle Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.muscleGroups.map(group => (
                      <span key={group} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
                
                {template.exercises.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Exercises</h4>
                    <div className="space-y-3">
                      {template.exercises.map(exercise => (
                        <div key={exercise.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{exercise.exercise.name}</h5>
                            <span className="text-sm text-gray-500">{exercise.sets.length} sets</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                            <div>Set</div>
                            <div>Reps</div>
                            <div>Weight</div>
                            <div>Rest</div>
                            {exercise.sets.map(set => (
                              <>
                                <div>{set.setNumber}</div>
                                <div>{set.reps}</div>
                                <div>{set.weight} lbs</div>
                                <div>{set.restTime}s</div>
                              </>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Template Form Modal */}
      {showTemplateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingTemplate ? 'Edit' : 'Create'} Workout Template
              </h3>
              <button
                onClick={() => {
                  setShowTemplateForm(false);
                  setEditingTemplate(null);
                  setTemplateForm({
                    name: '',
                    description: '',
                    difficulty: 'intermediate',
                    estimatedDuration: 60,
                    muscleGroups: [],
                    exercises: [],
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={templateForm.difficulty}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, difficulty: e.target.value as WorkoutTemplate['difficulty'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Duration (minutes)
                </label>
                <input
                  type="number"
                  value={templateForm.estimatedDuration}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="15"
                  max="180"
                />
              </div>

              {/* Exercise Selection */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Exercises</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {exercises.map(exercise => (
                    <button
                      key={exercise.id}
                      type="button"
                      onClick={() => addExerciseToTemplate(exercise)}
                      className="p-3 text-left border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{exercise.name}</div>
                      <div className="text-sm text-gray-600">
                        {exercise.muscleGroups.join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Exercises */}
              {templateForm.exercises.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Selected Exercises</h4>
                  <div className="space-y-4">
                    {templateForm.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">
                            {index + 1}. {exercise.exercise.name}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeExerciseFromTemplate(exercise.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Sets */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Sets</span>
                            <button
                              type="button"
                              onClick={() => addSetToExercise(exercise.id)}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              + Add Set
                            </button>
                          </div>
                          
                          {exercise.sets.map(set => (
                            <div key={set.id} className="grid grid-cols-4 gap-2">
                              <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => updateSetData(exercise.id, set.id, 'reps', parseInt(e.target.value))}
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Reps"
                              />
                              <input
                                type="number"
                                value={set.weight}
                                onChange={(e) => updateSetData(exercise.id, set.id, 'weight', parseInt(e.target.value))}
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Weight"
                              />
                              <input
                                type="number"
                                value={set.restTime}
                                onChange={(e) => updateSetData(exercise.id, set.id, 'restTime', parseInt(e.target.value))}
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Rest (s)"
                              />
                              <button
                                type="button"
                                onClick={() => removeSetFromExercise(exercise.id, set.id)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowTemplateForm(false);
                    setEditingTemplate(null);
                    setTemplateForm({
                      name: '',
                      description: '',
                      difficulty: 'intermediate',
                      estimatedDuration: 60,
                      muscleGroups: [],
                      exercises: [],
                    });
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
                  {editingTemplate ? 'Update' : 'Create'} Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Assign Template</h3>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedTemplate(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAssignTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{selectedTemplate.name}</div>
                  <div className="text-sm text-gray-600">{selectedTemplate.estimatedDuration} minutes</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select
                  value={assignmentForm.clientId}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, clientId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={assignmentForm.scheduledDate}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={assignmentForm.notes}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Assign Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
