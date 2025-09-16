#!/bin/bash

# Fitness CRM - Export to GitHub Script
# This script helps you export your project to GitHub

echo "🚀 Fitness CRM - Export to GitHub"
echo "================================="

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the fitness-crm directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Fitness CRM with Whop integration
    
    Features:
    - Complete trainer dashboard
    - Client portal with individual data access
    - Workout tracking system
    - Nutrition and macro tracking
    - Progress analytics
    - Whop integration
    - Responsive design
    - Color customization"
    echo "✅ Changes committed"
fi

echo ""
echo "🌐 Next steps to push to GitHub:"
echo "1. Go to https://github.com and create a new repository"
echo "2. Name it 'fitness-crm' (or your preferred name)"
echo "3. Don't initialize with README, .gitignore, or license"
echo "4. Copy the repository URL"
echo "5. Run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/fitness-crm.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "📚 Alternative: Use GitHub Desktop"
echo "1. Download GitHub Desktop from https://desktop.github.com/"
echo "2. Open GitHub Desktop"
echo "3. Click 'Add an Existing Repository from your Hard Drive'"
echo "4. Select this folder: $(pwd)"
echo "5. Click 'Publish repository'"
echo ""
echo "✅ Ready to export to GitHub!"
