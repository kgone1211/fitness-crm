'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
// import WhopIntegration from '@/components/WhopIntegration';
import {
  Users,
  Calendar,
  Dumbbell,
  Utensils,
  Heart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  MessageSquare,
  Target,
  Clock,
  CheckCircle,
  UserPlus,
  Activity,
  Zap
} from 'lucide-react';

export default function CoachDashboard() {
  const { user, isLoading } = useAuth();
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-15',
      avatar: null,
      currentWeight: 180,
      goalWeight: 160,
      progress: 85,
      lastCheckIn: '2024-01-27',
      workoutsThisWeek: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2024-01-10',
      avatar: null,
      currentWeight: 140,
      goalWeight: 135,
      progress: 92,
      lastCheckIn: '2024-01-26',
      workoutsThisWeek: 4,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2024-01-05',
      avatar: null,
      currentWeight: 200,
      goalWeight: 180,
      progress: 45,
      lastCheckIn: '2024-01-25',
      workoutsThisWeek: 2,
      status: 'active'
    }
  ]);

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    goalWeight: '',
    notes: ''
  });

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: Date.now().toString(),
        ...newClient,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        currentWeight: 0,
        progress: 0,
        lastCheckIn: '',
        workoutsThisWeek: 0,
        status: 'active'
      };
      setClients([...clients, client]);
      setShowAddClientModal(false);
      setNewClient({ name: '', email: '', phone: '', goalWeight: '', notes: '' });
      alert('Client added successfully!');
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return 'bg-green-100';
    if (progress >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      // <WhopIntegration />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coach Dashboard</h1>
            <p className="text-gray-600">Manage your clients and track their progress</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddClientModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Dumbbell className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.reduce((sum, client) => sum + client.workoutsThisWeek, 0)}
                </p>
                <p className="text-sm text-gray-500">workouts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(clients.reduce((sum, client) => sum + client.progress, 0) / clients.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Clients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {clients.map((client) => (
              <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Joined: {new Date(client.joinDate).toLocaleDateString()}</span>
                        <span>Weight: {client.currentWeight} lbs</span>
                        <span>Goal: {client.goalWeight} lbs</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className={`text-lg font-semibold ${getProgressColor(client.progress)}`}>
                        {client.progress}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getProgressBg(client.progress)}`}
                          style={{ width: `${client.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">This Week</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {client.workoutsThisWeek} workouts
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">John completed workout</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Heart className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Jane submitted check-in</p>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Mike reached 45% progress</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Goals</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Client check-ins</span>
                <span className="text-sm font-medium text-green-600">8/12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Workouts assigned</span>
                <span className="text-sm font-medium text-blue-600">15/18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Progress reviews</span>
                <span className="text-sm font-medium text-purple-600">6/10</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Client satisfaction</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">18</div>
                <div className="text-sm text-gray-600">Workouts this week</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">24</div>
                <div className="text-sm text-gray-600">Check-ins received</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Client Modal */}
        {showAddClientModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowAddClientModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Client</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client's email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client's phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={newClient.goalWeight}
                    onChange={(e) => setNewClient({ ...newClient, goalWeight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter goal weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newClient.notes}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional notes about the client"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddClientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Client
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
