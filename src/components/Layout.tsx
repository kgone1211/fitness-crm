'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'coach' | 'client';
}

export default function Layout({ children, userRole = 'coach' }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        userRole={userRole} 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main content with proper spacing */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
