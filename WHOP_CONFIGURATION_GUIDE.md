# Whop Configuration Guide

## 🔧 Whop App Settings

### **Base URL Settings:**
```
Base URL: https://client-tracking-lovat.vercel.app
```

### **Path Settings:**
```
App Path: /whop
Full URL: https://client-tracking-lovat.vercel.app/whop
```

### **OAuth Settings:**
```
Redirect URI: https://client-tracking-lovat.vercel.app/api/auth/whop/callback
Authorization URL: https://client-tracking-lovat.vercel.app/api/auth/whop
```

### **Embed Settings:**
```
Allow Embedding: ✅ YES
Width: 100%
Height: 100vh
Resizable: ✅ YES
```

## 🚀 Step-by-Step Setup

### **1. In Whop Dashboard:**

**App Settings:**
- **App Name**: `FitCoach Pro`
- **App URL**: `https://client-tracking-lovat.vercel.app`
- **App Path**: `/whop`
- **Description**: `Fitness coaching CRM for trainers and clients`

**OAuth Configuration:**
- **Client ID**: `your_whop_client_id`
- **Client Secret**: `your_whop_client_secret`
- **Redirect URI**: `https://client-tracking-lovat.vercel.app/api/auth/whop/callback`
- **Scopes**: `read`, `write`

**Embed Settings:**
- ✅ **Allow Embedding**: Enable this
- **Width**: `100%`
- **Height**: `100vh`
- ✅ **Resizable**: Enable this
- ✅ **Allow Fullscreen**: Enable this

### **2. In Vercel Environment Variables:**

```bash
WHOP_CLIENT_ID=your_whop_client_id
WHOP_CLIENT_SECRET=your_whop_client_secret
NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id
NEXT_PUBLIC_WHOP_API_KEY=your_whop_api_key
NEXT_PUBLIC_APP_URL=https://client-tracking-lovat.vercel.app
```

### **3. Test URLs:**

**Direct App Access:**
- `https://client-tracking-lovat.vercel.app/whop`

**OAuth Flow:**
- `https://client-tracking-lovat.vercel.app/api/auth/whop`

**Callback:**
- `https://client-tracking-lovat.vercel.app/api/auth/whop/callback`

## 🔍 Troubleshooting

### **If App Still Doesn't Show in Whop:**

1. **Check App Status**: Make sure your app is "Active" in Whop dashboard
2. **Verify Embed Settings**: Ensure embedding is enabled
3. **Test Direct URL**: Visit `https://client-tracking-lovat.vercel.app/whop` directly
4. **Check Console**: Look for JavaScript errors in browser console
5. **Verify Environment Variables**: All must be set in Vercel

### **Common Issues:**

**Issue**: App not appearing in Whop
**Solution**: Check that "Allow Embedding" is enabled and app is active

**Issue**: OAuth not working
**Solution**: Verify redirect URI matches exactly in both Whop and Vercel

**Issue**: App loads but shows errors
**Solution**: Check Vercel function logs for API errors

### **Whop App Manifest:**

Your app includes a `whop-manifest.json` at:
`https://client-tracking-lovat.vercel.app/whop-manifest.json`

This should contain:
```json
{
  "name": "FitCoach Pro",
  "app_url": "https://client-tracking-lovat.vercel.app",
  "redirect_uris": [
    "https://client-tracking-lovat.vercel.app/api/auth/whop/callback"
  ],
  "embed_settings": {
    "allow_embedding": true,
    "width": "100%",
    "height": "100vh",
    "resizable": true
  }
}
```

## 📞 Next Steps

1. **Update Whop Settings** with the URLs above
2. **Deploy to Vercel** with environment variables
3. **Test Direct Access** to `/whop` page
4. **Check Whop Dashboard** for app listing
5. **Contact Whop Support** if still not working

The key is making sure the **App Path** is set to `/whop` and **Allow Embedding** is enabled!
