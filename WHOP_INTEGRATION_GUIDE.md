# Whop Integration Setup Guide

## 🚀 Quick Setup Checklist

### 1. Whop App Dashboard Configuration

Go to your Whop app dashboard and configure:

**App Settings:**
- **App Name**: `FitCoach Pro`
- **App URL**: `https://client-tracking-lovat.vercel.app`
- **Description**: `Fitness coaching CRM for trainers and clients`

**OAuth Settings:**
- **Redirect URI**: `https://client-tracking-lovat.vercel.app/api/auth/whop/callback`
- **Scopes**: `read`, `write`
- **Allowed Origins**: `https://client-tracking-lovat.vercel.app`

**Embed Settings:**
- ✅ **Allow Embedding**: Enable this
- **Width**: `100%`
- **Height**: `100vh`
- ✅ **Resizable**: Enable this

### 2. Vercel Environment Variables

Add these to your Vercel project:

```bash
# Required Whop OAuth
WHOP_CLIENT_ID=your_whop_client_id
WHOP_CLIENT_SECRET=your_whop_client_secret

# Whop SDK
NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id
NEXT_PUBLIC_WHOP_API_KEY=your_whop_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://client-tracking-lovat.vercel.app
```

### 3. App Structure

Your app now has these key routes:

- `/` - Redirects to appropriate page based on context
- `/whop` - Main app for Whop users
- `/landing` - Landing page for direct access
- `/api/auth/whop` - OAuth initiation
- `/api/auth/whop/callback` - OAuth callback

### 4. Testing the Integration

1. **Deploy to Vercel** with all environment variables
2. **Visit your app** at `https://client-tracking-lovat.vercel.app`
3. **Test Whop integration** by visiting `/whop` directly
4. **Check Whop dashboard** for your app listing

### 5. Whop App Manifest

Your app includes a `whop-manifest.json` with:
- App metadata
- Embedding settings
- OAuth configuration
- Permissions

### 6. Role Detection

The app automatically determines user roles:
- **Coach**: Company admin, has manage_clients permission, or email contains @coach.
- **Client**: Default for all other users

### 7. Common Issues & Solutions

**App not showing in Whop:**
- ✅ Check embed settings are enabled
- ✅ Verify app URL is correct
- ✅ Ensure OAuth redirect URI matches exactly
- ✅ Confirm environment variables are set

**Authentication not working:**
- ✅ Verify WHOP_CLIENT_ID and WHOP_CLIENT_SECRET
- ✅ Check redirect URI in Whop dashboard
- ✅ Ensure scopes include 'read' minimum

**App not loading in iframe:**
- ✅ Enable embedding in Whop settings
- ✅ Check CORS headers
- ✅ Verify HTTPS is used

### 8. Next Steps

1. **Submit for Review**: If required by Whop
2. **Test with Real Users**: Create test accounts
3. **Monitor Logs**: Check Vercel function logs
4. **Gather Feedback**: Test with actual coaches/clients

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📞 Support

If you're still having issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test OAuth flow manually
4. Contact Whop support if needed

Your app should now be properly integrated with Whop! 🎉
