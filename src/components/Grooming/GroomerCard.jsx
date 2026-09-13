import React from "react";
import { motion } from "framer-motion";

/**
 * GroomerCard - summary card used in list
 */
export default function GroomerCard({ groomer, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg shadow p-4 flex gap-4 items-start"
    >
      <img src={groomer.hero} alt={groomer.name} className="w-28 h-20 object-cover rounded" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{groomer.name} {groomer.certified && (<span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium">Certified</span>)}</h4>
            <div className="text-sm text-gray-500">{groomer.services[0]?.name} • {groomer.distanceKm} km</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">{groomer.priceEstimate}</div>
            <div className="text-xs text-yellow-700 font-medium">{groomer.rating} ★</div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">Experienced groomers, breed-specific cuts, gentle handling and calming techniques. Portfolio & reviews available.</p>

        <div className="mt-3 flex gap-3">
          <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50" onClick={onView}>View</button>
          <button className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm font-medium" onClick={onView}>Book</button>
          <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50">Message</button>
        </div>
      </div>
    </motion.div>
  );
}
