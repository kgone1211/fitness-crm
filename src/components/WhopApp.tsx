'use client';

import React, { useEffect, useState } from 'react';

// Declare Whop SDK types
declare global {
  interface Window {
    whop?: any;
    Whop?: any;
  }
}

interface WhopAppProps {
  children: React.ReactNode;
}

export function WhopApp({ children }: WhopAppProps) {
  const [isWhopReady, setIsWhopReady] = useState(false);
  const [whopData, setWhopData] = useState<any>(null);

  useEffect(() => {
    const initializeWhop = async () => {
      try {
        // Check if we're in a Whop environment
        const isWhopEnvironment = 
          window.location.hostname.includes('whop.com') ||
          window.location.hostname.includes('whop.io') ||
          window.location.search.includes('whop-dev-user-token') ||
          window.location.search.includes('whop=true');

        if (isWhopEnvironment) {
          console.log('Whop environment detected, initializing...');
          
          // Wait for Whop SDK to load
          const waitForWhop = () => {
            return new Promise((resolve) => {
              if (window.whop || window.Whop) {
                resolve(true);
                return;
              }

              const checkInterval = setInterval(() => {
                if (window.whop || window.Whop) {
                  clearInterval(checkInterval);
                  resolve(true);
                }
              }, 100);

              // Timeout after 10 seconds
              setTimeout(() => {
                clearInterval(checkInterval);
                resolve(false);
              }, 10000);
            });
          };

          const whopLoaded = await waitForWhop();
          
          if (whopLoaded) {
            console.log('Whop SDK loaded successfully');
            
            // Initialize Whop SDK
            if (window.whop) {
              try {
                const whop = window.whop;
                
                // Get user data
                const user = await whop.getUser();
                console.log('Whop user data:', user);
                
                // Get company data
                const company = await whop.getCompany();
                console.log('Whop company data:', company);
                
                setWhopData({ user, company });
                setIsWhopReady(true);
              } catch (error) {
                console.error('Error initializing Whop SDK:', error);
                // Still proceed even if there's an error
                setIsWhopReady(true);
              }
            } else {
              console.log('Whop SDK not available, proceeding anyway');
              setIsWhopReady(true);
            }
          } else {
            console.log('Whop SDK timeout, proceeding anyway');
            setIsWhopReady(true);
          }
        } else {
          console.log('Non-Whop environment, proceeding immediately');
          setIsWhopReady(true);
        }
      } catch (error) {
        console.error('Error in Whop initialization:', error);
        setIsWhopReady(true);
      }
    };

    initializeWhop();
  }, []);

  if (!isWhopReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing Whop integration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="whop-app">
      {whopData && (
        <div className="whop-data" style={{ display: 'none' }}>
          {JSON.stringify(whopData)}
        </div>
      )}
      {children}
    </div>
  );
}

export function WhopUserDisplay() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Try to get user data from Whop
    if (typeof window !== 'undefined' && window.whop) {
      window.whop.getUser().then(setUser).catch(console.error);
    }
  }, []);

  if (!user) {
    return (
      <div className="text-sm text-gray-600">
        Welcome to Fitness CRM
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-700">
        Welcome, {user.username || user.email || 'User'}!
      </div>
    </div>
  );
}
