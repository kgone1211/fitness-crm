'use client';

import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  Eye, 
  Download, 
  Calendar,
  RotateCcw,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PhotoEntry {
  id: string;
  date: string;
  frontView?: string;
  sideView?: string;
  backView?: string;
  notes?: string;
}

interface ProgressPhotosProps {
  clientId?: string;
  onPhotosUploaded?: (photos: { frontView?: string; sideView?: string; backView?: string }, date: string, notes?: string) => void;
}

export default function ProgressPhotos({ clientId, onPhotosUploaded }: ProgressPhotosProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadedPhotos, setUploadedPhotos] = useState<{ frontView?: File; sideView?: File; backView?: File }>({});
  const [previewPhotos, setPreviewPhotos] = useState<{ frontView?: string; sideView?: string; backView?: string }>({});
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'overlay'>('side-by-side');

  const fileInputRefs = {
    front: useRef<HTMLInputElement>(null),
    side: useRef<HTMLInputElement>(null),
    back: useRef<HTMLInputElement>(null)
  };

  // Mock data for photo entries
  const [photoEntries, setPhotoEntries] = useState<PhotoEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      frontView: '/api/placeholder/300/400',
      sideView: '/api/placeholder/300/400',
      backView: '/api/placeholder/300/400',
      notes: 'Week 1 progress photos'
    },
    {
      id: '2',
      date: '2024-01-08',
      frontView: '/api/placeholder/300/400',
      sideView: '/api/placeholder/300/400',
      backView: '/api/placeholder/300/400',
      notes: 'Starting photos'
    },
    {
      id: '3',
      date: '2024-01-01',
      frontView: '/api/placeholder/300/400',
      sideView: '/api/placeholder/300/400',
      backView: '/api/placeholder/300/400',
      notes: 'Initial assessment'
    }
  ]);

  const handleFileSelect = (view: 'frontView' | 'sideView' | 'backView', file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhotos(prev => ({
          ...prev,
          [view]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
      
      setUploadedPhotos(prev => ({
        ...prev,
        [view]: file
      }));
    }
  };

  const handleUpload = async () => {
    if (Object.keys(uploadedPhotos).length === 0) {
      alert('Please select at least one photo to upload');
      return;
    }

    setIsUploading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const photoUrls: { frontView?: string; sideView?: string; backView?: string } = {};
    Object.entries(uploadedPhotos).forEach(([view, file]) => {
      if (file) {
        // In a real app, you'd upload to a cloud service and get URLs
        photoUrls[view as keyof typeof photoUrls] = URL.createObjectURL(file);
      }
    });

    const newEntry: PhotoEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      ...photoUrls,
      notes: notes || undefined
    };

    setPhotoEntries(prev => [newEntry, ...prev]);
    
    if (onPhotosUploaded) {
      onPhotosUploaded(photoUrls, selectedDate, notes || undefined);
    }

    // Reset form
    setUploadedPhotos({});
    setPreviewPhotos({});
    setNotes('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setShowUploadModal(false);
    setIsUploading(false);
  };

  const removePhoto = (view: 'frontView' | 'sideView' | 'backView') => {
    setUploadedPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos[view];
      return newPhotos;
    });
    setPreviewPhotos(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[view];
      return newPreviews;
    });
  };

  const PhotoUploadCard = ({ 
    view, 
    title, 
    icon 
  }: { 
    view: 'frontView' | 'sideView' | 'backView'; 
    title: string; 
    icon: React.ReactNode;
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
      <input
        ref={fileInputRefs[view.split('View')[0] as keyof typeof fileInputRefs]}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(view, e.target.files[0])}
        className="hidden"
      />
      
      {previewPhotos[view] ? (
        <div className="relative">
          <img
            src={previewPhotos[view]}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          <button
            onClick={() => removePhoto(view)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">Click to upload</p>
          </div>
        </div>
      )}
      
      <button
        onClick={() => fileInputRefs[view.split('View')[0] as keyof typeof fileInputRefs].current?.click()}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        {previewPhotos[view] ? 'Change Photo' : 'Upload Photo'}
      </button>
    </div>
  );

  const PhotoComparison = () => {
    const currentWeek = photoEntries[selectedWeek];
    const previousWeek = photoEntries[selectedWeek + 1];
    
    if (!currentWeek) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Photo Comparison</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {photoEntries.map((entry, index) => (
                  <option key={entry.id} value={index}>
                    {new Date(entry.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              <select
                value={comparisonMode}
                onChange={(e) => setComparisonMode(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="side-by-side">Side by Side</option>
                <option value="overlay">Overlay</option>
              </select>
            </div>
          </div>
          
          <div className="p-6">
            {comparisonMode === 'side-by-side' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Week</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {currentWeek.frontView && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Front View</p>
                        <img src={currentWeek.frontView} alt="Front view" className="w-full rounded-lg" />
                      </div>
                    )}
                    {currentWeek.sideView && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Side View</p>
                        <img src={currentWeek.sideView} alt="Side view" className="w-full rounded-lg" />
                      </div>
                    )}
                    {currentWeek.backView && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Back View</p>
                        <img src={currentWeek.backView} alt="Back view" className="w-full rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
                
                {previousWeek && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Previous Week</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {previousWeek.frontView && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Front View</p>
                          <img src={previousWeek.frontView} alt="Front view" className="w-full rounded-lg" />
                        </div>
                      )}
                      {previousWeek.sideView && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Side View</p>
                          <img src={previousWeek.sideView} alt="Side view" className="w-full rounded-lg" />
                        </div>
                      )}
                      {previousWeek.backView && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Back View</p>
                          <img src={previousWeek.backView} alt="Back view" className="w-full rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentWeek.frontView && (
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-2">Front View</p>
                      <img src={currentWeek.frontView} alt="Front view" className="w-full rounded-lg" />
                      {previousWeek?.frontView && (
                        <div className="absolute inset-0 opacity-50">
                          <img src={previousWeek.frontView} alt="Previous front view" className="w-full rounded-lg" />
                        </div>
                      )}
                    </div>
                  )}
                  {currentWeek.sideView && (
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-2">Side View</p>
                      <img src={currentWeek.sideView} alt="Side view" className="w-full rounded-lg" />
                      {previousWeek?.sideView && (
                        <div className="absolute inset-0 opacity-50">
                          <img src={previousWeek.sideView} alt="Previous side view" className="w-full rounded-lg" />
                        </div>
                      )}
                    </div>
                  )}
                  {currentWeek.backView && (
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-2">Back View</p>
                      <img src={currentWeek.backView} alt="Back view" className="w-full rounded-lg" />
                      {previousWeek?.backView && (
                        <div className="absolute inset-0 opacity-50">
                          <img src={previousWeek.backView} alt="Previous back view" className="w-full rounded-lg" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Camera className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Progress Photos</h3>
            <p className="text-sm text-gray-600">Upload weekly progress photos to track your transformation</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowComparison(true)}
            disabled={photoEntries.length < 2}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Compare</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Photos</span>
          </button>
        </div>
      </div>

      {/* Recent Photos */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Photos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photoEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedWeek(photoEntries.indexOf(entry));
                    setShowComparison(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {entry.frontView && (
                  <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden">
                    <img src={entry.frontView} alt="Front" className="w-full h-full object-cover" />
                  </div>
                )}
                {entry.sideView && (
                  <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden">
                    <img src={entry.sideView} alt="Side" className="w-full h-full object-cover" />
                  </div>
                )}
                {entry.backView && (
                  <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden">
                    <img src={entry.backView} alt="Back" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              {entry.notes && (
                <p className="text-xs text-gray-600 mt-2">{entry.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upload Progress Photos</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Week 1, after workout, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PhotoUploadCard
                  view="frontView"
                  title="Front View"
                  icon={<Camera className="h-6 w-6 text-gray-400" />}
                />
                <PhotoUploadCard
                  view="sideView"
                  title="Side View"
                  icon={<Camera className="h-6 w-6 text-gray-400" />}
                />
                <PhotoUploadCard
                  view="backView"
                  title="Back View"
                  icon={<Camera className="h-6 w-6 text-gray-400" />}
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || Object.keys(uploadedPhotos).length === 0}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Photos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showComparison && <PhotoComparison />}
    </div>
  );
}
