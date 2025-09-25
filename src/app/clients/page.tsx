'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar,
  Target,
  Activity,
  TrendingUp,
  TrendingDown,
  Weight,
  MapPin,
  X,
  Users,
  Award,
  Zap,
  Star,
  Heart,
  Clock,
  CheckCircle
} from 'lucide-react';
import { db } from '@/lib/database';
import { Client } from '@/types';
import MacroTracking from '@/components/MacroTracking';
import PageHeader from '@/components/PageHeader';
import ClientDetailsModal from '@/components/ClientDetailsModal';
import EditClientModal from '@/components/EditClientModal';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedClientForDetails, setSelectedClientForDetails] = useState<Client | null>(null);
  const [selectedClientForEdit, setSelectedClientForEdit] = useState<Client | null>(null);
  
  const clients = db.getClients();
  const measurements = db.getMeasurements();
  const checkIns = db.getCheckIns();

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && client.isActive) ||
                         (filterStatus === 'inactive' && !client.isActive);
    return matchesSearch && matchesFilter;
  });

  const getClientStats = (clientId: string) => {
    const clientMeasurements = measurements
      .filter(m => m.clientId === clientId && m.type === 'weight')
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    const weightChange = clientMeasurements.length >= 2 
      ? clientMeasurements[0].value - clientMeasurements[clientMeasurements.length - 1].value
      : 0;
    
    const lastCheckIn = checkIns
      .filter(c => c.clientId === clientId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    
    return {
      weightChange,
      lastCheckIn: lastCheckIn?.date,
      totalMeasurements: clientMeasurements.length,
    };
  };

  const handleSaveClient = (updatedClient: Client) => {
    // In a real app, this would update the database
    // For now, we'll just close the modal
    console.log('Updated client:', updatedClient);
    setSelectedClientForEdit(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    Clients
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">Manage your client base and track their progress</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/clients/add" className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Client
              </Link>
              <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                <Filter className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Tracking Section */}
      {selectedClient && (
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Macro Tracking - {selectedClient.name}
                </h2>
                <p className="text-sm text-gray-600">Track nutrition and fitness goals</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedClient(null)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <MacroTracking clientId={selectedClient.id} clientName={selectedClient.name} />
        </div>
      )}

      {/* Filters and Search */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Clients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="group flex items-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm">
              <Filter className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => {
          const stats = getClientStats(client.id);
          return (
            <div key={client.id} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
              {/* Client Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-xl font-bold text-white">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <div className="flex items-center mt-1">
                      {client.isActive ? (
                        <div className="flex items-center text-xs text-emerald-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Inactive
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Client Info */}
              <div className="space-y-3 mb-6">
                {client.phone && (
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    {client.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                  <Mail className="h-4 w-4 mr-2 text-purple-500" />
                  {client.email}
                </div>
                {client.height && (
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Target className="h-4 w-4 mr-2 text-emerald-500" />
                    {client.height}cm
                  </div>
                )}
                {client.startingWeight && (
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Weight className="h-4 w-4 mr-2 text-orange-500" />
                    {client.startingWeight}lbs starting weight
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    {client.address.city}, {client.address.state}
                  </div>
                )}
              </div>

              {/* Goals */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Goals
                </h4>
                <div className="flex flex-wrap gap-2">
                  {client.goals.map((goal, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full border border-blue-200"
                    >
                      {goal.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Stats */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    Weight Progress
                  </span>
                  <div className="flex items-center">
                    {stats.weightChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : stats.weightChange < 0 ? (
                      <TrendingDown className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className={`text-sm ml-1 font-medium ${
                      stats.weightChange > 0 ? 'text-red-600' : 
                      stats.weightChange < 0 ? 'text-emerald-600' : 
                      'text-gray-600'
                    }`}>
                      {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)} lbs
                    </span>
                  </div>
                </div>
                
                {stats.lastCheckIn && (
                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    Last check-in: {stats.lastCheckIn.toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedClient(client)}
                  className="flex-1 px-4 py-3 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  <Target className="h-4 w-4 mr-1 inline" />
                  Macro
                </button>
                <button 
                  onClick={() => setSelectedClientForDetails(client)}
                  className="px-4 py-3 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  <Activity className="h-4 w-4 mr-1 inline" />
                  Details
                </button>
                <button 
                  onClick={() => setSelectedClientForEdit(client)}
                  className="px-4 py-3 text-sm border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-xl text-center">
          <div className="h-32 w-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Users className="h-16 w-16 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {searchTerm || filterStatus !== 'all' ? 'No clients found' : 'No clients yet'}
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first client to begin tracking their fitness journey'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <Link href="/clients/add" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
              <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Add Your First Client
            </Link>
          )}
        </div>
      )}

      {/* Client Details Modal */}
      <ClientDetailsModal
        client={selectedClientForDetails}
        onClose={() => setSelectedClientForDetails(null)}
        measurements={measurements}
        checkIns={checkIns}
      />

      {/* Edit Client Modal */}
      <EditClientModal
        client={selectedClientForEdit}
        onClose={() => setSelectedClientForEdit(null)}
        onSave={handleSaveClient}
      />
    </div>
  );
}
