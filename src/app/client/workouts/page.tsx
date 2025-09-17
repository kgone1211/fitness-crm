'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Calendar,
  Target,
  RotateCcw,
  Plus
} from 'lucide-react';
import { db } from '@/lib/database';
import { WorkoutSession, WorkoutExercise } from '@/types';
import ClientWorkoutSession from '@/components/ClientWorkoutSession';

export default function ClientWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'scheduled'>('all');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const clientId = '1';
        const clientWorkouts = db.getWorkoutSessions('1', clientId);
        setWorkouts(clientWorkouts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading workouts:', error);
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter(workout => {
    switch (filter) {
      case 'completed':
        return workout.status === 'completed';
      case 'in_progress':
        return workout.status === 'in_progress';
      case 'scheduled':
        return workout.status === 'scheduled';
      default:
        return true;
    }
  });

  const startWorkout = (workout: WorkoutSession) => {
    setActiveWorkout({ ...workout, status: 'in_progress' });
  };

  const completeWorkout = () => {
    if (activeWorkout) {
      const updatedWorkout = { ...activeWorkout, status: 'completed' as const, endTime: new Date() };
      setWorkouts(prev => 
        prev.map(w => 
          w.id === activeWorkout.id ? updatedWorkout : w
        )
      );
      setActiveWorkout(null);
    }
  };

  const updateWorkout = (updatedWorkout: WorkoutSession) => {
    setActiveWorkout(updatedWorkout);
    setWorkouts(prev => 
      prev.map(w => w.id === updatedWorkout.id ? updatedWorkout : w)
    );
  };

  const pauseWorkout = () => {
    if (activeWorkout) {
      setActiveWorkout({ ...activeWorkout, status: 'paused' });
    }
  };

  const resumeWorkout = () => {
    if (activeWorkout) {
      setActiveWorkout({ ...activeWorkout, status: 'in_progress' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Workouts</h1>
          <p className="text-gray-600">Track and complete your workout sessions</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Workouts</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Active Workout */}
      {activeWorkout && (
        <ClientWorkoutSession
          session={activeWorkout}
          onUpdate={updateWorkout}
          onComplete={completeWorkout}
          onPause={pauseWorkout}
          onResume={resumeWorkout}
        />
      )}

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                  {workout.description && (
                    <p className="text-sm text-gray-600 mt-1">{workout.description}</p>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  workout.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : workout.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : workout.status === 'paused'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {workout.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="h-4 w-4 mr-2" />
                  <span>{workout.exercises.length} exercises</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(workout.startTime).toLocaleDateString()}</span>
                </div>
                {workout.endTime && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Completed {new Date(workout.endTime).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>

              {/* Exercise List */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises:</h4>
                <div className="space-y-1">
                  {workout.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={exercise.id} className="flex items-center text-sm text-gray-600">
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                        {index + 1}
                      </span>
                      <span>{exercise.exercise.name}</span>
                      <span className="ml-auto text-gray-400">
                        {exercise.sets.length} sets
                      </span>
                    </div>
                  ))}
                  {workout.exercises.length > 3 && (
                    <p className="text-xs text-gray-500 ml-8">
                      +{workout.exercises.length - 3} more exercises
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {workout.status === 'scheduled' && (
                  <button
                    onClick={() => startWorkout(workout)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start</span>
                  </button>
                )}
                {workout.status === 'completed' && (
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </button>
                )}
                {workout.status === 'in_progress' && (
                  <button
                    onClick={() => setActiveWorkout(workout)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Continue</span>
                  </button>
                )}
                {workout.status === 'paused' && (
                  <button
                    onClick={() => setActiveWorkout(workout)}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Resume</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? "You don't have any workouts yet. Contact your trainer to get started!"
              : `No ${filter} workouts found.`
            }
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Workouts
            </button>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {workouts.filter(w => w.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {workouts.filter(w => w.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {workouts.filter(w => w.status === 'scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
