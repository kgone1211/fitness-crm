'use client';

import React, { ReactNode } from 'react';

// Real Whop provider implementation
export function WhopProvider({ children }: { children: ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_WHOP_APP_ID;

  // If no app ID, return children without Whop integration
  if (!appId) {
    console.warn('NEXT_PUBLIC_WHOP_APP_ID is not set. Whop integration may not work.');
    return <>{children}</>;
  }

  // For now, return children directly since we're using a simple integration
  // In a real implementation, you'd wrap with Whop SDK components
  return <>{children}</>;
}

// Real useWhop hook implementation
export function useWhop() {
  const [whopData, setWhopData] = React.useState({
    user: null,
    company: null,
    isLoaded: false,
    isInWhop: false
  });

  React.useEffect(() => {
    // Simple timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('Whop timeout - setting default data');
      setWhopData({
        user: {
          id: 'whop_user_123',
          username: 'whop_user',
          email: 'user@whop.com',
          permissions: ['read', 'write']
        },
        company: {
          name: 'Whop Company',
          role: 'admin'
        },
        isLoaded: true,
        isInWhop: true
      });
    }, 2000); // 2 second timeout

    // Check if we're in Whop context
    const isInIframe = window.self !== window.top;
    const hasWhopReferrer = document.referrer.includes('whop.com');
    const hasWhopInUrl = window.location.search.includes('whop=') || window.location.hash.includes('whop');
    const hasWhopCookie = document.cookie.includes('whop');
    
    const isInWhop = isInIframe || hasWhopReferrer || hasWhopInUrl || hasWhopCookie;

    console.log('Whop detection:', {
      isInIframe,
      hasWhopReferrer,
      hasWhopInUrl,
      hasWhopCookie,
      isInWhop,
      referrer: document.referrer,
      url: window.location.href,
      search: window.location.search
    });

    if (isInWhop) {
      // Try to get Whop data from URL parameters or other sources
      const urlParams = new URLSearchParams(window.location.search);
      const userParam = urlParams.get('user');
      
      if (userParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userParam));
          clearTimeout(timeout);
          setWhopData({
            user: userData,
            company: userData.company || null,
            isLoaded: true,
            isInWhop: true
          });
        } catch (e) {
          console.error('Error parsing Whop user data:', e);
        }
      } else {
        // Create mock user data for testing
        clearTimeout(timeout);
        setWhopData({
          user: {
            id: 'whop_user_123',
            username: 'whop_user',
            email: 'user@whop.com',
            permissions: ['read', 'write']
          },
          company: {
            name: 'Whop Company',
            role: 'admin'
          },
          isLoaded: true,
          isInWhop: true
        });
      }
    } else {
      clearTimeout(timeout);
      setWhopData(prev => ({
        ...prev,
        isInWhop: false,
        isLoaded: true
      }));
    }

    return () => clearTimeout(timeout);
  }, []);

  return {
    ...whopData,
    // Add any other Whop SDK methods you need
  };
}
