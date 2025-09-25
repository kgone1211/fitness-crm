#!/bin/bash

echo "🔗 Linking Vercel to Whop - Step by Step Guide"
echo "=============================================="
echo ""

echo "📋 Step 1: Get Your Vercel URL"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Find your fitness-crm project"
echo "3. Copy the production URL (e.g., https://fitness-crm-vercel.vercel.app)"
echo ""

echo "📋 Step 2: Update Whop App Configuration"
echo "1. Go to https://whop.com/dashboard"
echo "2. Find your app: app_v9NgvKg9ABqLE1"
echo "3. Go to Settings → App Configuration"
echo "4. Update App URL to your Vercel URL"
echo "5. Save changes"
echo ""

echo "📋 Step 3: Alternative - Use Whop CLI"
echo "Run this command with your actual Vercel URL:"
echo "whop apps update app_v9NgvKg9ABqLE1 --app-url https://YOUR-VERCEL-URL.vercel.app"
echo ""

echo "📋 Step 4: Test the Integration"
echo "1. Go to your Whop app install link:"
echo "   https://whop.com/apps/app_v9NgvKg9ABqLE1/install/"
echo "2. Install the app"
echo "3. It should redirect to your Vercel app"
echo ""

echo "📋 Step 5: Environment Variables (if needed)"
echo "Make sure these are set in Vercel:"
echo "- WHOP_API_KEY=faEFh0WsrzBwnORaAozLoBspn7XmzegskNx62l29u_A"
echo "- NEXT_PUBLIC_WHOP_APP_ID=app_v9NgvKg9ABqLE1"
echo "- NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_y3Kg36SNnr8R7"
echo "- NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni"
echo ""

echo "✅ Your app is now ready to be linked to Whop!"
echo "The whop-manifest.json has been updated with the correct app ID."


