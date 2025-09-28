'use client';

import React, { useEffect, useState } from 'react';

export default function TestWhopPage() {
  const [whopInfo, setWhopInfo] = useState<any>({});

  useEffect(() => {
    const info = {
      url: window.location.href,
      referrer: document.referrer,
      isInIframe: window.self !== window.top,
      userAgent: navigator.userAgent,
      searchParams: window.location.search,
      hash: window.location.hash,
      cookies: document.cookie,
      isWhopReferrer: document.referrer.includes('whop.com'),
      isWhopHostname: window.location.hostname.includes('whop'),
      timestamp: new Date().toISOString()
    };
    setWhopInfo(info);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🧪 Whop Integration Test</h1>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Context Information</h2>
              <pre className="text-sm bg-white p-4 rounded border overflow-auto">
                {JSON.stringify(whopInfo, null, 2)}
              </pre>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Expected Behavior</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>If accessed through Whop: <code>isInIframe</code> should be <code>true</code></li>
                <li>If accessed through Whop: <code>isWhopReferrer</code> should be <code>true</code></li>
                <li>URL should contain Whop parameters</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Quick Tests</h2>
              <div className="space-y-2">
                <a 
                  href="https://client-tracking-lovat.vercel.app/whop" 
                  target="_blank" 
                  className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Test Whop Page
                </a>
                <a 
                  href="https://client-tracking-lovat.vercel.app/debug" 
                  target="_blank" 
                  className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Test Debug Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
