'use client';

import React from 'react';
import { useWhop } from '@whop/react';
import { WhopAuthProvider } from '@/contexts/WhopAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WhopAuthWrapperProps {
  children: React.ReactNode;
}

function WhopAuthContent({ children }: WhopAuthWrapperProps) {
  const { user, isLoaded } = useWhop();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      // If not authenticated with Whop, redirect to Whop login
      // This will be handled by Whop's built-in authentication
      console.log('User not authenticated with Whop');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to Whop...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">W</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">
              Please sign in through Whop to access your fitness coaching dashboard.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => {
                // This will trigger Whop's authentication flow
                window.location.href = '/api/auth/whop';
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign in with Whop
            </button>
            <p className="text-sm text-gray-500">
              You'll be redirected to Whop's secure authentication system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function WhopAuthWrapper({ children }: WhopAuthWrapperProps) {
  return (
    <WhopAuthProvider>
      <WhopAuthContent>
        {children}
      </WhopAuthContent>
    </WhopAuthProvider>
  );
}
