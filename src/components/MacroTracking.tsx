'use client';

import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import MacroTrackingForm from './MacroTrackingForm';

interface MacroTrackingProps {
  clientId: string;
  clientName: string;
}

export default function MacroTracking({ clientId, clientName }: MacroTrackingProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Macro Tracking</h2>
          <p className="text-gray-600">Manage macro targets, logs, and meal plans for {clientName}</p>
        </div>
      </div>

      {/* Quick Access Button */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <Utensils className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Macro Nutrient Tracking</h3>
          <p className="text-gray-600 mb-4">
            Set macro targets, log daily nutrition, and track progress towards your goals.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Open Macro Tracking
          </button>
        </div>
      </div>

      {/* Macro Tracking Form Modal */}
      {showForm && (
        <MacroTrackingForm
          clientId={clientId}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
