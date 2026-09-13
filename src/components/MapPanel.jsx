// src/components/MapPanel.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom SVG Icons for clean rendering without missing asset warnings
const createCustomIcon = (color, emoji) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-size: 16px;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
};

const startIcon = createCustomIcon('#7BD389', '🏁');
const endIcon = createCustomIcon('#EF4444', '🛑');
const currentIcon = createCustomIcon('#9D72FF', '🐱');

// Component to dynamically auto-fit map view to route coordinates
function MapAutoRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (!coords || coords.length === 0) return;
    if (coords.length === 1) {
      map.setView(coords[0], 16);
    } else {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [coords, map]);

  return null;
}

export default function MapPanel({
  coords = [],
  height = '320px',
  mapboxToken = '',
  interactive = true,
  currentMarkerPosition = null,
  showControls = true
}) {
  const defaultCenter = coords.length ? coords[coords.length - 1] : [19.0760, 72.8777];
  
  // Tile URL setup: Mapbox if token provided, otherwise standard OpenStreetMap
  const tileUrl = mapboxToken
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tileAttribution = mapboxToken
    ? '© <a href="https://www.mapbox.com/">Mapbox</a>'
    : '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-warm-md border border-ww-paper-dark relative z-0" style={{ height }}>
      <MapContainer
        center={defaultCenter}
        zoom={15}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={showControls}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        
        {/* Dynamic Route Auto-center */}
        <MapAutoRecenter coords={coords} />

        {/* Route Polyline */}
        {coords.length > 1 && (
          <Polyline
            positions={coords}
            pathOptions={{
              color: '#7BD389',
              weight: 5,
              opacity: 0.9,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
        )}

        {/* Start Marker */}
        {coords.length > 0 && (
          <Marker position={coords[0]} icon={startIcon}>
            <Popup>
              <div className="font-sans text-xs font-bold text-gray-800">
                🏁 Route Start Point
              </div>
            </Popup>
          </Marker>
        )}

        {/* End Marker (if route finished and not actively tracking) */}
        {coords.length > 1 && !currentMarkerPosition && (
          <Marker position={coords[coords.length - 1]} icon={endIcon}>
            <Popup>
              <div className="font-sans text-xs font-bold text-gray-800">
                🛑 Route End Point
              </div>
            </Popup>
          </Marker>
        )}

        {/* Current Animated Position Marker */}
        {currentMarkerPosition && (
          <Marker position={currentMarkerPosition} icon={currentIcon}>
            <Popup>
              <div className="font-sans text-xs font-bold text-gray-800">
                🐱 Silver's Current Position
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
