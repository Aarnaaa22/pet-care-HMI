// src/components/ActivitySummaryModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { formatDistance, formatDuration } from '../utils/geo';

export default function ActivitySummaryModal({ isOpen, activityData, onSave, onDiscard }) {
  if (!isOpen || !activityData) return null;

  const [title, setTitle] = useState(activityData.title || `${activityData.petName || 'Silver'}'s Outdoor Walk`);
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80');
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn("Confetti error:", err);
    }

    const finalPayload = {
      ...activityData,
      title,
      notes,
      photo: photoUrl
    };

    setTimeout(() => {
      onSave(finalPayload);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-lg w-full overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-ww-paper-dark mb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="font-extrabold text-xl text-ww-ink">Activity Complete!</h3>
                <p className="text-xs text-ww-wood-dark">Review and save {activityData.petName || 'Silver'}'s exercise session.</p>
              </div>
            </div>
            <button
              onClick={onDiscard}
              className="w-8 h-8 rounded-full bg-ww-paper-dark text-ww-wood hover:bg-rose-100 hover:text-rose-600 transition flex items-center justify-center font-bold"
            >
              ✕
            </button>
          </div>

          {/* Metrics Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 bg-ww-paper-dark/50 p-3 rounded-2xl border border-ww-paper-dark">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-ww-wood">Distance</span>
              <p className="text-base font-black text-ww-brass font-mono mt-0.5">
                {formatDistance(activityData.distanceMeters)}
              </p>
            </div>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-ww-wood">Duration</span>
              <p className="text-base font-black text-ww-ink font-mono mt-0.5">
                {formatDuration(activityData.durationSec)}
              </p>
            </div>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-ww-wood">Avg Speed</span>
              <p className="text-base font-black text-ww-ink font-mono mt-0.5">
                {activityData.avgSpeedKmph} <span className="text-[10px]">km/h</span>
              </p>
            </div>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-ww-wood">Calories</span>
              <p className="text-base font-black text-amber-600 font-mono mt-0.5">
                {activityData.calories} <span className="text-[10px]">kcal</span>
              </p>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ww-ink mb-1">
                Activity Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Evening Park Walk"
                className="w-full px-4 py-2.5 rounded-xl border border-ww-wood-light bg-ww-paper text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ww-brass"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ww-ink mb-1">
                Activity Notes &amp; Behavior
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="How was Silver feeling? (e.g. Playful, chased birds, energetic pace)"
                className="w-full px-4 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ww-brass resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ww-ink mb-1">
                Attach Photo
              </label>
              <div className="flex items-center gap-3">
                {photoUrl && (
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-ww-paper-dark shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-xs text-ww-wood font-semibold file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ww-paper-dark file:text-ww-ink hover:file:bg-ww-wood-light cursor-pointer"
                  />
                  <p className="text-[10px] text-ww-wood mt-1">
                    Upload photo or keep default sample pet image.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-ww-paper-dark">
            <button
              onClick={onDiscard}
              className="px-5 py-2.5 text-xs font-bold text-ww-wood hover:text-rose-600 transition"
            >
              Discard Walk
            </button>

            <button
              onClick={handleSave}
              disabled={isSaved}
              className="px-6 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-warm-md hover:brightness-105 active:scale-95 transition flex items-center gap-2"
            >
              {isSaved ? 'Saving...' : '💾 Save to History'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
