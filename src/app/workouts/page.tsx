'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Target, 
  Activity,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Edit3,
  Trash2,
  Save,
  RotateCcw
} from 'lucide-react';
import { 
  WorkoutSession, 
  WorkoutTemplate, 
  Exercise, 
  WorkoutExercise as WorkoutExerciseType,
  WorkoutSet,
  Client 
} from '@/types';
import { db } from '@/lib/database';
import PageHeader from '@/components/PageHeader';
import WorkoutExercise from '@/components/WorkoutExercise';

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState<'sessions' | 'templates' | 'exercises'>('sessions');
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Current workout session
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());
  
  // Forms
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
  
  // Form data
  const [sessionForm, setSessionForm] = useState({
    clientId: '',
    name: '',
    description: '',
    templateId: ''
  });
  
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedDuration: 60
  });
  
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    muscleGroups: [] as string[],
    instructions: '',
    videoUrl: '',
    imageUrl: ''
  });

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessions, templates, exercisesData, clientsData] = await Promise.all([
        db.getWorkoutSessions('1'), // Mock trainer ID
        db.getWorkoutTemplates('1'),
        db.getExercises(),
        db.getClients()
      ]);
      
      setWorkoutSessions(sessions);
      setWorkoutTemplates(templates);
      setExercises(exercisesData);
      setClients(clientsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Session management
  const startNewSession = async () => {
    try {
      if (!sessionForm.clientId || !sessionForm.name) {
        setError('Client and workout name are required');
        return;
      }

      const client = clients.find(c => c.id === sessionForm.clientId);
      if (!client) {
        setError('Client not found');
        return;
      }

      const session: WorkoutSession = {
        id: `session_${Date.now()}`,
        clientId: sessionForm.clientId,
        trainerId: '1', // Mock trainer ID
        name: sessionForm.name,
        description: sessionForm.description,
        exercises: [],
        startTime: new Date(),
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setCurrentSession(session);
      setShowNewSessionForm(false);
      setSessionForm({ clientId: '', name: '', description: '', templateId: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
    }
  };

  const endCurrentSession = async () => {
    if (!currentSession) return;

    try {
      const updatedSession = {
        ...currentSession,
        status: 'completed' as const,
        endTime: new Date()
      };

      setWorkoutSessions(prev => [updatedSession, ...prev]);
      setCurrentSession(null);
      setExpandedExercises(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end session');
    }
  };

  const pauseCurrentSession = () => {
    if (!currentSession) return;
    setCurrentSession(prev => prev ? { ...prev, status: 'paused' } : null);
  };

  const resumeCurrentSession = () => {
    if (!currentSession) return;
    setCurrentSession(prev => prev ? { ...prev, status: 'in_progress' } : null);
  };

  // Exercise management
  const addExerciseToSession = (exercise: Exercise) => {
    if (!currentSession) return;

    const workoutExercise: WorkoutExerciseType = {
      id: `workout_exercise_${Date.now()}`,
      exerciseId: exercise.id,
      exercise,
      sets: [],
      order: currentSession.exercises.length + 1,
      notes: ''
    };

    setCurrentSession(prev => prev ? {
      ...prev,
      exercises: [...prev.exercises, workoutExercise]
    } : null);
  };

  const updateExercise = (exerciseId: string, updates: Partial<WorkoutExerciseType>) => {
    if (!currentSession) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      )
    } : null);
  };

  const deleteExercise = (exerciseId: string) => {
    if (!currentSession) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    } : null);
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

  // Calculate session stats
  const getSessionStats = () => {
    if (!currentSession) return { totalExercises: 0, completedSets: 0, totalSets: 0 };
    
    const totalExercises = currentSession.exercises.length;
    const totalSets = currentSession.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const completedSets = currentSession.exercises.reduce((sum, ex) => 
      sum + ex.sets.filter(set => set.completed).length, 0
    );
    
    return { totalExercises, completedSets, totalSets };
  };

  const stats = getSessionStats();

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
      <PageHeader
        title="Workouts"
        description="Track and manage workout sessions, templates, and exercises"
        breadcrumbs={[{ name: 'Workouts' }]}
        showBackButton={true}
      >
        <div className="flex items-center space-x-3">
          {currentSession && (
            <div className="flex items-center space-x-2">
              <button
                onClick={currentSession.status === 'in_progress' ? pauseCurrentSession : resumeCurrentSession}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentSession.status === 'in_progress'
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {currentSession.status === 'in_progress' ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {currentSession.status === 'in_progress' ? 'Pause' : 'Resume'}
              </button>
              
              <button
                onClick={endCurrentSession}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Square className="h-4 w-4 mr-2" />
                End Workout
              </button>
            </div>
          )}
          
          <button
            onClick={() => setShowNewSessionForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Workout
          </button>
        </div>
      </PageHeader>

      {/* Current Workout Session */}
      {currentSession && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentSession.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Started {currentSession.startTime.toLocaleTimeString()}
                </span>
                <span className="flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  {stats.totalExercises} exercises
                </span>
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {stats.completedSets}/{stats.totalSets} sets completed
                </span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentSession.status === 'in_progress' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {currentSession.status === 'in_progress' ? 'In Progress' : 'Paused'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{stats.totalSets > 0 ? Math.round((stats.completedSets / stats.totalSets) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalSets > 0 ? (stats.completedSets / stats.totalSets) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            {currentSession.exercises.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No exercises added yet</p>
                <p className="text-sm">Add exercises from the exercise library to start your workout</p>
              </div>
            ) : (
              currentSession.exercises.map((exercise) => (
                <WorkoutExercise
                  key={exercise.id}
                  exercise={exercise}
                  onUpdate={updateExercise}
                  onDelete={deleteExercise}
                  onAddSet={() => {
                    const newSet: WorkoutSet = {
                      id: `set_${Date.now()}`,
                      setNumber: exercise.sets.length + 1,
                      reps: 10,
                      weight: 0,
                      completed: false,
                      restTime: 60,
                      notes: ''
                    };
                    updateExercise(exercise.id, {
                      sets: [...exercise.sets, newSet]
                    });
                  }}
                  onUpdateSet={(setId, updates) => {
                    const updatedSets = exercise.sets.map(set => 
                      set.id === setId ? { ...set, ...updates } : set
                    );
                    updateExercise(exercise.id, { sets: updatedSets });
                  }}
                  onDeleteSet={(setId) => {
                    const updatedSets = exercise.sets.filter(set => set.id !== setId);
                    const renumberedSets = updatedSets.map((set, index) => ({
                      ...set,
                      setNumber: index + 1
                    }));
                    updateExercise(exercise.id, { sets: renumberedSets });
                  }}
                  isExpanded={expandedExercises.has(exercise.id)}
                  onToggleExpanded={() => toggleExerciseExpanded(exercise.id)}
                />
              ))
            )}
          </div>

          {/* Add Exercise Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Add Exercise</h3>
              <div className="flex space-x-2">
                {exercises.slice(0, 5).map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => addExerciseToSession(exercise)}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {exercise.name}
                  </button>
                ))}
                <button
                  onClick={() => setActiveTab('exercises')}
                  className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sessions', name: 'Workout Sessions', icon: Activity },
            { id: 'templates', name: 'Templates', icon: Target },
            { id: 'exercises', name: 'Exercise Library', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Workouts</h3>
            </div>
            
            {workoutSessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No workout sessions yet</p>
                <p className="text-sm">Start a new workout to begin tracking your progress</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {workoutSessions.map((session) => (
                  <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{session.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{session.exercises.length} exercises</span>
                          <span>{session.startTime.toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            session.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : session.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Workout Templates</h3>
              <button
                onClick={() => setShowNewTemplateForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </button>
            </div>
            
            {workoutTemplates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No templates created yet</p>
                <p className="text-sm">Create workout templates to save time when starting new sessions</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {workoutTemplates.map((template) => (
                  <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{template.exercises.length} exercises</span>
                          <span>{template.estimatedDuration} min</span>
                          <span className="capitalize">{template.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Exercise Library</h3>
              <button
                onClick={() => setShowNewExerciseForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Exercise
              </button>
            </div>
            
            {exercises.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No exercises in library</p>
                <p className="text-sm">Add exercises to build your workout library</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{exercise.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{exercise.muscleGroups.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {currentSession && (
                          <button
                            onClick={() => addExerciseToSession(exercise)}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add to Workout
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Session Form Modal */}
      {showNewSessionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Start New Workout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <select
                  value={sessionForm.clientId}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, clientId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workout Name</label>
                <input
                  type="text"
                  value={sessionForm.name}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Upper Body Strength"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Workout description..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewSessionForm(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={startNewSession}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}