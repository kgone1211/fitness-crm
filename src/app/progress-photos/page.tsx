'use client';

import React from 'react';
import { Camera, Upload, Filter, ArrowLeft } from 'lucide-react';
import ProgressPhotos from '@/components/ProgressPhotos';

export default function ProgressPhotosPage() {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBackClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-white/50 rounded-xl"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Progress Photos
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">Track your transformation with weekly progress photos</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="group flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Upload Photo
                </button>
                <button className="group px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/60 hover:border-blue-300 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105">
                  <Filter className="h-5 w-5 mr-2 inline group-hover:rotate-180 transition-transform duration-300" />
                  Filter Photos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Photos Component */}
        <ProgressPhotos />
    </div>
  );
}
