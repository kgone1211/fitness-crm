import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const WHOP_CLIENT_ID = process.env.NEXT_PUBLIC_WHOP_APP_ID || process.env.WHOP_CLIENT_ID;
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!WHOP_CLIENT_ID) {
    return NextResponse.json({ error: 'WHOP_CLIENT_ID is not defined' }, { status: 500 });
  }

  const redirectUri = `${NEXT_PUBLIC_APP_URL}/api/auth/whop/callback`;
  const authUrl = `https://whop.com/oauth/authorize?client_id=${WHOP_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=read`;

  return NextResponse.redirect(authUrl);
}
