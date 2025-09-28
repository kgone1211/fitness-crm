'use client';

import Layout from '@/components/Layout';
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function SchedulePage() {
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const sessions = [
    {
      id: '1',
      clientName: 'John Doe',
      clientId: 'client1',
      date: '2024-01-28',
      time: '09:00',
      duration: 60,
      type: 'Personal Training',
      location: 'Main Gym',
      status: 'Scheduled',
      notes: 'Focus on upper body strength training',
      exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press']
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientId: 'client2',
      date: '2024-01-28',
      time: '11:00',
      duration: 45,
      type: 'HIIT Training',
      location: 'Cardio Studio',
      status: 'Completed',
      notes: 'High-intensity interval training session',
      exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats']
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      clientId: 'client3',
      date: '2024-01-29',
      time: '14:00',
      duration: 60,
      type: 'Strength Training',
      location: 'Main Gym',
      status: 'Scheduled',
      notes: 'Leg day focus - squats and deadlifts',
      exercises: ['Squats', 'Deadlifts', 'Lunges']
    },
    {
      id: '4',
      clientName: 'Sarah Wilson',
      clientId: 'client4',
      date: '2024-01-29',
      time: '16:00',
      duration: 30,
      type: 'Consultation',
      location: 'Office',
      status: 'Scheduled',
      notes: 'Nutrition consultation and meal planning',
      exercises: []
    }
  ];

  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
    setShowSessionModal(true);
  };

  const handleViewDetails = (session: any) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const handleStartSession = (sessionId: string) => {
    console.log('Starting session:', sessionId);
    // In a real app, this would navigate to the workout session page
    alert(`Starting workout session for ${sessions.find(s => s.id === sessionId)?.clientName}`);
    setShowSessionModal(false);
  };

  const handleCompleteSession = (sessionId: string) => {
    console.log('Completing session:', sessionId);
    // In a real app, this would mark the session as completed
    alert(`Session completed for ${sessions.find(s => s.id === sessionId)?.clientName}`);
    setShowSessionModal(false);
  };

  const handleCancelSession = (sessionId: string) => {
    console.log('Canceling session:', sessionId);
    // In a real app, this would cancel the session
    alert(`Session canceled for ${sessions.find(s => s.id === sessionId)?.clientName}`);
    setShowSessionModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Clock className="h-4 w-4" />;
      case 'Completed':
        return <Calendar className="h-4 w-4" />;
      case 'Cancelled':
        return <Trash2 className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Schedule</h1>
            <p className="text-gray-600">Manage your client training sessions and appointments</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </button>
        </div>

        {/* Schedule Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.filter(s => s.date === '2024-01-28').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.filter(s => s.status === 'Completed').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.filter(s => s.status === 'Scheduled').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Locations</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(sessions.map(s => s.location)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {session.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.clientName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {session.location}
                        </span>
                        <span>{session.duration} min</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{session.type} • {session.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {getStatusIcon(session.status)}
                      <span className="ml-1">{session.status}</span>
                    </span>
                    <button
                      onClick={() => handleViewDetails(session)}
                      className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleSessionClick(session)}
                      className={`flex items-center px-3 py-1.5 text-sm text-white rounded-lg transition-colors ${
                        session.status === 'Completed' 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-brand-primary hover:bg-opacity-90'
                      }`}
                      disabled={session.status === 'Completed'}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      {session.status === 'Completed' ? 'Completed' : 'Session'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Modal */}
        {showSessionModal && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Session Actions</h3>
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Client: {selectedSession.clientName}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedSession.type} • {new Date(selectedSession.date).toLocaleDateString()} at {selectedSession.time}
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => handleStartSession(selectedSession.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Start Workout Session
                  </button>
                  <button
                    onClick={() => handleCompleteSession(selectedSession.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleCancelSession(selectedSession.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Session Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Session Information</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Client:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedSession.clientName}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Type:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedSession.type}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Date:</span>
                        <span className="ml-2 text-sm text-gray-600">{new Date(selectedSession.date).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Time:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedSession.time}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Duration:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedSession.duration} minutes</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Location:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedSession.location}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Status:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status)}`}>
                          {selectedSession.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Notes</h4>
                    <p className="text-sm text-gray-600 mb-4">{selectedSession.notes}</p>
                    {selectedSession.exercises.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Planned Exercises</h4>
                        <ul className="space-y-1">
                          {selectedSession.exercises.map((exercise, index) => (
                            <li key={index} className="text-sm text-gray-600">• {exercise}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
