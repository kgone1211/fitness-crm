'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TestWhopPage() {
  const [whopStatus, setWhopStatus] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWhopStatus = () => {
      const status = {
        isWhopEnvironment: 
          window.location.hostname.includes('whop.com') ||
          window.location.hostname.includes('whop.io') ||
          window.location.search.includes('whop=true'),
        hasWhopSDK: !!(window as Record<string, unknown>).whop,
        hasWhopGlobal: !!(window as Record<string, unknown>).Whop,
        userAgent: navigator.userAgent,
        hostname: window.location.hostname,
        search: window.location.search,
        whopUser: (window as Record<string, unknown>).whop?.user,
        whopCompany: (window as Record<string, unknown>).whop?.company,
        timestamp: new Date().toISOString()
      };
      
      setWhopStatus(status);
      setIsLoading(false);
    };

    // Check immediately
    checkWhopStatus();

    // Listen for Whop ready event
    const handleWhopReady = () => {
      console.log('Whop ready event received');
      checkWhopStatus();
    };

    window.addEventListener('whop:ready', handleWhopReady);

    // Check periodically
    const interval = setInterval(checkWhopStatus, 1000);

    return () => {
      window.removeEventListener('whop:ready', handleWhopReady);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Whop Integration Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Environment Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${whopStatus?.isWhopEnvironment ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">Whop Environment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${whopStatus?.hasWhopSDK ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">Whop SDK Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${whopStatus?.hasWhopGlobal ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">Whop Global Available</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Hostname:</strong> {whopStatus?.hostname}</div>
              <div><strong>Search:</strong> {whopStatus?.search}</div>
              <div><strong>User Agent:</strong> {whopStatus?.userAgent?.substring(0, 50)}...</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Whop Data</h2>
          {whopStatus?.whopUser ? (
            <div className="space-y-2">
              <div><strong>User ID:</strong> {whopStatus.whopUser.id}</div>
              <div><strong>Username:</strong> {whopStatus.whopUser.username}</div>
              <div><strong>Email:</strong> {whopStatus.whopUser.email}</div>
            </div>
          ) : (
            <p className="text-gray-500">No user data available</p>
          )}
          
          {whopStatus?.whopCompany && (
            <div className="mt-4 space-y-2">
              <div><strong>Company ID:</strong> {whopStatus.whopCompany.id}</div>
              <div><strong>Company Name:</strong> {whopStatus.whopCompany.name}</div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Raw Status Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(whopStatus, null, 2)}
          </pre>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
