'use client';

import React from 'react';
import { User, Users, Dumbbell, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Dumbbell className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            FitCoach Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The comprehensive fitness CRM for trainers to manage clients, track workouts, and monitor progress.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Management</h3>
            <p className="text-gray-600">
              Organize and track all your clients in one place. Monitor their progress, set goals, and communicate effectively.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Dumbbell className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Workout Tracking</h3>
            <p className="text-gray-600">
              Create and assign workout templates. Track client progress and customize routines based on their goals.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Analytics</h3>
            <p className="text-gray-600">
              Monitor client progress with detailed analytics, progress photos, and measurement tracking.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Access Through Whop
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            This app is designed to work within the Whop platform. Please access it through your Whop dashboard to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://whop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="h-5 w-5 mr-2" />
              Go to Whop
            </a>
            <button
              onClick={() => window.location.href = '/whop'}
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Demo Mode
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>&copy; 2024 FitCoach Pro. Built for Whop.</p>
        </div>
      </div>
    </div>
  );
}
