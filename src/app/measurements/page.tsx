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
  Trash2,
  Activity,
  Zap,
  Award,
  Star,
  Heart,
  Timer,
  Users,
  BarChart3,
  ArrowLeft
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

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBackClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-white/50 rounded-xl"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Measurements
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">Track client progress with detailed measurements</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Add Measurement
                </button>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <BarChart3 className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search measurements by type or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Clients</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              <button className="group flex items-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm">
                <Filter className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {selectedClient !== 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Progress Chart */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Weight Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData(selectedClient, 'weight')}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Body Fat Chart */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-emerald-500" />
                Body Fat Percentage
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData(selectedClient, 'body_fat')}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Measurements List */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
          <div className="px-6 py-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              Measurements ({filteredMeasurements.length})
            </h3>
          </div>
          <div className="p-6">
            {filteredMeasurements.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-24 w-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || filterType !== 'all' || selectedClient !== 'all' ? 'No measurements found' : 'No measurements recorded'}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {searchTerm || filterType !== 'all' || selectedClient !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start tracking your clients\' progress by adding measurements'
                  }
                </p>
                {(!searchTerm && filterType === 'all' && selectedClient === 'all') && (
                  <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                    <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Add Your First Measurement
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMeasurements.map((measurement) => {
                  const progressChange = getProgressChange(measurement.clientId, measurement.type);
                  return (
                    <div key={measurement.id} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {getTypeLabel(measurement.type)}
                              </h4>
                              <div className="flex items-center mt-1">
                                <span className="text-lg font-bold text-blue-600">
                                  {measurement.value} {getUnitLabel(measurement.unit)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                              <User className="h-4 w-4 mr-2 text-blue-500" />
                              {getClientName(measurement.clientId)}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                              <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                              {measurement.date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            
                            {progressChange !== 0 && (
                              <div className="flex items-center text-sm bg-white/50 rounded-lg p-2">
                                {progressChange > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-emerald-500 mr-2" />
                                )}
                                <span className={progressChange > 0 ? 'text-red-600 font-medium' : 'text-emerald-600 font-medium'}>
                                  {progressChange > 0 ? '+' : ''}{progressChange.toFixed(1)} {getUnitLabel(measurement.unit)} from first measurement
                                </span>
                              </div>
                            )}
                            
                            {measurement.notes && (
                              <div className="text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                                <span className="font-medium">Notes:</span> {measurement.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
