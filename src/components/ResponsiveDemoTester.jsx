import React from 'react';

export default function ResponsiveDemoTester({ currentMode, onModeChange }) {
  const modes = [
    { id: 'fluid',   label: '🌐 Fluid Full Width',     width: '100%'   },
    { id: 'desktop', label: '💻 Desktop (1440×900)',    width: '1440px' },
    { id: 'tablet',  label: '📱 Tablet (768×1024)',     width: '768px'  },
    { id: 'mobile',  label: '📱 Mobile (375×812)',      width: '375px'  },
  ];

  return (
    <div
      className="py-2 px-4 sticky z-30"
      style={{
        backgroundColor: 'var(--pine)',
        borderBottom: '3px solid var(--wood-dark)',
        top: '64px',
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs font-bold whitespace-nowrap flex items-center gap-1.5 font-nunito" style={{ color: 'var(--brass)' }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brass)' }} />
          <span>Viewport Tester:</span>
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className="px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition min-h-[44px] font-nunito"
              style={currentMode === m.id
                ? { backgroundColor: 'var(--brass)', color: 'var(--ink)', boxShadow: '0 3px 0 var(--brass-dark)' }
                : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--cream)', border: '1px solid rgba(200,155,60,0.25)' }
              }
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
