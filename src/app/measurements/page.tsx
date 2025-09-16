'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Target, 
  TrendingUp, 
  TrendingDown,
  User,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { db } from '@/lib/database';
import { Measurement } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MeasurementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'weight' | 'body_fat' | 'muscle_mass' | 'waist' | 'chest' | 'arms' | 'thighs'>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  
  const measurements = db.getMeasurements();
  const clients = db.getClients();

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getTypeLabel = (type: Measurement['type']) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getUnitLabel = (unit: Measurement['unit']) => {
    switch (unit) {
      case 'kg': return 'kg';
      case 'lbs': return 'lbs';
      case 'cm': return 'cm';
      case 'inches': return 'in';
      case '%': return '%';
      default: return unit;
    }
  };

  const filteredMeasurements = measurements.filter(measurement => {
    const clientName = getClientName(measurement.clientId);
    const matchesSearch = getTypeLabel(measurement.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || measurement.type === filterType;
    const matchesClient = selectedClient === 'all' || measurement.clientId === selectedClient;
    
    return matchesSearch && matchesType && matchesClient;
  });

  // Group measurements by client and type for charts
  const getChartData = (clientId: string, type: Measurement['type']) => {
    return measurements
      .filter(m => m.clientId === clientId && m.type === type)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(m => ({
        date: m.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: m.value,
        fullDate: m.date
      }));
  };

  const getProgressChange = (clientId: string, type: Measurement['type']) => {
    const clientMeasurements = measurements
      .filter(m => m.clientId === clientId && m.type === type)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    if (clientMeasurements.length < 2) return 0;
    
    const latest = clientMeasurements[0].value;
    const previous = clientMeasurements[clientMeasurements.length - 1].value;
    
    return latest - previous;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Measurements</h1>
          <p className="text-gray-600">Track client progress with detailed measurements</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Add Measurement
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
                placeholder="Search measurements..."
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
              <option value="weight">Weight</option>
              <option value="body_fat">Body Fat</option>
              <option value="muscle_mass">Muscle Mass</option>
              <option value="waist">Waist</option>
              <option value="chest">Chest</option>
              <option value="arms">Arms</option>
              <option value="thighs">Thighs</option>
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

      {/* Charts Section */}
      {selectedClient !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Progress Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData(selectedClient, 'weight')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Body Fat Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Fat Percentage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData(selectedClient, 'body_fat')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Measurements List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Measurements ({filteredMeasurements.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredMeasurements.map((measurement) => {
            const progressChange = getProgressChange(measurement.clientId, measurement.type);
            return (
              <div key={measurement.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-gray-400 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        {getTypeLabel(measurement.type)}
                      </h4>
                      <span className="ml-3 text-sm text-gray-600">
                        {measurement.value} {getUnitLabel(measurement.unit)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4 mr-2" />
                      {getClientName(measurement.clientId)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {measurement.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    
                    {progressChange !== 0 && (
                      <div className="flex items-center text-sm">
                        {progressChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className={progressChange > 0 ? 'text-red-600' : 'text-green-600'}>
                          {progressChange > 0 ? '+' : ''}{progressChange.toFixed(1)} {getUnitLabel(measurement.unit)} from first measurement
                        </span>
                      </div>
                    )}
                    
                    {measurement.notes && (
                      <p className="text-sm text-gray-600 mt-2">{measurement.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredMeasurements.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Target className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' || selectedClient !== 'all' ? 'No measurements found' : 'No measurements recorded'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== 'all' || selectedClient !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start tracking your clients\' progress by adding measurements'
            }
          </p>
          {(!searchTerm && filterType === 'all' && selectedClient === 'all') && (
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Measurement
            </button>
          )}
        </div>
      )}
    </div>
  );
}
