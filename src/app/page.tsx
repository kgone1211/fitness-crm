'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWhopAuth } from '@/contexts/WhopAuthContext';
import Layout from '@/components/Layout';
import CoachDashboard from '@/components/CoachDashboard';

export default function Home() {
  const { user, isLoading, isAuthenticated } = useWhopAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role !== 'coach') {
        router.push('/client');
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role !== 'coach') {
    return null;
  }

  return (
    <Layout userRole="coach">
      <CoachDashboard />
    </Layout>
  );
}
