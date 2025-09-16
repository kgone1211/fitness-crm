// Whop SDK Integration Script
(function() {
  'use strict';
  
  // Check if we're in a Whop environment
  function isWhopEnvironment() {
    return (
      window.location.hostname.includes('whop.com') ||
      window.location.hostname.includes('whop.io') ||
      window.parent !== window ||
      window.location.search.includes('whop=true')
    );
  }
  
  // Initialize Whop SDK
  function initWhopSDK() {
    if (!isWhopEnvironment()) {
      console.log('Not in Whop environment, skipping SDK initialization');
      return;
    }
    
    try {
      // Create a mock Whop SDK if not available
      if (!window.whop) {
        window.whop = {
          // Mock user data
          user: {
            id: 'user_123',
            username: 'John Trainer',
            email: 'trainer@example.com',
            avatar: null
          },
          
          // Mock company data
          company: {
            id: 'company_123',
            name: 'Fitness Company',
            domain: 'fitness-company.com'
          },
          
          // Mock API methods
          api: {
            get: async (endpoint) => {
              console.log('Whop API GET:', endpoint);
              return { data: null };
            },
            post: async (endpoint, data) => {
              console.log('Whop API POST:', endpoint, data);
              return { data: null };
            }
          },
          
          // Mock events
          events: {
            on: (event, callback) => {
              console.log('Whop event listener:', event);
            },
            emit: (event, data) => {
              console.log('Whop event emit:', event, data);
            }
          },
          
          // Mock ready state
          ready: true
        };
      }
      
      // Set Whop as ready
      window.Whop = window.whop;
      
      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('whop:ready', {
        detail: { whop: window.whop }
      }));
      
      console.log('Whop SDK initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Whop SDK:', error);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhopSDK);
  } else {
    initWhopSDK();
  }
  
  // Also try to initialize immediately
  initWhopSDK();
  
})();
