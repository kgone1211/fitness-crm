import Layout from '@/components/Layout';
import { Dumbbell, Plus, Calendar, Users, Clock, Target } from 'lucide-react';

export default function WorkoutsPage() {
  const workoutTemplates = [
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
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                <p className="text-2xl font-bold text-gray-900">10</p>
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
                <p className="text-2xl font-bold text-gray-900">55 min</p>
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
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
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
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
