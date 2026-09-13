import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FilterModal({ isOpen, onClose, filters, onApplyFilters, onResetFilters }) {
  const [localFilters, setLocalFilters] = useState(filters || {
    category: 'all',
    maxDistance: 10,
    minRating: 4.0,
    openNowOnly: false,
    offersOnly: false,
    homeVisitsOnly: false,
    priceTier: 'all'
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetState = {
      category: 'all',
      maxDistance: 20,
      minRating: 0,
      openNowOnly: false,
      offersOnly: false,
      homeVisitsOnly: false,
      priceTier: 'all'
    };
    setLocalFilters(resetState);
    if (onResetFilters) onResetFilters();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111827]/50 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] max-h-[90vh] overflow-y-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0]">
          <h3 className="font-extrabold text-lg text-[#111827] flex items-center gap-2">
            <span>⚙️ Filter Services</span>
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] text-[#8E9890] flex items-center justify-center text-lg hover:text-[#111827]"
          >
            ✕
          </button>
        </div>

        {/* 1. Category Chips */}
        <div>
          <label className="text-xs font-bold text-[#525C54] uppercase tracking-wider block mb-2">Service Type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services 🐾' },
              { id: 'vet', label: 'Vet Clinics 🩺' },
              { id: 'groomer', label: 'Pet Spas 🛁' },
              { id: 'store', label: 'Supplies Stores 🥩' },
              { id: 'emergency', label: 'Emergency 24/7 🚑' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setLocalFilters({ ...localFilters, category: cat.id })}
                className={`px-3.5 py-2 rounded-pill text-xs font-bold border transition ${
                  localFilters.category === cat.id
                    ? 'bg-[#EBF8EE] border-[#7BD389] text-[#7BD389] shadow-soft-sm'
                    : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#525C54] hover:border-[#7BD389]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Distance Radius Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
            <span className="text-[#525C54]">Distance Radius:</span>
            <span className="text-[#7BD389] font-extrabold text-sm">Up to {localFilters.maxDistance} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={localFilters.maxDistance}
            onChange={(e) => setLocalFilters({ ...localFilters, maxDistance: Number(e.target.value) })}
            className="w-full accent-[#7BD389] cursor-pointer"
          />
        </div>

        {/* 3. Toggles: Open Now, Offers Only, Home Visits */}
        <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-2xl border border-[#EBF8EE] text-xs font-bold text-[#111827]">
          
          <label className="flex items-center justify-between cursor-pointer">
            <span>🟢 Open Now Only</span>
            <input
              type="checkbox"
              checked={localFilters.openNowOnly}
              onChange={(e) => setLocalFilters({ ...localFilters, openNowOnly: e.target.checked })}
              className="w-4 h-4 accent-[#7BD389] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span>🏷️ Exclusive Discounts / Offers Only</span>
            <input
              type="checkbox"
              checked={localFilters.offersOnly}
              onChange={(e) => setLocalFilters({ ...localFilters, offersOnly: e.target.checked })}
              className="w-4 h-4 accent-[#7BD389] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span>🏠 Offers Home Pickup / Visits</span>
            <input
              type="checkbox"
              checked={localFilters.homeVisitsOnly}
              onChange={(e) => setLocalFilters({ ...localFilters, homeVisitsOnly: e.target.checked })}
              className="w-4 h-4 accent-[#7BD389] rounded"
            />
          </label>

        </div>

        {/* 4. Rating Filter */}
        <div>
          <label className="text-xs font-bold text-[#525C54] uppercase tracking-wider block mb-2">Minimum Rating</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 0, label: 'Any Rating' },
              { val: 4.5, label: '★ 4.5 & up' },
              { val: 4.8, label: '★ 4.8 Top Rated' }
            ].map((r) => (
              <button
                key={r.val}
                type="button"
                onClick={() => setLocalFilters({ ...localFilters, minRating: r.val })}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  localFilters.minRating === r.val ? 'bg-[#EBF8EE] border-[#7BD389] text-[#7BD389]' : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#525C54]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#DCEBE0]">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#525C54] font-extrabold text-xs py-3.5 rounded-pill min-h-[44px]"
          >
            Reset Filters
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs py-3.5 rounded-pill shadow-soft-sm min-h-[44px]"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}
