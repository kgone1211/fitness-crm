import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/workouts - Get workouts, templates, or sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'sessions';
    const clientId = searchParams.get('clientId');
    const trainerId = searchParams.get('trainerId');

    if (!trainerId) {
      return NextResponse.json({ error: 'Trainer ID is required' }, { status: 400 });
    }

    let data;
    switch (type) {
      case 'sessions':
        data = await db.getWorkoutSessions(trainerId, clientId || undefined);
        break;
      case 'templates':
        data = await db.getWorkoutTemplates(trainerId);
        break;
      case 'exercises':
        data = await db.getExercises();
        break;
      case 'progress':
        if (!clientId) {
          return NextResponse.json({ error: 'Client ID is required for progress' }, { status: 400 });
        }
        data = await db.getWorkoutProgress(clientId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching workout data:', error);
    return NextResponse.json({ error: 'Failed to fetch workout data' }, { status: 500 });
  }
}

// POST /api/workouts - Create workout session, template, or exercise
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: workoutData } = body;

    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    let result;
    switch (type) {
      case 'session':
        result = await db.createWorkoutSession(workoutData);
        break;
      case 'template':
        result = await db.createWorkoutTemplate(workoutData);
        break;
      case 'exercise':
        result = await db.createExercise(workoutData);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating workout data:', error);
    return NextResponse.json({ error: 'Failed to create workout data' }, { status: 500 });
  }
}

// PUT /api/workouts - Update workout session, template, or exercise
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data: updateData } = body;

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    let result;
    switch (type) {
      case 'session':
        result = await db.updateWorkoutSession(id, updateData);
        break;
      case 'template':
        result = await db.updateWorkoutTemplate(id, updateData);
        break;
      case 'exercise':
        result = await db.updateExercise(id, updateData);
        break;
      case 'set':
        result = await db.updateWorkoutSet(id, updateData);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating workout data:', error);
    return NextResponse.json({ error: 'Failed to update workout data' }, { status: 500 });
  }
}

// DELETE /api/workouts - Delete workout session, template, or exercise
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    let result;
    switch (type) {
      case 'session':
        result = await db.deleteWorkoutSession(id);
        break;
      case 'template':
        result = await db.deleteWorkoutTemplate(id);
        break;
      case 'exercise':
        result = await db.deleteExercise(id);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting workout data:', error);
    return NextResponse.json({ error: 'Failed to delete workout data' }, { status: 500 });
  }
}
