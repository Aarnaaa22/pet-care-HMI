import React, { useState } from 'react';

export default function MapPanel({ services, selectedService, onSelectService, isMobileSheet = false }) {
  const [activePin, setActivePin] = useState(selectedService || services[0]);

  const handlePinClick = (service) => {
    setActivePin(service);
    if (onSelectService) onSelectService(service);
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] lg:min-h-[600px] bg-[#E8F5E9] border border-[#DCEBE0] rounded-card overflow-hidden shadow-soft-md ${isMobileSheet ? 'h-[360px]' : ''}`}>
      
      {/* Pastel Grid Road Map Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8E6C9_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      
      {/* Decorative Road Markings */}
      <div className="absolute top-[35%] -left-[10%] w-[120%] h-6 bg-white transform -rotate-12 opacity-80 pointer-events-none"></div>
      <div className="absolute -top-[10%] left-[55%] w-6 h-[120%] bg-white transform rotate-12 opacity-80 pointer-events-none"></div>

      {/* Header Info Banner */}
      <div className="absolute top-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#DCEBE0] flex items-center justify-between text-xs font-bold shadow-soft-sm z-10">
        <span className="flex items-center gap-1.5 text-[#2A2F2B]">
          <span className="w-2 h-2 rounded-full bg-[#7BD389] animate-pulse"></span>
          <span>Interactive Map • {services.length} Nearby Pins</span>
        </span>
        <span className="text-[#8E9890] text-[10px]">Tap pins to inspect</span>
      </div>

      {/* Map Pins (Soft Green `#7BD389` & Pastel Pink `#F7C6D7`) */}
      <div className="absolute inset-0 p-8">
        {services.map((srv, idx) => {
          // Calculate mock pin positions
          const positions = [
            { top: '30%', left: '35%' },
            { top: '55%', left: '65%' },
            { top: '20%', left: '75%' },
            { top: '70%', left: '25%' },
            { top: '45%', left: '48%' },
          ];
          const pos = positions[idx % positions.length];
          const isSelected = activePin?.id === srv.id;

          return (
            <button
              key={srv.id}
              onClick={() => handlePinClick(srv)}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all duration-200 ${
                isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
              aria-label={`View ${srv.name} on map`}
            >
              <div
                className={`w-11 h-11 rounded-full rounded-br-none transform -rotate-45 flex items-center justify-center shadow-soft-md ${
                  srv.category === 'emergency' ? 'bg-[#E63946] text-white' :
                  srv.category === 'groomer' ? 'bg-[#F7C6D7] text-[#9F1239]' :
                  'bg-[#7BD389] text-white'
                }`}
              >
                <span className="transform rotate-45 text-base font-bold">
                  {srv.category === 'vet' && '🐾'}
                  {srv.category === 'groomer' && '🛁'}
                  {srv.category === 'store' && '🛍️'}
                  {srv.category === 'emergency' && '🚨'}
                  {srv.category === 'ondemand' && '⚡'}
                </span>
              </div>
              <div className="w-2.5 h-1 bg-[#2A2F2B]/20 rounded-full mx-auto mt-1 blur-[1px]"></div>
            </button>
          );
        })}
      </div>

      {/* Selected Business Preview Popup Card */}
      {activePin && (
        <div className="absolute bottom-3 left-3 right-3 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-[#DCEBE0] flex items-center justify-between gap-3 animate-fadeIn z-20">
          <div className="min-w-0">
            <h4 className="font-extrabold text-sm text-[#2A2F2B] truncate">{activePin.name}</h4>
            <p className="text-xs text-[#525C54] font-semibold">
              <span className="text-[#7BD389]">{activePin.distance} km away</span> • ★ {activePin.rating}
            </p>
          </div>
          <button
            onClick={() => onSelectService && onSelectService(activePin)}
            className="px-4 py-2 bg-[#7BD389] hover:bg-[#5BB369] text-white text-xs font-extrabold rounded-pill shadow-soft-sm whitespace-nowrap min-h-[44px]"
          >
            Select — {activePin.price}
          </button>
        </div>
      )}

    </div>
  );
}
