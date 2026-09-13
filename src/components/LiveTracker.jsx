// src/components/LiveTracker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MapPanel from './MapPanel';
import { totalDistanceMeters, formatDuration, formatDistance, calculateCalories } from '../utils/geo';

export default function LiveTracker({ onSaveActivity, onTriggerSOS, onShareLocation, pet }) {
  const [trackingState, setTrackingState] = useState('idle'); // 'idle' | 'tracking' | 'paused'
  const [coords, setCoords] = useState([]);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0); // km/h
  const [isSimulating, setIsSimulating] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showMapboxConfig, setShowMapboxConfig] = useState(false);

  const watchIdRef = useRef(null);
  const timerRef = useRef(null);
  const simIntervalRef = useRef(null);

  // Simulated GPS route points for indoor/desktop testing
  const SIMULATED_PATH = [
    [19.0760, 72.8777],
    [19.0764, 72.8781],
    [19.0770, 72.8788],
    [19.0778, 72.8795],
    [19.0785, 72.8804],
    [19.0792, 72.8812],
    [19.0800, 72.8821],
    [19.0809, 72.8830],
    [19.0818, 72.8840],
    [19.0825, 72.8850]
  ];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, []);

  // Timer interval handler
  useEffect(() => {
    if (trackingState === 'tracking') {
      timerRef.current = setInterval(() => {
        setElapsedSec(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [trackingState]);

  // Handle GPS start
  const handleStartTracking = (useSimulation = false) => {
    setCoords([]);
    setElapsedSec(0);
    setStartedAt(new Date().toISOString());
    setTrackingState('tracking');
    setIsSimulating(useSimulation);

    if (useSimulation) {
      let simIndex = 0;
      setCoords([SIMULATED_PATH[0]]);
      simIntervalRef.current = setInterval(() => {
        simIndex = (simIndex + 1) % SIMULATED_PATH.length;
        const newPoint = SIMULATED_PATH[simIndex];
        setCoords(prev => [...prev, newPoint]);
        setCurrentSpeed(Math.floor(3.5 + Math.random() * 1.5));
      }, 2500);
    } else {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser. Switch to Simulation mode to test!");
        handleStartTracking(true);
        return;
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newCoord = [pos.coords.latitude, pos.coords.longitude];
          setCoords(prev => [...prev, newCoord]);
          
          if (pos.coords.speed !== null && pos.coords.speed !== undefined) {
            setCurrentSpeed((pos.coords.speed * 3.6).toFixed(1)); // m/s to km/h
          } else {
            setCurrentSpeed(3.8);
          }
        },
        (err) => {
          console.warn("GPS error:", err);
          alert("Could not access live GPS. Switching to Demo Route Simulation mode.");
          handleStartTracking(true);
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
      );
    }
  };

  const handlePauseTracking = () => {
    setTrackingState('paused');
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
  };

  const handleResumeTracking = () => {
    setTrackingState('tracking');
    if (isSimulating) {
      let simIndex = coords.length % SIMULATED_PATH.length;
      simIntervalRef.current = setInterval(() => {
        simIndex = (simIndex + 1) % SIMULATED_PATH.length;
        setCoords(prev => [...prev, SIMULATED_PATH[simIndex]]);
      }, 2500);
    } else if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newCoord = [pos.coords.latitude, pos.coords.longitude];
          setCoords(prev => [...prev, newCoord]);
        },
        null,
        { enableHighAccuracy: true }
      );
    }
  };

  const handleStopTracking = () => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);

    setTrackingState('idle');
    const endedAt = new Date().toISOString();
    const distMeters = totalDistanceMeters(coords);
    const distKm = distMeters / 1000;
    const durationHours = elapsedSec / 3600 || 1/3600;
    const avgSpeed = Number((distKm / durationHours).toFixed(1));
    const calories = calculateCalories(distMeters, pet?.weightKg || 4.2);

    const summaryPayload = {
      petId: pet?.id || 'silver',
      petName: pet?.name || 'Silver',
      title: `${pet?.name || 'Silver'}'s Outdoor Walk`,
      startedAt,
      endedAt,
      durationSec: elapsedSec,
      distanceMeters: Math.round(distMeters),
      avgSpeedKmph: avgSpeed > 0 ? avgSpeed : 3.5,
      calories,
      coords: coords.length > 0 ? coords : SIMULATED_PATH.slice(0, 5),
    };

    onSaveActivity(summaryPayload);
  };

  const distanceMeters = totalDistanceMeters(coords);
  const caloriesBurned = calculateCalories(distanceMeters, pet?.weightKg || 4.2);

  return (
    <div className="space-y-4">
      {/* Live Metrics Header Bar */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 sm:p-5 shadow-warm-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ww-paper-dark flex items-center justify-center text-xl font-bold shadow-inner">
              🐾
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-ww-ink">Live Route Tracker</h2>
              <p className="text-xs text-ww-wood-dark font-medium">
                {trackingState === 'tracking' && (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Recording GPS Route {isSimulating && '(Demo Simulation)'}
                  </span>
                )}
                {trackingState === 'paused' && (
                  <span className="text-amber-600 font-bold">⏸ Tracking Paused</span>
                )}
                {trackingState === 'idle' && 'Ready to start exercise session'}
              </p>
            </div>
          </div>

          {/* Quick Safety Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onShareLocation}
              className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-wood-dark rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              📡 Share Live Link
            </button>
            <button
              onClick={onTriggerSOS}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              🚨 SOS Emergency
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-[#111827] grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-ww-paper-dark/60 rounded-xl p-3 border border-ww-paper-dark text-center">
            <span className="text-[10px] uppercase font-bold text-ww-wood">Timer</span>
            <div className="text-xl sm:text-2xl font-black text-ww-ink font-mono mt-0.5">
              {formatDuration(elapsedSec)}
            </div>
          </div>

          <div className="bg-ww-paper-dark/60 rounded-xl p-3 border border-ww-paper-dark text-center">
            <span className="text-[10px] uppercase font-bold text-ww-wood">Distance</span>
            <div className="text-xl sm:text-2xl font-black text-ww-brass font-mono mt-0.5">
              {formatDistance(distanceMeters)}
            </div>
          </div>

          <div className="bg-ww-paper-dark/60 rounded-xl p-3 border border-ww-paper-dark text-center">
            <span className="text-[10px] uppercase font-bold text-ww-wood">Speed</span>
            <div className="text-xl sm:text-2xl font-black text-ww-ink font-mono mt-0.5">
              {currentSpeed} <span className="text-xs font-semibold text-ww-wood">km/h</span>
            </div>
          </div>

          <div className="bg-ww-paper-dark/60 rounded-xl p-3 border border-ww-paper-dark text-center">
            <span className="text-[10px] uppercase font-bold text-ww-wood">Est. Calories</span>
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono mt-0.5">
              {caloriesBurned} <span className="text-xs font-semibold text-ww-wood">kcal</span>
            </div>
          </div>
        </div>

        {/* Tracker Action Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {trackingState === 'idle' ? (
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleStartTracking(false)}
                className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-warm-md hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>▶ Start Live Walk</span>
              </button>
              <button
                onClick={() => handleStartTracking(true)}
                className="px-4 py-3 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <span>🎮 Demo Route Simulation</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {trackingState === 'tracking' ? (
                <button
                  onClick={handlePauseTracking}
                  className="px-5 py-2.5 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow hover:bg-amber-600 transition flex items-center gap-1.5"
                >
                  <span>⏸ Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleResumeTracking}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow hover:bg-emerald-700 transition flex items-center gap-1.5"
                >
                  <span>▶ Resume</span>
                </button>
              )}

              <button
                onClick={handleStopTracking}
                className="px-5 py-2.5 bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow hover:bg-rose-700 transition flex items-center gap-1.5"
              >
                <span>🛑 Finish &amp; Save</span>
              </button>
            </div>
          )}

          {/* Mapbox Token Config Toggle */}
          <button
            onClick={() => setShowMapboxConfig(!showMapboxConfig)}
            className="text-xs text-ww-wood-dark hover:underline font-semibold"
          >
            {showMapboxConfig ? 'Hide Map Settings' : '⚙️ Custom Map Tile (Mapbox)'}
          </button>
        </div>

        {/* Mapbox Token Drawer */}
        <AnimatePresence>
          {showMapboxConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-3 border-t border-ww-paper-dark overflow-hidden"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Mapbox Access Token (pk.ey...)"
                  value={mapboxToken}
                  onChange={e => setMapboxToken(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-ww-wood-light bg-ww-paper focus:outline-none focus:ring-2 focus:ring-ww-brass"
                />
                {mapboxToken && (
                  <button
                    onClick={() => setMapboxToken('')}
                    className="px-3 py-1.5 bg-ww-paper-dark text-xs font-bold text-ww-wood-dark rounded-xl"
                  >
                    Clear Token
                  </button>
                )}
              </div>
              <p className="text-[10px] text-ww-wood mt-1">
                Leave empty to use free default OpenStreetMap vector tiles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Leaflet Map */}
      <MapPanel
        coords={coords}
        height="380px"
        mapboxToken={mapboxToken}
        currentMarkerPosition={coords.length > 0 ? coords[coords.length - 1] : null}
      />
    </div>
  );
}
