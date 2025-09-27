#!/bin/bash

# 🐙 GitHub Setup Script for Fitness CRM
# This script helps set up GitHub repository

set -e

echo "🐙 Setting up GitHub repository for Fitness CRM..."

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

# Check Git status
print_status "Checking Git status..."
git status

# Add all files
print_status "Adding all files to Git..."
git add .

# Commit changes
print_status "Committing changes..."
git commit -m "Initial commit: Fitness CRM ready for deployment" || echo "No changes to commit"

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    print_success "GitHub remote already exists: $(git remote get-url origin)"
    print_status "Pushing to GitHub..."
    git push origin main
else
    print_warning "No GitHub remote found. Please:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'fitness-crm'"
    echo "3. Don't initialize with README (we already have files)"
    echo "4. Copy the repository URL"
    echo "5. Run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/fitness-crm.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "Or use GitHub Desktop to publish your repository."
fi

print_success "GitHub setup completed!"



