'use client';

import React from 'react';

export const dynamic = 'force-dynamic';

export default function TestWhopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">W</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Whop Integration Test
          </h1>
          <p className="text-gray-600 mb-8">
            This page tests if your app is properly configured for Whop.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">✅ App Status</h3>
            <p className="text-green-700">
              Your app is deployed and accessible at: <br />
              <code className="bg-green-100 px-2 py-1 rounded text-sm">
                https://client-tracking-lovat.vercel.app
              </code>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🔧 Whop Configuration</h3>
            <div className="text-blue-700 space-y-2">
              <p><strong>App URL:</strong> <code>https://client-tracking-lovat.vercel.app</code></p>
              <p><strong>App Path:</strong> <code>/whop</code></p>
              <p><strong>Full URL:</strong> <code>https://client-tracking-lovat.vercel.app/whop</code></p>
              <p><strong>Redirect URI:</strong> <code>https://client-tracking-lovat.vercel.app/api/auth/whop/callback</code></p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Required Settings</h3>
            <div className="text-yellow-700 space-y-1">
              <p>• Enable "Allow Embedding" in Whop dashboard</p>
              <p>• Set App Path to: <code>/whop</code></p>
              <p>• Configure OAuth redirect URI</p>
              <p>• Set environment variables in Vercel</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🧪 Test Links</h3>
            <div className="space-y-2">
              <a 
                href="/whop" 
                className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Test Whop Page
              </a>
              <a 
                href="/api/auth/whop" 
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Test OAuth Flow
              </a>
              <a 
                href="/landing" 
                className="block w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                Landing Page
              </a>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Environment Variables</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><code>WHOP_CLIENT_ID</code> - Your Whop client ID</p>
              <p><code>WHOP_CLIENT_SECRET</code> - Your Whop client secret</p>
              <p><code>NEXT_PUBLIC_WHOP_APP_ID</code> - Your Whop app ID</p>
              <p><code>NEXT_PUBLIC_WHOP_API_KEY</code> - Your Whop API key</p>
              <p><code>NEXT_PUBLIC_APP_URL</code> - https://client-tracking-lovat.vercel.app</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>If you can see this page, your app is deployed correctly!</p>
          <p>Visit <code>/whop</code> to test the full Whop integration.</p>
        </div>
      </div>
    </div>
  );
}
