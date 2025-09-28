import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
    NEXT_PUBLIC_WHOP_APP_ID: process.env.NEXT_PUBLIC_WHOP_APP_ID || 'NOT SET',
    WHOP_CLIENT_ID: process.env.WHOP_CLIENT_ID ? 'SET' : 'NOT SET',
    WHOP_CLIENT_SECRET: process.env.WHOP_CLIENT_SECRET ? 'SET' : 'NOT SET',
    timestamp: new Date().toISOString()
  });
}
