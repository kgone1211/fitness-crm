'use client';

import React from 'react';
import ProgressPhotos from '@/components/ProgressPhotos';

export default function ProgressPhotosPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Progress Photos</h1>
        <p className="text-lg text-gray-600">Track your transformation with weekly progress photos.</p>
      </div>

      {/* Progress Photos Component */}
      <ProgressPhotos />
    </div>
  );
}
