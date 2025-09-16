// Core types for the fitness CRM application

export interface User {
  id: string;
  whopId: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'trainer' | 'client';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  userId: string;
  trainerId: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  startingWeight?: number; // in lbs
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  goals: string[];
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id: string;
  clientId: string;
  trainerId: string;
  name: string;
  description?: string;
  date: Date;
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Workout tracking system types
export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number; // in lbs
  completed: boolean;
  restTime?: number; // in seconds
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  order: number;
  notes?: string;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
  createdBy: string; // trainerId
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutSession {
  id: string;
  workoutTemplateId?: string;
  clientId: string;
  trainerId: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  startTime: Date;
  endTime?: Date;
  status: 'in_progress' | 'completed' | 'paused';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutProgress {
  exerciseId: string;
  exerciseName: string;
  personalRecord: number; // best weight lifted
  lastWeight: number;
  lastReps: number;
  lastDate: Date;
  improvement: number; // percentage improvement
}


export interface Set {
  id: string;
  reps?: number;
  weight?: number; // in kg
  distance?: number; // in meters
  duration?: number; // in seconds
  restTime?: number; // in seconds
  completed: boolean;
}

export interface Measurement {
  id: string;
  clientId: string;
  type: 'weight' | 'body_fat' | 'muscle_mass' | 'waist' | 'chest' | 'arms' | 'thighs' | 'custom';
  value: number;
  unit: 'kg' | 'lbs' | 'cm' | 'inches' | '%';
  date: Date;
  notes?: string;
  createdAt: Date;
}

export interface CheckIn {
  id: string;
  clientId: string;
  trainerId: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  energy: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  sleep: number; // hours
  water: number; // glasses
  notes?: string;
  photos?: string[]; // URLs to progress photos
  measurements?: Measurement[];
  createdAt: Date;
}

export interface ProgressPhoto {
  id: string;
  clientId: string;
  checkInId?: string;
  url: string;
  type: 'front' | 'side' | 'back' | 'other';
  date: Date;
  notes?: string;
  createdAt: Date;
}

export interface Goal {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'endurance' | 'strength' | 'custom';
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  targetDate?: Date;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionLog {
  id: string;
  clientId: string;
  date: Date;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake: number; // glasses
  notes?: string;
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string; // HH:MM format
  notes?: string;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  workoutsThisWeek: number;
  checkInsThisWeek: number;
  averageWorkoutDuration: number;
  clientProgress: {
    clientId: string;
    clientName: string;
    weightChange: number;
    measurementChange: number;
    lastCheckIn: Date;
  }[];
}


// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface WorkoutFormData {
  name: string;
  description?: string;
  date: string;
  duration: number;
  exercises: Omit<Exercise, 'id'>[];
  notes?: string;
}

export interface MeasurementFormData {
  type: Measurement['type'];
  value: number;
  unit: Measurement['unit'];
  date: string;
  notes?: string;
}

export interface CheckInFormData {
  type: CheckIn['type'];
  mood: CheckIn['mood'];
  energy: CheckIn['energy'];
  sleep: number;
  water: number;
  notes?: string;
  photos?: File[];
}

export interface ClientFormData {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Client['gender'];
  height?: number;
  startingWeight?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  goals: string[];
  notes?: string;
}

export interface MacroTarget {
  id: string;
  clientId: string;
  protein: number; // grams per day
  carbs: number; // grams per day
  fat: number; // grams per day
  calories: number; // calculated from macros
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPlan {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  documentUrl?: string; // URL to uploaded meal plan document
  documentName?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MacroLog {
  id: string;
  clientId: string;
  date: Date;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  notes?: string;
  createdAt: Date;
}

export interface AnalyticsData {
  weightChange: {
    clientId: string;
    clientName: string;
    startWeight: number;
    currentWeight: number;
    change: number;
    changePercent: number;
    period: string;
  }[];
  workoutsCompleted: {
    clientId: string;
    clientName: string;
    totalWorkouts: number;
    thisWeek: number;
    thisMonth: number;
    averageDuration: number;
  }[];
  mealsTracked: {
    clientId: string;
    clientName: string;
    totalMeals: number;
    thisWeek: number;
    thisMonth: number;
    averageCalories: number;
  }[];
  macroCompliance: {
    clientId: string;
    clientName: string;
    proteinCompliance: number; // percentage
    carbsCompliance: number;
    fatCompliance: number;
    overallCompliance: number;
  }[];
}
