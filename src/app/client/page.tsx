'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ClientDashboard from '@/components/ClientDashboard';

export const dynamic = 'force-dynamic';

export default function ClientPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role !== 'client') {
        router.push('/');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Layout userRole="client">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== 'client') {
    return null;
  }

  return (
    <Layout userRole="client">
      <ClientDashboard />
    </Layout>
  );
}
