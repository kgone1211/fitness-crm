#!/bin/bash

# Fitness CRM - Deploy to Vercel Script
echo "🚀 Deploying Fitness CRM to Vercel"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "   Install it with: npm i -g vercel"
    echo "   Or visit: https://vercel.com/cli"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the fitness-crm directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Build the project first
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📱 Next steps:"
    echo "1. Check your Vercel dashboard for the deployment URL"
    echo "2. Test your app at the deployed URL"
    echo "3. Configure environment variables in Vercel dashboard"
    echo "4. Test Whop integration with your deployed URL"
    echo ""
    echo "🔧 Environment variables to set in Vercel:"
    echo "   NODE_ENV=production"
    echo "   WHOP_APP_ID=your_whop_app_id"
    echo "   WHOP_APP_SECRET=your_whop_app_secret"
    echo ""
    echo "📚 For troubleshooting, see VERCEL_DEPLOYMENT.md"
else
    echo "❌ Deployment failed. Check the error messages above."
    echo "📚 For help, see VERCEL_DEPLOYMENT.md"
fi


