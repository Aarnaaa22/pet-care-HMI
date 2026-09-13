import React from 'react';

/**
 * Fluid responsive Container wrapper.
 * Rule: Centers content horizontally with responsive padding across breakpoints.
 */
export default function Container({ children, className = '' }) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}>
      {children}
    </div>
  );
}
