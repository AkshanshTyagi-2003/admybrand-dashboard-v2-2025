'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Charts from './charts';

export default function AnalyticsPage() {
  // You can add date range filter or loading states here if needed
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
          Analytics Dashboard
        </h1>

        {/* Pass isLoading prop if you want to show skeleton loaders */}
        <Charts isLoading={isLoading} />
      </main>
    </div>
  );
}
