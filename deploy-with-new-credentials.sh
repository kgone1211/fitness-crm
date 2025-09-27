#!/bin/bash

echo "🚀 Deploying with Updated Whop Credentials"
echo "=========================================="
echo ""

echo "✅ Updated App Configuration:"
echo "App ID: app_6ZskuhNqu7LD9V"
echo "API Key: brZ-XEEXJ6ICsEpGRfnlJiaklRQ0iQfsH2_Nt-vdKfI"
echo "Agent User ID: user_MwilkJ64Bvkdo"
echo "Company ID: biz_0iRabAN0PuLJni"
echo ""

echo "📋 Files Updated:"
echo "✅ whop-manifest.json - Updated app ID"
echo "✅ check-whop-app.sh - Updated app ID and links"
echo "✅ WHOP_TROUBLESHOOTING.md - Updated app ID"
echo ""

echo "🔧 Environment Variables for Vercel:"
echo "WHOP_API_KEY=brZ-XEEXJ6ICsEpGRfnlJiaklRQ0iQfsH2_Nt-vdKfI"
echo "NEXT_PUBLIC_WHOP_APP_ID=app_6ZskuhNqu7LD9V"
echo "NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_MwilkJ64Bvkdo"
echo "NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0iRabAN0PuLJni"
echo ""

echo "📋 Next Steps:"
echo "1. Push changes to GitHub:"
echo "   git add ."
echo "   git commit -m 'Update Whop credentials'"
echo "   git push origin main"
echo ""
echo "2. Set environment variables in Vercel:"
echo "   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables"
echo "   - Add the 4 environment variables above"
echo ""
echo "3. Update Whop app settings:"
echo "   - Go to https://whop.com/dashboard/apps/app_6ZskuhNqu7LD9V"
echo "   - Update App URL to your Vercel URL"
echo "   - Make sure app is published"
echo ""
echo "4. Test the integration:"
echo "   - Visit: https://whop.com/apps/app_6ZskuhNqu7LD9V/install/"
echo "   - Install the app"
echo "   - Should redirect to your Vercel app"
echo ""

echo "🎯 Your app should now work in Whop with the new credentials!"



