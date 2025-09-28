'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWhop } from '@whop/react';

export interface WhopUser {
  id: string;
  username: string;
  email: string;
  role: 'coach' | 'client';
  avatar?: string;
  company?: any;
  permissions?: string[];
}

interface WhopAuthContextType {
  user: WhopUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const WhopAuthContext = createContext<WhopAuthContextType | undefined>(undefined);

export function WhopAuthProvider({ children }: { children: ReactNode }) {
  const { user: whopUser, isLoaded } = useWhop();
  const [user, setUser] = useState<WhopUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (whopUser) {
        // Determine role based on Whop user data or company membership
        const role = determineUserRole(whopUser);
        
        const userData: WhopUser = {
          id: whopUser.id,
          username: whopUser.username || whopUser.email,
          email: whopUser.email,
          role: role,
          avatar: whopUser.avatar,
          company: whopUser.company,
          permissions: whopUser.permissions
        };
        
        setUser(userData);
        localStorage.setItem('whop-user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('whop-user');
      }
      setIsLoading(false);
    }
  }, [whopUser, isLoaded]);

  const determineUserRole = (whopUser: any): 'coach' | 'client' => {
    // Logic to determine if user is coach or client
    // You can customize this based on your Whop app structure
    
    // Option 1: Check company membership
    if (whopUser.company && whopUser.company.role === 'admin') {
      return 'coach';
    }
    
    // Option 2: Check permissions
    if (whopUser.permissions && whopUser.permissions.includes('manage_clients')) {
      return 'coach';
    }
    
    // Option 3: Check custom fields
    if (whopUser.custom_fields && whopUser.custom_fields.role === 'coach') {
      return 'coach';
    }
    
    // Option 4: Check email domain or username pattern
    if (whopUser.email && whopUser.email.includes('@coach.')) {
      return 'coach';
    }
    
    // Default to client
    return 'client';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('whop-user');
    // Whop handles the actual logout
    window.location.href = '/logout';
  };

  return (
    <WhopAuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      logout
    }}>
      {children}
    </WhopAuthContext.Provider>
  );
}

export function useWhopAuth() {
  const context = useContext(WhopAuthContext);
  if (context === undefined) {
    throw new Error('useWhopAuth must be used within a WhopAuthProvider');
  }
  return context;
}
