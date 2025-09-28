'use client';

import React from 'react';
import Layout from '@/components/Layout';
import CoachDashboard from '@/components/CoachDashboard';

export default function WhopDirectPage() {
  return (
    <Layout userRole="coach">
      <div className="p-8">
        <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
          <h1 className="text-2xl font-bold text-green-800 mb-2">✅ Direct Access Working!</h1>
          <p className="text-green-700">This page bypasses all authentication checks.</p>
        </div>
        
        <CoachDashboard trainerId="whop_user_123" />
      </div>
    </Layout>
  );
}
