import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const companyId = searchParams.get('company_id');

    if (!userId || !companyId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate with Whop API
    const whopApiKey = process.env.WHOP_API_KEY;
    if (!whopApiKey) {
      return NextResponse.json(
        { error: 'Whop API key not configured' },
        { status: 500 }
      );
    }

    // For now, return success (you can add actual Whop API validation here)
    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        company_id: companyId,
        authenticated: true
      }
    });

  } catch (error) {
    console.error('Whop auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, company_id } = body;

    if (!user_id || !company_id) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate with Whop API
    const whopApiKey = process.env.WHOP_API_KEY;
    if (!whopApiKey) {
      return NextResponse.json(
        { error: 'Whop API key not configured' },
        { status: 500 }
      );
    }

    // For now, return success (you can add actual Whop API validation here)
    return NextResponse.json({
      success: true,
      user: {
        id: user_id,
        company_id: company_id,
        authenticated: true
      }
    });

  } catch (error) {
    console.error('Whop auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
