'use client';

import Layout from '@/components/Layout';
import { Settings, User, Bell, Shield, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function ClientSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <Layout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and notifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue="Jane Doe"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue="jane@example.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive browser notifications</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('push')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive text messages</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('sms')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add extra security to your account</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Download My Data</p>
                <p className="text-sm text-gray-500">Get a copy of your data</p>
              </button>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-5 w-5 text-orange-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Get help from our support team</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">FAQ</p>
                <p className="text-sm text-gray-500">Find answers to common questions</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">User Guide</p>
                <p className="text-sm text-gray-500">Learn how to use the app</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
