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
  Trash2,
  ArrowLeft,
  Activity,
  Zap,
  Target,
  Award,
  Star,
  Heart,
  Timer,
  Users,
  TrendingUp,
  Filter
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

  const handleBackClick = () => {
    window.history.back();
  };
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
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Schedule
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">Manage your appointments and availability</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowNewAppointment(true)}
                  className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  New Appointment
                </button>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <Filter className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Select Date
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Quick Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Today's Appointments:
                    </span>
                    <span className="font-semibold text-blue-600">{filteredAppointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      This Week:
                    </span>
                    <span className="font-semibold text-purple-600">{appointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                      Completed:
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {appointments.filter(a => a.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
              <div className="px-6 py-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
              </div>
              <div className="p-6">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-24 w-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Calendar className="h-12 w-12 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments</h3>
                    <p className="text-gray-600">No appointments scheduled for this date.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-white/20">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                {getTypeIcon(appointment.type)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 truncate">
                                  {appointment.clientName}
                                </h4>
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                  {appointment.time} ({appointment.duration} min)
                                </div>
                                <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                                  {getTypeIcon(appointment.type)}
                                  <span className="ml-2 capitalize">{appointment.type}</span>
                                </div>
                                {appointment.notes && (
                                  <div className="text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                                    <span className="font-medium">Notes:</span> {appointment.notes}
                                  </div>
                                )}
                                {appointment.location && (
                                  <div className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg p-2">
                                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                                    {appointment.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white/50 rounded-xl transition-all duration-200">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* New Appointment Modal */}
        {showNewAppointment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-blue-500" />
                    New Appointment
                  </h3>
                  <button
                    onClick={() => setShowNewAppointment(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="px-6 py-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={newAppointment.clientName}
                    onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter client name"
                  />
                </div>
              
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as any})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={newAppointment.duration}
                      onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Gym, Studio, etc."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows={3}
                    placeholder="Add any notes about this appointment..."
                  />
                </div>
              </div>
              <div className="px-6 py-6 bg-white/50 backdrop-blur-sm flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewAppointment(false)}
                  className="px-6 py-3 text-gray-700 bg-white/80 border-2 border-gray-200 rounded-xl hover:bg-white hover:border-gray-300 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}