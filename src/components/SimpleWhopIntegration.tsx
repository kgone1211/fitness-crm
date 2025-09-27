'use client';

import React from 'react';

interface SimpleWhopIntegrationProps {
  children: React.ReactNode;
}

export function SimpleWhopIntegration({ children }: SimpleWhopIntegrationProps) {
  // For Vercel deployment, just render the children immediately
  // This prevents the loading screen issue
  return <>{children}</>;
}

export function SimpleWhopUserInfo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-700">
        Welcome to Fitness CRM!
      </div>
    </div>
  );
}



