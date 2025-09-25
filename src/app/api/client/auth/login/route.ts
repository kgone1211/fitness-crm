import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find client by email
    const clients = db.getClients();
    const client = clients.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (!client) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // For demo purposes, we'll use a simple password check
    // In production, you'd hash passwords and compare with bcrypt
    const isValidPassword = password === 'password' || await bcrypt.compare(password, client.password || '');

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        clientId: client.id, 
        email: client.email,
        type: 'client'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return client data and token
    return NextResponse.json({
      success: true,
      token,
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
    console.error('Client login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
