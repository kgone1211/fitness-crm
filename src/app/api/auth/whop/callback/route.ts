import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=no_code`);
  }

  try {
    const clientId = process.env.WHOP_CLIENT_ID;
    const clientSecret = process.env.WHOP_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/whop/callback`;
    
    if (!clientId || !clientSecret) {
      throw new Error('Whop OAuth not properly configured');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://whop.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    
    // Get user info from Whop
    const userResponse = await fetch('https://whop.com/api/v2/users/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userData = await userResponse.json();
    
    // Store user data in session/localStorage (you might want to use a proper session store)
    // For now, we'll redirect to the main app and let the client-side handle the user data
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?auth_success=true`);
    
  } catch (error) {
    console.error('Whop auth callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`);
  }
}
