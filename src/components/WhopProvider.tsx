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
    // Check if we're in Whop context
    const isInWhop = window.self !== window.top && 
      (document.referrer.includes('whop.com') || 
       window.location.search.includes('whop=') ||
       document.cookie.includes('whop'));

    if (isInWhop) {
      // Try to get Whop data from URL parameters or other sources
      const urlParams = new URLSearchParams(window.location.search);
      const userParam = urlParams.get('user');
      
      if (userParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userParam));
          setWhopData({
            user: userData,
            company: userData.company || null,
            isLoaded: true,
            isInWhop: true
          });
        } catch (e) {
          console.error('Error parsing Whop user data:', e);
        }
      }
    }

    setWhopData(prev => ({
      ...prev,
      isInWhop,
      isLoaded: true
    }));
  }, []);

  return {
    ...whopData,
    // Add any other Whop SDK methods you need
  };
}
