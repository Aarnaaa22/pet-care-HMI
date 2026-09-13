import React from 'react';

/**
 * Mobile-first BottomSheet Component
 * Responsive behavior: Full-width bottom drawer on mobile, centered on larger screens.
 */
export default function BottomSheet({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(26,48,34,0.55)' }}>
      <div className="w-full max-w-md rounded-t-[20px] sm:rounded-md p-6 shadow-warm-lg max-h-[85vh] overflow-y-auto animate-fadeIn"
        style={{ backgroundColor: 'var(--paper)', border: '2px solid var(--wood-dark)' }}>
        <div className="w-10 h-1.5 rounded-full mx-auto mb-4 sm:hidden" style={{ backgroundColor: 'var(--wood-light)' }} />
        <div style={{ borderBottom: '1px dashed var(--paper-dark)' }} className="flex items-center justify-between pb-3 mb-4">
          <h3 className="font-kalam text-xl" style={{ color: 'var(--ink)' }}>{title}</h3>
          <button onClick={onClose} className="text-xl p-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition"
            style={{ color: 'var(--wood)', border: '1px solid var(--paper-dark)', borderRadius: '6px', backgroundColor: 'var(--paper-dark)' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
