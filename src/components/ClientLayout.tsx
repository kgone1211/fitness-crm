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
      <div className={`fixed top-32 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${       
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Fitness CRM</span>
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
        <nav className="mt-6 px-3 flex-1">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'flex items-center px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border-r-2 border-indigo-600 rounded-lg'
                      : 'flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors'
                  } group flex items-center px-3 py-2 text-sm font-medium`}
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
        <div className="p-3 border-t border-gray-200">
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
      <div className="pl-64">
        {/* Mobile menu button - floating */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-400 hover:text-gray-600"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
