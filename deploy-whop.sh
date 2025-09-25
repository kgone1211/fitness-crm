t#!/bin/bash

# Fitness CRM - Deploy to Whop Script
echo "🚀 Deploying Fitness CRM to Whop"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the fitness-crm directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Build the project for Whop
echo "🔨 Building project for Whop deployment..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ 'out' directory not found. Build may have failed."
    exit 1
fi

echo "📦 Static files ready in 'out' directory"
echo ""

echo "🌐 Next steps to deploy to Whop:"
echo ""
echo "Method 1: Whop Developer Portal"
echo "1. Go to https://whop.com/developers"
echo "2. Click 'Create New App'"
echo "3. Choose 'Custom App' or 'Web App'"
echo "4. Upload the contents of the 'out' folder"
echo "5. Configure app settings:"
echo "   - Name: Fitness CRM"
echo "   - Description: A comprehensive fitness client management system"
echo "   - Category: Business/Productivity"
echo "   - Permissions: user:read, company:read"
echo ""
echo "Method 2: GitHub Integration"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Whop deployment'"
echo "   git push origin main"
echo "2. Go to https://whop.com/developers"
echo "3. Click 'Create New App'"
echo "4. Choose 'Import from GitHub'"
echo "5. Select your repository"
echo "6. Configure build settings"
echo ""
echo "Method 3: Whop CLI (if available)"
echo "1. Install Whop CLI: npm install -g @whop/cli"
echo "2. Login: whop login"
echo "3. Deploy: whop deploy"
echo ""
echo "📁 Files to upload:"
echo "   - Upload the entire contents of the 'out' folder"
echo "   - Make sure to include all HTML, CSS, and JS files"
echo ""
echo "🔧 App Configuration:"
echo "   - App Name: Fitness CRM"
echo "   - Description: A comprehensive fitness client management system"
echo "   - Category: Business/Productivity"
echo "   - Icon: Upload your app icon"
echo "   - Permissions: user:read, company:read"
echo ""
echo "📚 For detailed instructions, see WHOP_DIRECT_DEPLOYMENT.md"
echo ""
echo "✅ Ready to deploy to Whop!"


