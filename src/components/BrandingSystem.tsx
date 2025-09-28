'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Eye, 
  Download, 
  Upload,
  CheckCircle,
  AlertCircle,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface BrandingSystemProps {
  coachId: string;
}

interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
}

interface BrandSettings {
  id: string;
  coachId: string;
  colors: BrandColors;
  logo?: string;
  favicon?: string;
  appName: string;
  tagline?: string;
  customCss?: string;
  createdAt: string;
  updatedAt: string;
}

const defaultColors: BrandColors = {
  primary: '#3B82F6', // blue-500
  secondary: '#8B5CF6', // violet-500
  accent: '#F59E0B', // amber-500
  background: '#FFFFFF', // white
  surface: '#F9FAFB', // gray-50
  text: '#111827', // gray-900
  textSecondary: '#6B7280', // gray-500
  success: '#10B981', // emerald-500
  warning: '#F59E0B', // amber-500
  error: '#EF4444', // red-500
};

const predefinedThemes = [
  {
    name: 'Ocean Blue',
    colors: {
      primary: '#0EA5E9', // sky-500
      secondary: '#3B82F6', // blue-500
      accent: '#06B6D4', // cyan-500
      background: '#FFFFFF',
      surface: '#F0F9FF', // sky-50
      text: '#0F172A', // slate-900
      textSecondary: '#64748B', // slate-500
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }
  },
  {
    name: 'Forest Green',
    colors: {
      primary: '#059669', // emerald-600
      secondary: '#10B981', // emerald-500
      accent: '#84CC16', // lime-500
      background: '#FFFFFF',
      surface: '#ECFDF5', // emerald-50
      text: '#064E3B', // emerald-900
      textSecondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }
  },
  {
    name: 'Sunset Orange',
    colors: {
      primary: '#EA580C', // orange-600
      secondary: '#F97316', // orange-500
      accent: '#F59E0B', // amber-500
      background: '#FFFFFF',
      surface: '#FFF7ED', // orange-50
      text: '#9A3412', // orange-900
      textSecondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }
  },
  {
    name: 'Royal Purple',
    colors: {
      primary: '#7C3AED', // violet-600
      secondary: '#8B5CF6', // violet-500
      accent: '#A855F7', // purple-500
      background: '#FFFFFF',
      surface: '#F5F3FF', // violet-50
      text: '#4C1D95', // violet-900
      textSecondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }
  },
  {
    name: 'Midnight Dark',
    colors: {
      primary: '#6366F1', // indigo-500
      secondary: '#8B5CF6', // violet-500
      accent: '#EC4899', // pink-500
      background: '#0F172A', // slate-900
      surface: '#1E293B', // slate-800
      text: '#F8FAFC', // slate-50
      textSecondary: '#94A3B8', // slate-400
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }
  }
];

export default function BrandingSystem({ coachId }: BrandingSystemProps) {
  const [brandSettings, setBrandSettings] = useState<BrandSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Form state
  const [formData, setFormData] = useState({
    appName: 'Fitness CRM',
    tagline: 'Transform Your Fitness Journey',
    colors: { ...defaultColors },
    logo: null as File | null,
    favicon: null as File | null,
    customCss: '',
  });

  // Fetch brand settings
  const fetchBrandSettings = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      const mockSettings: BrandSettings = {
        id: '1',
        coachId,
        colors: defaultColors,
        appName: 'Fitness CRM',
        tagline: 'Transform Your Fitness Journey',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setBrandSettings(mockSettings);
      setFormData({
        appName: mockSettings.appName,
        tagline: mockSettings.tagline || '',
        colors: mockSettings.colors,
        logo: null,
        favicon: null,
        customCss: mockSettings.customCss || '',
      });
    } catch (err) {
      setError('Failed to load brand settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandSettings();
  }, [coachId]);

  // Apply theme
  const applyTheme = (theme: typeof predefinedThemes[0]) => {
    setFormData(prev => ({
      ...prev,
      colors: theme.colors,
    }));
  };

  // Update color
  const updateColor = (colorKey: keyof BrandColors, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  };

  // Generate CSS variables
  const generateCSS = () => {
    const { colors } = formData;
    return `
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-surface: ${colors.surface};
  --color-text: ${colors.text};
  --color-text-secondary: ${colors.textSecondary};
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-error: ${colors.error};
}

.bg-primary { background-color: var(--color-primary) !important; }
.bg-secondary { background-color: var(--color-secondary) !important; }
.bg-accent { background-color: var(--color-accent) !important; }
.bg-surface { background-color: var(--color-surface) !important; }
.text-primary { color: var(--color-text) !important; }
.text-secondary { color: var(--color-text-secondary) !important; }
.border-primary { border-color: var(--color-primary) !important; }
`;
  };

  // Save brand settings
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real app, this would be an API call
      const updatedSettings: BrandSettings = {
        id: brandSettings?.id || Date.now().toString(),
        coachId,
        colors: formData.colors,
        appName: formData.appName,
        tagline: formData.tagline,
        customCss: formData.customCss,
        createdAt: brandSettings?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Saving brand settings:', updatedSettings);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBrandSettings(updatedSettings);
      setSuccess('Brand settings saved successfully!');
      
      // Apply CSS to the page
      const css = generateCSS();
      const styleElement = document.getElementById('brand-css');
      if (styleElement) {
        styleElement.textContent = css;
      } else {
        const newStyleElement = document.createElement('style');
        newStyleElement.id = 'brand-css';
        newStyleElement.textContent = css;
        document.head.appendChild(newStyleElement);
      }
    } catch (err) {
      setError('Failed to save brand settings');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = () => {
    setFormData(prev => ({
      ...prev,
      colors: { ...defaultColors },
      appName: 'Fitness CRM',
      tagline: 'Transform Your Fitness Journey',
      customCss: '',
    }));
  };

  // Export settings
  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'brand-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import settings
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string);
          setFormData(prev => ({
            ...prev,
            ...importedData,
          }));
        } catch (err) {
          setError('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Branding & Customization</h2>
          <p className="text-gray-600">Customize your app's appearance and branding</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <label className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Settings Form */}
        <div className="space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* App Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App Name
                  </label>
                  <input
                    type="text"
                    value={formData.appName}
                    onChange={(e) => setFormData(prev => ({ ...prev, appName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Predefined Themes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Themes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {predefinedThemes.map((theme, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyTheme(theme)}
                    className="p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Customization */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Customization</h3>
              <div className="space-y-4">
                {Object.entries(formData.colors).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <label className="w-24 text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => updateColor(key as keyof BrandColors, e.target.value)}
                      className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateColor(key as keyof BrandColors, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom CSS */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom CSS</h3>
              <textarea
                value={formData.customCss}
                onChange={(e) => setFormData(prev => ({ ...prev, customCss: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                rows={8}
                placeholder="/* Add your custom CSS here */"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Brand Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className={`border border-gray-300 rounded-lg overflow-hidden ${
              previewMode === 'desktop' ? 'w-full' : 
              previewMode === 'tablet' ? 'w-96 mx-auto' : 
              'w-80 mx-auto'
            }`}>
              {/* Preview Header */}
              <div 
                className="p-4 text-white"
                style={{ backgroundColor: formData.colors.primary }}
              >
                <h4 className="font-bold text-lg">{formData.appName}</h4>
                {formData.tagline && (
                  <p className="text-sm opacity-90">{formData.tagline}</p>
                )}
              </div>

              {/* Preview Content */}
              <div 
                className="p-4"
                style={{ backgroundColor: formData.colors.background }}
              >
                <div className="space-y-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: formData.colors.surface }}
                  >
                    <div 
                      className="font-medium mb-1"
                      style={{ color: formData.colors.text }}
                    >
                      Dashboard Card
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: formData.colors.textSecondary }}
                    >
                      Sample content with your brand colors
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 text-white text-sm rounded"
                      style={{ backgroundColor: formData.colors.primary }}
                    >
                      Primary
                    </button>
                    <button 
                      className="px-3 py-1 text-white text-sm rounded"
                      style={{ backgroundColor: formData.colors.secondary }}
                    >
                      Secondary
                    </button>
                    <button 
                      className="px-3 py-1 text-white text-sm rounded"
                      style={{ backgroundColor: formData.colors.accent }}
                    >
                      Accent
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: formData.colors.success }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: formData.colors.warning }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: formData.colors.error }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated CSS</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <code>{generateCSS()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
