'use client';

import Layout from '@/components/Layout';
import { Palette, Save, RefreshCw, Eye, Download, Upload, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function BrandingPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { brandSettings, updateBrandSettings, resetBrandSettings } = useTheme();

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Saving branding settings:', brandSettings);
    
    // The theme context automatically saves to localStorage and applies changes
    setIsSaving(false);
  };

  const handleReset = () => {
    resetBrandSettings();
  };

  const handleColorChange = (colorType: string, value: string) => {
    updateBrandSettings({ [colorType]: value });
  };

  const handleTextChange = (field: string, value: string) => {
    updateBrandSettings({ [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateBrandSettings({ logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyColorPreset = (preset: { primary: string; secondary: string; accent: string }) => {
    updateBrandSettings({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    });
  };

  const exportColorPalette = () => {
    const colorData = {
      primary: brandSettings.primaryColor,
      secondary: brandSettings.secondaryColor,
      accent: brandSettings.accentColor,
      background: brandSettings.backgroundColor,
      text: brandSettings.textColor
    };

    const jsonContent = JSON.stringify(colorData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandSettings.companyName.toLowerCase().replace(/\s+/g, '-')}-color-palette.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportBrandGuidelines = () => {
    const guidelines = `
# ${brandSettings.companyName} - Brand Guidelines

## Brand Identity
- **Company Name:** ${brandSettings.companyName}
- **Tagline:** ${brandSettings.tagline}
- **Font Family:** ${brandSettings.fontFamily}

## Color Palette

### Primary Colors
- **Primary:** ${brandSettings.primaryColor}
- **Secondary:** ${brandSettings.secondaryColor}
- **Accent:** ${brandSettings.accentColor}

### Supporting Colors
- **Background:** ${brandSettings.backgroundColor}
- **Text:** ${brandSettings.textColor}

## Usage Guidelines

### Primary Color (${brandSettings.primaryColor})
- Use for main call-to-action buttons
- Headers and navigation elements
- Primary brand elements

### Secondary Color (${brandSettings.secondaryColor})
- Use for secondary buttons and links
- Border and accent elements
- Supporting UI components

### Accent Color (${brandSettings.accentColor})
- Use for highlights and notifications
- Special call-to-action elements
- Interactive states

### Typography
- **Font Family:** ${brandSettings.fontFamily}
- Use consistently across all brand materials
- Maintain proper contrast ratios

## Logo Usage
- Upload your logo file for best results
- Maintain proper spacing around logo
- Use high-resolution versions for print materials

## Best Practices
1. Maintain consistent color usage across all materials
2. Ensure proper contrast for accessibility
3. Use the primary color for main actions
4. Keep secondary and accent colors for supporting elements
5. Maintain consistent typography throughout

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([guidelines], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandSettings.companyName.toLowerCase().replace(/\s+/g, '-')}-brand-guidelines.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportCSSVariables = () => {
    const cssVariables = `
:root {
  /* Brand Colors */
  --brand-primary: ${brandSettings.primaryColor};
  --brand-secondary: ${brandSettings.secondaryColor};
  --brand-accent: ${brandSettings.accentColor};
  --brand-background: ${brandSettings.backgroundColor};
  --brand-text: ${brandSettings.textColor};
  
  /* Typography */
  --font-family: '${brandSettings.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Usage Examples */
  /* 
  .primary-button {
    background-color: var(--brand-primary);
    color: white;
  }
  
  .secondary-button {
    background-color: var(--brand-secondary);
    color: white;
  }
  
  .accent-button {
    background-color: var(--brand-accent);
    color: white;
  }
  
  .text-primary {
    color: var(--brand-text);
  }
  
  .bg-primary {
    background-color: var(--brand-background);
  }
  
  body {
    font-family: var(--font-family);
    color: var(--brand-text);
    background-color: var(--brand-background);
  }
  */
}

/* Generated CSS Variables for ${brandSettings.companyName} */
/* Generated on: ${new Date().toLocaleDateString()} */
    `.trim();

    const blob = new Blob([cssVariables], { type: 'text/css' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandSettings.companyName.toLowerCase().replace(/\s+/g, '-')}-css-variables.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const colorPresets = [
    { name: 'Blue Theme', primary: '#3B82F6', secondary: '#1E40AF', accent: '#F59E0B' },
    { name: 'Green Theme', primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
    { name: 'Purple Theme', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#F59E0B' },
    { name: 'Red Theme', primary: '#EF4444', secondary: '#DC2626', accent: '#F59E0B' },
    { name: 'Orange Theme', primary: '#F97316', secondary: '#EA580C', accent: '#3B82F6' }
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Montserrat',
    'Lato',
    'Source Sans Pro',
    'Nunito'
  ];

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branding & Customization</h1>
            <p className="text-gray-600">Customize your fitness app's appearance and branding</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button 
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg transition-colors ${
                isSaving 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-opacity-90'
              }`}
            >
              <Save className={`h-4 w-4 mr-2 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branding Settings */}
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2 text-brand-primary" />
                Company Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={brandSettings.companyName}
                    onChange={(e) => handleTextChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={brandSettings.tagline}
                    onChange={(e) => handleTextChange('tagline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Enter your tagline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Upload
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </label>
                    {brandSettings.logo && (
                      <div className="w-12 h-12 border border-gray-300 rounded-lg overflow-hidden">
                        <img src={brandSettings.logo} alt="Logo preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
              
              {/* Color Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quick Presets
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyColorPreset(preset)}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex space-x-1 mr-3">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300" 
                          style={{ backgroundColor: preset.primary }}
                        ></div>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300" 
                          style={{ backgroundColor: preset.secondary }}
                        ></div>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300" 
                          style={{ backgroundColor: preset.accent }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandSettings.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandSettings.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandSettings.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={brandSettings.fontFamily}
                  onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            {showPreview && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                <div 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  style={{ 
                    backgroundColor: brandSettings.backgroundColor,
                    fontFamily: brandSettings.fontFamily
                  }}
                >
                  {/* Preview Header */}
                  <div 
                    className="px-6 py-4 border-b"
                    style={{ backgroundColor: brandSettings.primaryColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {brandSettings.logo && (
                          <img 
                            src={brandSettings.logo} 
                            alt="Logo" 
                            className="w-8 h-8 rounded"
                          />
                        )}
                        <div>
                          <h2 
                            className="text-lg font-bold"
                            style={{ color: 'white' }}
                          >
                            {brandSettings.companyName}
                          </h2>
                          <p 
                            className="text-sm opacity-90"
                            style={{ color: 'white' }}
                          >
                            {brandSettings.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 
                          className="text-lg font-semibold mb-2"
                          style={{ color: brandSettings.textColor }}
                        >
                          Welcome to Your Dashboard
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: brandSettings.textColor }}
                        >
                          This is how your app will look with your custom branding.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: brandSettings.primaryColor + '10' }}
                        >
                          <div 
                            className="text-sm font-medium mb-1"
                            style={{ color: brandSettings.primaryColor }}
                          >
                            Primary Color
                          </div>
                          <div 
                            className="text-xs"
                            style={{ color: brandSettings.textColor }}
                          >
                            Used for buttons and highlights
                          </div>
                        </div>
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: brandSettings.secondaryColor + '10' }}
                        >
                          <div 
                            className="text-sm font-medium mb-1"
                            style={{ color: brandSettings.secondaryColor }}
                          >
                            Secondary Color
                          </div>
                          <div 
                            className="text-xs"
                            style={{ color: brandSettings.textColor }}
                          >
                            Used for accents and borders
                          </div>
                        </div>
                      </div>

                      <button 
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: brandSettings.accentColor }}
                      >
                        Sample Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Guidelines */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Guidelines</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Color Consistency</p>
                    <p className="text-sm text-gray-600">Use your primary color for main actions and highlights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Logo Placement</p>
                    <p className="text-sm text-gray-600">Upload a high-resolution logo for best results</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Check className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Typography</p>
                    <p className="text-sm text-gray-600">Choose fonts that match your brand personality</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Check className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Preview Changes</p>
                    <p className="text-sm text-gray-600">Use the preview to see how changes look before saving</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Brand Kit</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => exportColorPalette()}
                  className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Color Palette
                </button>
                <button 
                  onClick={() => exportBrandGuidelines()}
                  className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Brand Guidelines
                </button>
                <button 
                  onClick={() => exportCSSVariables()}
                  className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSS Variables
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const dynamic = 'force-dynamic';
