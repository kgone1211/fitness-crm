# Whop Authentication Setup

## Environment Variables Required

Add these to your Vercel environment variables:

```bash
# Whop App Configuration
NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id
NEXT_PUBLIC_WHOP_API_KEY=your_whop_api_key
WHOP_CLIENT_ID=your_whop_client_id
WHOP_CLIENT_SECRET=your_whop_client_secret

# App URL
NEXT_PUBLIC_APP_URL=https://client-tracking-lovat.vercel.app
```

## Whop App Settings

In your Whop app dashboard, configure:

1. **App URL**: `https://client-tracking-lovat.vercel.app`
2. **Allowed Origins**: Add your Vercel domain
3. **OAuth Settings**:
   - **Redirect URI**: `https://client-tracking-lovat.vercel.app/api/auth/whop/callback`
   - **Scopes**: `read` (minimum required)
4. **Embed Settings**: Enable "Allow embedding"

## Role Determination

The app determines user roles based on:
1. Company membership (admin = coach)
2. Permissions (manage_clients = coach)
3. Custom fields (role field)
4. Email domain patterns
5. Default to client

## How It Works

1. User visits your app
2. If not authenticated, shows "Sign in with Whop" button
3. Redirects to Whop's OAuth flow
4. After authentication, user is redirected back
5. App determines role (coach/client) and shows appropriate dashboard

## Testing

1. Deploy to Vercel with environment variables
2. Visit your app URL
3. Click "Sign in with Whop"
4. Complete Whop authentication
5. You'll be redirected to the appropriate dashboard

## Customization

To customize role determination, edit `src/contexts/WhopAuthContext.tsx` in the `determineUserRole` function.
