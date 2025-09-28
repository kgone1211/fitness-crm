'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Goal {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: string;
  targetValue: string;
  unit: string;
  currentValue: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Completed' | 'Paused';
  progress: number;
  createdAt: string;
  completedAt?: string;
}

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'progress' | 'currentValue' | 'status' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (id: string, currentValue: string, progress: number) => void;
  completeGoal: (id: string) => void;
  getGoalsByClient: (clientId: string) => Goal[];
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const defaultGoals: Goal[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'John Doe',
    title: 'Lose 10 pounds',
    description: 'Reduce body weight to reach target weight of 170 lbs',
    category: 'Weight Loss',
    targetValue: '170',
    unit: 'lbs',
    currentValue: '180',
    dueDate: '2024-03-01',
    priority: 'High',
    status: 'In Progress',
    progress: 50,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    clientId: 'client2',
    clientName: 'Jane Smith',
    title: 'Increase bench press',
    description: 'Build strength by increasing bench press weight',
    category: 'Strength',
    targetValue: '135',
    unit: 'lbs',
    currentValue: '115',
    dueDate: '2024-02-15',
    priority: 'Medium',
    status: 'In Progress',
    progress: 75,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    clientId: 'client3',
    clientName: 'Mike Johnson',
    title: 'Run 5K in under 25 minutes',
    description: 'Improve cardiovascular fitness and running speed',
    category: 'Cardio',
    targetValue: '25',
    unit: 'minutes',
    currentValue: '32',
    dueDate: '2024-02-28',
    priority: 'Low',
    status: 'In Progress',
    progress: 30,
    createdAt: '2024-01-05'
  }
];

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('fitness-goals');
      return savedGoals ? JSON.parse(savedGoals) : defaultGoals;
    }
    return defaultGoals;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitness-goals', JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, 'id' | 'progress' | 'currentValue' | 'status' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      progress: 0,
      currentValue: '0',
      status: 'In Progress',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const updateGoalProgress = (id: string, currentValue: string, progress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, currentValue, progress, status: progress >= 100 ? 'Completed' : 'In Progress' }
        : goal
    ));
  };

  const completeGoal = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, status: 'Completed', progress: 100, completedAt: new Date().toISOString().split('T')[0] }
        : goal
    ));
  };

  const getGoalsByClient = (clientId: string) => {
    return goals.filter(goal => goal.clientId === clientId);
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      updateGoalProgress,
      completeGoal,
      getGoalsByClient
    }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};
