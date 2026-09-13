import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Custom Leaflet DivIcon for Soft Green Paw Pins
const createCustomIcon = (isEmergency = false) => {
  const colorClass = isEmergency ? '#EF4444' : '#7BD389';
  return L.divIcon({
    className: 'custom-paw-pin',
    html: `<div style="
      background-color: ${colorClass};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
      cursor: pointer;
    ">🐾</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

export default function MapPanel({ services = [], onBook, onViewDetail, className = "" }) {
  // Center map around New Delhi default coordinates (28.6139, 77.2090)
  const defaultCenter = [28.6139, 77.2090];

  return (
    <div className={`relative w-full h-full min-h-[440px] rounded-card overflow-hidden border border-[#DCEBE0] bg-[#FAF9F6] shadow-soft-sm ${className}`}>
      
      {/* REACT-LEAFLET MAP CONTAINER WITH OPENSTREETMAP TILES */}
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[440px] z-0"
      >
        {/* OpenStreetMap TileLayer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* REACT-LEAFLET-CLUSTER GROUP (Modern cluster library compatible with React 18 & react-leaflet v4) */}
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div style="
                background-color: #7BD389;
                color: white;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 14px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 14px;
              ">🐾 ${count}</div>`,
              className: 'custom-cluster-marker',
              iconSize: [44, 44],
            });
          }}
        >
          {services.map((item) => {
            const lat = item.coordinates?.lat || (28.6139 + (item.id * 0.01));
            const lng = item.coordinates?.lng || (77.2090 + (item.id * 0.01));
            const isEmergency = item.category === 'emergency';

            return (
              <Marker
                key={item.id}
                position={[lat, lng]}
                icon={createCustomIcon(isEmergency)}
              >
                {/* POPUP MINI-CARD */}
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 space-y-2 min-w-[220px] font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF8EE] border border-[#7BD389] text-[#7BD389] text-lg flex items-center justify-center font-bold flex-shrink-0">
                        {item.icon || '🐾'}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#111827] leading-tight">{item.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] mt-0.5">
                          <span className="text-amber-400 font-bold">★ {item.rating}</span>
                          <span className="text-[#7BD389] font-bold">• {item.distance} km</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#525C54] line-clamp-2">{item.excerpt}</p>

                    <div className="pt-2 border-t border-[#EBF8EE] flex items-center justify-between gap-1">
                      <span className="font-extrabold text-xs text-[#111827]">{item.price}</span>
                      <button
                        onClick={() => {
                          if (onBook) onBook(item);
                        }}
                        className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-[11px] px-3 py-1.5 rounded-pill shadow-soft-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* MAP LEGEND OVERLAY BADGE */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm border border-[#DCEBE0] px-3.5 py-1.5 rounded-pill shadow-soft-sm text-xs font-extrabold text-[#111827] flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#7BD389] animate-pulse"></span>
        <span>OpenStreetMap Live ({services.length} Markers)</span>
      </div>

    </div>
  );
}
