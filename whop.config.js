/** @type {import('@whop-apps/sdk').WhopConfig} */
module.exports = {
  // Your app's configuration
  appId: "app_CG40lYJTdvm70y",
  name: "Fitness CRM",
  description: "A comprehensive fitness client management system",
  version: "1.0.0",
  
  // App settings
  app: {
    // Enable iframe embedding
    iframe: true,
    
    // App dimensions
    width: "100%",
    height: "100vh",
    
    // Permissions
    permissions: [
      "user:read",
      "company:read"
    ]
  },
  
  // Development settings
  development: {
    // Local development URL
    localUrl: "http://localhost:3010",
    
    // Enable hot reload
    hotReload: true
  },
  
  // Production settings
  production: {
    // Your production URL
    url: "https://fitness-crm-vercel.vercel.app"
  }
};