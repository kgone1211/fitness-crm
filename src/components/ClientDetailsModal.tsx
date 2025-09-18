'use client';

import React from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  Calendar,
  Target,
  Weight,
  MapPin,
  TrendingUp,
  TrendingDown,
  Activity,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Client } from '@/types';

interface ClientDetailsModalProps {
  client: Client | null;
  onClose: () => void;
  measurements: any[];
  checkIns: any[];
}

export default function ClientDetailsModal({ 
  client, 
  onClose, 
  measurements, 
  checkIns 
}: ClientDetailsModalProps) {
  if (!client) return null;

  const clientMeasurements = measurements
    .filter(m => m.clientId === client.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const clientCheckIns = checkIns
    .filter(c => c.clientId === client.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const weightChange = clientMeasurements.length >= 2 
    ? clientMeasurements[0].value - clientMeasurements[clientMeasurements.length - 1].value
    : 0;

  const lastCheckIn = clientCheckIns[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">{client.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{client.phone}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">
                      {client.address.street}, {client.address.city}, {client.address.state} {client.address.zipCode}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Information</h3>
              <div className="space-y-3">
                {client.height && (
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Height: {client.height}cm</span>
                  </div>
                )}
                {client.startingWeight && (
                  <div className="flex items-center">
                    <Weight className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Starting Weight: {client.startingWeight}lbs</span>
                  </div>
                )}
                {client.dateOfBirth && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">
                      Age: {new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear()} years old
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals</h3>
            <div className="flex flex-wrap gap-2">
              {client.goals.map((goal, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {goal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Weight Progress</h4>
                <div className="flex items-center">
                  {weightChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : weightChange < 0 ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                </div>
              </div>
              <p className={`text-2xl font-bold ${
                weightChange > 0 ? 'text-red-600' : 
                weightChange < 0 ? 'text-green-600' : 
                'text-gray-600'
              }`}>
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs
              </p>
              <p className="text-sm text-gray-600">
                {clientMeasurements.length} measurements recorded
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Check-ins</h4>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{clientCheckIns.length}</p>
              <p className="text-sm text-gray-600">
                {lastCheckIn ? `Last: ${lastCheckIn.date.toLocaleDateString()}` : 'No check-ins yet'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Status</h4>
                <Activity className={`h-4 w-4 ${client.isActive ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <p className={`text-2xl font-bold ${client.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {client.isActive ? 'Active' : 'Inactive'}
              </p>
              <p className="text-sm text-gray-600">
                {client.isActive ? 'Currently training' : 'Not currently training'}
              </p>
            </div>
          </div>

          {/* Recent Measurements */}
          {clientMeasurements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Measurements</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {clientMeasurements.slice(0, 5).map((measurement, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center">
                        <Weight className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">
                          {measurement.type.charAt(0).toUpperCase() + measurement.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {measurement.value} {measurement.unit}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {measurement.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Check-ins */}
          {clientCheckIns.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Check-ins</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {clientCheckIns.slice(0, 5).map((checkIn, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">
                          Check-in #{clientCheckIns.length - index}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {checkIn.date.toLocaleDateString()}
                        </span>
                        {checkIn.notes && (
                          <span className="text-xs text-gray-500 ml-2 truncate max-w-32">
                            {checkIn.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Client
          </button>
        </div>
      </div>
    </div>
  );
}
