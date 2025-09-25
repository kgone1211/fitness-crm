import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, currentWeight, goalWeight, height } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if client already exists
    const clients = db.getClients();
    const existingClient = clients.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (existingClient) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      );
    }

    // Simple password storage for demo (in production, use proper hashing)
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create new client
    const newClient = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      currentWeight: currentWeight || 150,
      goalWeight: goalWeight || 140,
      height: height || 65,
      joinDate: new Date().toISOString(),
      status: 'active',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      goals: ['Weight Loss'],
      notes: '',
      avatar: null
    };

    // In a real app, you'd save to database here
    // For now, we'll just simulate success

    // Generate simple token using crypto
    const payload = {
      clientId: newClient.id, 
      email: newClient.email,
      type: 'client',
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };
    
    const token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + 
                  crypto.createHmac('sha256', JWT_SECRET)
                    .update(JSON.stringify(payload))
                    .digest('base64');

    // Return client data and token
    return NextResponse.json({
      success: true,
      token,
      client: {
        id: newClient.id,
        name: newClient.name,
        email: newClient.email,
        currentWeight: newClient.currentWeight,
        goalWeight: newClient.goalWeight,
        height: newClient.height
      }
    });

  } catch (error) {
    console.error('Client registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
