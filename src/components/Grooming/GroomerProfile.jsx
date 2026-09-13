import React, { useState } from "react";
import BookingModal from "./BookingModal";
import BeforeAfter from "./BeforeAfter";

export default function GroomerProfile({ groomer, onClose }) {
  const [openBook, setOpenBook] = useState(false);

  return (
    <div>
      <div className="rounded overflow-hidden shadow relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 text-xs z-10 w-6 h-6 flex items-center justify-center"
            title="Close drawer"
          >
            ✕
          </button>
        )}
        <img src={groomer.hero} alt={groomer.name} className="w-full h-56 object-cover" />
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{groomer.name}</h3>
            <div className="text-sm text-gray-600">{groomer.rating} ★ • {groomer.reviews} reviews</div>
            <div className="mt-2 text-sm text-gray-700">Next available: {new Date(groomer.nextAvailable).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{groomer.priceEstimate}</div>
              <button className="mt-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium" onClick={() => setOpenBook(true)}>Book</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900">Portfolio</h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {groomer.portfolio.map((p, i) => (
              <img key={i} src={p} alt={`portfolio-${i}`} className="w-full h-28 object-cover rounded" />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900">Before / After sample</h4>
          <div className="mt-3">
            {/* Use the first two images for demo */}
            <BeforeAfter before={groomer.portfolio[0]} after={groomer.portfolio[1] || groomer.portfolio[0]} />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900">Services</h4>
          <div className="mt-2 space-y-2">
            {groomer.services.map(s => (
              <div key={s.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium text-gray-800 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.durationMin} min</div>
                </div>
                <div className="text-sm font-semibold text-gray-900">₹{s.price}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BookingModal isOpen={openBook} onClose={() => setOpenBook(false)} groomer={groomer} />
    </div>
  );
}
