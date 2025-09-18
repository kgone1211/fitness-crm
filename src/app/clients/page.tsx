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
  Users
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
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Clients"
        description="Manage your client base and track their progress"
        breadcrumbs={[{ name: 'Clients' }]}
        showBackButton={true}
      >
        <Link href="/clients/add" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Add Client
        </Link>
      </PageHeader>

      {/* Macro Tracking Section */}
      {selectedClient && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Macro Tracking - {selectedClient.name}
            </h2>
            <button
              onClick={() => setSelectedClient(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <MacroTracking clientId={selectedClient.id} clientName={selectedClient.name} />
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Clients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
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
            <div key={client.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Client Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-700">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                {/* Client Info */}
                <div className="space-y-2 mb-4">
                  {client.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {client.phone}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {client.email}
                  </div>
                  {client.height && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="h-4 w-4 mr-2" />
                      {client.height}cm
                    </div>
                  )}
                  {client.startingWeight && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Weight className="h-4 w-4 mr-2" />
                      {client.startingWeight}lbs starting weight
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {client.address.city}, {client.address.state}
                    </div>
                  )}
                </div>

                {/* Goals */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Goals</h4>
                  <div className="flex flex-wrap gap-1">
                    {client.goals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {goal.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Weight Progress</span>
                    <div className="flex items-center">
                      {stats.weightChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : stats.weightChange < 0 ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                      <span className={`text-sm ml-1 ${
                        stats.weightChange > 0 ? 'text-red-600' : 
                        stats.weightChange < 0 ? 'text-green-600' : 
                        'text-gray-600'
                      }`}>
                        {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)} lbs
                      </span>
                    </div>
                  </div>
                  
                  {stats.lastCheckIn && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last check-in: {stats.lastCheckIn.toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => setSelectedClient(client)}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Macro Tracking
                  </button>
                  <button 
                    onClick={() => setSelectedClientForDetails(client)}
                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => setSelectedClientForEdit(client)}
                    className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No clients found' : 'No clients yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first client'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Client
            </button>
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
