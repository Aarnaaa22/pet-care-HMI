// src/components/Playback.jsx
import React, { useState, useEffect, useRef } from 'react';
import MapPanel from './MapPanel';
import { totalDistanceMeters, formatDistance, formatDuration } from '../utils/geo';

export default function Playback({ activity, onClose }) {
  if (!activity || !activity.coords || activity.coords.length === 0) {
    return (
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-6 text-center text-xs text-ww-wood">
        Select a recorded activity from history to start route playback.
      </div>
    );
  }

  const coords = activity.coords;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x, 2x, 4x, 8x
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(100, 1000 / speedMultiplier);
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= coords.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speedMultiplier, coords.length]);

  const handleSliderChange = (e) => {
    setCurrentIndex(Number(e.target.value));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  // Sub-route up to current index
  const activeSubRoute = coords.slice(0, currentIndex + 1);
  const currentPosition = coords[currentIndex];
  const distanceSoFar = totalDistanceMeters(activeSubRoute);
  const progressPct = Math.round(((currentIndex + 1) / coords.length) * 100);

  return (
    <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 sm:p-5 shadow-warm-md space-y-4">
      {/* Playback Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-ww-paper-dark">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <h3 className="font-extrabold text-base text-ww-ink">
              Route Playback: {activity.title || 'Saved Walk'}
            </h3>
          </div>
          <p className="text-xs text-ww-wood-dark font-medium mt-0.5">
            Recorded for {activity.petName || 'Silver'} on {new Date(activity.startedAt).toLocaleDateString()}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-wood-dark rounded-xl text-xs font-bold transition"
          >
            ✕ Close Playback
          </button>
        )}
      </div>

      {/* Map View */}
      <MapPanel
        coords={coords}
        height="360px"
        currentMarkerPosition={currentPosition}
      />

      {/* Playback Controls & Progress Bar */}
      <div className="bg-ww-paper-dark/60 rounded-2xl p-4 border border-ww-paper-dark space-y-3">
        {/* Progress Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-ww-wood">
            <span>Progress: {progressPct}%</span>
            <span>Covered: {formatDistance(distanceSoFar)} / {formatDistance(activity.distanceMeters)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={coords.length - 1}
            value={currentIndex}
            onChange={handleSliderChange}
            className="w-full accent-ww-brass cursor-pointer"
          />
        </div>

        {/* Action Controls & Speed Multipliers */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1.5"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play Route'}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-ww-paper text-ww-ink font-bold text-xs rounded-xl border border-ww-paper-dark hover:bg-ww-wood-light transition"
            >
              ↺ Reset
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-ww-paper p-1 rounded-xl border border-ww-paper-dark">
            <span className="text-[10px] font-bold text-ww-wood px-2">Speed:</span>
            {[1, 2, 4, 8].map(spd => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition ${
                  speedMultiplier === spd
                    ? 'bg-ww-brass text-white shadow-sm'
                    : 'text-ww-wood-dark hover:bg-ww-paper-dark'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
