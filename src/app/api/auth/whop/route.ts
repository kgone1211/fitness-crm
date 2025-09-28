import { NextResponse } from 'next/server';

export async function GET() {
  // This route handles Whop authentication
  // In a real implementation, you would:
  // 1. Redirect to Whop's OAuth endpoint
  // 2. Handle the callback
  // 3. Exchange the code for tokens
  
  const whopAuthUrl = `https://whop.com/oauth/authorize?client_id=${process.env.WHOP_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL + '/api/auth/whop/callback')}&response_type=code&scope=read`;
  
  return NextResponse.redirect(whopAuthUrl);
}
