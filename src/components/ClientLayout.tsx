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
    const initializeClient = async () => {
      const token = localStorage.getItem('client-token');
      const clientData = localStorage.getItem('client-data');

      if (token && clientData) {
        try {
          // Verify token with server
          const response = await fetch('/api/client/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setClient(data.client);
          } else {
            // Token is invalid, redirect to login
            localStorage.removeItem('client-token');
            localStorage.removeItem('client-data');
            window.location.href = '/client/login';
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('client-token');
          localStorage.removeItem('client-data');
          window.location.href = '/client/login';
        }
      } else {
        // No token, redirect to login
        window.location.href = '/client/login';
      }
    };

    initializeClient();
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
    // Clear authentication tokens
    localStorage.removeItem('client-token');
    localStorage.removeItem('client-data');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
          <div className="flex-1 flex flex-col pt-8 pb-6 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness CRM</span>
                <p className="text-sm text-gray-500 font-medium">Client Portal</p>
              </div>
            </div>

            {/* User info */}
            <div className="mt-8 mx-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
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
            <nav className="mt-8 flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white/60 hover:text-gray-900'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                  >
                    <Icon
                      className={`${
                        isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      } mr-4 h-5 w-5 transition-colors duration-200`}
                    />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness CRM</span>
            </div>
            <nav className="mt-8 px-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white/50 hover:text-gray-900'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon
                      className={`${
                        isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      } mr-3 h-5 w-5 transition-colors duration-200`}
                    />
                    <span className="flex-1">{item.name}</span>
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
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Top bar for desktop */}
      <div className="hidden lg:block lg:pl-72">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-20 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex-1 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">Client Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
