'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Activity, 
  Target, 
  Calendar, 
  User, 
  LogOut,
  Menu,
  X,
  BarChart3,
  Utensils
} from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [client, setClient] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // In a real app, this would come from authentication
    // For now, we'll simulate a logged-in client
    setClient({
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: null
    });
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/client', icon: Home },
    { name: 'My Progress', href: '/client/progress', icon: BarChart3 },
    { name: 'Workouts', href: '/client/workouts', icon: Activity },
    { name: 'Nutrition', href: '/client/nutrition', icon: Utensils },
    { name: 'Goals', href: '/client/goals', icon: Target },
    { name: 'Schedule', href: '/client/schedule', icon: Calendar },
  ];

  const isActive = (href: string) => {
    if (href === '/client') {
      return pathname === '/client';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    window.location.href = '/client/login';
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Fitness Portal</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{client.name}</p>
              <p className="text-xs text-gray-500">{client.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-lg font-medium text-gray-900">{client.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
