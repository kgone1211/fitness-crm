'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  RotateCcw, 
  Eye,
  Save,
  Download,
  Upload
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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

interface ColorCustomizationProps {
  onColorChange?: (colors: ColorScheme) => void;
}

// Removed unused defaultColors variable

const predefinedThemes = [
  {
    name: 'Default Blue',
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#111827',
      textSecondary: '#6B7280'
    }
  },
  {
    name: 'Fitness Green',
    colors: {
      primary: '#059669',
      secondary: '#6B7280',
      accent: '#0D9488',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#064E3B',
      textSecondary: '#6B7280'
    }
  },
  {
    name: 'Energy Orange',
    colors: {
      primary: '#EA580C',
      secondary: '#6B7280',
      accent: '#F97316',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      background: '#FFF7ED',
      surface: '#FFFFFF',
      text: '#9A3412',
      textSecondary: '#6B7280'
    }
  },
  {
    name: 'Royal Purple',
    colors: {
      primary: '#7C3AED',
      secondary: '#6B7280',
      accent: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      background: '#FAF5FF',
      surface: '#FFFFFF',
      text: '#581C87',
      textSecondary: '#6B7280'
    }
  },
  {
    name: 'Dark Mode',
    colors: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      accent: '#A78BFA',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB'
    }
  }
];

// Utility functions for color handling
const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const rgbaToHex = (rgba: string): string => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return rgba;
  
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] ? parseFloat(match[4]) : 1;
  
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const isValidColor = (color: string): boolean => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbaPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/;
  const hslaPattern = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/;
  
  return hexPattern.test(color) || rgbaPattern.test(color) || hslaPattern.test(color);
};

// Removed unused formatColorForDisplay function

export default function ColorCustomization({ onColorChange }: ColorCustomizationProps) {
  const { colors, setColors, resetColors } = useTheme();
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgba'>('hex');
  const [showCustomColors, setShowCustomColors] = useState(false);

  useEffect(() => {
    if (onColorChange) {
      onColorChange(colors);
    }
  }, [colors, onColorChange]);

  const handleColorChange = (colorKey: keyof ColorScheme, value: string) => {
    setColors({
      ...colors,
      [colorKey]: value
    });
  };

  const applyTheme = (theme: typeof predefinedThemes[0]) => {
    setColors(theme.colors);
  };

  const resetToDefault = () => {
    resetColors();
  };

  const saveColors = async () => {
    setIsSaving(true);
    try {
      // Colors are already saved via the context, just show success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving colors:', error);
      setIsSaving(false);
    }
  };

  const exportColors = () => {
    const dataStr = JSON.stringify(colors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitness-crm-colors.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importColors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedColors = JSON.parse(e.target?.result as string);
          setColors(importedColors);
        } catch (error) {
          alert('Error importing colors. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const ColorInput = ({ 
    label, 
    colorKey, 
    description,
    showAlpha = false
  }: { 
    label: string; 
    colorKey: keyof ColorScheme; 
    description?: string;
    showAlpha?: boolean;
  }) => {
    const [inputValue, setInputValue] = useState(colors[colorKey] || '');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      setInputValue(colors[colorKey] || '');
    }, [colors, colorKey]);

    const handleInputChange = (value: string) => {
      setInputValue(value);
      const valid = isValidColor(value);
      setIsValid(valid);
      
      if (valid) {
        handleColorChange(colorKey, value);
      }
    };

    const getColorForPicker = (color: string): string => {
      if (color.startsWith('#')) return color;
      if (color.startsWith('rgba') || color.startsWith('rgb')) {
        return rgbaToHex(color);
      }
      return '#000000';
    };

    const getDisplayValue = (color: string): string => {
      if (colorFormat === 'hex' && color.startsWith('rgba')) {
        return rgbaToHex(color);
      }
      if (colorFormat === 'rgba' && color.startsWith('#')) {
        return hexToRgba(color, 1);
      }
      return color;
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={getColorForPicker(colors[colorKey] || '#000000')}
            onChange={(e) => {
              const newColor = colorFormat === 'rgba' ? hexToRgba(e.target.value, 1) : e.target.value;
              handleColorChange(colorKey, newColor);
              setInputValue(newColor);
            }}
            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={getDisplayValue(inputValue)}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
              }`}
              placeholder={colorFormat === 'hex' ? '#000000' : 'rgba(0, 0, 0, 1)'}
            />
            {!isValid && (
              <p className="text-xs text-red-500 mt-1">Invalid color format</p>
            )}
          </div>
          {showAlpha && colorFormat === 'rgba' && (
            <div className="w-20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={(() => {
                  const match = colors[colorKey]?.match(/rgba?\([^,]+,\s*[^,]+,\s*[^,]+,\s*([\d.]+)\)/);
                  return match ? parseFloat(match[1]) : 1;
                })()}
                onChange={(e) => {
                  const alpha = parseFloat(e.target.value);
                  const baseColor = colors[colorKey]?.replace(/rgba?\([^)]+\)/, '') || '#000000';
                  const newColor = baseColor.startsWith('#') 
                    ? hexToRgba(baseColor, alpha)
                    : baseColor.replace(/,\s*[\d.]+\)$/, `, ${alpha})`);
                  handleColorChange(colorKey, newColor);
                  setInputValue(newColor);
                }}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center mt-1">
                {(() => {
                  const match = colors[colorKey]?.match(/rgba?\([^,]+,\s*[^,]+,\s*[^,]+,\s*([\d.]+)\)/);
                  return match ? Math.round(parseFloat(match[1]) * 100) : 100;
                })()}%
              </div>
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Palette className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Color Customization</h3>
            <p className="text-sm text-gray-600">Customize the app's color scheme to match your brand</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
          <button
            onClick={resetToDefault}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Format Toggle and Custom Colors */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Color Format:</label>
            <select
              value={colorFormat}
              onChange={(e) => setColorFormat(e.target.value as 'hex' | 'rgba')}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hex">HEX</option>
              <option value="rgba">RGBA</option>
            </select>
          </div>
          <button
            onClick={() => setShowCustomColors(!showCustomColors)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Palette className="h-4 w-4" />
            <span>{showCustomColors ? 'Hide' : 'Show'} Custom Colors</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {colorFormat === 'hex' 
            ? 'Use hex format like #FF0000' 
            : 'Use RGBA format like rgba(255, 0, 0, 0.8)'
          }
        </div>
      </div>

      {/* Predefined Themes */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Quick Themes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predefinedThemes.map((theme, index) => (
            <button
              key={index}
              onClick={() => applyTheme(theme)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.success }}
                  />
                </div>
                <span className="font-medium text-gray-900">{theme.name}</span>
              </div>
              <p className="text-sm text-gray-600">
                {theme.name === 'Dark Mode' ? 'Dark theme with blue accents' : 
                 theme.name === 'Fitness Green' ? 'Green theme perfect for fitness' :
                 theme.name === 'Energy Orange' ? 'Energetic orange theme' :
                 theme.name === 'Royal Purple' ? 'Elegant purple theme' :
                 'Classic blue theme'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Color Customization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Primary Colors */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Primary Colors</h4>
          <div className="space-y-4">
            <ColorInput
              label="Primary Color"
              colorKey="primary"
              description="Main brand color used for buttons and highlights"
            />
            <ColorInput
              label="Secondary Color"
              colorKey="secondary"
              description="Secondary color for less prominent elements"
            />
            <ColorInput
              label="Accent Color"
              colorKey="accent"
              description="Accent color for special highlights and call-to-actions"
            />
          </div>
        </div>

        {/* Status Colors */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Status Colors</h4>
          <div className="space-y-4">
            <ColorInput
              label="Success Color"
              colorKey="success"
              description="Color for success messages and positive indicators"
            />
            <ColorInput
              label="Warning Color"
              colorKey="warning"
              description="Color for warnings and caution messages"
            />
            <ColorInput
              label="Error Color"
              colorKey="error"
              description="Color for errors and negative indicators"
            />
          </div>
        </div>

        {/* Background Colors */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Background Colors</h4>
          <div className="space-y-4">
            <ColorInput
              label="Background Color"
              colorKey="background"
              description="Main background color of the application"
            />
            <ColorInput
              label="Surface Color"
              colorKey="surface"
              description="Color for cards, modals, and elevated surfaces"
            />
          </div>
        </div>

        {/* Text Colors */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Text Colors</h4>
          <div className="space-y-4">
            <ColorInput
              label="Primary Text"
              colorKey="text"
              description="Main text color for headings and important content"
            />
            <ColorInput
              label="Secondary Text"
              colorKey="textSecondary"
              description="Secondary text color for descriptions and labels"
            />
          </div>
        </div>
      </div>

      {/* Custom Colors Section */}
      {showCustomColors && (
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Custom Colors</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ColorInput
              label="Custom Color 1"
              colorKey="custom1"
              description="Your first custom color for special elements"
              showAlpha={true}
            />
            <ColorInput
              label="Custom Color 2"
              colorKey="custom2"
              description="Your second custom color for special elements"
              showAlpha={true}
            />
            <ColorInput
              label="Custom Color 3"
              colorKey="custom3"
              description="Your third custom color for special elements"
              showAlpha={true}
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Custom Color Usage</h5>
            <p className="text-sm text-blue-700">
              Custom colors can be used throughout the app for special highlights, 
              custom themes, or brand-specific elements. These colors support full 
              RGBA transparency for advanced styling options.
            </p>
          </div>
        </div>
      )}

      {/* Preview */}
      {showPreview && (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Live Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.primary + '20',
                color: colors.text
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: colors.primary }}>Sample Card</h5>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                This is how your cards will look with the new colors.
              </p>
              <button
                className="px-3 py-1 rounded text-sm font-medium"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.surface
                }}
              >
                Primary Button
              </button>
            </div>
            
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.success + '20',
                color: colors.text
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: colors.success }}>Success State</h5>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Success messages and positive indicators.
              </p>
              <div className="flex space-x-2">
                <span 
                  className="px-2 py-1 rounded text-xs"
                  style={{ 
                    backgroundColor: colors.success + '20',
                    color: colors.success
                  }}
                >
                  Active
                </span>
                <span 
                  className="px-2 py-1 rounded text-xs"
                  style={{ 
                    backgroundColor: colors.warning + '20',
                    color: colors.warning
                  }}
                >
                  Pending
                </span>
              </div>
            </div>
            
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.accent + '20',
                color: colors.text
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: colors.accent }}>Accent Elements</h5>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Special highlights and call-to-actions.
              </p>
              <div className="w-full h-2 rounded" style={{ backgroundColor: colors.accent + '30' }}>
                <div className="h-full rounded" style={{ backgroundColor: colors.accent, width: '60%' }}></div>
              </div>
            </div>

            {/* Custom Colors Preview */}
            {showCustomColors && (
              <>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.custom1 + '20',
                    color: colors.text
                  }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: colors.custom1 }}>Custom Color 1</h5>
                  <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                    Your first custom color with RGBA support.
                  </p>
                  <div 
                    className="px-3 py-1 rounded text-sm font-medium inline-block"
                    style={{ 
                      backgroundColor: colors.custom1,
                      color: colors.surface
                    }}
                  >
                    Custom Button
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.custom2 + '20',
                    color: colors.text
                  }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: colors.custom2 }}>Custom Color 2</h5>
                  <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                    Your second custom color with transparency.
                  </p>
                  <div className="flex space-x-2">
                    <span 
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: colors.custom2 + '30',
                        color: colors.custom2
                      }}
                    >
                      Custom Tag
                    </span>
                    <span 
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: colors.custom3 + '30',
                        color: colors.custom3
                      }}
                    >
                      Another Tag
                    </span>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.custom3 + '20',
                    color: colors.text
                  }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: colors.custom3 }}>Custom Color 3</h5>
                  <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                    Your third custom color for special elements.
                  </p>
                  <div className="w-full h-2 rounded" style={{ backgroundColor: colors.custom3 + '20' }}>
                    <div className="h-full rounded" style={{ backgroundColor: colors.custom3, width: '75%' }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={exportColors}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Colors</span>
          </button>
          <label className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Import Colors</span>
            <input
              type="file"
              accept=".json"
              onChange={importColors}
              className="hidden"
            />
          </label>
        </div>
        
        <button
          onClick={saveColors}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Colors</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
