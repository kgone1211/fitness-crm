'use client';

import { WhopProvider } from '@whop/react';
import { ReactNode } from 'react';

interface WhopWrapperProps {
  children: ReactNode;
}

export default function WhopWrapper({ children }: WhopWrapperProps) {
  return (
    <WhopProvider
      appId={process.env.NEXT_PUBLIC_WHOP_APP_ID || ''}
      apiKey={process.env.NEXT_PUBLIC_WHOP_API_KEY || ''}
    >
      {children}
    </WhopProvider>
  );
}
