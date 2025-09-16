'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  custom1?: string;
  custom2?: string;
  custom3?: string;
}

interface ThemeContextType {
  colors: ColorScheme;
  setColors: (colors: ColorScheme) => void;
  resetColors: () => void;
}

const defaultColors: ColorScheme = {
  primary: '#3B82F6',    // Blue
  secondary: '#6B7280',  // Gray
  accent: '#8B5CF6',     // Purple
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  background: '#F9FAFB', // Light gray
  surface: '#FFFFFF',    // White
  text: '#111827',       // Dark gray
  textSecondary: '#6B7280', // Medium gray
  custom1: '#FF6B6B',    // Custom red
  custom2: '#4ECDC4',    // Custom teal
  custom3: '#45B7D1'     // Custom blue
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<ColorScheme>(defaultColors);

  useEffect(() => {
    // Load saved colors from localStorage
    const savedColors = localStorage.getItem('fitness-crm-colors');
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        setColorsState(parsedColors);
      } catch (error) {
        console.error('Error loading saved colors:', error);
      }
    }
  }, []);

  const setColors = (newColors: ColorScheme) => {
    setColorsState(newColors);
    localStorage.setItem('fitness-crm-colors', JSON.stringify(newColors));
  };

  const resetColors = () => {
    setColorsState(defaultColors);
    localStorage.setItem('fitness-crm-colors', JSON.stringify(defaultColors));
  };

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
