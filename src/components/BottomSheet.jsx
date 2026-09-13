import React from 'react';

/**
 * Mobile-first BottomSheet Component
 * Responsive behavior: Full-width bottom drawer on mobile (`sm`), centered floating panel on larger screens.
 */
export default function BottomSheet({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] max-h-[85vh] overflow-y-auto animate-slideUp">
        <div className="w-10 h-1.5 bg-[#8E9890]/30 rounded-full mx-auto mb-4 sm:hidden"></div>
        <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
          <h3 className="font-extrabold text-base text-[#2A2F2B]">{title}</h3>
          <button onClick={onClose} className="text-xl text-[#8E9890] hover:text-[#2A2F2B] p-1 min-h-[44px] min-w-[44px] flex items-center justify-center">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
