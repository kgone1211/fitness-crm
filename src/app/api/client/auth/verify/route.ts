import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify simple token
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
    
    // Verify signature
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET)
      .update(JSON.stringify(payload))
      .digest('base64');
    
    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid token signature' },
        { status: 401 }
      );
    }

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    if (payload.type !== 'client') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }

    // Get client data
    const clients = db.getClients();
    const client = clients.find(c => c.id === payload.clientId);

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 401 }
      );
    }

    // Return client data
    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        currentWeight: client.currentWeight,
        goalWeight: client.goalWeight,
        height: client.height
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}
