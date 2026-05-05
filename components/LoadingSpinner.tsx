import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
      <Loader size={32} className="text-amber-600 animate-spin" />
      <p className="text-gray-700 font-medium">Loading...</p>
    </div>
  </div>
);
