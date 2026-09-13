import React from 'react';

export default function ResponsiveDemoTester({ currentMode, onModeChange }) {
  const modes = [
    { id: 'fluid', label: '🌐 Fluid Full Width', width: '100%' },
    { id: 'desktop', label: '💻 Desktop (1440x900)', width: '1440px' },
    { id: 'tablet', label: '📱 Tablet (768x1024)', width: '768px' },
    { id: 'mobile', label: '📱 Mobile (375x812)', width: '375px' },
  ];

  return (
    <div className="bg-white border-b border-[#DCEBE0] py-2 px-4 shadow-soft-sm sticky top-[64px] sm:top-[80px] z-30">
      <div className="container mx-auto flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs font-extrabold text-[#2A2F2B] whitespace-nowrap flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#7BD389]"></span>
          <span>Responsive Viewport Tester:</span>
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={`px-3 py-1.5 rounded-pill text-xs font-bold whitespace-nowrap transition min-h-[44px] ${
                currentMode === m.id
                  ? 'bg-[#2A2F2B] text-white shadow-soft-sm'
                  : 'bg-[#FAF9F6] text-[#525C54] hover:bg-[#EBF8EE] hover:text-[#7BD389]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
