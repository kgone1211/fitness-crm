'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Users, 
  Save, 
  X, 
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Clock,
  Target,
  Calendar,
  User
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime?: number;
  notes?: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  createdAt: string;
  assignedClients: string[];
}

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function WorkoutTemplateManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<WorkoutTemplate | null>(null);
  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(new Set());

  // Mock data
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      description: 'Comprehensive upper body workout focusing on strength and muscle building',
      estimatedDuration: 60,
      difficulty: 'Intermediate',
      category: 'Strength Training',
      createdAt: '2024-01-15',
      assignedClients: ['client1', 'client2'],
      exercises: [
        { id: '1', name: 'Bench Press', sets: 4, reps: 8, weight: 135, restTime: 120 },
        { id: '2', name: 'Pull-ups', sets: 3, reps: 10, restTime: 90 },
        { id: '3', name: 'Shoulder Press', sets: 3, reps: 12, weight: 95, restTime: 90 },
        { id: '4', name: 'Bicep Curls', sets: 3, reps: 15, weight: 30, restTime: 60 }
      ]
    },
    {
      id: '2',
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn',
      estimatedDuration: 30,
      difficulty: 'Advanced',
      category: 'Cardio',
      createdAt: '2024-01-10',
      assignedClients: ['client3'],
      exercises: [
        { id: '1', name: 'Burpees', sets: 4, reps: 15, restTime: 60 },
        { id: '2', name: 'Mountain Climbers', sets: 4, reps: 30, restTime: 45 },
        { id: '3', name: 'Jump Squats', sets: 4, reps: 20, restTime: 60 }
      ]
    }
  ]);

  const [clients] = useState<Client[]>([
    { id: 'client1', name: 'John Doe', email: 'john@example.com' },
    { id: 'client2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: 'client3', name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 'client4', name: 'Sarah Wilson', email: 'sarah@example.com' }
  ]);

  const [newTemplate, setNewTemplate] = useState<WorkoutTemplate>({
    id: '',
    name: '',
    description: '',
    exercises: [],
    estimatedDuration: 45,
    difficulty: 'Beginner',
    category: 'Strength Training',
    createdAt: new Date().toISOString().split('T')[0],
    assignedClients: []
  });

  const [newExercise, setNewExercise] = useState<Exercise>({
    id: '',
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
    restTime: 60,
    notes: ''
  });

  const toggleTemplateExpansion = (templateId: string) => {
    const newExpanded = new Set(expandedTemplates);
    if (newExpanded.has(templateId)) {
      newExpanded.delete(templateId);
    } else {
      newExpanded.add(templateId);
    }
    setExpandedTemplates(newExpanded);
  };

  const handleCreateTemplate = () => {
    const template = {
      ...newTemplate,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, template]);
    setShowCreateModal(false);
    setNewTemplate({
      id: '',
      name: '',
      description: '',
      exercises: [],
      estimatedDuration: 45,
      difficulty: 'Beginner',
      category: 'Strength Training',
      createdAt: new Date().toISOString().split('T')[0],
      assignedClients: []
    });
  };

  const handleAddExercise = () => {
    if (newExercise.name.trim()) {
      const exercise = {
        ...newExercise,
        id: Date.now().toString()
      };
      setNewTemplate({
        ...newTemplate,
        exercises: [...newTemplate.exercises, exercise]
      });
      setNewExercise({
        id: '',
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60,
        notes: ''
      });
    }
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setNewTemplate({
      ...newTemplate,
      exercises: newTemplate.exercises.filter(ex => ex.id !== exerciseId)
    });
  };

  const handleViewDetails = (template: WorkoutTemplate) => {
    setSelectedTemplate(template);
    setShowDetailsModal(true);
  };

  const handleAssignTemplate = (template: WorkoutTemplate) => {
    setSelectedTemplate(template);
    setShowAssignModal(true);
  };

  const handleAssignToClients = (clientIds: string[]) => {
    if (selectedTemplate) {
      const updatedTemplates = templates.map(template => 
        template.id === selectedTemplate.id 
          ? { ...template, assignedClients: clientIds }
          : template
      );
      setTemplates(updatedTemplates);
      setShowAssignModal(false);
      setSelectedTemplate(null);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleDuplicateTemplate = (template: WorkoutTemplate) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      assignedClients: []
    };
    setTemplates([...templates, duplicated]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Templates</h1>
          <p className="text-gray-600">Create and manage workout templates for your clients</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </button>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleTemplateExpansion(template.id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {expandedTemplates.has(template.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {template.difficulty}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {template.category}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {template.estimatedDuration} min
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Users className="h-3 w-3 mr-1" />
                        {template.assignedClients.length} assigned
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewDetails(template)}
                    className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleAssignTemplate(template)}
                    className="flex items-center px-3 py-1.5 text-sm text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Assign
                  </button>
                  <button
                    onClick={() => handleDuplicateTemplate(template)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedTemplates.has(template.id) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Exercises ({template.exercises.length})</h4>
                  <div className="space-y-3">
                    {template.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Dumbbell className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{exercise.name}</p>
                            <p className="text-sm text-gray-600">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight && ` @ ${exercise.weight} lbs`}
                              {exercise.restTime && ` (${exercise.restTime}s rest)`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Workout Template</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Template Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  >
                    <option value="Strength Training">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Pilates">Pilates</option>
                    <option value="CrossFit">CrossFit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={newTemplate.difficulty}
                    onChange={(e) => setNewTemplate({ ...newTemplate, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newTemplate.estimatedDuration}
                    onChange={(e) => setNewTemplate({ ...newTemplate, estimatedDuration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  placeholder="Describe this workout template"
                />
              </div>

              {/* Add Exercise */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Exercise</h4>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      value={newExercise.name}
                      onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                      placeholder="Enter exercise name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sets
                    </label>
                    <input
                      type="number"
                      value={newExercise.sets}
                      onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reps
                    </label>
                    <input
                      type="number"
                      value={newExercise.reps}
                      onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      value={newExercise.weight || ''}
                      onChange={(e) => setNewExercise({ ...newExercise, weight: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rest (sec)
                    </label>
                    <input
                      type="number"
                      value={newExercise.restTime || ''}
                      onChange={(e) => setNewExercise({ ...newExercise, restTime: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddExercise}
                  disabled={!newExercise.name.trim()}
                  className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </button>
              </div>

              {/* Exercise List */}
              {newTemplate.exercises.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Exercises ({newTemplate.exercises.length})</h4>
                  <div className="space-y-3">
                    {newTemplate.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Dumbbell className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{exercise.name}</p>
                            <p className="text-sm text-gray-600">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight && ` @ ${exercise.weight} lbs`}
                              {exercise.restTime && ` (${exercise.restTime}s rest)`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveExercise(exercise.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTemplate}
                disabled={!newTemplate.name.trim() || newTemplate.exercises.length === 0}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTemplate.name}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-gray-900">{selectedTemplate.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Category</h4>
                    <p className="text-gray-900">{selectedTemplate.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Difficulty</h4>
                    <p className="text-gray-900">{selectedTemplate.difficulty}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                    <p className="text-gray-900">{selectedTemplate.estimatedDuration} minutes</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Created</h4>
                    <p className="text-gray-900">{new Date(selectedTemplate.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Exercises ({selectedTemplate.exercises.length})</h4>
                  <div className="space-y-3">
                    {selectedTemplate.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Dumbbell className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{exercise.name}</p>
                            <p className="text-sm text-gray-600">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight && ` @ ${exercise.weight} lbs`}
                              {exercise.restTime && ` (${exercise.restTime}s rest)`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Template Modal */}
      {showAssignModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Assign Template</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Template: {selectedTemplate.name}</h4>
                <p className="text-sm text-gray-600">Select clients to assign this template to:</p>
              </div>
              <div className="space-y-3">
                {clients.map((client) => (
                  <label key={client.id} className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={selectedTemplate.assignedClients.includes(client.id)}
                      className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">{client.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({client.email})</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                  const selectedClientIds = Array.from(checkboxes).map(cb => cb.getAttribute('value') || '');
                  handleAssignToClients(selectedClientIds);
                }}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Assign Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
