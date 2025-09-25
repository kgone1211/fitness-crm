import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/database';

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

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

    // Generate JWT token
    const token = jwt.sign(
      { 
        clientId: newClient.id, 
        email: newClient.email,
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
