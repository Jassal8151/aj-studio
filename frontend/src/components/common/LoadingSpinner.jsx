import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-black`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-gray-100 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-200 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
