'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Calendar, 
  Weight, 
  MapPin, 
  Target, 
  Mail, 
  Phone,
  Ruler,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ClientFormData } from '@/types';
import { db } from '@/lib/database';
import PageHeader from '@/components/PageHeader';

const GOAL_OPTIONS = [
  'weight_loss',
  'weight_gain', 
  'muscle_gain',
  'endurance',
  'strength',
  'flexibility',
  'general_fitness',
  'athletic_performance',
  'rehabilitation',
  'maintenance'
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

export default function AddClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: undefined,
    height: undefined,
    startingWeight: undefined,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    goals: [],
    notes: ''
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.height || formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Please enter a valid height (100-250 cm)';
    }

    if (!formData.startingWeight || formData.startingWeight < 66 || formData.startingWeight > 660) {
      newErrors.startingWeight = 'Please enter a valid starting weight (66-660 lbs)';
    }

    if (formData.goals.length === 0) {
      newErrors.goals = 'Please select at least one goal';
    }

    // Address validation
    if (formData.address) {
      if (!formData.address.street.trim()) {
        newErrors['address.street'] = 'Street address is required';
      }
      if (!formData.address.city.trim()) {
        newErrors['address.city'] = 'City is required';
      }
      if (!formData.address.state.trim()) {
        newErrors['address.state'] = 'State is required';
      }
      if (!formData.address.zipCode.trim()) {
        newErrors['address.zipCode'] = 'ZIP code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address!,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));

    if (errors.goals) {
      setErrors(prev => ({
        ...prev,
        goals: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the client in the database
      const newClient = db.createClient({
        userId: 'temp_user_id', // In a real app, this would come from authentication
        trainerId: '1', // In a real app, this would come from authentication
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
        gender: formData.gender,
        height: formData.height,
        startingWeight: formData.startingWeight,
        address: formData.address,
        goals: formData.goals,
        notes: formData.notes,
        isActive: true
      });

      // Create initial weight measurement if starting weight is provided
      if (formData.startingWeight) {
        db.createMeasurement({
          clientId: newClient.id,
          type: 'weight',
          value: formData.startingWeight,
          unit: 'lbs',
          date: new Date(),
          notes: 'Starting weight'
        });
      }

      // Redirect back to clients page
      router.push('/clients');
    } catch (error) {
      console.error('Error adding client:', error);
      // You could add error handling here, like showing a toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ 
    label, 
    field, 
    type = 'text', 
    placeholder, 
    icon: Icon, 
    required = false,
    min,
    max,
    step
  }: {
    label: string;
    field: string;
    type?: string;
    placeholder?: string;
    icon: React.ComponentType<any>;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          value={formData[field as keyof ClientFormData] as string || ''}
          onChange={(e) => handleInputChange(field, type === 'number' ? parseFloat(e.target.value) || undefined : e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>
      {errors[field] && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Add New Client"
        description="Create a new client profile with their information and goals"
        breadcrumbs={[
          { name: 'Clients', href: '/clients' },
          { name: 'Add Client' }
        ]}
        showBackButton={true}
        backHref="/clients"
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              field="name"
              placeholder="Enter client's full name"
              icon={User}
              required
            />

            <InputField
              label="Email Address"
              field="email"
              type="email"
              placeholder="client@example.com"
              icon={Mail}
              required
            />

            <InputField
              label="Phone Number"
              field="phone"
              type="tel"
              placeholder="(555) 123-4567"
              icon={Phone}
            />

            <InputField
              label="Date of Birth"
              field="dateOfBirth"
              type="date"
              icon={Calendar}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.gender && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Physical Information */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Weight className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Physical Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Height"
              field="height"
              type="number"
              placeholder="175"
              icon={Ruler}
              required
              min={100}
              max={250}
              step={0.1}
            />

            <InputField
              label="Starting Weight"
              field="startingWeight"
              type="number"
              placeholder="150"
              icon={Weight}
              required
              min={66}
              max={660}
              step={0.1}
            />
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Height in centimeters (cm) • Weight in pounds (lbs)</p>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
          </div>

          <div className="space-y-6">
            <InputField
              label="Street Address"
              field="address.street"
              placeholder="123 Main Street"
              icon={MapPin}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="City"
                field="address.city"
                placeholder="New York"
                icon={MapPin}
                required
              />

              <InputField
                label="State"
                field="address.state"
                placeholder="NY"
                icon={MapPin}
                required
              />

              <InputField
                label="ZIP Code"
                field="address.zipCode"
                placeholder="10001"
                icon={MapPin}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.address?.country || 'United States'}
                    onChange={(e) => handleInputChange('address.country', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Fitness Goals</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {GOAL_OPTIONS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    formData.goals.includes(goal)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {formData.goals.includes(goal) ? (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    ) : (
                      <div className="h-4 w-4 border border-gray-300 rounded" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {goal.replace('_', ' ')}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {errors.goals && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.goals}
              </p>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional notes about the client..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding Client...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Add Client</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
