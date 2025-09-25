import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/database';

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

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (decoded.type !== 'client') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }

    // Get client data
    const clients = db.getClients();
    const client = clients.find(c => c.id === decoded.clientId);

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
