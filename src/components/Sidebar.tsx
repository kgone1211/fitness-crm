'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
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
  Menu,
  Target,
  Camera,
  Ruler
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
    { name: 'My Progress', href: '/client/progress', icon: Target },
    { name: 'Settings', href: '/client/settings', icon: Settings },
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
    } flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            {brandSettings.logo ? (
              <img
                src={brandSettings.logo}
                alt="Logo"
                className="w-8 h-8 rounded"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">{brandSettings.companyName.charAt(0)}</span>
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {brandSettings.companyName}
              </h1>
              <p className="text-xs text-gray-500">
                {brandSettings.tagline}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCollapsed();
          }}
          className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
              <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
