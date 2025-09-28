'use client';

import React from 'react';
import Layout from '@/components/Layout';
import CoachDashboard from '@/components/CoachDashboard';

export default function WhopPage() {
  return (
    <Layout userRole="coach">
      <div className="p-8">
        <div className="mb-6 p-4 bg-blue-100 border border-blue-200 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">🎉 Whop App Loaded Successfully!</h1>
          <p className="text-blue-700">Welcome to FitCoach Pro - your fitness CRM is ready to use.</p>
        </div>
        
        <CoachDashboard trainerId="whop_user_123" />
      </div>
    </Layout>
  );
}
