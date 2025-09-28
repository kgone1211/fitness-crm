'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Activity,
  Scale,
  TrendingUp,
  MessageSquare,
  Camera,
  Clock
} from 'lucide-react';

interface SidebarProps {
  userRole?: 'coach' | 'client';
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ userRole = 'coach', isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Coach navigation items
  const coachNavItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      description: 'Overview and statistics'
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: Users,
      description: 'Manage your clients'
    },
    {
      name: 'Schedule',
      href: '/schedule',
      icon: Calendar,
      description: 'View and manage schedules'
    },
    {
      name: 'Workouts',
      href: '/workouts',
      icon: Dumbbell,
      description: 'Workout templates and sessions'
    },
    {
      name: 'Nutrition',
      href: '/nutrition',
      icon: Utensils,
      description: 'Macro tracking and meal plans'
    },
    {
      name: 'Check-ins',
      href: '/checkins',
      icon: Heart,
      description: 'Client daily check-ins'
    },
    {
      name: 'Progress Photos',
      href: '/progress-photos',
      icon: Camera,
      description: 'Client progress photos'
    },
    {
      name: 'Measurements',
      href: '/measurements',
      icon: Scale,
      description: 'Track client measurements'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Detailed analytics and reports'
    },
    {
      name: 'Branding',
      href: '/branding',
      icon: Palette,
      description: 'Customize app appearance'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account and preferences'
    }
  ];

  // Client navigation items
  const clientNavItems = [
    {
      name: 'Dashboard',
      href: '/client',
      icon: LayoutDashboard,
      description: 'Your fitness overview'
    },
    {
      name: 'Calendar & Goals',
      href: '/client/calendar',
      icon: Calendar,
      description: 'Track goals and tasks'
    },
    {
      name: 'Workouts',
      href: '/client/workouts',
      icon: Dumbbell,
      description: 'Your workout sessions'
    },
    {
      name: 'Nutrition',
      href: '/client/nutrition',
      icon: Utensils,
      description: 'Macro tracking and meals'
    },
    {
      name: 'Check-ins',
      href: '/client/checkins',
      icon: Heart,
      description: 'Daily wellness check-ins'
    },
    {
      name: 'Progress',
      href: '/client/progress',
      icon: TrendingUp,
      description: 'Track your progress'
    },
    {
      name: 'Schedule',
      href: '/client/schedule',
      icon: Clock,
      description: 'Your workout schedule'
    },
    {
      name: 'Goals',
      href: '/client/goals',
      icon: Target,
      description: 'Set and track goals'
    }
  ];

  const navItems = userRole === 'coach' ? coachNavItems : clientNavItems;

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">Fitness CRM</h1>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group
                  ${active 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-700'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'}`} />
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut className="h-5 w-5 text-gray-500" />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
}
