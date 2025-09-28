'use client';

import React, { useEffect } from 'react';
import { useWhop } from '@/components/WhopProvider';
import Layout from '@/components/Layout';
import CoachDashboard from '@/components/CoachDashboard';

export const dynamic = 'force-dynamic';

export default function WhopPage() {
  const { user, company, isLoaded } = useWhop();

  useEffect(() => {
    if (isLoaded) {
      console.log('Whop loaded:', { user, company });
    }
  }, [isLoaded, user, company]);

  if (!isLoaded) {
    return (
      <Layout userRole="coach">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Whop integration...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout userRole="coach">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">W</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Authenticated</h2>
              <p className="text-gray-600">
                Please access this app through Whop to authenticate.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Determine if user is coach or client based on Whop data
  const isCoach = user.company?.role === 'admin' || 
                  user.permissions?.includes('manage_clients') ||
                  user.email?.includes('@coach.') ||
                  false; // Default to client

  return (
    <Layout userRole={isCoach ? 'coach' : 'client'}>
      {isCoach ? (
        <CoachDashboard />
      ) : (
        <div className="p-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.username || user.email}!</h1>
            <p className="text-gray-600">You're viewing this as a client.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Whop Integration Info</h2>
            <div className="space-y-2 text-sm">
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username || 'N/A'}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {company?.name || 'N/A'}</p>
              <p><strong>Role:</strong> {company?.role || 'N/A'}</p>
              <p><strong>Permissions:</strong> {user.permissions?.join(', ') || 'None'}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
