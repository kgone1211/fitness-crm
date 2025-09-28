'use client';

import Layout from '@/components/Layout';
import { Heart, Calendar, Target, MessageSquare, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ClientCheckinsPage() {
  const [showAddCheckinModal, setShowAddCheckinModal] = useState(false);
  const [newCheckin, setNewCheckin] = useState({
    mood: '',
    energy: '',
    weight: '',
    notes: ''
  });

  const recentCheckins = [
    {
      id: 1,
      date: '2024-01-28',
      mood: 'Great',
      energy: 'High',
      weight: '165 lbs',
      notes: 'Feeling strong today!',
      goals: ['Drink 8 glasses of water', 'Complete morning workout']
    },
    {
      id: 2,
      date: '2024-01-27',
      mood: 'Good',
      energy: 'Medium',
      weight: '165.2 lbs',
      notes: 'Rest day, went for a walk',
      goals: ['Walk 10,000 steps', 'Eat clean']
    }
  ];

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Check-in submitted successfully!');
    setShowAddCheckinModal(false);
    setNewCheckin({ mood: '', energy: '', weight: '', notes: '' });
  };

  return (
    <Layout userRole="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Check-ins</h1>
            <p className="text-gray-600">Track your daily progress and communicate with your coach</p>
          </div>
          <button
            onClick={() => setShowAddCheckinModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Check-in
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Check-ins</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentCheckins.map((checkin) => (
              <div key={checkin.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{checkin.date}</h3>
                      <p className="text-sm text-gray-600">
                        Mood: <span className="font-medium">{checkin.mood}</span> | 
                        Energy: <span className="font-medium">{checkin.energy}</span> | 
                        Weight: <span className="font-medium">{checkin.weight}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{checkin.notes}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Goals for the day:</h4>
                  <ul className="space-y-1">
                    {checkin.goals.map((goal, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Target className="h-3 w-3 mr-2 text-green-500" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages from Coach</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              <p className="text-sm text-gray-700">
                <strong>Great job on your consistency!</strong> Keep up the excellent work. 
                Try to increase your water intake slightly this week.
              </p>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
