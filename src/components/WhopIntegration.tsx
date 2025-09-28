'use client';

import { useWhop } from '@whop/react';
import { useEffect } from 'react';

export default function WhopIntegration() {
  const { user, company, isLoaded } = useWhop();

  useEffect(() => {
    if (isLoaded) {
      console.log('Whop loaded successfully');
      console.log('User:', user);
      console.log('Company:', company);
    }
  }, [isLoaded, user, company]);

  if (!isLoaded) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Loading Whop integration...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-semibold mb-2">Whop Integration Active</h3>
      {user && (
        <p className="text-green-700">Welcome, {user.username || user.email}!</p>
      )}
      {company && (
        <p className="text-green-700">Company: {company.name}</p>
      )}
    </div>
  );
}
