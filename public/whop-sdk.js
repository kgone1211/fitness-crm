// Whop SDK Integration Script
(function() {
  'use strict';
  
  console.log('Whop SDK script loaded');
  
  // Check if we're in a Whop environment
  function isWhopEnvironment() {
    return window.location.hostname.includes('whop.com') ||
           window.location.hostname.includes('whop.io') ||
           window.location.search.includes('whop-dev-user-token') ||
           window.location.search.includes('whop=true');
  }
  
  // Mock Whop SDK for development and fallback
  function createMockWhopSDK() {
    return {
      getUser: async () => {
        console.log('Mock Whop getUser called');
        return {
          id: 'user_123',
          username: 'John Trainer',
          email: 'trainer@example.com',
          name: 'John Trainer'
        };
      },
      getCompany: async () => {
        console.log('Mock Whop getCompany called');
        return {
          id: 'biz_123',
          name: 'Fitness Company',
          domain: 'fitness-company.com'
        };
      },
      getPermissions: async () => {
        console.log('Mock Whop getPermissions called');
        return ['read:users', 'write:users'];
      },
      isAuthenticated: () => {
        return true;
      }
    };
  }
  
  // Initialize Whop SDK
  function initializeWhop() {
    if (isWhopEnvironment()) {
      console.log('Whop environment detected, loading real SDK...');
      
      // Try to load the real Whop SDK
      if (typeof window.Whop !== 'undefined') {
        console.log('Real Whop SDK found');
        window.whop = window.Whop;
      } else {
        console.log('Real Whop SDK not found, using mock');
        window.whop = createMockWhopSDK();
      }
    } else {
      console.log('Non-Whop environment, using mock SDK');
      window.whop = createMockWhopSDK();
    }
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('whop:ready'));
    console.log('Whop SDK ready event dispatched');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWhop);
  } else {
    initializeWhop();
  }
  
})();