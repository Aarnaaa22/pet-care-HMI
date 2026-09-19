import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function LogFeedingModal({ isOpen, onClose, onSave, pet = { name: "Silver" } }) {
  const [foodType, setFoodType] = useState('Organic Salmon Kibble');
  const [portion, setPortion] = useState(50);
  const [addWater, setAddWater] = useState(false);
  const [photoAttached, setPhotoAttached] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const presetChips = [25, 50, 100];
  const autocompleteSuggestions = [
    'Organic Salmon Kibble',
    'Wet Salmon & Tuna Pate',
    'Raw Chicken & Pumpkin Stew',
    'Homemade Turkey Treats'
  ];

  const handleAttachPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhotoAttached(URL.createObjectURL(file));
    } else {
      setPhotoAttached('https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      
      const payload = {
        petId: pet.id || 'silver',
        foodType,
        amountGrams: portion,
        addWater,
        photo: photoAttached,
        notes: notes ? (addWater ? `${notes} (Added Water)` : notes) : (addWater ? 'Added warm water' : '')
      };

      if (onSave) onSave(payload);

      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }

      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111827]/60 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] max-h-[90vh] overflow-y-auto space-y-5"
      >
        {/* Grab bar for mobile */}
        <div className="w-12 h-1.5 bg-[#DCEBE0] rounded-full mx-auto sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0]">
          <div className="flex items-center gap-2">
            <img src={`${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/feeding_icon.png`} alt="Feeding" className="w-8 h-8 object-contain" />
            <div>
              <h3 className="font-extrabold text-lg text-[#111827]">Log Feeding for {pet.name}</h3>
              <span className="text-xs text-[#7BD389] font-bold">Track Nutrition & Daily Grams</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] text-[#8E9890] flex items-center justify-center text-base hover:text-[#111827]"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          
          {/* 1. Food Type Autocomplete */}
          <div>
            <label className="font-bold text-[#525C54] block mb-1">Food Type</label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              placeholder="Type food brand or recipe..."
              className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-bold text-[#111827] focus:outline-none focus:border-[#7BD389]"
            />
            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {autocompleteSuggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setFoodType(sug)}
                  className={`px-2.5 py-1 rounded-pill text-[10px] font-extrabold border transition ${
                    foodType === sug ? 'bg-[#EBF8EE] border-[#7BD389] text-[#7BD389]' : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#525C54]'
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Portion Slider & Preset Chips */}
          <div>
            <div className="flex justify-between items-center mb-1.5 font-bold">
              <span className="text-[#525C54]">Portion Amount (grams):</span>
              <span className="text-[#7BD389] font-extrabold text-base">{portion}g</span>
            </div>
            
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={portion}
              onChange={(e) => setPortion(Number(e.target.value))}
              className="w-full accent-[#7BD389] cursor-pointer"
            />

            {/* Quick Preset Chips */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {presetChips.map((grams) => (
                <button
                  key={grams}
                  type="button"
                  onClick={() => setPortion(grams)}
                  className={`py-2 rounded-xl font-extrabold text-xs border text-center transition ${
                    portion === grams
                      ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                      : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#525C54] hover:border-[#7BD389]'
                  }`}
                >
                  {grams}g {grams === 25 ? '(Small)' : grams === 50 ? '(Med)' : '(Large)'}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Add Water Checkbox */}
          <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EBF8EE] flex items-center justify-between">
            <span className="font-extrabold text-xs text-[#111827]">💧 Add Warm Water / Hydration</span>
            <input
              type="checkbox"
              checked={addWater}
              onChange={(e) => setAddWater(e.target.checked)}
              className="w-4 h-4 accent-[#7BD389] rounded cursor-pointer"
            />
          </div>

          {/* 4. Photo Attach Input */}
          <div>
            <label className="font-bold text-[#525C54] block mb-1">Attach Meal Photo (Optional)</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAttachPhoto}
                className="hidden"
                id="photo-attach-input"
              />
              <label
                htmlFor="photo-attach-input"
                className="flex-1 bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] rounded-xl p-2.5 text-center font-bold text-xs text-[#525C54] cursor-pointer"
              >
                {photoAttached ? '📷 Photo Attached (Tap to change)' : '📷 Upload Meal Photo'}
              </label>
            </div>
          </div>

          {/* 5. Notes Text Box */}
          <div>
            <label className="font-bold text-[#525C54] block mb-1">Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ate enthusiastically after walk..."
              className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-2.5 font-medium text-[#111827]"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[46px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Logging Meal...</span>
              </span>
            ) : (
              <span>Save & Log Meal — {portion}g</span>
            )}
          </button>

        </form>

      </motion.div>
    </div>
  );
}
