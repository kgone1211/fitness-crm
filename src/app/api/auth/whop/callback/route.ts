import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=no_code`);
  }

  try {
    // Exchange code for tokens
    // This is where you would make the actual API call to Whop
    // For now, we'll redirect to the main app
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  } catch (error) {
    console.error('Whop auth callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=auth_failed`);
  }
}
