// Database utilities and mock data for the fitness CRM

import { 
  User, 
  Client, 
  Workout, 
  Measurement, 
  CheckIn, 
  ProgressPhoto, 
  Goal, 
  NutritionLog,
  WorkoutTemplate,
  DashboardStats,
  MacroTarget,
  MacroLog,
  Exercise,
  WorkoutSet,
  WorkoutExercise,
  WorkoutSession,
  WorkoutProgress
} from '@/types';

// Mock data storage (in a real app, this would be a database)
let users: User[] = [];
let clients: Client[] = [];
let workouts: Workout[] = [];
let measurements: Measurement[] = [];
let checkIns: CheckIn[] = [];
let progressPhotos: ProgressPhoto[] = [];
let goals: Goal[] = [];
let nutritionLogs: NutritionLog[] = [];
let workoutTemplates: WorkoutTemplate[] = [];
let macroTargets: MacroTarget[] = [];
let macroLogs: MacroLog[] = [];
let exercises: Exercise[] = [];
let workoutSessions: WorkoutSession[] = [];

// Initialize with sample data
export function initializeDatabase() {
  // Sample users
  users = [
    {
      id: '1',
      whopId: 'whop_1',
      email: 'trainer@example.com',
      name: 'John Trainer',
      role: 'trainer',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      whopId: 'whop_2',
      email: 'client1@example.com',
      name: 'Alice Client',
      role: 'client',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      whopId: 'whop_3',
      email: 'client2@example.com',
      name: 'Bob Client',
      role: 'client',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ];

  // Sample clients
  clients = [
    {
      id: '1',
      userId: '2',
      trainerId: '1',
      name: 'Alice Client',
      email: 'client1@example.com',
      phone: '+1234567890',
      dateOfBirth: new Date('1990-05-15'),
      gender: 'female',
      height: 165,
      startingWeight: 154,
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      goals: ['weight_loss', 'muscle_gain'],
      notes: 'Prefers morning workouts',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      userId: '3',
      trainerId: '1',
      name: 'Bob Client',
      email: 'client2@example.com',
      phone: '+1234567891',
      dateOfBirth: new Date('1985-08-22'),
      gender: 'male',
      height: 180,
      startingWeight: 187,
      address: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      },
      goals: ['strength', 'endurance'],
      notes: 'Has knee injury - avoid high impact',
      isActive: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ];

  // Sample workouts
  workouts = [
    {
      id: '1',
      clientId: '1',
      trainerId: '1',
      name: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and arms',
      date: new Date('2024-09-10'),
      duration: 60,
      exercises: [
        {
          id: '1',
          exerciseId: '1',
          exercise: {
            id: '1',
            name: 'Bench Press',
            muscleGroups: ['chest', 'shoulders', 'triceps'],
            instructions: 'Lie on bench, lower bar to chest, press up'
          },
          sets: [
            { id: '1', setNumber: 1, reps: 12, weight: 60, completed: true, restTime: 90 },
            { id: '2', setNumber: 2, reps: 10, weight: 65, completed: true, restTime: 90 },
            { id: '3', setNumber: 3, reps: 8, weight: 70, completed: true, restTime: 90 },
          ],
          order: 1,
          notes: ''
        },
        {
          id: '2',
          exerciseId: '2',
          exercise: {
            id: '2',
            name: 'Shoulder Press',
            muscleGroups: ['shoulders', 'triceps'],
            instructions: 'Press weights overhead from shoulder level'
          },
          sets: [
            { id: '4', setNumber: 1, reps: 12, weight: 20, completed: true, restTime: 60 },
            { id: '5', setNumber: 2, reps: 10, weight: 22.5, completed: true, restTime: 60 },
            { id: '6', setNumber: 3, reps: 8, weight: 25, completed: true, restTime: 60 },
          ],
          order: 2,
          notes: ''
        },
      ],
      status: 'completed',
      createdAt: new Date('2024-09-10'),
      updatedAt: new Date('2024-09-10'),
    },
  ];

  // Sample measurements
  measurements = [
    {
      id: '1',
      clientId: '1',
      type: 'weight',
      value: 143,
      unit: 'lbs',
      date: new Date('2024-09-01'),
      createdAt: new Date('2024-09-01'),
    },
    {
      id: '2',
      clientId: '1',
      type: 'weight',
      value: 142,
      unit: 'lbs',
      date: new Date('2024-09-08'),
      createdAt: new Date('2024-09-08'),
    },
    {
      id: '3',
      clientId: '1',
      type: 'waist',
      value: 75,
      unit: 'cm',
      date: new Date('2024-09-01'),
      createdAt: new Date('2024-09-01'),
    },
  ];

  // Sample check-ins
  checkIns = [
    {
      id: '1',
      clientId: '1',
      trainerId: '1',
      type: 'weekly',
      date: new Date('2024-09-08'),
      mood: 4,
      energy: 3,
      sleep: 7.5,
      water: 8,
      notes: 'Feeling good this week, had some trouble sleeping on Tuesday',
      createdAt: new Date('2024-09-08'),
    },
  ];

  // Sample goals
  goals = [
    {
      id: '1',
      clientId: '1',
      title: 'Lose 5kg',
      description: 'Target weight loss for summer',
      type: 'weight_loss',
      targetValue: 60,
      currentValue: 64.5,
      unit: 'kg',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-08'),
    },
  ];
}

// Database operations
export const db = {
  // Users
  getUsers: () => users,
  getUserById: (id: string) => users.find(u => u.id === id),
  getUserByWhopId: (whopId: string) => users.find(u => u.whopId === whopId),
  createUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newUser: User = {
      ...user,
      id: (users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  },

  // Clients
  getClients: () => clients,
  getClientById: (id: string) => clients.find(c => c.id === id),
  getClientsByTrainerId: (trainerId: string) => clients.filter(c => c.trainerId === trainerId),
  createClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newClient: Client = {
      ...client,
      id: (clients.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clients.push(newClient);
    return newClient;
  },
  updateClient: (id: string, updates: Partial<Client>) => {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updates, updatedAt: new Date() };
      return clients[index];
    }
    return null;
  },

  // Workouts
  getWorkouts: () => workouts,
  getWorkoutById: (id: string) => workouts.find(w => w.id === id),
  getWorkoutsByClientId: (clientId: string) => workouts.filter(w => w.clientId === clientId),
  getWorkoutsByTrainerId: (trainerId: string) => workouts.filter(w => w.trainerId === trainerId),
  createWorkout: (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: (workouts.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    workouts.push(newWorkout);
    return newWorkout;
  },
  updateWorkout: (id: string, updates: Partial<Workout>) => {
    const index = workouts.findIndex(w => w.id === id);
    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...updates, updatedAt: new Date() };
      return workouts[index];
    }
    return null;
  },

  // Measurements
  getMeasurements: () => measurements,
  getMeasurementsByClientId: (clientId: string) => measurements.filter(m => m.clientId === clientId),
  createMeasurement: (measurement: Omit<Measurement, 'id' | 'createdAt'>) => {
    const newMeasurement: Measurement = {
      ...measurement,
      id: (measurements.length + 1).toString(),
      createdAt: new Date(),
    };
    measurements.push(newMeasurement);
    return newMeasurement;
  },

  // Check-ins
  getCheckIns: () => checkIns,
  getCheckInsByClientId: (clientId: string) => checkIns.filter(c => c.clientId === clientId),
  createCheckIn: (checkIn: Omit<CheckIn, 'id' | 'createdAt'>) => {
    const newCheckIn: CheckIn = {
      ...checkIn,
      id: (checkIns.length + 1).toString(),
      createdAt: new Date(),
    };
    checkIns.push(newCheckIn);
    return newCheckIn;
  },

  // Goals
  getGoals: () => goals,
  getGoalsByClientId: (clientId: string) => goals.filter(g => g.clientId === clientId),
  createGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: (goals.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    goals.push(newGoal);
    return newGoal;
  },
  updateGoal: (id: string, updates: Partial<Goal>) => {
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates, updatedAt: new Date() };
      return goals[index];
    }
    return null;
  },

  // Dashboard stats
  getDashboardStats: (trainerId: string): DashboardStats => {
    const trainerClients = clients.filter(c => c.trainerId === trainerId);
    const activeClients = trainerClients.filter(c => c.isActive);
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const workoutsThisWeek = workouts.filter(w => 
      w.trainerId === trainerId && 
      w.date >= weekAgo && 
      w.status === 'completed'
    ).length;
    
    const checkInsThisWeek = checkIns.filter(c => 
      c.trainerId === trainerId && 
      c.date >= weekAgo
    ).length;
    
    const averageWorkoutDuration = workouts
      .filter(w => w.trainerId === trainerId && w.status === 'completed')
      .reduce((sum, w) => sum + w.duration, 0) / 
      Math.max(workouts.filter(w => w.trainerId === trainerId && w.status === 'completed').length, 1);
    
    const clientProgress = activeClients.map(client => {
      const clientMeasurements = measurements
        .filter(m => m.clientId === client.id && m.type === 'weight')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      
      const weightChange = clientMeasurements.length >= 2 
        ? clientMeasurements[0].value - clientMeasurements[clientMeasurements.length - 1].value
        : 0;
      
      const lastCheckIn = checkIns
        .filter(c => c.clientId === client.id)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.date || new Date(0);
      
      return {
        clientId: client.id,
        clientName: client.name,
        weightChange,
        measurementChange: 0, // Simplified for now
        lastCheckIn,
      };
    });

    return {
      totalClients: trainerClients.length,
      activeClients: activeClients.length,
      workoutsThisWeek,
      checkInsThisWeek,
      averageWorkoutDuration: Math.round(averageWorkoutDuration),
      clientProgress,
    };
  },

  // Macro tracking functions
  async getMacroData(clientId: string, date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    const target = macroTargets.find(t => t.clientId === clientId);
    const logs = macroLogs.filter(l => 
      l.clientId === clientId && 
      l.date.toDateString() === targetDate.toDateString()
    );

    return {
      targets: target || null,
      logs: logs.sort((a, b) => b.date.getTime() - a.date.getTime()),
      totalCalories: logs.reduce((sum, log) => sum + log.calories, 0),
      totalProtein: logs.reduce((sum, log) => sum + log.protein, 0),
      totalCarbs: logs.reduce((sum, log) => sum + log.carbs, 0),
      totalFats: logs.reduce((sum, log) => sum + log.fat, 0),
    };
  },

  async setMacroTargets(clientId: string, targets: Omit<MacroTarget, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>) {
    const existingIndex = macroTargets.findIndex(t => t.clientId === clientId);
    const now = new Date();
    
    const macroTarget: MacroTarget = {
      id: `macro_target_${Date.now()}`,
      clientId,
      ...targets,
      createdAt: now,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      macroTargets[existingIndex] = macroTarget;
    } else {
      macroTargets.push(macroTarget);
    }

    return macroTarget;
  },

  async updateMacroTargets(clientId: string, targets: Partial<Omit<MacroTarget, 'id' | 'clientId' | 'createdAt'>>) {
    const existingIndex = macroTargets.findIndex(t => t.clientId === clientId);
    
    if (existingIndex >= 0) {
      macroTargets[existingIndex] = {
        ...macroTargets[existingIndex],
        ...targets,
        updatedAt: new Date(),
      };
      return macroTargets[existingIndex];
    }
    
    throw new Error('Macro targets not found');
  },

  async logMacros(clientId: string, logData: Omit<MacroLog, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const macroLog: MacroLog = {
      id: `macro_log_${Date.now()}`,
      clientId,
      ...logData,
      createdAt: now
    };

    macroLogs.push(macroLog);
    return macroLog;
  },

  async updateMacroLog(logId: string, logData: Partial<Omit<MacroLog, 'id' | 'clientId' | 'createdAt'>>) {
    const existingIndex = macroLogs.findIndex(l => l.id === logId);
    
    if (existingIndex >= 0) {
      macroLogs[existingIndex] = {
        ...macroLogs[existingIndex],
        ...logData
      };
      return macroLogs[existingIndex];
    }
    
    throw new Error('Macro log not found');
  },

  async deleteMacroLog(logId: string) {
    const existingIndex = macroLogs.findIndex(l => l.id === logId);
    
    if (existingIndex >= 0) {
      macroLogs.splice(existingIndex, 1);
      return { success: true };
    }
    
    throw new Error('Macro log not found');
  },

  // Workout tracking functions
  async getExercises() {
    return exercises;
  },

  async createExercise(exerciseData: Omit<Exercise, 'id'>) {
    const exercise: Exercise = {
      id: `exercise_${Date.now()}`,
      ...exerciseData,
    };
    exercises.push(exercise);
    return exercise;
  },

  async updateExercise(exerciseId: string, exerciseData: Partial<Exercise>) {
    const existingIndex = exercises.findIndex(e => e.id === exerciseId);
    
    if (existingIndex >= 0) {
      exercises[existingIndex] = { ...exercises[existingIndex], ...exerciseData };
      return exercises[existingIndex];
    }
    
    throw new Error('Exercise not found');
  },

  async deleteExercise(exerciseId: string) {
    const existingIndex = exercises.findIndex(e => e.id === exerciseId);
    
    if (existingIndex >= 0) {
      exercises.splice(existingIndex, 1);
      return { success: true };
    }
    
    throw new Error('Exercise not found');
  },

  async getWorkoutTemplates(trainerId: string) {
    return workoutTemplates.filter(t => t.createdBy === trainerId);
  },

  async createWorkoutTemplate(templateData: Omit<WorkoutTemplate, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const template: WorkoutTemplate = {
      id: `template_${Date.now()}`,
      ...templateData,
      createdAt: now,
      updatedAt: now,
    };
    workoutTemplates.push(template);
    return template;
  },

  async updateWorkoutTemplate(templateId: string, templateData: Partial<Omit<WorkoutTemplate, 'id' | 'createdAt'>>) {
    const existingIndex = workoutTemplates.findIndex(t => t.id === templateId);
    
    if (existingIndex >= 0) {
      workoutTemplates[existingIndex] = {
        ...workoutTemplates[existingIndex],
        ...templateData,
        updatedAt: new Date(),
      };
      return workoutTemplates[existingIndex];
    }
    
    throw new Error('Workout template not found');
  },

  async deleteWorkoutTemplate(templateId: string) {
    const existingIndex = workoutTemplates.findIndex(t => t.id === templateId);
    
    if (existingIndex >= 0) {
      workoutTemplates.splice(existingIndex, 1);
      return { success: true };
    }
    
    throw new Error('Workout template not found');
  },

  async getWorkoutSessions(trainerId: string, clientId?: string) {
    let sessions = workoutSessions.filter(s => s.trainerId === trainerId);
    if (clientId) {
      sessions = sessions.filter(s => s.clientId === clientId);
    }
    return sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  },

  async createWorkoutSession(sessionData: Omit<WorkoutSession, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const session: WorkoutSession = {
      id: `session_${Date.now()}`,
      ...sessionData,
      createdAt: now,
      updatedAt: now,
    };
    workoutSessions.push(session);
    return session;
  },

  async updateWorkoutSession(sessionId: string, sessionData: Partial<Omit<WorkoutSession, 'id' | 'createdAt'>>) {
    const existingIndex = workoutSessions.findIndex(s => s.id === sessionId);
    
    if (existingIndex >= 0) {
      workoutSessions[existingIndex] = {
        ...workoutSessions[existingIndex],
        ...sessionData,
        updatedAt: new Date(),
      };
      return workoutSessions[existingIndex];
    }
    
    throw new Error('Workout session not found');
  },

  async deleteWorkoutSession(sessionId: string) {
    const existingIndex = workoutSessions.findIndex(s => s.id === sessionId);
    
    if (existingIndex >= 0) {
      workoutSessions.splice(existingIndex, 1);
      return { success: true };
    }
    
    throw new Error('Workout session not found');
  },

  async updateWorkoutSet(setId: string, setData: Partial<WorkoutSet>) {
    // Find the set in any workout session
    for (const session of workoutSessions) {
      for (const exercise of session.exercises) {
        const setIndex = exercise.sets.findIndex(s => s.id === setId);
        if (setIndex >= 0) {
          exercise.sets[setIndex] = { ...exercise.sets[setIndex], ...setData };
          return exercise.sets[setIndex];
        }
      }
    }
    
    throw new Error('Workout set not found');
  },

  async getWorkoutProgress(clientId: string) {
    // Calculate progress for each exercise
    const progress: WorkoutProgress[] = [];
    const exerciseStats = new Map<string, { maxWeight: number; lastWeight: number; lastReps: number; lastDate: Date; count: number }>();
    
    // Analyze all completed workout sessions for this client
    const clientSessions = workoutSessions.filter(s => s.clientId === clientId && s.status === 'completed');
    
    for (const session of clientSessions) {
      for (const exercise of session.exercises) {
        const exerciseId = exercise.exerciseId;
        const exerciseName = exercise.exercise.name;
        
        if (!exerciseStats.has(exerciseId)) {
          exerciseStats.set(exerciseId, {
            maxWeight: 0,
            lastWeight: 0,
            lastReps: 0,
            lastDate: new Date(0),
            count: 0
          });
        }
        
        const stats = exerciseStats.get(exerciseId)!;
        
        for (const set of exercise.sets) {
          if (set.completed && set.weight > stats.maxWeight) {
            stats.maxWeight = set.weight;
          }
          if (set.completed) {
            stats.lastWeight = set.weight;
            stats.lastReps = set.reps;
            stats.lastDate = session.startTime;
            stats.count++;
          }
        }
      }
    }
    
    // Convert to progress array
    for (const [exerciseId, stats] of exerciseStats) {
      if (stats.count > 0) {
        const exercise = exercises.find(e => e.id === exerciseId);
        if (exercise) {
          progress.push({
            exerciseId,
            exerciseName: exercise.name,
            personalRecord: stats.maxWeight,
            lastWeight: stats.lastWeight,
            lastReps: stats.lastReps,
            lastDate: stats.lastDate,
            improvement: 0 // Could calculate based on historical data
          });
        }
      }
    }
    
    return progress;
  },
};

// Initialize database on import
initializeDatabase();
