'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, Palette, Database, Mail } from 'lucide-react';
import ColorCustomization from '@/components/ColorCustomization';
import PageHeader from '@/components/PageHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data & Privacy', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <ColorCustomization />;
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Profile Settings</h3>
                <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
              </div>
            </div>
            <div className="text-center py-12">
              <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Settings Coming Soon</h3>
              <p className="text-gray-600">Profile management features are being developed.</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
                <p className="text-sm text-gray-600">Configure how you receive notifications</p>
              </div>
            </div>
            <div className="text-center py-12">
              <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Settings Coming Soon</h3>
              <p className="text-gray-600">Notification preferences are being developed.</p>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Data & Privacy</h3>
                <p className="text-sm text-gray-600">Manage your data and privacy settings</p>
              </div>
            </div>
            <div className="text-center py-12">
              <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Data & Privacy Coming Soon</h3>
              <p className="text-gray-600">Privacy controls are being developed.</p>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Billing & Subscription</h3>
                <p className="text-sm text-gray-600">Manage your subscription and billing information</p>
              </div>
            </div>
            <div className="text-center py-12">
              <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Coming Soon</h3>
              <p className="text-gray-600">Billing management features are being developed.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Settings"
          description="Manage your account and application preferences"
          breadcrumbs={[{ name: 'Settings' }]}
          showBackButton={true}
        />

        {/* Settings Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </ThemeProvider>
  );
}
