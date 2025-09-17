'use client';

import { useEffect, useState } from 'react';

export default function TestWhopPage() {
  const [whopData, setWhopData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWhop = async () => {
      try {
        if (typeof window !== 'undefined' && window.whop) {
          const user = await window.whop.getUser();
          const company = await window.whop.getCompany();
          setWhopData({ user, company });
        }
      } catch (error) {
        console.error('Whop test error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWhop();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Whop Integration Test
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
            <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>Whop SDK Available:</strong> {typeof window !== 'undefined' && window.whop ? 'Yes' : 'No'}</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Whop Data</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading Whop data...</p>
          ) : whopData ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">User Data:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(whopData.user, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium">Company Data:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(whopData.company, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No Whop data available</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${typeof window !== 'undefined' && window.whop ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Whop SDK Loaded</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${whopData ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span>Whop Data Retrieved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>App Loaded Successfully</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}