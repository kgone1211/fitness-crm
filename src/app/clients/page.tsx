'use client';

import Layout from '@/components/Layout';
import { Users, Search, Filter, Plus, Eye, MessageSquare, Phone, Mail, Calendar, Target, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ClientsPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      joinDate: '2024-01-15',
      status: 'Active',
      goals: 'Weight Loss',
      progress: '+2.5 lbs muscle',
      nextSession: '2024-01-28',
      totalSessions: 24,
      checkIns: 18,
      lastActivity: '2024-01-25'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 234-5678',
      joinDate: '2024-01-10',
      status: 'Active',
      goals: 'Muscle Building',
      progress: '-5 lbs fat',
      nextSession: '2024-01-29',
      totalSessions: 28,
      checkIns: 22,
      lastActivity: '2024-01-26'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '(555) 345-6789',
      joinDate: '2024-01-05',
      status: 'Active',
      goals: 'General Fitness',
      progress: '+1.2 lbs muscle',
      nextSession: '2024-01-30',
      totalSessions: 16,
      checkIns: 12,
      lastActivity: '2024-01-24'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '(555) 456-7890',
      joinDate: '2023-12-20',
      status: 'Active',
      goals: 'Strength Training',
      progress: '+3.1 lbs muscle',
      nextSession: '2024-01-31',
      totalSessions: 32,
      checkIns: 28,
      lastActivity: '2024-01-27'
    }
  ];

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleMessageClient = (client: any) => {
    setSelectedClient(client);
    setShowMessageModal(true);
  };

  const handleSendMessage = (message: string) => {
    console.log(`Sending message to ${selectedClient?.name}:`, message);
    // In a real app, this would send the message via email/SMS
    alert(`Message sent to ${selectedClient?.name}: "${message}"`);
    setShowMessageModal(false);
    setSelectedClient(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600">Manage your clients and track their progress</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Stats Overview */}
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
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.filter(c => c.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">+2.2 lbs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Next Sessions</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Client List</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {clients.map((client) => (
              <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {client.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {client.phone}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {new Date(client.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Goal: {client.goals}</span>
                        <span className="text-green-600 font-medium">{client.progress}</span>
                        <span>Next: {new Date(client.nextSession).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{client.totalSessions} sessions</span>
                      <span className="text-xs text-gray-500">{client.checkIns} check-ins</span>
                    </div>
                    <button
                      onClick={() => handleViewClient(client)}
                      className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleMessageClient(client)}
                      className="flex items-center px-3 py-1.5 text-sm text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Client Modal */}
        {showViewModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Client Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Name:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.name}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Email:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.email}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Phone:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.phone}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Join Date:</span>
                        <span className="ml-2 text-sm text-gray-600">{new Date(selectedClient.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Status:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedClient.status)}`}>
                          {selectedClient.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Progress & Activity</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Goal:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.goals}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Progress:</span>
                        <span className="ml-2 text-sm text-green-600 font-medium">{selectedClient.progress}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Total Sessions:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.totalSessions}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Check-ins:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedClient.checkIns}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Next Session:</span>
                        <span className="ml-2 text-sm text-gray-600">{new Date(selectedClient.nextSession).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Last Activity:</span>
                        <span className="ml-2 text-sm text-gray-600">{new Date(selectedClient.lastActivity).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completed workout session</span>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Submitted check-in</span>
                      <span className="text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Updated measurements</span>
                      <span className="text-gray-500">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleMessageClient(selectedClient);
                  }}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Send Message
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
                  <h4 className="text-sm font-medium text-gray-700 mb-2">To: {selectedClient.name}</h4>
                  <p className="text-sm text-gray-600">{selectedClient.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="messageText"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Type your message here..."
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
                    const messageText = (document.getElementById('messageText') as HTMLTextAreaElement)?.value;
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
      </div>
    </Layout>
  );
}
