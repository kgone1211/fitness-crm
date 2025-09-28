'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Moon, 
  Droplets, 
  Camera, 
  Scale, 
  MessageSquare, 
  Save, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface CheckInSystemProps {
  clientId: string;
  clientName: string;
  isCoach?: boolean;
}

interface CheckInData {
  id: string;
  clientId: string;
  date: string;
  mood: number; // 1-5 scale
  energy: number; // 1-5 scale
  sleep: number; // hours
  water: number; // glasses
  weight?: number; // lbs
  notes?: string;
  photos?: string[];
  completed: boolean;
  createdAt: string;
}

export default function CheckInSystem({ clientId, clientName, isCoach = false }: CheckInSystemProps) {
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    mood: 3,
    energy: 3,
    sleep: 8,
    water: 8,
    weight: '',
    notes: '',
    photos: [] as File[],
  });

  // Fetch today's check-in data
  const fetchCheckInData = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      // In a real app, this would be an API call
      const mockData: CheckInData = {
        id: '1',
        clientId,
        date: today,
        mood: 4,
        energy: 3,
        sleep: 7.5,
        water: 6,
        weight: 180,
        notes: 'Feeling good today, had a great workout!',
        photos: [],
        completed: true,
        createdAt: new Date().toISOString(),
      };

      setCheckInData(mockData);
      
      // If there's existing data, populate the form
      if (mockData.completed) {
        setFormData({
          mood: mockData.mood,
          energy: mockData.energy,
          sleep: mockData.sleep,
          water: mockData.water,
          weight: mockData.weight?.toString() || '',
          notes: mockData.notes || '',
          photos: [],
        });
      }
    } catch (err) {
      setError('Failed to load check-in data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckInData();
  }, [clientId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real app, this would be an API call
      const checkInPayload = {
        clientId,
        date: new Date().toISOString().split('T')[0],
        mood: formData.mood,
        energy: formData.energy,
        sleep: formData.sleep,
        water: formData.water,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        notes: formData.notes,
        photos: formData.photos,
      };

      console.log('Submitting check-in:', checkInPayload);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Check-in saved successfully!');
      
      // Update local state
      const newCheckIn: CheckInData = {
        id: Date.now().toString(),
        clientId,
        date: new Date().toISOString().split('T')[0],
        mood: formData.mood,
        energy: formData.energy,
        sleep: formData.sleep,
        water: formData.water,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        notes: formData.notes,
        photos: [],
        completed: true,
        createdAt: new Date().toISOString(),
      };

      setCheckInData(newCheckIn);
    } catch (err) {
      setError('Failed to save check-in');
    } finally {
      setSaving(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  // Remove photo
  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Get mood emoji
  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1: return '😞';
      case 2: return '😐';
      case 3: return '😊';
      case 4: return '😄';
      case 5: return '🤩';
      default: return '😊';
    }
  };

  // Get energy emoji
  const getEnergyEmoji = (energy: number) => {
    switch (energy) {
      case 1: return '😴';
      case 2: return '😑';
      case 3: return '😌';
      case 4: return '😃';
      case 5: return '⚡';
      default: return '😌';
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
          <h2 className="text-2xl font-bold text-gray-900">Daily Check-In</h2>
          <p className="text-gray-600">
            {isCoach ? `Viewing check-in for ${clientName}` : 'How are you feeling today?'}
          </p>
        </div>
        {checkInData?.completed && (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Completed</span>
          </div>
        )}
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

      {/* Check-In Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Mood */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Heart className="h-4 w-4 inline mr-2" />
              How's your mood today?
            </label>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mood"
                    value={value}
                    checked={formData.mood === value}
                    onChange={(e) => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                    className="sr-only"
                    disabled={isCoach}
                  />
                  <div className={`text-4xl mb-2 transition-all ${
                    formData.mood === value ? 'scale-110' : 'opacity-50 hover:opacity-75'
                  }`}>
                    {getMoodEmoji(value)}
                  </div>
                  <span className="text-xs text-gray-600">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Energy level?
            </label>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="energy"
                    value={value}
                    checked={formData.energy === value}
                    onChange={(e) => setFormData(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                    className="sr-only"
                    disabled={isCoach}
                  />
                  <div className={`text-4xl mb-2 transition-all ${
                    formData.energy === value ? 'scale-110' : 'opacity-50 hover:opacity-75'
                  }`}>
                    {getEnergyEmoji(value)}
                  </div>
                  <span className="text-xs text-gray-600">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sleep */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Moon className="h-4 w-4 inline mr-2" />
              How many hours did you sleep last night?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={formData.sleep}
                onChange={(e) => setFormData(prev => ({ ...prev, sleep: parseFloat(e.target.value) }))}
                className="flex-1"
                disabled={isCoach}
              />
              <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                {formData.sleep}h
              </span>
            </div>
          </div>

          {/* Water Intake */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="h-4 w-4 inline mr-2" />
              How many glasses of water have you had today?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="20"
                value={formData.water}
                onChange={(e) => setFormData(prev => ({ ...prev, water: parseInt(e.target.value) }))}
                className="flex-1"
                disabled={isCoach}
              />
              <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                {formData.water}
              </span>
            </div>
          </div>

          {/* Weight (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Scale className="h-4 w-4 inline mr-2" />
              Today's weight (optional)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="180"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32"
                disabled={isCoach}
              />
              <span className="text-gray-600">lbs</span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Any notes or comments?
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="How are you feeling? Any challenges or wins today?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              disabled={isCoach}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="h-4 w-4 inline mr-2" />
              Progress photos (optional)
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCoach}
              />
              
              {/* Display uploaded photos */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Progress photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      {!isCoach && (
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {!isCoach && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Check-In
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Coach View - Additional Analytics */}
      {isCoach && checkInData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{checkInData.mood}/5</div>
              <div className="text-sm text-gray-600">Average Mood</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{checkInData.sleep}h</div>
              <div className="text-sm text-gray-600">Sleep Duration</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{checkInData.water}</div>
              <div className="text-sm text-gray-600">Water Glasses</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
