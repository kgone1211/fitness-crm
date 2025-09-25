'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Target, 
  Activity,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  RotateCcw,
  Save,
  AlertCircle
} from 'lucide-react';
import { WorkoutSession, WorkoutExercise, WorkoutSet } from '@/types';

interface ClientWorkoutSessionProps {
  session: WorkoutSession;
  onUpdate: (session: WorkoutSession) => void;
  onComplete: () => void;
  onPause: () => void;
  onResume: () => void;
}

export default function ClientWorkoutSession({ 
  session, 
  onUpdate, 
  onComplete, 
  onPause, 
  onResume 
}: ClientWorkoutSessionProps) {
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(session.startTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    if (session.status === 'in_progress') {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session.status, sessionStartTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
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

  const updateExercise = (exerciseId: string, updates: Partial<WorkoutExercise>) => {
    const updatedExercises = session.exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, ...updates } : ex
    );
    onUpdate({ ...session, exercises: updatedExercises });
  };

  const updateSet = (exerciseId: string, setId: string, updates: Partial<WorkoutSet>) => {
    const exercise = session.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const updatedSets = exercise.sets.map(set => 
      set.id === setId ? { ...set, ...updates } : set
    );
    updateExercise(exerciseId, { sets: updatedSets });
  };

  const addSetToExercise = (exerciseId: string) => {
    const exercise = session.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: WorkoutSet = {
      id: `set_${Date.now()}`,
      setNumber: exercise.sets.length + 1,
      reps: lastSet?.reps || 10,
      weight: lastSet?.weight || 0,
      completed: false,
      restTime: lastSet?.restTime || 60,
      notes: ''
    };

    updateExercise(exerciseId, {
      sets: [...exercise.sets, newSet]
    });
  };

  const removeSet = (exerciseId: string, setId: string) => {
    const exercise = session.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const updatedSets = exercise.sets.filter(set => set.id !== setId);
    const renumberedSets = updatedSets.map((set, index) => ({
      ...set,
      setNumber: index + 1
    }));
    updateExercise(exerciseId, { sets: renumberedSets });
  };

  const completeSet = (exerciseId: string, setId: string) => {
    updateSet(exerciseId, setId, { completed: true });
  };

  const resetExercise = (exerciseId: string) => {
    const exercise = session.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const resetSets = exercise.sets.map(set => ({ ...set, completed: false }));
    updateExercise(exerciseId, { sets: resetSets });
  };

  const getExerciseProgress = (exercise: WorkoutExercise) => {
    const completedSets = exercise.sets.filter(set => set.completed).length;
    const totalSets = exercise.sets.length;
    return { completedSets, totalSets, percentage: totalSets > 0 ? (completedSets / totalSets) * 100 : 0 };
  };

  const getSessionProgress = () => {
    const totalSets = session.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const completedSets = session.exercises.reduce((sum, ex) => 
      sum + ex.sets.filter(set => set.completed).length, 0
    );
    return { completedSets, totalSets, percentage: totalSets > 0 ? (completedSets / totalSets) * 100 : 0 };
  };

  const sessionProgress = getSessionProgress();

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{session.name}</h2>
            {session.description && (
              <p className="text-blue-100 mb-4">{session.description}</p>
            )}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>{session.exercises.length} exercises</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>{sessionProgress.completedSets}/{sessionProgress.totalSets} sets completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {session.status === 'in_progress' ? (
              <>
                <button
                  onClick={onPause}
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2"
                >
                  <Pause className="h-4 w-4" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={onComplete}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Complete</span>
                </button>
              </>
            ) : (
              <button
                onClick={onResume}
                className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Resume</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-blue-100 mb-2">
            <span>Session Progress</span>
            <span>{Math.round(sessionProgress.percentage)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${sessionProgress.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {session.exercises.map((exercise, index) => {
          const progress = getExerciseProgress(exercise);
          const isExpanded = expandedExercises.has(exercise.id);
          
          return (
            <div key={exercise.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Exercise Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExerciseExpanded(exercise.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      progress.percentage === 100 
                        ? 'bg-green-100 text-green-600' 
                        : progress.percentage > 0 
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{exercise.exercise.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{exercise.sets.length} sets</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          progress.percentage === 100 
                            ? 'bg-green-100 text-green-800' 
                            : progress.percentage > 0 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {progress.completedSets}/{progress.totalSets} completed
                        </span>
                        <span className="text-blue-600">
                          {exercise.exercise.muscleGroups.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {progress.percentage === 100 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetExercise(exercise.id);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Reset exercise"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Exercise Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  {/* Exercise Instructions */}
                  {exercise.exercise.instructions && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Instructions</h4>
                      <p className="text-sm text-blue-800">{exercise.exercise.instructions}</p>
                    </div>
                  )}

                  {/* Sets */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Sets</h4>
                      <button
                        onClick={() => addSetToExercise(exercise.id)}
                        className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Set
                      </button>
                    </div>

                    {exercise.sets.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">No sets added yet</p>
                        <p className="text-sm mb-4">Your trainer hasn't added any sets for this exercise yet.</p>
                        <button
                          onClick={() => addSetToExercise(exercise.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add Your First Set
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {exercise.sets.map((set) => (
                          <div key={set.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            set.completed 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          } transition-colors`}>
                            {/* Set Number */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              set.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {set.setNumber}
                            </div>

                            {/* Reps */}
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Reps:</span>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => updateSet(exercise.id, set.id, { reps: Math.max(1, set.reps - 1) })}
                                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                  disabled={set.completed}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <input
                                  type="number"
                                  value={set.reps}
                                  onChange={(e) => updateSet(exercise.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-center"
                                  min="1"
                                  disabled={set.completed}
                                />
                                <button
                                  onClick={() => updateSet(exercise.id, set.id, { reps: set.reps + 1 })}
                                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                  disabled={set.completed}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Weight */}
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Weight:</span>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => updateSet(exercise.id, set.id, { weight: Math.max(0, set.weight - 2.5) })}
                                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                  disabled={set.completed}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <input
                                  type="number"
                                  value={set.weight}
                                  onChange={(e) => updateSet(exercise.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-center"
                                  min="0"
                                  step="0.5"
                                  disabled={set.completed}
                                />
                                <button
                                  onClick={() => updateSet(exercise.id, set.id, { weight: set.weight + 2.5 })}
                                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                  disabled={set.completed}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <span className="text-xs text-gray-500">lbs</span>
                            </div>

                            {/* Rest Time */}
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Rest:</span>
                              <span className="w-12 text-center text-sm">{set.restTime || 60}s</span>
                            </div>

                            {/* Complete Button */}
                            <div className="flex items-center space-x-2 ml-auto">
                              {!set.completed ? (
                                <button
                                  onClick={() => completeSet(exercise.id, set.id)}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Complete</span>
                                </button>
                              ) : (
                                <div className="flex items-center space-x-2 text-green-600">
                                  <CheckCircle className="h-5 w-5" />
                                  <span className="text-sm font-medium">Completed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Exercise Notes */}
                  {exercise.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Notes</h4>
                      <p className="text-sm text-gray-600">{exercise.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Session Notes */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Notes</h3>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Add notes about your workout session..."
        />
      </div>
    </div>
  );
}


