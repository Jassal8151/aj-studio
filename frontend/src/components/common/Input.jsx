import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:opacity-50 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message || error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
