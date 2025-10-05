'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the calculator to avoid SSR issues with useSearchParams
const PizzaCalculator = dynamic(
  () => import('./PizzaCalculator'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Loading Pizza Calculator...</div>
          <div className="text-gray-600">Preparing your perfect dough recipe 🍕</div>
        </div>
      </div>
    )
  }
);

export default function PizzaCalculatorWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Loading...</div>
        </div>
      </div>
    }>
      <PizzaCalculator />
    </Suspense>
  );
}