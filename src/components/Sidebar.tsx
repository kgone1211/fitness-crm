'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useWhopAuth } from '@/contexts/WhopAuthContext';
import { 
  LayoutDashboard,
  Users,
  Calendar,
  Dumbbell,
  Utensils,
  Heart,
  BarChart3,
  Settings,
  Palette,
  FileText,
  LogOut,
  Menu,
  X,
  Target,
  Camera,
  Ruler,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  userRole?: 'coach' | 'client';
}

export default function Sidebar({ collapsed, toggleCollapsed, userRole = 'coach' }: SidebarProps) {
  const pathname = usePathname();
  const { brandSettings } = useTheme();

  const coachNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Workouts', href: '/workouts', icon: Dumbbell },
    { name: 'Nutrition', href: '/nutrition', icon: Utensils },
    { name: 'Check-ins', href: '/checkins', icon: Heart },
    { name: 'Progress Photos', href: '/progress-photos', icon: Camera },
    { name: 'Measurements', href: '/measurements', icon: Ruler },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Branding', href: '/branding', icon: Palette },
  ];

  const clientNavigation = [
    { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
    { name: 'My Workouts', href: '/client/workouts', icon: Dumbbell },
    { name: 'My Nutrition', href: '/client/nutrition', icon: Utensils },
    { name: 'My Schedule', href: '/client/schedule', icon: Calendar },
    { name: 'My Check-ins', href: '/client/checkins', icon: Heart },
    { name: 'My Progress', href: '/client/progress', icon: TrendingUp },
  ];

  const navigation = userRole === 'coach' ? coachNavigation : clientNavigation;

  const isActive = (href: string) => {
    if (href === '/' || href === '/client') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            {brandSettings.logo && (
              <img 
                src={brandSettings.logo} 
                alt="Logo" 
                className="w-8 h-8 rounded"
              />
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {brandSettings.companyName}
              </h1>
              <p className="text-xs text-gray-600">
                {brandSettings.tagline}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={(e) => {
                e.preventDefault();
                logout();
                e.preventDefault();
                logout();
            e.preventDefault();
            e.stopPropagation();
            toggleCollapsed();
          }}
          className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                logout();
                e.preventDefault();
                logout();
                e.preventDefault();
                window.location.href = item.href;
              }}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/settings"
          onClick={(e) => {
                e.preventDefault();
                logout();
                e.preventDefault();
                logout();
            e.preventDefault();
            window.location.href = '/settings';
          }}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
            isActive('/settings')
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <span className="ml-3">Settings</span>
          )}
        </Link>
      </div>
    </div>
  );
}
