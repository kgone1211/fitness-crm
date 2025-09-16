'use client';

import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface Breadcrumb {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs = [], 
  showBackButton = false,
  actions 
}: PageHeaderProps) {
  return (
    <div className="space-y-2">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="flex items-center hover:text-gray-700">
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span>/</span>
              {breadcrumb.href ? (
                <Link href={breadcrumb.href} className="hover:text-gray-700">
                  {breadcrumb.name}
                </Link>
              ) : (
                <span className="text-gray-900">{breadcrumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
        <div className="flex items-start space-x-4">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}