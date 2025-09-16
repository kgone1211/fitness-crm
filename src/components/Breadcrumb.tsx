'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link 
        href="/" 
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Dashboard
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
