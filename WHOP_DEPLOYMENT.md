# Whop Deployment Guide

## Overview

This guide will help you deploy your Fitness CRM app to Whop and troubleshoot common issues.

## Pre-Deployment Checklist

### 1. App Configuration
- ✅ WhopIntegration component properly configured
- ✅ Whop SDK script included in layout
- ✅ Environment detection working
- ✅ App builds successfully

### 2. Build the App
```bash
npm run build
```

### 3. Test Locally with Whop Simulation
```bash
# Test with Whop simulation
npm run dev
# Then visit: http://localhost:3001?whop=true
```

## Deployment Steps

### 1. Deploy to Your Hosting Platform

#### Option A: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables:
   - `NODE_ENV=production`
   - `WHOP_APP_ID=your_app_id` (if using Whop SDK)
4. Deploy

#### Option B: Netlify
1. Build the app: `npm run build`
2. Deploy the `.next` folder
3. Configure redirects for Next.js

#### Option C: Custom Server
1. Build the app: `npm run build`
2. Start the production server: `npm start`
3. Configure your domain

### 2. Configure Whop App

1. Go to your Whop dashboard
2. Create a new app or edit existing app
3. Set the app URL to your deployed URL
4. Configure app settings:
   - **App Name**: Fitness CRM
   - **Description**: A comprehensive fitness client management system
   - **Icon**: Upload your app icon
   - **Category**: Business/Productivity

### 3. App Permissions

In your Whop app settings, configure these permissions:
- `user:read` - Read user information
- `company:read` - Read company information
- `user:write` - Update user data (if needed)

## Troubleshooting Common Issues

### Issue 1: App Shows "Loading Whop integration..." Forever

**Symptoms:**
- App loads but shows loading spinner indefinitely
- Console shows Whop SDK not found

**Solutions:**
1. Check if your app is properly deployed and accessible
2. Verify the Whop SDK script is loading:
   ```javascript
   // Check in browser console
   console.log(window.whop);
   console.log(window.Whop);
   ```

3. Test with Whop simulation:
   ```
   https://your-app-url.com?whop=true
   ```

4. Check browser console for errors

### Issue 2: App Not Loading in Whop

**Symptoms:**
- Blank page in Whop
- Network errors
- CORS issues

**Solutions:**
1. **Check iframe compatibility:**
   ```javascript
   // Add to your layout.tsx
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
   ```

2. **Fix CORS issues:**
   ```javascript
   // Add to next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'SAMEORIGIN',
             },
           ],
         },
       ];
     },
   };
   ```

3. **Check HTTPS:** Whop requires HTTPS in production

### Issue 3: Authentication Issues

**Symptoms:**
- User data not loading
- Authentication errors

**Solutions:**
1. **Implement proper Whop authentication:**
   ```javascript
   // In WhopIntegration.tsx
   useEffect(() => {
     if (window.whop && window.whop.user) {
       // Use real Whop user data
       setUser(window.whop.user);
     }
   }, []);
   ```

2. **Handle authentication state:**
   ```javascript
   // Add authentication check
   const isAuthenticated = window.whop && window.whop.user;
   if (!isAuthenticated) {
     // Redirect to login or show error
   }
   ```

### Issue 4: Styling Issues in Whop

**Symptoms:**
- CSS not loading properly
- Layout broken in iframe

**Solutions:**
1. **Use relative URLs for assets:**
   ```javascript
   // In next.config.js
   module.exports = {
     assetPrefix: process.env.NODE_ENV === 'production' ? '/your-app-path' : '',
   };
   ```

2. **Test iframe styling:**
   ```html
   <!-- Test your app in iframe -->
   <iframe src="https://your-app-url.com" width="100%" height="600px"></iframe>
   ```

## Testing Your Whop App

### 1. Local Testing
```bash
# Start development server
npm run dev

# Test with Whop simulation
open http://localhost:3001?whop=true
```

### 2. Production Testing
1. Deploy your app
2. Test the deployed URL
3. Test in Whop sandbox (if available)
4. Test with real Whop environment

### 3. Debugging
```javascript
// Add to your app for debugging
console.log('Whop Environment:', {
  hostname: window.location.hostname,
  whop: !!window.whop,
  Whop: !!window.Whop,
  user: window.whop?.user,
  company: window.whop?.company
});
```

## Environment Variables

Create a `.env.local` file for local development:
```env
NODE_ENV=development
WHOP_APP_ID=your_app_id
WHOP_APP_SECRET=your_app_secret
```

For production, set these in your hosting platform:
```env
NODE_ENV=production
WHOP_APP_ID=your_production_app_id
WHOP_APP_SECRET=your_production_app_secret
```

## Common Whop SDK Methods

```javascript
// Get user information
const user = window.whop?.user;

// Get company information
const company = window.whop?.company;

// Make API calls
const response = await window.whop?.api.get('/users/me');

// Listen to events
window.whop?.events.on('user:update', (data) => {
  console.log('User updated:', data);
});
```

## Support

If you're still having issues:

1. **Check Whop Documentation:** https://docs.whop.com
2. **Test with minimal app:** Create a simple HTML page to test Whop integration
3. **Check browser console:** Look for JavaScript errors
4. **Verify deployment:** Ensure your app is accessible and working
5. **Contact Whop Support:** If the issue is with Whop platform

## Quick Fixes

### Force Whop Ready (Development Only)
```javascript
// Add to browser console for testing
window.whop = { user: { id: 'test', name: 'Test User' }, ready: true };
window.dispatchEvent(new CustomEvent('whop:ready'));
```

### Skip Whop Integration (Temporary)
```javascript
// In WhopIntegration.tsx, temporarily set:
setIsWhopReady(true);
```

Remember to remove this in production!



