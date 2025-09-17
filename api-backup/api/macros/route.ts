import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/macros - Get macro targets and logs for a client
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const date = searchParams.get('date');

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    const macros = await db.getMacroData(clientId, date || undefined);
    return NextResponse.json(macros);
  } catch (error) {
    console.error('Error fetching macro data:', error);
    return NextResponse.json({ error: 'Failed to fetch macro data' }, { status: 500 });
  }
}

// POST /api/macros - Create or update macro targets
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, targets, type } = body;

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    if (type === 'targets') {
      const result = await db.setMacroTargets(clientId, targets);
      return NextResponse.json(result);
    } else if (type === 'log') {
      const result = await db.logMacros(clientId, targets);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error saving macro data:', error);
    return NextResponse.json({ error: 'Failed to save macro data' }, { status: 500 });
  }
}

// PUT /api/macros - Update macro targets or logs
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, targets, type, logId } = body;

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    if (type === 'targets') {
      const result = await db.updateMacroTargets(clientId, targets);
      return NextResponse.json(result);
    } else if (type === 'log' && logId) {
      const result = await db.updateMacroLog(logId, targets);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid type or missing logId' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating macro data:', error);
    return NextResponse.json({ error: 'Failed to update macro data' }, { status: 500 });
  }
}

// DELETE /api/macros - Delete macro log
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('logId');

    if (!logId) {
      return NextResponse.json({ error: 'Log ID is required' }, { status: 400 });
    }

    const result = await db.deleteMacroLog(logId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting macro log:', error);
    return NextResponse.json({ error: 'Failed to delete macro log' }, { status: 500 });
  }
}
