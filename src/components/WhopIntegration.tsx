'use client';

import React, { useEffect, useState } from 'react';

// Declare Whop SDK types
declare global {
  interface Window {
    whop?: any;
    Whop?: any;
  }
}

interface WhopIntegrationProps {
  children: React.ReactNode;
}

export function WhopIntegration({ children }: WhopIntegrationProps) {
  const [isWhopReady, setIsWhopReady] = useState(false);

  useEffect(() => {
    // Check if we're running in Whop context
    if (typeof window !== 'undefined') {
      // Check for Whop-specific environment variables or window properties
      const isWhopEnvironment = 
        window.location.hostname.includes('whop.com') ||
        window.location.hostname.includes('whop.io') ||
        process.env.NODE_ENV === 'production' ||
        window.location.search.includes('whop=true');
      
      if (isWhopEnvironment) {
        // Listen for Whop ready event
        const handleWhopReady = () => {
          console.log('Whop SDK ready event received');
          setIsWhopReady(true);
        };
        
        // Check if already ready
        if (window.whop || window.Whop) {
          setIsWhopReady(true);
        } else {
          // Listen for ready event
          window.addEventListener('whop:ready', handleWhopReady);
          
          // Fallback: check periodically
          const checkInterval = setInterval(() => {
            if (window.whop || window.Whop) {
              setIsWhopReady(true);
              clearInterval(checkInterval);
            }
          }, 100);
          
          // Cleanup after 10 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            window.removeEventListener('whop:ready', handleWhopReady);
          }, 10000);
        }
      } else {
        // For local development, proceed immediately
        setIsWhopReady(true);
      }
    } else {
      // Server-side rendering, assume ready
      setIsWhopReady(true);
    }
  }, []);

  if (!isWhopReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Whop integration...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function WhopUserInfo() {
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading Whop data
    const loadWhopData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would make API calls to Whop here
        // For now, we'll simulate the data
        setTimeout(() => {
          setUser({
            username: 'John Trainer',
            email: 'trainer@example.com'
          });
          setCompany({
            name: 'Fitness Company'
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };

    loadWhopData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading user info...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error loading Whop data: {error}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {user && (
        <div className="text-sm text-gray-700">
          Welcome, {user.username || user.email}!
        </div>
      )}
      {company && (
        <div className="text-xs text-gray-500">
          Company: {company.name}
        </div>
      )}
    </div>
  );
}
