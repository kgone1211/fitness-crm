'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Smile, 
  Battery,
  Moon,
  Droplets,
  Camera,
  MessageSquare,
  MoreVertical,
  Edit,
  Eye
} from 'lucide-react';
import { db } from '@/lib/database';
import { CheckIn } from '@/types';

export default function CheckInsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  
  const checkIns = db.getCheckIns();
  const clients = db.getClients();

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getMoodEmoji = (mood: CheckIn['mood']) => {
    const emojis = ['😞', '😐', '🙂', '😊', '😄'];
    return emojis[mood - 1];
  };

  const getMoodLabel = (mood: CheckIn['mood']) => {
    const labels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
    return labels[mood - 1];
  };

  const getEnergyLabel = (energy: CheckIn['energy']) => {
    const labels = ['Very Low', 'Low', 'Neutral', 'High', 'Very High'];
    return labels[energy - 1];
  };

  const filteredCheckIns = checkIns.filter(checkIn => {
    const clientName = getClientName(checkIn.clientId);
    const matchesSearch = clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkIn.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || checkIn.type === filterType;
    const matchesClient = selectedClient === 'all' || checkIn.clientId === selectedClient;
    
    return matchesSearch && matchesType && matchesClient;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Check-ins</h1>
          <p className="text-gray-600">Monitor client progress and well-being</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          New Check-in
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search check-ins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Clients</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Check-ins List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCheckIns.map((checkIn) => (
          <div key={checkIn.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {getClientName(checkIn.clientId).charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getClientName(checkIn.clientId)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {checkIn.type.charAt(0).toUpperCase() + checkIn.type.slice(1)} Check-in
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Date */}
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                {checkIn.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              {/* Mood and Energy */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Smile className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {getMoodEmoji(checkIn.mood)} {getMoodLabel(checkIn.mood)}
                    </div>
                    <div className="text-xs text-gray-600">Mood</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Battery className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {getEnergyLabel(checkIn.energy)}
                    </div>
                    <div className="text-xs text-gray-600">Energy</div>
                  </div>
                </div>
              </div>

              {/* Sleep and Water */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {checkIn.sleep}h
                    </div>
                    <div className="text-xs text-gray-600">Sleep</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-cyan-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {checkIn.water} glasses
                    </div>
                    <div className="text-xs text-gray-600">Water</div>
                  </div>
                </div>
              </div>

              {/* Photos */}
              {checkIn.photos && checkIn.photos.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Camera className="h-4 w-4 mr-2" />
                    Progress Photos ({checkIn.photos.length})
                  </div>
                  <div className="flex space-x-2">
                    {checkIn.photos.slice(0, 3).map((photo, index) => (
                      <div key={index} className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-400" />
                      </div>
                    ))}
                    {checkIn.photos.length > 3 && (
                      <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{checkIn.photos.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {checkIn.notes && (
                <div className="mb-4">
                  <div className="flex items-start">
                    <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600">{checkIn.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCheckIns.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' || selectedClient !== 'all' ? 'No check-ins found' : 'No check-ins recorded'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== 'all' || selectedClient !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start tracking client progress with regular check-ins'
            }
          </p>
          {(!searchTerm && filterType === 'all' && selectedClient === 'all') && (
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Record Your First Check-in
            </button>
          )}
        </div>
      )}
    </div>
  );
}
