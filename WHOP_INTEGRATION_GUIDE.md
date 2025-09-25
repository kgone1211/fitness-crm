# 🔗 Whop Integration Guide

## Step 1: Deploy to Vercel
1. Push your changes to GitHub
2. Vercel will automatically deploy
3. Get your Vercel URL (e.g., `https://fitness-crm-vercel.vercel.app`)

## Step 2: Update Whop App Configuration

### Option A: Whop Dashboard
1. Go to [Whop Dashboard](https://whop.com/dashboard)
2. Find your app: `app_v9NgvKg9ABqLE1`
3. Go to **Settings** → **App Configuration**
4. Update these fields:
   - **App URL**: `https://YOUR-VERCEL-URL.vercel.app`
   - **Redirect URI**: `https://YOUR-VERCEL-URL.vercel.app`
   - **Homepage**: `https://YOUR-VERCEL-URL.vercel.app`

### Option B: Whop CLI
```bash
whop apps update app_v9NgvKg9ABqLE1 --app-url https://YOUR-VERCEL-URL.vercel.app
```

## Step 3: Set Environment Variables in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   ```
   WHOP_API_KEY=faEFh0WsrzBwnORaAozLoBspn7XmzegskNx62l29u_A
   NEXT_PUBLIC_WHOP_APP_ID=app_v9NgvKg9ABqLE1
   NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_y3Kg36SNnr8R7
   NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni
   ```

## Step 4: Test the Integration
1. Go to: `https://whop.com/apps/app_v9NgvKg9ABqLE1/install/`
2. Click "Install App"
3. It should redirect to your Vercel app
4. The app should load without the loading screen

## Step 5: Verify Integration
- The app should show "Welcome to Fitness CRM" or user data
- No infinite loading screen
- All features should work normally

## Troubleshooting

### If app doesn't show in Whop:
1. Check that the App URL is correct in Whop dashboard
2. Verify the app_id matches: `app_v9NgvKg9ABqLE1`
3. Make sure the app is published/active in Whop

### If app loads but shows loading screen:
1. Check browser console for errors
2. Verify environment variables are set
3. Check that the Vercel URL is accessible

### If redirect doesn't work:
1. Check redirect URIs in Whop app settings
2. Make sure the app URL is exactly correct
3. Try clearing browser cache

## Files Updated for Integration:
- ✅ `src/components/WhopApp.tsx` - Proper Whop SDK integration
- ✅ `src/app/page.tsx` - Updated to use WhopApp
- ✅ `public/whop-sdk.js` - Whop SDK script
- ✅ `public/whop-manifest.json` - App manifest
- ✅ `src/app/layout.tsx` - Includes Whop SDK script

## Next Steps:
1. Deploy these changes to Vercel
2. Update Whop app configuration with Vercel URL
3. Test the integration
4. Your app should now work perfectly in Whop! 🎉


