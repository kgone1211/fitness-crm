'use client';

import Layout from '@/components/Layout';
import { Dumbbell, Plus, Calendar, Users, Clock, Target, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  muscleGroups: string[];
  exercises: number;
  assignedClients: number;
}

export default function WorkoutsPage() {
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and arms',
      difficulty: 'intermediate',
      duration: 60,
      muscleGroups: ['chest', 'shoulders', 'arms'],
      exercises: 8,
      assignedClients: 3,
    },
    {
      id: '2',
      name: 'Lower Body Power',
      description: 'Squats, deadlifts, and leg exercises',
      difficulty: 'advanced',
      duration: 75,
      muscleGroups: ['legs', 'glutes'],
      exercises: 6,
      assignedClients: 2,
    },
    {
      id: '3',
      name: 'Full Body HIIT',
      description: 'High-intensity interval training',
      difficulty: 'beginner',
      duration: 30,
      muscleGroups: ['full body'],
      exercises: 10,
      assignedClients: 5,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    duration: 30,
    muscleGroups: [] as string[],
    exercises: 0,
  });
  const [newMuscleGroup, setNewMuscleGroup] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description || newTemplate.muscleGroups.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const template: WorkoutTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      difficulty: newTemplate.difficulty,
      duration: newTemplate.duration,
      muscleGroups: newTemplate.muscleGroups,
      exercises: newTemplate.exercises,
      assignedClients: 0,
    };

    setWorkoutTemplates([...workoutTemplates, template]);
    setShowCreateModal(false);
    setNewTemplate({
      name: '',
      description: '',
      difficulty: 'beginner',
      duration: 30,
      muscleGroups: [],
      exercises: 0,
    });
    setNewMuscleGroup('');
  };

  const addMuscleGroup = () => {
    if (newMuscleGroup.trim() && !newTemplate.muscleGroups.includes(newMuscleGroup.trim())) {
      setNewTemplate({
        ...newTemplate,
        muscleGroups: [...newTemplate.muscleGroups, newMuscleGroup.trim()]
      });
      setNewMuscleGroup('');
    }
  };

  const removeMuscleGroup = (group: string) => {
    setNewTemplate({
      ...newTemplate,
      muscleGroups: newTemplate.muscleGroups.filter(g => g !== group)
    });
  };

  const handleViewDetails = (template: WorkoutTemplate) => {
    alert(`Template Details:\n\nName: ${template.name}\nDescription: ${template.description}\nDifficulty: ${template.difficulty}\nDuration: ${template.duration} minutes\nMuscle Groups: ${template.muscleGroups.join(', ')}\nExercises: ${template.exercises}\nAssigned Clients: ${template.assignedClients}`);
  };

  const handleAssign = (template: WorkoutTemplate) => {
    alert(`Assigning "${template.name}" to clients...\n\nThis would open a client selection modal in a real application.`);
  };

  const handleDelete = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setWorkoutTemplates(workoutTemplates.filter(t => t.id !== templateId));
    }
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workout Templates</h1>
            <p className="text-gray-600">Create and manage workout templates for your clients</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Dumbbell className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{workoutTemplates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Assigned Clients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workoutTemplates.reduce((sum, t) => sum + t.assignedClients, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(workoutTemplates.reduce((sum, t) => sum + t.duration, 0) / workoutTemplates.length)} min
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-500">sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutTemplates.map((template) => (
            <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{template.duration} minutes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  <span>{template.exercises} exercises</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{template.assignedClients} clients</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.muscleGroups.map((group) => (
                    <span key={group} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {group}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewDetails(template)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleAssign(template)}
                  className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Workout Template</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      id="templateName"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Upper Body Strength"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={newTemplate.duration}
                      onChange={(e) => setNewTemplate({ ...newTemplate, duration: parseInt(e.target.value) || 0 })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the workout focus and objectives..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      value={newTemplate.difficulty}
                      onChange={(e) => setNewTemplate({ ...newTemplate, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exercises" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Exercises
                    </label>
                    <input
                      type="number"
                      id="exercises"
                      value={newTemplate.exercises}
                      onChange={(e) => setNewTemplate({ ...newTemplate, exercises: parseInt(e.target.value) || 0 })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Muscle Groups *
                  </label>
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={newMuscleGroup}
                      onChange={(e) => setNewMuscleGroup(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addMuscleGroup()}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., chest, shoulders, arms"
                    />
                    <button
                      onClick={addMuscleGroup}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newTemplate.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {group}
                        <button
                          onClick={() => removeMuscleGroup(group)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
