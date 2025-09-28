'use client';

import React, { useEffect, useState } from 'react';
import { useWhop } from '@/components/WhopProvider';

export const dynamic = 'force-dynamic';

export default function DebugPage() {
  const { user, company, isLoaded, isInWhop } = useWhop();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isWhopContext, setIsWhopContext] = useState(false);

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer,
      isInIframe: window.parent !== window,
      parentOrigin: window.parent.location?.origin || 'unknown',
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_WHOP_APP_ID: process.env.NEXT_PUBLIC_WHOP_APP_ID ? 'SET' : 'NOT SET'
      },
      whopContext: {
        isInWhop,
        isLoaded,
        user: user ? { id: user.id, email: user.email } : null,
        company: company ? { name: company.name } : null
      },
      timestamp: new Date().toISOString()
    };

    setDebugInfo(info);

    // Check if we're in Whop context
    const whopContext = 
      window.location.search.includes('whop') ||
      window.parent !== window ||
      document.referrer.includes('whop.com') ||
      window.location.hostname.includes('whop');
    
    setIsWhopContext(whopContext);
  }, [isInWhop, isLoaded, user, company]);

  const testUrls = [
    { name: 'Main App', url: 'https://client-tracking-lovat.vercel.app' },
    { name: 'Whop Page', url: 'https://client-tracking-lovat.vercel.app/whop' },
    { name: 'Test Page', url: 'https://client-tracking-lovat.vercel.app/test-whop' },
    { name: 'OAuth Init', url: 'https://client-tracking-lovat.vercel.app/api/auth/whop' },
    { name: 'Manifest', url: 'https://client-tracking-lovat.vercel.app/whop-manifest.json' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🔍 Whop Debug Information</h1>
          
          {/* Context Detection */}
          <div className={`p-4 rounded-lg mb-6 ${isWhopContext ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <h2 className="text-lg font-semibold mb-2">
              {isWhopContext ? '✅ Whop Context Detected' : '⚠️ Not in Whop Context'}
            </h2>
            <p className="text-sm text-gray-600">
              {isWhopContext 
                ? 'This page is being loaded within Whop or has Whop context indicators.'
                : 'This page is being loaded directly, not through Whop integration.'
              }
            </p>
          </div>

          {/* Debug Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Debug Information</h3>
              <pre className="text-xs text-gray-700 bg-white p-4 rounded border overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>

            {/* Test Links */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">🧪 Test Links</h3>
              <div className="space-y-2">
                {testUrls.map((test) => (
                  <div key={test.name} className="flex items-center justify-between bg-white p-3 rounded border">
                    <span className="font-medium text-gray-900">{test.name}</span>
                    <a 
                      href={test.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Test →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Whop Configuration */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">⚙️ Required Whop Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border">
                  <strong>App URL:</strong> <code>https://client-tracking-lovat.vercel.app</code>
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>App Path:</strong> <code>/whop</code>
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Redirect URI:</strong> <code>https://client-tracking-lovat.vercel.app/api/auth/whop/callback</code>
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Embed Settings:</strong> Allow Embedding = YES
                </div>
              </div>
            </div>

            {/* Environment Check */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">🔧 Environment Variables Check</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border">
                  <strong>NEXT_PUBLIC_APP_URL:</strong> {debugInfo.environment?.NEXT_PUBLIC_APP_URL || 'NOT SET'}
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>NEXT_PUBLIC_WHOP_APP_ID:</strong> {debugInfo.environment?.NEXT_PUBLIC_WHOP_APP_ID || 'NOT SET'}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 mb-3">📋 Troubleshooting Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Verify your app is deployed and accessible at the URLs above</li>
                <li>Check that all environment variables are set in Vercel</li>
                <li>Ensure "Allow Embedding" is enabled in Whop dashboard</li>
                <li>Set App Path to <code>/whop</code> in Whop settings</li>
                <li>Make sure your Whop app status is "Active"</li>
                <li>Test the OAuth flow by visiting the OAuth Init URL</li>
                <li>Check browser console for any JavaScript errors</li>
                <li>Contact Whop support if all else fails</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
