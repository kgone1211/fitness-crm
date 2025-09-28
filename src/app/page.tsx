'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import CoachDashboard from '@/components/CoachDashboard';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're in a Whop iframe or have Whop context
    const isWhopContext = window.location.search.includes('whop') || 
                         window.parent !== window ||
                         document.referrer.includes('whop.com') ||
                         window.location.hostname.includes('whop');
    
    if (isWhopContext) {
      router.push('/whop');
    } else {
      // For direct access, show a landing page
      router.push('/landing');
    }
  }, [router]);

  return (
    <Layout userRole="coach">
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </Layout>
  );
}
