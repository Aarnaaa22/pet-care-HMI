import React from "react";
import { motion } from "framer-motion";

/**
 * GroomerCard - summary card used in list
 */
export default function GroomerCard({ groomer, onView, onBook, onMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start hover:shadow-md transition"
    >
      <img
        src={groomer.hero}
        alt={groomer.name}
        className="w-full sm:w-36 h-32 sm:h-28 object-cover rounded-xl shrink-0"
      />
      
      <div className="flex-1 w-full flex flex-col justify-between h-full">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-gray-900 flex flex-wrap items-center gap-2">
                <span>{groomer.name}</span>
                {groomer.certified && (
                  <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-bold">
                    ✓ Certified
                  </span>
                )}
                {groomer.isMobile && (
                  <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-bold">
                    🚐 Mobile Van
                  </span>
                )}
              </h4>
              <div className="text-xs text-gray-500 mt-0.5">
                {groomer.services[0]?.name} • <span className="font-medium text-gray-700">{groomer.distanceKm} km away</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-extrabold text-gray-900">{groomer.priceEstimate}</div>
              <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 mt-0.5 inline-block">
                ★ {groomer.rating} <span className="text-[10px] text-gray-500">({groomer.reviews})</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {groomer.tagline || "Experienced groomers, breed-specific cuts, gentle handling and calming techniques. Portfolio & reviews available."}
          </p>

          <div className="mt-2 text-[11px] text-gray-500 font-medium flex items-center gap-1">
            <span>📍 {groomer.address || "Main Street"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
          <button
            className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs font-semibold hover:bg-gray-50 transition text-gray-700"
            onClick={onView}
          >
            👁️ View Profile
          </button>
          
          <button
            className="px-4 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-xs transition"
            onClick={() => onBook && onBook(groomer)}
          >
            ✂️ Book Now
          </button>

          <button
            className="px-3.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition"
            onClick={() => onMessage && onMessage(groomer)}
          >
            💬 Message
          </button>
        </div>
      </div>
    </motion.div>
  );
}
