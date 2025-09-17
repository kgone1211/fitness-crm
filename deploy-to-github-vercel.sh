#!/bin/bash

# 🚀 Fitness CRM Deployment Script
# This script helps deploy your fitness CRM to GitHub and Vercel

set -e  # Exit on any error

echo "🚀 Starting Fitness CRM Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "Project directory confirmed: $(pwd)"

# Step 1: Check if Xcode command line tools are installed
print_status "Checking for Xcode command line tools..."
if ! command -v git &> /dev/null; then
    print_warning "Xcode command line tools not found. Please install them first:"
    echo "Run: xcode-select --install"
    echo "Then run this script again."
    exit 1
fi

print_success "Xcode command line tools found"

# Step 2: Clean and build project
print_status "Cleaning and building project..."
rm -rf .next
npm run build

if [ $? -eq 0 ]; then
    print_success "Project built successfully"
else
    print_error "Build failed. Please fix errors and try again."
    exit 1
fi

# Step 3: Check Git status
print_status "Checking Git status..."
git status

# Step 4: Add and commit changes
print_status "Adding and committing changes..."
git add .
git commit -m "Deploy: Production ready build $(date)"

# Step 5: Check if remote origin exists
print_status "Checking for GitHub remote..."
if git remote get-url origin &> /dev/null; then
    print_success "GitHub remote found: $(git remote get-url origin)"
else
    print_warning "No GitHub remote found. You'll need to:"
    echo "1. Create a new repository on GitHub"
    echo "2. Add the remote: git remote add origin https://github.com/YOUR_USERNAME/fitness-crm.git"
    echo "3. Push: git push -u origin main"
    echo ""
    echo "Or use GitHub Desktop to publish your repository."
    exit 1
fi

# Step 6: Push to GitHub
print_status "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    print_success "Successfully pushed to GitHub"
else
    print_error "Failed to push to GitHub. Please check your credentials and try again."
    exit 1
fi

# Step 7: Check if Vercel CLI is installed
print_status "Checking for Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Step 8: Deploy to Vercel
print_status "Deploying to Vercel..."
print_warning "You'll need to:"
echo "1. Login to Vercel: vercel login"
echo "2. Deploy: vercel"
echo "3. Configure environment variables in Vercel dashboard"
echo ""
echo "Environment variables to add:"
echo "WHOP_API_KEY=brZ-XEEXJ6ICsEpGRfnlJiaklRQ0iQfsH2_Nt-vdKfI"
echo "NEXT_PUBLIC_WHOP_APP_ID=app_6ZskuhNqu7LD9V"
echo "NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_MwilkJ64Bvkdo"
echo "NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni"
echo "NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app"

print_success "Deployment process completed!"
print_status "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Configure environment variables"
echo "4. Deploy!"

echo ""
print_success "🎉 Your fitness CRM is ready for deployment!"
