#!/bin/bash

# 🚀 Deploy to Vercel Script
# This script helps deploy your fitness CRM to Vercel

set -e

echo "🚀 Deploying Fitness CRM to Vercel..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run from project root."
    exit 1
fi

# Clean and build
print_status "Cleaning and building project..."
rm -rf .next
npm run build

if [ $? -eq 0 ]; then
    print_success "Build successful!"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod

print_success "Deployment completed!"
print_status "Don't forget to:"
echo "1. Add environment variables in Vercel dashboard"
echo "2. Test your deployed app"
echo "3. Configure custom domain if needed"

echo ""
print_success "🎉 Your fitness CRM is now live on Vercel!"
