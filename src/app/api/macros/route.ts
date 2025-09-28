import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration - in production, this would come from a database
const mockMacroData = {
  targets: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
  },
  logs: [
    {
      id: '1',
      mealName: 'Breakfast',
      calories: 450,
      protein: 25,
      carbs: 45,
      fats: 18,
      date: new Date().toISOString().split('T')[0],
      notes: 'Oatmeal with berries and protein powder',
    },
    {
      id: '2',
      mealName: 'Lunch',
      calories: 600,
      protein: 40,
      carbs: 60,
      fats: 20,
      date: new Date().toISOString().split('T')[0],
      notes: 'Grilled chicken salad',
    },
  ],
  totalCalories: 1050,
  totalProtein: 65,
  totalCarbs: 105,
  totalFats: 38,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const logId = searchParams.get('logId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would fetch from database based on clientId and date
    // For now, we'll return mock data
    const response = {
      ...mockMacroData,
      logs: mockMacroData.logs.filter(log => log.date === date),
    };

    // Recalculate totals for the specific date
    const dailyLogs = response.logs;
    response.totalCalories = dailyLogs.reduce((sum, log) => sum + log.calories, 0);
    response.totalProtein = dailyLogs.reduce((sum, log) => sum + log.protein, 0);
    response.totalCarbs = dailyLogs.reduce((sum, log) => sum + log.carbs, 0);
    response.totalFats = dailyLogs.reduce((sum, log) => sum + log.fats, 0);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching macro data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch macro data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, type, targets } = body;

    if (!clientId || !type) {
      return NextResponse.json(
        { error: 'Client ID and type are required' },
        { status: 400 }
      );
    }

    if (type === 'targets') {
      // In a real app, you would save macro targets to database
      console.log('Saving macro targets for client:', clientId, targets);
      
      return NextResponse.json({
        success: true,
        message: 'Macro targets saved successfully',
        data: targets,
      });
    }

    if (type === 'log') {
      // In a real app, you would save macro log to database
      const logEntry = {
        id: Date.now().toString(),
        ...targets,
        createdAt: new Date().toISOString(),
      };
      
      console.log('Saving macro log for client:', clientId, logEntry);
      
      return NextResponse.json({
        success: true,
        message: 'Macro log saved successfully',
        data: logEntry,
      });
    }

    return NextResponse.json(
      { error: 'Invalid type specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error saving macro data:', error);
    return NextResponse.json(
      { error: 'Failed to save macro data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('logId');
    const body = await request.json();
    const { clientId, type, targets } = body;

    if (!logId || !clientId || !type) {
      return NextResponse.json(
        { error: 'Log ID, Client ID, and type are required' },
        { status: 400 }
      );
    }

    if (type === 'log') {
      // In a real app, you would update the macro log in database
      const updatedLog = {
        id: logId,
        ...targets,
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Updating macro log:', logId, updatedLog);
      
      return NextResponse.json({
        success: true,
        message: 'Macro log updated successfully',
        data: updatedLog,
      });
    }

    return NextResponse.json(
      { error: 'Invalid type specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating macro data:', error);
    return NextResponse.json(
      { error: 'Failed to update macro data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('logId');

    if (!logId) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would delete the macro log from database
    console.log('Deleting macro log:', logId);
    
    return NextResponse.json({
      success: true,
      message: 'Macro log deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting macro data:', error);
    return NextResponse.json(
      { error: 'Failed to delete macro data' },
      { status: 500 }
    );
  }
}
