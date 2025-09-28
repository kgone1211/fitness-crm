'use client';

import React, { ReactNode } from 'react';

// Simple Whop provider that doesn't break the build
export function WhopProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Mock useWhop hook for development
export function useWhop() {
  return {
    user: {
      id: 'mock_user_id',
      username: 'testuser',
      email: 'test@example.com',
      company: {
        name: 'Test Company',
        role: 'admin'
      },
      permissions: ['read', 'write']
    },
    company: {
      name: 'Test Company',
      role: 'admin'
    },
    isLoaded: true
  };
}
