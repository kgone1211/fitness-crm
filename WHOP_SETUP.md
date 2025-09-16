# Whop App Setup Guide

## 🚀 Getting Your App to Show in Whop

To make your FitnessCRM app appear in Whop, follow these steps:

### 1. **Register Your App in Whop Developer Portal**

1. Go to [Whop Developer Portal](https://dev.whop.com/)
2. Sign in with your Whop account
3. Click "Create New App"
4. Fill in the app details:

```
App Name: FitnessCRM
Description: A comprehensive fitness CRM application for trainers to manage clients, track workouts, and monitor progress.
Category: Fitness & Health
App ID: app_CG40lYJTdvm70y (already in your .env)
```

### 2. **Configure App Settings**

In the Whop Developer Portal, set these settings:

**Basic Info:**
- App Name: `FitnessCRM`
- Description: `A comprehensive fitness CRM application for trainers to manage clients, track workouts, and monitor progress.`
- Category: `Fitness & Health`
- Tags: `fitness, trainer, workout, crm, health`

**App URLs:**
- Homepage URL: `https://your-domain.com` (or `http://localhost:3000` for development)
- Redirect URI: `https://your-domain.com/auth/callback` (or `http://localhost:3000/auth/callback` for development)
- Webhook URL: `https://your-domain.com/api/webhooks/whop`

**Permissions:**
- `read:users` - Read user information
- `write:users` - Update user information
- `read:companies` - Read company information
- `write:companies` - Update company information

### 3. **Deploy Your App**

For your app to show in Whop, it needs to be publicly accessible:

**Option A: Deploy to Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Option B: Deploy to Netlify**
```bash
# Build the app
npm run build

# Deploy to Netlify
# Upload the 'out' folder to Netlify
```

**Option C: Deploy to Railway**
```bash
# Connect your GitHub repo to Railway
# Railway will automatically deploy
```

### 4. **Update Environment Variables**

After deployment, update your production environment variables:

```env
WHOP_API_KEY=pReJrNujmBUQWtoF2HVvVxV0QhVOmP_FuX2sW04vjgI
NEXT_PUBLIC_WHOP_APP_ID=app_CG40lYJTdvm70y
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_giuHRFRWQBCXr
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni
```

### 5. **Test Your App**

1. **Local Testing:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Whop Testing:**
   - Go to your Whop company dashboard
   - Look for your app in the "Apps" section
   - Click "Install" to test the integration

### 6. **App Manifest**

Your app includes a `whop-manifest.json` file that Whop can read to understand your app's capabilities. This is located at:
- `https://your-domain.com/whop-manifest.json`

### 7. **Troubleshooting**

**App not showing in Whop:**
- ✅ Ensure your app is publicly accessible (not localhost)
- ✅ Check that all required permissions are granted
- ✅ Verify your app ID matches in both Whop and your environment
- ✅ Make sure your redirect URIs are correctly configured

**Authentication issues:**
- ✅ Verify your API key is correct
- ✅ Check that your app ID matches
- ✅ Ensure your company ID is correct

**Development vs Production:**
- For development: Use `http://localhost:3000`
- For production: Use your deployed domain
- Update redirect URIs accordingly

### 8. **Next Steps**

Once your app is live in Whop:

1. **Monitor Usage:** Check Whop analytics for app usage
2. **Gather Feedback:** Collect user feedback through Whop
3. **Iterate:** Update your app based on user needs
4. **Scale:** Add more features as your user base grows

### 9. **Support**

If you need help:
- Check [Whop Developer Documentation](https://dev.whop.com/docs)
- Contact Whop support
- Review the app logs for errors

---

**Your app is now ready to be a Whop app! 🎉**
