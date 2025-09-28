'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Plus, 
  Target, 
  Clock, 
  Dumbbell,
  Utensils,
  Scale,
  Heart,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CalendarViewProps {
  clientId: string;
  clientName: string;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  type: 'workout' | 'nutrition' | 'weight' | 'checkin' | 'custom';
  targetDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'daily' | 'weekly' | 'monthly';
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'goal' | 'task' | 'workout' | 'checkin';
  date: string;
  completed: boolean;
  color: string;
}

export default function CalendarView({ clientId, clientName }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [goalForm, setGoalForm] = useState({
    title: '',
    description: '',
    type: 'workout' as Goal['type'],
    targetDate: '',
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    type: 'daily' as Task['type'],
    dueDate: '',
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      // In a real app, these would be API calls
      const mockGoals: Goal[] = [
        {
          id: '1',
          title: 'Complete 3 workouts this week',
          description: 'Focus on strength training',
          type: 'workout',
          targetDate: new Date().toISOString().split('T')[0],
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Hit protein target 5 days',
          description: '150g protein daily',
          type: 'nutrition',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];

      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Morning workout',
          description: '45-minute strength training',
          type: 'daily',
          dueDate: new Date().toISOString().split('T')[0],
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Log all meals',
          description: 'Track macros for the day',
          type: 'daily',
          dueDate: new Date().toISOString().split('T')[0],
          completed: true,
          completedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      ];

      setGoals(mockGoals);
      setTasks(mockTasks);

      // Combine goals and tasks into calendar events
      const calendarEvents: CalendarEvent[] = [
        ...mockGoals.map(goal => ({
          id: goal.id,
          title: goal.title,
          type: 'goal' as const,
          date: goal.targetDate,
          completed: goal.completed,
          color: getTypeColor(goal.type),
        })),
        ...mockTasks.map(task => ({
          id: task.id,
          title: task.title,
          type: 'task' as const,
          date: task.dueDate,
          completed: task.completed,
          color: getTypeColor(task.type),
        })),
      ];

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [clientId]);

  // Helper functions
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'bg-blue-500';
      case 'nutrition': return 'bg-green-500';
      case 'weight': return 'bg-purple-500';
      case 'checkin': return 'bg-orange-500';
      case 'daily': return 'bg-indigo-500';
      case 'weekly': return 'bg-pink-500';
      case 'monthly': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Dumbbell className="h-4 w-4" />;
      case 'nutrition': return <Utensils className="h-4 w-4" />;
      case 'weight': return <Scale className="h-4 w-4" />;
      case 'checkin': return <Heart className="h-4 w-4" />;
      case 'daily': return <Clock className="h-4 w-4" />;
      case 'weekly': return <Calendar className="h-4 w-4" />;
      case 'monthly': return <Target className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  // Toggle goal completion
  const toggleGoalCompletion = async (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            completed: !goal.completed,
            completedAt: !goal.completed ? new Date().toISOString() : undefined
          }
        : goal
    ));
    
    // Update events
    setEvents(prev => prev.map(event => 
      event.id === goalId && event.type === 'goal'
        ? { ...event, completed: !event.completed }
        : event
    ));
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    ));
    
    // Update events
    setEvents(prev => prev.map(event => 
      event.id === taskId && event.type === 'task'
        ? { ...event, completed: !event.completed }
        : event
    ));
  };

  // Save goal
  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: Goal = {
      id: editingGoal?.id || Date.now().toString(),
      title: goalForm.title,
      description: goalForm.description,
      type: goalForm.type,
      targetDate: goalForm.targetDate,
      completed: false,
      createdAt: editingGoal?.createdAt || new Date().toISOString(),
    };

    if (editingGoal) {
      setGoals(prev => prev.map(goal => goal.id === editingGoal.id ? newGoal : goal));
    } else {
      setGoals(prev => [...prev, newGoal]);
    }

    // Update events
    const event: CalendarEvent = {
      id: newGoal.id,
      title: newGoal.title,
      type: 'goal',
      date: newGoal.targetDate,
      completed: newGoal.completed,
      color: getTypeColor(newGoal.type),
    };

    if (editingGoal) {
      setEvents(prev => prev.map(e => e.id === editingGoal.id ? event : e));
    } else {
      setEvents(prev => [...prev, event]);
    }

    setShowGoalForm(false);
    setEditingGoal(null);
    setGoalForm({ title: '', description: '', type: 'workout', targetDate: '' });
  };

  // Save task
  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: editingTask?.id || Date.now().toString(),
      title: taskForm.title,
      description: taskForm.description,
      type: taskForm.type,
      dueDate: taskForm.dueDate,
      completed: false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    };

    if (editingTask) {
      setTasks(prev => prev.map(task => task.id === editingTask.id ? newTask : task));
    } else {
      setTasks(prev => [...prev, newTask]);
    }

    // Update events
    const event: CalendarEvent = {
      id: newTask.id,
      title: newTask.title,
      type: 'task',
      date: newTask.dueDate,
      completed: newTask.completed,
      color: getTypeColor(newTask.type),
    };

    if (editingTask) {
      setEvents(prev => prev.map(e => e.id === editingTask.id ? event : e));
    } else {
      setEvents(prev => [...prev, event]);
    }

    setShowTaskForm(false);
    setEditingTask(null);
    setTaskForm({ title: '', description: '', type: 'daily', dueDate: '' });
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
          <h2 className="text-2xl font-bold text-gray-900">Calendar & Goals</h2>
          <p className="text-gray-600">Track your goals and daily tasks for {clientName}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowGoalForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Target className="h-4 w-4 mr-2" />
            Add Goal
          </button>
          <button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {generateCalendarDays().map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = dateString === new Date().toISOString().split('T')[0];
            const dayEvents = getEventsForDate(dateString);

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-200 ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isToday ? 'text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        event.completed ? 'opacity-60' : ''
                      }`}
                      onClick={() => {
                        if (event.type === 'goal') {
                          toggleGoalCompletion(event.id);
                        } else if (event.type === 'task') {
                          toggleTaskCompletion(event.id);
                        }
                      }}
                    >
                      <div className={`flex items-center space-x-1 ${event.color} text-white px-2 py-1 rounded`}>
                        {event.completed ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          getTypeIcon(event.type)
                        )}
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goals List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals</h3>
        <div className="space-y-3">
          {goals.map(goal => (
            <div key={goal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`p-1 rounded-full ${
                    goal.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  {goal.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div>
                  <h4 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {goal.title}
                  </h4>
                  {goal.description && (
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(goal.type)} text-white`}>
                  {goal.type}
                </span>
                <button
                  onClick={() => {
                    setEditingGoal(goal);
                    setGoalForm({
                      title: goal.title,
                      description: goal.description || '',
                      type: goal.type,
                      targetDate: goal.targetDate,
                    });
                    setShowGoalForm(true);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h3>
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`p-1 rounded-full ${
                    task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div>
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(task.type)} text-white`}>
                  {task.type}
                </span>
                <button
                  onClick={() => {
                    setEditingTask(task);
                    setTaskForm({
                      title: task.title,
                      description: task.description || '',
                      type: task.type,
                      dueDate: task.dueDate,
                    });
                    setShowTaskForm(true);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Form Modal */}
      {showGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingGoal ? 'Edit' : 'Add'} Goal
            </h3>
            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={goalForm.title}
                  onChange={(e) => setGoalForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={goalForm.description}
                  onChange={(e) => setGoalForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={goalForm.type}
                  onChange={(e) => setGoalForm(prev => ({ ...prev, type: e.target.value as Goal['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="workout">Workout</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="weight">Weight</option>
                  <option value="checkin">Check-in</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={goalForm.targetDate}
                  onChange={(e) => setGoalForm(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowGoalForm(false);
                    setEditingGoal(null);
                    setGoalForm({ title: '', description: '', type: 'workout', targetDate: '' });
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingGoal ? 'Update' : 'Save'} Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingTask ? 'Edit' : 'Add'} Task
            </h3>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={taskForm.type}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, type: e.target.value as Task['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskForm(false);
                    setEditingTask(null);
                    setTaskForm({ title: '', description: '', type: 'daily', dueDate: '' });
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingTask ? 'Update' : 'Save'} Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
