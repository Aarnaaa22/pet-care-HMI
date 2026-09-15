// src/components/ActivityHistory.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MapPanel from './MapPanel';
import { formatDistance, formatDuration } from '../utils/geo';
import { exportActivityGPX, exportActivitiesPDF } from '../utils/export';

export default function ActivityHistory({
  activities = [],
  isLoading = false,
  onDeleteActivity,
  onSelectPlayback,
  onRefresh
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDetail, setSelectedDetail] = useState(null);

  const filtered = activities.filter(act =>
    (act.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (act.notes || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (act.petName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search & Export Toolbar */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[140px] sm:min-w-[220px]">
          <span className="text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-ww-wood-light bg-ww-paper focus:outline-none focus:ring-2 focus:ring-ww-brass"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportActivitiesPDF(filtered)}
            className="px-4 py-2 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <span>📄 Export as PDF</span>
          </button>
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-5 shadow-warm-sm animate-pulse flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-ww-paper-dark" />
                <div className="space-y-2">
                  <div className="w-36 h-4 bg-ww-paper-dark rounded-md" />
                  <div className="w-24 h-3 bg-ww-paper-dark rounded-md" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-8 bg-ww-paper-dark rounded-lg" />
                <div className="w-16 h-8 bg-ww-paper-dark rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty State */
        <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-10 text-center shadow-warm-sm">
          <span className="text-4xl">🐾</span>
          <h3 className="font-extrabold text-lg text-ww-ink mt-2">No Activities Found</h3>
          <p className="text-xs text-ww-wood-dark mt-1">
            {searchTerm ? 'No results matched your search term.' : 'Start a live walk session to record Silver\'s exercises!'}
          </p>
        </div>
      ) : (
        /* Activity List */
        <div className="space-y-3.5">
          {filtered.map(act => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 sm:p-5 shadow-warm-md hover:border-ww-brass transition group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Pet & Title Info */}
                <div className="flex items-start gap-3 flex-1 min-w-[240px]">
                  {act.photo ? (
                    <img
                      src={act.photo}
                      alt={act.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-ww-paper-dark shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-ww-paper-dark flex items-center justify-center text-2xl shrink-0">
                      🐱
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-ww-ink group-hover:text-ww-brass transition">
                        {act.title || 'Outdoor Walk'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ww-paper-dark text-ww-wood-dark">
                        {act.petName || 'Silver'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-ww-wood mt-0.5">
                      📅 {new Date(act.startedAt).toLocaleDateString()} at {new Date(act.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {act.notes && (
                      <p className="text-xs text-ww-wood-dark italic mt-1 line-clamp-1">
                        "{act.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="flex items-center gap-3 sm:gap-5 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ww-wood block">Distance</span>
                    <span className="font-extrabold text-sm text-ww-brass font-mono">
                      {formatDistance(act.distanceMeters)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-ww-wood block">Duration</span>
                    <span className="font-extrabold text-sm text-ww-ink font-mono">
                      {formatDuration(act.durationSec)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-ww-wood block">Calories</span>
                    <span className="font-extrabold text-sm text-amber-600 font-mono">
                      {act.calories} <span className="text-[10px]">kcal</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-ww-paper-dark">
                  <button
                    onClick={() => onSelectPlayback && onSelectPlayback(act)}
                    className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink rounded-xl text-xs font-bold transition flex items-center gap-1"
                    title="Animate Route Playback"
                  >
                    ▶ Playback
                  </button>

                  <button
                    onClick={() => setSelectedDetail(act)}
                    className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-wood-dark rounded-xl text-xs font-bold transition"
                    title="View Map & Details"
                  >
                    🗺️ Details
                  </button>

                  <button
                    onClick={() => exportActivityGPX(act)}
                    className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition"
                    title="Export GPX File"
                  >
                    GPX
                  </button>

                  <button
                    onClick={() => onDeleteActivity && onDeleteActivity(act.id)}
                    className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-xl text-xs transition"
                    title="Delete Record"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ww-paper border-2 border-ww-wood-light rounded-3xl p-6 shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
                <div>
                  <h3 className="font-extrabold text-lg text-ww-ink">{selectedDetail.title}</h3>
                  <p className="text-xs text-ww-wood-dark font-semibold">
                    {new Date(selectedDetail.startedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="w-8 h-8 rounded-full bg-ww-paper-dark text-ww-wood font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Map Preview */}
              {selectedDetail.coords && selectedDetail.coords.length > 0 ? (
                <MapPanel coords={selectedDetail.coords} height="280px" />
              ) : (
                <div className="h-44 bg-ww-paper-dark rounded-2xl flex items-center justify-center text-xs text-ww-wood">
                  No GPS coordinates recorded for this entry.
                </div>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ww-paper-dark/60 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-ww-wood block">Distance</span>
                  <span className="font-extrabold text-base text-ww-brass font-mono">
                    {formatDistance(selectedDetail.distanceMeters)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-ww-wood block">Duration</span>
                  <span className="font-extrabold text-base text-ww-ink font-mono">
                    {formatDuration(selectedDetail.durationSec)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-ww-wood block">Avg Speed</span>
                  <span className="font-extrabold text-base text-ww-ink font-mono">
                    {selectedDetail.avgSpeedKmph} km/h
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-ww-wood block">Calories</span>
                  <span className="font-extrabold text-base text-amber-600 font-mono">
                    {selectedDetail.calories} kcal
                  </span>
                </div>
              </div>

              {selectedDetail.notes && (
                <div className="p-3 bg-ww-paper-dark/40 rounded-xl border border-ww-paper-dark text-xs text-ww-ink font-medium">
                  <strong>Notes:</strong> "{selectedDetail.notes}"
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-ww-paper-dark">
                <button
                  onClick={() => exportActivityGPX(selectedDetail)}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition"
                >
                  Download GPX
                </button>
                <button
                  onClick={() => {
                    onSelectPlayback && onSelectPlayback(selectedDetail);
                    setSelectedDetail(null);
                  }}
                  className="px-4 py-2 bg-ww-brass text-white font-bold text-xs rounded-xl hover:brightness-105 transition"
                >
                  ▶ Start Route Playback
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
