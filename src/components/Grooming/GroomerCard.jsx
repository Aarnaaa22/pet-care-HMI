// src/components/Grooming/GroomerCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function GroomerCard({ groomer, onSelect, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ww-paper border border-ww-paper-dark rounded-3xl p-5 shadow-warm-md hover:border-ww-brass transition group flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Top Header & Avatar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={groomer.avatar}
              alt={groomer.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-ww-brass shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-ww-ink group-hover:text-ww-brass transition">
                  {groomer.name}
                </h3>
                {groomer.verified && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-ww-wood">
                {groomer.specialty || 'Feline & Canine Specialist'}
              </p>
            </div>
          </div>

          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl shrink-0">
            ★ {groomer.rating} <span className="text-[10px] text-ww-wood font-bold">({groomer.reviewsCount})</span>
          </span>
        </div>

        {/* Info Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ww-wood-dark">
          <span className="px-2.5 py-1 rounded-xl bg-ww-paper-dark/60 border border-ww-paper-dark">
            📍 {groomer.distanceKm} km away
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-ww-paper-dark/60 border border-ww-paper-dark">
            💵 {groomer.priceEstimate}
          </span>
          {groomer.openNow && (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              ● Open Now
            </span>
          )}
        </div>

        {/* Service Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {groomer.servicesList?.map((svc, i) => (
            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-ww-paper-dark text-ww-wood-dark">
              {svc}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-ww-paper-dark">
        <button
          onClick={() => onSelect && onSelect(groomer)}
          className="flex-1 py-2 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink font-bold text-xs rounded-xl transition"
        >
          View Profile &amp; Portfolio
        </button>

        <button
          onClick={() => onBook && onBook(groomer)}
          className="px-4 py-2 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
