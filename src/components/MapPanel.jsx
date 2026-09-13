import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MapPanel({ services = [], onBook, onViewDetail, className = "" }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [zoomLevel, setZoomLevel] = useState('medium'); // 'out' | 'medium' | 'in'

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-card overflow-hidden border border-[#DCEBE0] bg-[#FAF9F6] shadow-soft-sm ${className}`}>
      
      {/* MAP BACKGROUND CANVAS MOCKUP */}
      <div className="absolute inset-0 bg-[#F4F7F4] pointer-events-none">
        {/* Pastel Grid Road Network */}
        <svg className="w-full h-full opacity-60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roadGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#E2EBE4" strokeWidth="6" />
              <path d="M 60 0 L 60 120 M 0 60 L 120 60" fill="none" stroke="#EBF3EE" strokeWidth="3" strokeDasharray="6,6" />
              <circle cx="60" cy="60" r="14" fill="#E2EBE4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roadGrid)" />
          {/* Park Greenery Area */}
          <path d="M 20 40 Q 150 10, 260 90 T 400 200 L 20 200 Z" fill="#E1F2E4" opacity="0.8" />
          {/* River Stream */}
          <path d="M 0 180 Q 200 120, 500 240" fill="none" stroke="#D0EAFA" strokeWidth="24" strokeLinecap="round" />
        </svg>
      </div>

      {/* MAP ZOOM CONTROLS OVERLAY */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white border border-[#DCEBE0] rounded-2xl shadow-soft-sm p-1">
        <button
          onClick={() => setZoomLevel('in')}
          className="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm hover:bg-[#FAF9F6] text-[#111827]"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => setZoomLevel('medium')}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold hover:bg-[#FAF9F6] text-[#8E9890]"
          title="Reset Zoom"
        >
          🎯
        </button>
        <button
          onClick={() => setZoomLevel('out')}
          className="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm hover:bg-[#FAF9F6] text-[#111827]"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* MAP LEGEND BADGE */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm border border-[#DCEBE0] px-3.5 py-1.5 rounded-pill shadow-soft-sm text-xs font-extrabold text-[#111827] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#7BD389] animate-pulse"></span>
        <span>Nearby Verified Providers ({services.length})</span>
      </div>

      {/* MAP PINS CONTAINER */}
      <div className="absolute inset-0 z-10">
        {zoomLevel === 'out' ? (
          /* Clustered Pin Mode when zoomed out */
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={() => setZoomLevel('medium')}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-[#7BD389] text-white border-4 border-white font-extrabold text-sm px-4 py-2 rounded-pill shadow-soft-lg flex items-center gap-1.5 animate-bounce"
          >
            <span>🐾</span>
            <span>{services.length} Providers Clustered</span>
          </motion.div>
        ) : (
          /* Individual Service Paw Pins */
          services.map((item, idx) => {
            // Calculated positions relative to map canvas
            const topPositions = ['25%', '45%', '65%', '35%'];
            const leftPositions = ['30%', '65%', '40%', '75%'];
            const top = topPositions[idx % topPositions.length];
            const left = leftPositions[idx % leftPositions.length];

            const isSelected = selectedPin && selectedPin.id === item.id;

            return (
              <div
                key={item.id}
                style={{ top, left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPin(item)}
                  className={`relative flex items-center justify-center transition-all ${
                    isSelected ? 'z-30 scale-125' : 'z-10'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-white shadow-soft-md flex items-center justify-center font-extrabold text-base ${
                      item.category === 'emergency' ? 'bg-[#EF4444] text-white' : 'bg-[#7BD389] text-white'
                    }`}
                  >
                    🐾
                  </div>
                  {/* Pin label popup tag */}
                  <span className="absolute -bottom-5 bg-white border border-[#DCEBE0] text-[10px] font-extrabold text-[#111827] px-2 py-0.5 rounded-pill shadow-soft-sm whitespace-nowrap">
                    {item.name.split(' ')[0]} ({item.distance}km)
                  </span>
                </motion.button>
              </div>
            );
          })
        )}
      </div>

      {/* SELECTED PIN MINI-CARD POPUP */}
      {selectedPin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-30 bg-white border border-[#DCEBE0] rounded-card p-4 shadow-soft-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EBF8EE] border border-[#7BD389] text-[#7BD389] text-xl flex items-center justify-center flex-shrink-0 font-extrabold">
              {selectedPin.icon || '🐾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm text-[#111827]">{selectedPin.name}</h4>
                <span className="text-amber-400 font-bold text-xs">★ {selectedPin.rating}</span>
              </div>
              <p className="text-xs text-[#525C54]">{selectedPin.type} • <strong className="text-[#7BD389]">{selectedPin.distance} km away</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPin(null)}
              className="p-2 rounded-full hover:bg-[#FAF9F6] text-xs text-[#8E9890] min-h-[36px] min-w-[36px]"
              aria-label="Close pin popup"
            >
              ✕
            </button>
            <button
              onClick={() => {
                if (onBook) onBook(selectedPin);
                setSelectedPin(null);
              }}
              className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm min-h-[38px]"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
