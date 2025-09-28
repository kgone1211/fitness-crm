'use client';

import React, { useState, useEffect } from 'react';
import { X, 
  Users, 
  Activity, 
  Target, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  MessageSquare,
  BarChart3,
  Dumbbell,
  Utensils,
  Heart,
  Settings,
  Palette,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import MacroTracking from './MacroTracking';
import CheckInSystem from './CheckInSystem';
import WorkoutTemplateManager from './WorkoutTemplateManager';
import BrandingSystem from './BrandingSystem';

interface CoachDashboardProps {
  coachId: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  isActive: boolean;
  currentWeight?: number;
  goalWeight?: number;
  lastCheckIn?: string;
  workoutsThisWeek: number;
  successRate: number;
  avatar?: string;
}

interface DashboardStats {
  totalClients: number;
  activeClients: number;
  workoutsThisWeek: number;
  checkInsThisWeek: number;
  averageWorkoutDuration: number;
  clientProgress: {
    clientId: string;
    clientName: string;
    weightChange: number;
    measurementChange: number;
    lastCheckIn: string;
  }[];
}

export default function CoachDashboard({ coachId }: CoachDashboardProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'templates' | 'branding' | 'analytics'>('overview');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMacroModal, setShowMacroModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in a real app, these would be API calls
      const mockClients: Client[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          joinDate: '2024-01-15',
          isActive: true,
          currentWeight: 180,
          goalWeight: 160,
          lastCheckIn: '2024-01-20',
          workoutsThisWeek: 3,
          successRate: 85,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543',
          joinDate: '2024-01-10',
          isActive: true,
          currentWeight: 140,
          goalWeight: 130,
          lastCheckIn: '2024-01-19',
          workoutsThisWeek: 4,
          successRate: 92,
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+1 (555) 456-7890',
          joinDate: '2024-01-05',
          isActive: false,
          currentWeight: 200,
          goalWeight: 180,
          lastCheckIn: '2024-01-15',
          workoutsThisWeek: 1,
          successRate: 65,
        },
      ];

      const mockStats: DashboardStats = {
        totalClients: 3,
        activeClients: 2,
        workoutsThisWeek: 8,
        checkInsThisWeek: 6,
        averageWorkoutDuration: 45,
        clientProgress: [
          {
            clientId: '1',
            clientName: 'John Doe',
            weightChange: -5,
            measurementChange: -2,
            lastCheckIn: '2024-01-20',
          },
          {
            clientId: '2',
            clientName: 'Jane Smith',
            weightChange: -3,
            measurementChange: -1,
            lastCheckIn: '2024-01-19',
          },
        ],
      };

      setClients(mockClients);
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coachId]);

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && client.isActive) ||
                         (filterStatus === 'inactive' && !client.isActive);
    return matchesSearch && matchesFilter;
  });

  // Get status color
  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Get success rate color
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
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
          <h1 className="text-3xl font-bold text-gray-900">Coach Dashboard</h1>
          <p className="text-gray-600">Manage your clients and track their progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowClientModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'clients'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Clients
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Dumbbell className="h-4 w-4 inline mr-2" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'branding'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="h-4 w-4 inline mr-2" />
            Branding
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'analytics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Clients</p>
                      <p className="text-2xl font-bold text-gray-900">{stats?.totalClients}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Active Clients</p>
                      <p className="text-2xl font-bold text-gray-900">{stats?.activeClients}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Dumbbell className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Workouts This Week</p>
                      <p className="text-2xl font-bold text-gray-900">{stats?.workoutsThisWeek}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Heart className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Check-ins This Week</p>
                      <p className="text-2xl font-bold text-gray-900">{stats?.checkInsThisWeek}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">John Doe completed his workout</p>
                      <p className="text-sm text-gray-500">Upper Body Strength • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Heart className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Jane Smith submitted check-in</p>
                      <p className="text-sm text-gray-500">Mood: 4/5, Energy: 3/5 • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Utensils className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Mike Johnson logged nutrition</p>
                      <p className="text-sm text-gray-500">Breakfast: 450 calories • 6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Progress */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Progress</h3>
                <div className="space-y-4">
                  {stats?.clientProgress.map((progress) => (
                    <div key={progress.clientId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{progress.clientName}</h4>
                        <p className="text-sm text-gray-600">
                          Last check-in: {new Date(progress.lastCheckIn).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${progress.weightChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {progress.weightChange > 0 ? '+' : ''}{progress.weightChange} lbs
                        </div>
                        <div className="text-sm text-gray-500">
                          {progress.measurementChange} inches
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Clients</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              {/* Clients List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                  <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{client.name}</h3>
                          <p className="text-sm text-gray-600">{client.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(client.isActive)}`}>
                          {client.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Weight Progress</span>
                        <span className="font-medium">
                          {client.currentWeight} → {client.goalWeight} lbs
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Workouts This Week</span>
                        <span className="font-medium">{client.workoutsThisWeek}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Success Rate</span>
                        <span className={`font-medium ${getSuccessRateColor(client.successRate)}`}>
                          {client.successRate}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowMacroModal(true);
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Utensils className="h-4 w-4 inline mr-1" />
                        Macros
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowCheckInModal(true);
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <Heart className="h-4 w-4 inline mr-1" />
                        Check-in
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <WorkoutTemplateManager coachId={coachId} />
          )}

          {activeTab === 'branding' && (
            <BrandingSystem coachId={coachId} />
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">Detailed analytics and reporting features coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Macro Tracking Modal */}
      {showMacroModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Macro Tracking - {selectedClient.name}
              </h3>
              <button
                onClick={() => {
                  setShowMacroModal(false);
                  setSelectedClient(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <MacroTracking clientId={selectedClient.id} clientName={selectedClient.name} />
            </div>
          </div>
        </div>
      )}

      {/* Check-in Modal */}
      {showCheckInModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Check-in - {selectedClient.name}
              </h3>
              <button
                onClick={() => {
                  setShowCheckInModal(false);
                  setSelectedClient(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <CheckInSystem clientId={selectedClient.id} clientName={selectedClient.name} isCoach={true} />
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Client</h3>
              <button
                onClick={() => setShowClientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client's email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client's phone number"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
