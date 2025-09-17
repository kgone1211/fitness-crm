# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd /Users/zekegonzalez/fitness-crm
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name: **fitness-crm**
   - Directory: **./**
   - Override settings? **N**

### Method 2: GitHub Integration

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings (see below)

## ⚙️ Vercel Configuration

### Environment Variables
Set these in your Vercel dashboard:

```env
NODE_ENV=production
WHOP_APP_ID=your_whop_app_id
WHOP_APP_SECRET=your_whop_app_secret
```

### Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## 🔧 Common Vercel Errors & Solutions

### 1. FUNCTION_INVOCATION_FAILED (500)
**Cause**: API route errors
**Solution**: 
- Check your API routes in `src/app/api/`
- Ensure proper error handling
- Check function timeout (max 30s on hobby plan)

### 2. DEPLOYMENT_NOT_FOUND (404)
**Cause**: Wrong deployment URL or deleted deployment
**Solution**:
- Check your Vercel dashboard for correct URL
- Redeploy if necessary

### 3. BUILD_FAILED
**Cause**: Build errors during deployment
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Fix TypeScript/ESLint errors

### 4. ROUTER_CANNOT_MATCH (502)
**Cause**: Routing issues
**Solution**:
- Check your `next.config.js`
- Verify all pages are properly exported
- Check for dynamic routes

### 5. FUNCTION_PAYLOAD_TOO_LARGE (413)
**Cause**: Request body too large
**Solution**:
- Reduce payload size
- Use streaming for large data
- Implement pagination

## 🛠️ Troubleshooting Steps

### 1. Check Build Logs
```bash
vercel logs [deployment-url]
```

### 2. Test Locally with Vercel
```bash
vercel dev
```

### 3. Check Function Logs
- Go to Vercel Dashboard
- Click on your project
- Go to "Functions" tab
- Check individual function logs

### 4. Verify Environment Variables
- Go to Vercel Dashboard
- Click on your project
- Go to "Settings" → "Environment Variables"
- Ensure all required variables are set

## 📱 Testing Your Deployment

### 1. Test Main App
- Visit: `https://your-app.vercel.app`
- Check if dashboard loads
- Test navigation

### 2. Test Client Portal
- Visit: `https://your-app.vercel.app/client`
- Test login functionality
- Check all client pages

### 3. Test Whop Integration
- Visit: `https://your-app.vercel.app/test-whop`
- Check environment detection
- Verify Whop SDK availability

### 4. Test API Routes
- Visit: `https://your-app.vercel.app/api/macros`
- Check if API responds correctly

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use Vercel's environment variable system
- Rotate secrets regularly

### 2. CORS Headers
- Already configured in `vercel.json`
- Allows iframe embedding for Whop

### 3. Rate Limiting
- Consider implementing rate limiting
- Monitor usage in Vercel dashboard

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
- Enable in Vercel dashboard
- Monitor performance metrics
- Track user behavior

### 2. Error Tracking
- Check Vercel function logs
- Set up error monitoring
- Monitor API response times

## 🚀 Production Optimizations

### 1. Performance
- Enable Vercel's Edge Network
- Use Image Optimization
- Implement caching strategies

### 2. SEO
- Add proper meta tags
- Implement sitemap
- Use structured data

### 3. Security
- Enable HTTPS (automatic on Vercel)
- Set up security headers
- Monitor for vulnerabilities

## 📞 Getting Help

### 1. Vercel Support
- Check [Vercel Documentation](https://vercel.com/docs)
- Contact Vercel Support
- Check [Vercel Community](https://github.com/vercel/vercel/discussions)

### 2. Debugging Tools
- Vercel CLI: `vercel logs`
- Browser DevTools
- Network tab for API calls

### 3. Common Issues
- Check this guide first
- Search Vercel documentation
- Check GitHub issues

## ✅ Deployment Checklist

- [ ] App builds successfully locally
- [ ] All environment variables set
- [ ] API routes working
- [ ] Client portal accessible
- [ ] Whop integration tested
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Monitoring enabled

---

**Your Fitness CRM app should now be successfully deployed on Vercel!** 🎉
