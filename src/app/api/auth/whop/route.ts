import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.WHOP_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/whop/callback`;
  
  if (!clientId) {
    return NextResponse.json({ error: 'WHOP_CLIENT_ID not configured' }, { status: 500 });
  }

  const whopAuthUrl = new URL('https://whop.com/oauth/authorize');
  whopAuthUrl.searchParams.set('client_id', clientId);
  whopAuthUrl.searchParams.set('redirect_uri', redirectUri);
  whopAuthUrl.searchParams.set('response_type', 'code');
  whopAuthUrl.searchParams.set('scope', 'read');
  
  return NextResponse.redirect(whopAuthUrl.toString());
}
