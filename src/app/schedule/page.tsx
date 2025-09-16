'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Video, 
  Phone, 
  MapPin, 
  User, 
  CheckCircle,
  X,
  Edit,
  Trash2
} from 'lucide-react';

interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  type: 'video' | 'phone' | 'in-person';
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  location?: string;
}

export default function SchedulePage() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientId: '1',
      clientName: 'Sarah Johnson',
      type: 'video',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      status: 'scheduled',
      notes: 'Weight loss consultation'
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Mike Chen',
      type: 'in-person',
      date: '2024-01-15',
      time: '14:00',
      duration: 45,
      status: 'scheduled',
      notes: 'Strength training session',
      location: 'Gym - Bay 3'
    },
    {
      id: '3',
      clientId: '3',
      clientName: 'Emma Davis',
      type: 'phone',
      date: '2024-01-16',
      time: '09:30',
      duration: 30,
      status: 'scheduled',
      notes: 'Progress check-in'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    clientId: '',
    clientName: '',
    type: 'video' as 'video' | 'phone' | 'in-person',
    date: '',
    time: '',
    duration: 60,
    notes: '',
    location: ''
  });

  const handleCreateAppointment = () => {
    if (!newAppointment.clientName || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields');
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'scheduled'
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      clientId: '',
      clientName: '',
      type: 'video',
      date: '',
      time: '',
      duration: 60,
      notes: '',
      location: ''
    });
    setShowNewAppointment(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.date === selectedDate);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Schedule</h1>
          <p className="text-lg text-gray-600">Manage your appointments and availability.</p>
        </div>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Calendar and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Today's Appointments:</span>
                  <span className="font-semibold">{filteredAppointments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span className="font-semibold">{appointments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-semibold text-green-600">
                    {appointments.filter(a => a.status === 'completed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments</h3>
                  <p className="text-gray-600">No appointments scheduled for this date.</p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            {getTypeIcon(appointment.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-medium text-gray-900 truncate">
                              {appointment.clientName}
                            </h4>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time} ({appointment.duration} min)
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              {getTypeIcon(appointment.type)}
                              <span className="ml-1 capitalize">{appointment.type}</span>
                            </div>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                          )}
                          {appointment.location && (
                            <p className="text-sm text-gray-600 mt-1">{appointment.location}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">New Appointment</h3>
                <button
                  onClick={() => setShowNewAppointment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={newAppointment.clientName}
                  onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                    <option value={90}>90 min</option>
                    <option value={120}>120 min</option>
                  </select>
                </div>
              </div>

              {newAppointment.type === 'in-person' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Gym, Studio, etc."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any notes about this appointment..."
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAppointment(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}