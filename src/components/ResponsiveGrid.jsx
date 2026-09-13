import React from 'react';

/**
 * ResponsiveGrid Component
 * Rule: Mobile 1 column (grid-cols-1), Tablet 2 columns (md:grid-cols-2), Desktop 3 columns (lg:grid-cols-3)
 */
export default function ResponsiveGrid({ children, cols = { sm: 1, md: 2, lg: 3 }, gap = 'gap-6', className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gap} ${className}`}>
      {children}
    </div>
  );
}
