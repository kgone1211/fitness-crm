'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, Palette, Database, Mail, ArrowLeft, Zap, Award, Star, Heart, Timer, Filter } from 'lucide-react';
import ColorCustomization from '@/components/ColorCustomization';
import PageHeader from '@/components/PageHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance');

  const handleBackClick = () => {
    window.history.back();
  };

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
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Profile Settings</h3>
                <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
              </div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
              <div className="h-32 w-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <User className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Profile Settings Coming Soon</h3>
              <p className="text-gray-600 text-lg">Profile management features are being developed.</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
                <p className="text-sm text-gray-600">Configure how you receive notifications</p>
              </div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
              <div className="h-32 w-32 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Bell className="h-16 w-16 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notification Settings Coming Soon</h3>
              <p className="text-gray-600 text-lg">Notification preferences are being developed.</p>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Data & Privacy</h3>
                <p className="text-sm text-gray-600">Manage your data and privacy settings</p>
              </div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
              <div className="h-32 w-32 mx-auto bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Shield className="h-16 w-16 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Data & Privacy Coming Soon</h3>
              <p className="text-gray-600 text-lg">Privacy controls are being developed.</p>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Billing & Subscription</h3>
                <p className="text-sm text-gray-600">Manage your subscription and billing information</p>
              </div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
              <div className="h-32 w-32 mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CreditCard className="h-16 w-16 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Billing Coming Soon</h3>
              <p className="text-gray-600 text-lg">Billing management features are being developed.</p>
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
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                        Settings
                      </h1>
                      <p className="text-lg text-gray-600 font-medium">Manage your account and application preferences</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                    <Filter className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                    Export Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Tabs */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <nav className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:text-gray-900'
                    } px-6 py-3 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all duration-300 hover:scale-105`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
            {renderTabContent()}
          </div>
      </div>
    </ThemeProvider>
  );
}
