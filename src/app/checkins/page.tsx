'use client';

import Layout from '@/components/Layout';
import { Heart, Calendar, Filter, Bell, MessageSquare, Eye, TrendingUp, TrendingDown, Clock, Users, Target, Plus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useGoals } from '@/contexts/GoalsContext';

export default function CheckInsPage() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSetGoalsModal, setShowSetGoalsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [reminderSettings, setReminderSettings] = useState({
    clientId: '',
    message: 'Don\'t forget to check in today!',
    frequency: 'daily',
    time: '09:00'
  });

  const [newGoal, setNewGoal] = useState({
    clientId: '',
    title: '',
    description: '',
    category: 'Fitness',
    targetValue: '',
    unit: '',
    dueDate: '',
    priority: 'Medium'
  });

  const [goals, setGoals] = useState([
    {
      id: '1',
      clientId: 'client1',
      clientName: 'John Doe',
      title: 'Lose 10 pounds',
      description: 'Reduce body weight to reach target weight of 170 lbs',
      category: 'Weight Loss',
      targetValue: '170',
      unit: 'lbs',
      currentValue: '180',
      dueDate: '2024-03-01',
      priority: 'High',
      status: 'In Progress',
      progress: 50,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      clientId: 'client2',
      clientName: 'Jane Smith',
      title: 'Increase bench press',
      description: 'Build strength by increasing bench press weight',
      category: 'Strength',
      targetValue: '135',
      unit: 'lbs',
      currentValue: '115',
      dueDate: '2024-02-15',
      priority: 'Medium',
      status: 'In Progress',
      progress: 75,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      clientId: 'client3',
      clientName: 'Mike Johnson',
      title: 'Run 5K in under 25 minutes',
      description: 'Improve cardiovascular fitness and running speed',
      category: 'Cardio',
      targetValue: '25',
      unit: 'minutes',
      currentValue: '32',
      dueDate: '2024-02-28',
      priority: 'Low',
      status: 'In Progress',
      progress: 30,
      createdAt: '2024-01-05'
    }
  ]);

  const checkIns = [
    {
      id: '1',
      clientName: 'John Doe',
      clientId: 'client1',
      date: '2024-01-27',
      mood: 'Great',
      moodScore: 8,
      energy: 'High',
      energyScore: 7,
      sleep: 7.5,
      water: 8,
      notes: 'Feeling strong today, had a great workout!',
      weight: 180,
      photos: [],
      status: 'completed'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientId: 'client2',
      date: '2024-01-27',
      mood: 'Good',
      moodScore: 6,
      energy: 'Medium',
      energyScore: 6,
      sleep: 6.5,
      water: 6,
      notes: 'Bit tired but motivated to push through',
      weight: 140,
      photos: [],
      status: 'completed'
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      clientId: 'client3',
      date: '2024-01-26',
      mood: 'Okay',
      moodScore: 5,
      energy: 'Low',
      energyScore: 4,
      sleep: 5.5,
      water: 4,
      notes: 'Struggling with motivation, need some encouragement',
      weight: 200,
      photos: [],
      status: 'completed'
    },
    {
      id: '4',
      clientName: 'Sarah Wilson',
      clientId: 'client4',
      date: '2024-01-25',
      mood: 'Excellent',
      moodScore: 9,
      energy: 'High',
      energyScore: 8,
      sleep: 8.0,
      water: 9,
      notes: 'Crushing my goals! Feeling amazing!',
      weight: 135,
      photos: [],
      status: 'completed'
    }
  ];

  const clients = [
    { id: 'client1', name: 'John Doe' },
    { id: 'client2', name: 'Jane Smith' },
    { id: 'client3', name: 'Mike Johnson' },
    { id: 'client4', name: 'Sarah Wilson' }
  ];

  const handleSetReminder = (client: any) => {
    setSelectedClient(client);
    setReminderSettings({
      ...reminderSettings,
      clientId: client.clientId
    });
    setShowReminderModal(true);
  };

  const handleMessageClient = (client: any) => {
    setSelectedClient(client);
    setShowMessageModal(true);
  };

  const handleFilterByDate = () => {
    setShowFilterModal(true);
  };

  const handleSetGoals = (client: any) => {
    setSelectedClient(client);
    setNewGoal({
      ...newGoal,
      clientId: client.clientId
    });
    setShowSetGoalsModal(true);
  };

  const handleSendReminder = () => {
    console.log('Setting reminder for:', selectedClient?.clientName, reminderSettings);
    alert(`Reminder set for ${selectedClient?.clientName}: "${reminderSettings.message}" (${reminderSettings.frequency} at ${reminderSettings.time})`);
    setShowReminderModal(false);
    setSelectedClient(null);
  };

  const handleSendMessage = (message: string) => {
    console.log(`Sending message to ${selectedClient?.clientName}:`, message);
    alert(`Message sent to ${selectedClient?.clientName}: "${message}"`);
    setShowMessageModal(false);
    setSelectedClient(null);
  };

  const handleApplyDateFilter = (startDate: string, endDate: string) => {
    console.log('Filtering by date range:', startDate, 'to', endDate);
    alert(`Filtering check-ins from ${startDate} to ${endDate}`);
    setShowFilterModal(false);
  };

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.targetValue && newGoal.dueDate) {
      const selectedClient = clients.find(c => c.id === newGoal.clientId);
      const goal = {
        id: Date.now().toString(),
        clientId: newGoal.clientId,
        clientName: selectedClient?.name || 'Unknown Client',
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        targetValue: newGoal.targetValue,
        unit: newGoal.unit,
        currentValue: '0',
        dueDate: newGoal.dueDate,
        priority: newGoal.priority,
        status: 'In Progress',
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGoals([...goals, goal]);
      setShowSetGoalsModal(false);
      setNewGoal({
        clientId: '',
        title: '',
        description: '',
        category: 'Fitness',
        targetValue: '',
        unit: '',
        dueDate: '',
        priority: 'Medium'
      });
      setSelectedClient(null);
    }
  };

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMoodBg = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getEnergyColor = (score: number) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-blue-500';
    return 'bg-red-500';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Check-ins & Goals</h1>
            <p className="text-gray-600">Monitor client progress, well-being, and goal tracking</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleFilterByDate}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter by Date
            </button>
            <button onClick={() => { alert("Viewing all check-ins in detailed view...\n\nThis would show:\n• All client check-ins in chronological order\n• Advanced filtering options\n• Export capabilities\n• Detailed analytics"); }} className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
              <Heart className="h-4 w-4 mr-2" />
              View All Check-ins
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Check-ins</p>
                <p className="text-2xl font-bold text-gray-900">{checkIns.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Mood</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(checkIns.reduce((acc, c) => acc + c.moodScore, 0) / checkIns.length).toFixed(1)}
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
                <p className="text-sm font-medium text-gray-500">Avg Sleep</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(checkIns.reduce((acc, c) => acc + c.sleep, 0) / checkIns.length).toFixed(1)}h
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Energy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(checkIns.reduce((acc, c) => acc + c.energyScore, 0) / checkIns.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900">{goals.filter(g => g.status === 'In Progress').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Client Goals</h2>
            <button className="flex items-center px-3 py-1.5 text-sm text-brand-primary bg-brand-primary bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {goals.map((goal) => (
              <div key={goal.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {goal.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {goal.category}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                        <span className="text-sm text-gray-500">
                          Due: {new Date(goal.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="text-lg font-semibold text-gray-900">{goal.progress}%</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${getGoalProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Current / Target</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSetGoals({ clientId: goal.clientId, clientName: goal.clientName })}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Update Goal"
                    >
                      <Target className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check-ins List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Check-ins</h2>
          {checkIns.map((checkIn) => (
            <div key={checkIn.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {checkIn.clientName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{checkIn.clientName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(checkIn.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {checkIn.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSetGoals(checkIn)}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Set Goals"
                  >
                    <Target className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleSetReminder(checkIn)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Set Reminder"
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleMessageClient(checkIn)}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Send Message"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Check-in Details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Mood</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getMoodBg(checkIn.moodScore)} ${getMoodColor(checkIn.moodScore)}`}>
                      {checkIn.moodScore}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{checkIn.mood}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Energy</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getEnergyColor(checkIn.energyScore)} bg-gray-100`}>
                      {checkIn.energyScore}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{checkIn.energy}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Sleep</span>
                    <span className="text-xs text-gray-500">{checkIn.sleep}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((checkIn.sleep / 8) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Water</span>
                    <span className="text-xs text-gray-500">{checkIn.water}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cyan-600 h-2 rounded-full" 
                      style={{ width: `${(checkIn.water / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {checkIn.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Notes:</span> {checkIn.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Set Goals Modal */}
        {showSetGoalsModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Set Goal for {selectedClient.clientName}</h3>
                <button
                  onClick={() => setShowSetGoalsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="e.g., Lose 10 pounds"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Describe the goal in detail..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    >
                      <option value="Fitness">Fitness</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Strength">Strength</option>
                      <option value="Cardio">Cardio</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Value
                    </label>
                    <input
                      type="text"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                      placeholder="lbs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSetGoalsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoal}
                  disabled={!newGoal.title || !newGoal.targetValue || !newGoal.dueDate}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Set Reminder Modal */}
        {showReminderModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Set Reminder</h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Client: {selectedClient.clientName}</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Message
                    </label>
                    <textarea
                      value={reminderSettings.message}
                      onChange={(e) => setReminderSettings({ ...reminderSettings, message: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      value={reminderSettings.frequency}
                      onChange={(e) => setReminderSettings({ ...reminderSettings, frequency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={reminderSettings.time}
                      onChange={(e) => setReminderSettings({ ...reminderSettings, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReminder}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Client Modal */}
        {showMessageModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">To: {selectedClient.clientName}</h4>
                  <p className="text-sm text-gray-600">Send a message about their check-in</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="checkinMessage"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Great job on your check-in! Keep up the good work..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const messageText = (document.getElementById('checkinMessage') as HTMLTextAreaElement)?.value;
                    if (messageText?.trim()) {
                      handleSendMessage(messageText);
                    } else {
                      alert('Please enter a message');
                    }
                  }}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter by Date Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Filter by Date</h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const startDate = (document.getElementById('startDate') as HTMLInputElement)?.value;
                    const endDate = (document.getElementById('endDate') as HTMLInputElement)?.value;
                    if (startDate && endDate) {
                      handleApplyDateFilter(startDate, endDate);
                    } else {
                      alert('Please select both start and end dates');
                    }
                  }}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
