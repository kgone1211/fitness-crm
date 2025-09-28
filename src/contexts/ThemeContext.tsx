'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logo: string;
  companyName: string;
  tagline: string;
  fontFamily: string;
}

interface ThemeContextType {
  brandSettings: BrandSettings;
  updateBrandSettings: (settings: Partial<BrandSettings>) => void;
  resetBrandSettings: () => void;
}

const defaultBrandSettings: BrandSettings = {
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  accentColor: '#F59E0B',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  logo: '',
  companyName: 'FitCoach Pro',
  tagline: 'Transform Your Fitness Journey',
  fontFamily: 'Inter'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(defaultBrandSettings);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('brandSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setBrandSettings({ ...defaultBrandSettings, ...parsed });
      } catch (error) {
        console.error('Error loading saved brand settings:', error);
      }
    }
  }, []);

  // Apply CSS variables when brand settings change
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--brand-primary', brandSettings.primaryColor);
    root.style.setProperty('--brand-secondary', brandSettings.secondaryColor);
    root.style.setProperty('--brand-accent', brandSettings.accentColor);
    root.style.setProperty('--brand-background', brandSettings.backgroundColor);
    root.style.setProperty('--brand-text', brandSettings.textColor);
    root.style.setProperty('--brand-font-family', `'${brandSettings.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`);
    
    // Apply font family to body
    document.body.style.fontFamily = `'${brandSettings.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    
  }, [brandSettings]);

  const updateBrandSettings = (newSettings: Partial<BrandSettings>) => {
    const updatedSettings = { ...brandSettings, ...newSettings };
    setBrandSettings(updatedSettings);
    
    // Save to localStorage
    localStorage.setItem('brandSettings', JSON.stringify(updatedSettings));
  };

  const resetBrandSettings = () => {
    setBrandSettings(defaultBrandSettings);
    localStorage.setItem('brandSettings', JSON.stringify(defaultBrandSettings));
  };

  return (
    <ThemeContext.Provider value={{ brandSettings, updateBrandSettings, resetBrandSettings }}>
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
