'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Activity, 
  Target, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Bell,
  User,
  Camera,
  Search,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { WhopUserInfo } from './WhopIntegration';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, badge: null },
  { name: 'Clients', href: '/clients', icon: Users, badge: '12' },
  { name: 'Workouts', href: '/workouts', icon: Activity, badge: '5' },
  { name: 'Schedule', href: '/schedule', icon: Calendar, badge: null },
  { name: 'Progress Photos', href: '/progress-photos', icon: Camera, badge: '3' },
  { name: 'Measurements', href: '/measurements', icon: Target, badge: null },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness CRM</span>
            </div>
            <nav className="mt-8 px-3 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white/50 hover:text-gray-900'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      } mr-3 h-5 w-5 transition-colors duration-200`}
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
          <div className="flex-1 flex flex-col pt-8 pb-6 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness CRM</span>
                <p className="text-sm text-gray-500 font-medium">Trainer Dashboard</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 mx-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-lg font-bold text-gray-900">+12% Progress</p>
                </div>
              </div>
            </div>

            <nav className="mt-8 flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white/60 hover:text-gray-900'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      } mr-4 h-5 w-5 transition-colors duration-200`}
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white/80 backdrop-blur-xl border-b border-white/20">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Top bar for desktop */}
      <div className="hidden lg:block lg:pl-72">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-20 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex-1 px-6 flex justify-between items-center">
            <div className="flex-1 flex max-w-lg">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search clients, workouts..."
                />
              </div>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <button
                type="button"
                className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-white/50 rounded-xl transition-all duration-200"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <WhopUserInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
