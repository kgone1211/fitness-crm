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

interface ColorCustomizationProps {
  onColorChange?: (colors: any) => void;
}

const predefinedThemes = [
  {
    name: 'Default Blue',
    colors: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#F59E0B',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      companyName: 'FitCoach Pro',
      tagline: 'Transform Your Fitness Journey',
      fontFamily: 'Inter'
    }
  },
  {
    name: 'Fitness Green',
    colors: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#0D9488',
      backgroundColor: '#FFFFFF',
      textColor: '#064E3B',
      companyName: 'FitCoach Pro',
      tagline: 'Transform Your Fitness Journey',
      fontFamily: 'Inter'
    }
  },
  {
    name: 'Energy Orange',
    colors: {
      primaryColor: '#EA580C',
      secondaryColor: '#C2410C',
      accentColor: '#F97316',
      backgroundColor: '#FFFFFF',
      textColor: '#9A3412',
      companyName: 'FitCoach Pro',
      tagline: 'Transform Your Fitness Journey',
      fontFamily: 'Inter'
    }
  },
  {
    name: 'Royal Purple',
    colors: {
      primaryColor: '#7C3AED',
      secondaryColor: '#5B21B6',
      accentColor: '#8B5CF6',
      backgroundColor: '#FFFFFF',
      textColor: '#581C87',
      companyName: 'FitCoach Pro',
      tagline: 'Transform Your Fitness Journey',
      fontFamily: 'Inter'
    }
  },
  {
    name: 'Dark Mode',
    colors: {
      primaryColor: '#60A5FA',
      secondaryColor: '#3B82F6',
      accentColor: '#A78BFA',
      backgroundColor: '#111827',
      textColor: '#F9FAFB',
      companyName: 'FitCoach Pro',
      tagline: 'Transform Your Fitness Journey',
      fontFamily: 'Inter'
    }
  }
];

const isValidColor = (color: string): boolean => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbaPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/;
  const hslaPattern = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/;
  
  return hexPattern.test(color) || rgbaPattern.test(color) || hslaPattern.test(color);
};

export default function ColorCustomization({ onColorChange }: ColorCustomizationProps) {
  const { brandSettings, updateBrandSettings, resetBrandSettings } = useTheme();
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgba'>('hex');

  useEffect(() => {
    if (onColorChange) {
      onColorChange(brandSettings);
    }
  }, [brandSettings, onColorChange]);

  const handleColorChange = (colorKey: keyof typeof brandSettings, value: string) => {
    updateBrandSettings({
      [colorKey]: value
    });
  };

  const applyTheme = (theme: typeof predefinedThemes[0]) => {
    updateBrandSettings(theme.colors);
  };

  const resetToDefault = () => {
    resetBrandSettings();
  };

  const saveColors = async () => {
    setIsSaving(true);
    try {
      // Colors are already saved via the context, just show success
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Brand settings saved successfully!");
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving colors:', error);
      setIsSaving(false);
    }
  };

  const exportColors = () => {
    const dataStr = JSON.stringify(brandSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitness-crm-brand-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importColors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          updateBrandSettings(importedSettings);
        } catch (error) {
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const ColorInput = ({ 
    label, 
    colorKey, 
    description
  }: { 
    label: string; 
    colorKey: keyof typeof brandSettings; 
    description?: string;
  }) => {
    const [inputValue, setInputValue] = useState(brandSettings[colorKey] || '');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      setInputValue(brandSettings[colorKey] || '');
    }, [brandSettings, colorKey]);

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
        // Convert rgba/rgb to hex for color picker
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = color;
          return ctx.fillStyle;
        }
      }
      return '#000000';
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={getColorForPicker(brandSettings[colorKey] || '#000000')}
            onChange={(e) => {
              handleColorChange(colorKey, e.target.value);
              setInputValue(e.target.value);
            }}
            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
              }`}
              placeholder="#000000"
            />
            {!isValid && (
              <p className="text-xs text-red-500 mt-1">Invalid color format</p>
            )}
          </div>
        </div>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    );
  };

  const TextInput = ({ 
    label, 
    fieldKey, 
    description
  }: { 
    label: string; 
    fieldKey: keyof typeof brandSettings; 
    description?: string;
  }) => {
    const [inputValue, setInputValue] = useState(brandSettings[fieldKey] || '');

    useEffect(() => {
      setInputValue(brandSettings[fieldKey] || '');
    }, [brandSettings, fieldKey]);

    const handleInputChange = (value: string) => {
      setInputValue(value);
      updateBrandSettings({
        [fieldKey]: value
      });
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
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
            <h3 className="text-xl font-semibold text-gray-900">Brand Customization</h3>
            <p className="text-sm text-gray-600">Customize your app's branding and color scheme</p>
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
                    style={{ backgroundColor: theme.colors.primaryColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.secondaryColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.accentColor }}
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

      {/* Brand Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Brand Information</h4>
          <div className="space-y-4">
            <TextInput
              label="Company Name"
              fieldKey="companyName"
              description="Your company or brand name"
            />
            <TextInput
              label="Tagline"
              fieldKey="tagline"
              description="Your company tagline or motto"
            />
            <TextInput
              label="Font Family"
              fieldKey="fontFamily"
              description="Font family for your brand (e.g., Inter, Roboto, Arial)"
            />
          </div>
        </div>

        {/* Color Customization */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Colors</h4>
          <div className="space-y-4">
            <ColorInput
              label="Primary Color"
              colorKey="primaryColor"
              description="Main brand color used for buttons and highlights"
            />
            <ColorInput
              label="Secondary Color"
              colorKey="secondaryColor"
              description="Secondary color for less prominent elements"
            />
            <ColorInput
              label="Accent Color"
              colorKey="accentColor"
              description="Accent color for special highlights and call-to-actions"
            />
            <ColorInput
              label="Background Color"
              colorKey="backgroundColor"
              description="Main background color of the application"
            />
            <ColorInput
              label="Text Color"
              colorKey="textColor"
              description="Main text color for headings and important content"
            />
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-900">Logo</h4>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              {brandSettings.logo ? (
                <img 
                  src={brandSettings.logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <Palette className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <h5 className="text-lg font-medium text-gray-900">Upload Your Logo</h5>
              <p className="text-sm text-gray-600">Upload a logo to personalize your app</p>
            </div>
            <div className="flex justify-center space-x-3">
              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        updateBrandSettings({ logo: e.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                Choose File
              </label>
              {brandSettings.logo && (
                <button
                  onClick={() => updateBrandSettings({ logo: '' })}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Live Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: brandSettings.backgroundColor,
                borderColor: brandSettings.primaryColor + '20',
                color: brandSettings.textColor
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: brandSettings.primaryColor }}>Sample Card</h5>
              <p className="text-sm mb-3" style={{ color: brandSettings.textColor }}>
                This is how your cards will look with the new colors.
              </p>
              <button
                className="px-3 py-1 rounded text-sm font-medium"
                style={{ 
                  backgroundColor: brandSettings.primaryColor,
                  color: brandSettings.backgroundColor
                }}
              >
                Primary Button
              </button>
            </div>
            
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: brandSettings.backgroundColor,
                borderColor: brandSettings.secondaryColor + '20',
                color: brandSettings.textColor
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: brandSettings.secondaryColor }}>Secondary Elements</h5>
              <p className="text-sm mb-3" style={{ color: brandSettings.textColor }}>
                Secondary color elements and styling.
              </p>
              <div className="flex space-x-2">
                <span 
                  className="px-2 py-1 rounded text-xs"
                  style={{ 
                    backgroundColor: brandSettings.accentColor + '20',
                    color: brandSettings.accentColor
                  }}
                >
                  Accent
                </span>
                <span 
                  className="px-2 py-1 rounded text-xs"
                  style={{ 
                    backgroundColor: brandSettings.secondaryColor + '20',
                    color: brandSettings.secondaryColor
                  }}
                >
                  Secondary
                </span>
              </div>
            </div>
            
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: brandSettings.backgroundColor,
                borderColor: brandSettings.accentColor + '20',
                color: brandSettings.textColor
              }}
            >
              <h5 className="font-semibold mb-2" style={{ color: brandSettings.accentColor }}>Accent Elements</h5>
              <p className="text-sm mb-3" style={{ color: brandSettings.textColor }}>
                Special highlights and call-to-actions.
              </p>
              <div className="w-full h-2 rounded" style={{ backgroundColor: brandSettings.accentColor + '30' }}>
                <div className="h-full rounded" style={{ backgroundColor: brandSettings.accentColor, width: '60%' }}></div>
              </div>
            </div>
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
            <span>Export Settings</span>
          </button>
          <label className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Import Settings</span>
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
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
