# 🚀 Fitness CRM Deployment Guide

## 📋 Prerequisites
- [x] Node.js installed
- [x] Project builds successfully
- [ ] Xcode command line tools (installing...)
- [ ] GitHub account
- [ ] Vercel account

## 🔧 Step 1: Deploy to GitHub

### Option A: Using GitHub Desktop (Recommended)
1. Open GitHub Desktop
2. Click "Add an Existing Repository from your Hard Drive"
3. Navigate to `/Users/zekegonzalez/fitness-crm`
4. Click "Add Repository"
5. Click "Publish repository" to create a new GitHub repository
6. Choose a repository name (e.g., `fitness-crm`)
7. Make it public or private as needed
8. Click "Publish Repository"

### Option B: Using Command Line (After Xcode tools install)
```bash
# Navigate to project directory
cd /Users/zekegonzalez/fitness-crm

# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial deployment ready"

# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fitness-crm.git

# Push to GitHub
git push -u origin main
```

## 🌐 Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `fitness-crm` repository
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: fitness-crm
# - Directory: ./
# - Override settings? No
```

## 🔐 Step 3: Configure Environment Variables

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
WHOP_API_KEY=brZ-XEEXJ6ICsEpGRfnlJiaklRQ0iQfsH2_Nt-vdKfI
NEXT_PUBLIC_WHOP_APP_ID=app_6ZskuhNqu7LD9V
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_MwilkJ64Bvkdo
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

## 🎯 Step 4: Update App URL

After deployment, update your environment variables:
1. Get your Vercel deployment URL
2. Update `NEXT_PUBLIC_APP_URL` in Vercel dashboard
3. Redeploy if necessary

## 🔄 Step 5: Continuous Deployment

Once set up:
- Push changes to GitHub main branch
- Vercel will automatically deploy
- Check deployment status in Vercel dashboard

## 🐛 Troubleshooting

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Runtime Errors
- Check browser console for errors
- Verify API endpoints are working
- Check environment variables are accessible

### Whop Integration Issues
- Verify Whop credentials are correct
- Check Whop app configuration
- Ensure proper CORS settings

## 📱 Testing Your Deployment

1. Visit your Vercel URL
2. Test all major features:
   - Dashboard
   - Client portal
   - Workout tracking
   - Nutrition tracking
   - Settings

## 🎉 Success!

Your fitness CRM should now be live and accessible at your Vercel URL!

---

**Need Help?**
- Check Vercel documentation: https://vercel.com/docs
- GitHub documentation: https://docs.github.com
- Whop documentation: https://docs.whop.com



