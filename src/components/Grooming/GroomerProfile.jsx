import React, { useState } from "react";
import BookingModal from "./BookingModal";
import MessageModal from "./MessageModal";
import BeforeAfter from "./BeforeAfter";

export default function GroomerProfile({ groomer, onClose, onConfirmBooking, pet }) {
  const [openBook, setOpenBook] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);

  const handleBookService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setOpenBook(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="rounded-t-2xl overflow-hidden shadow-xs relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 text-xs z-10 w-7 h-7 flex items-center justify-center transition shadow-md"
            title="Close drawer"
          >
            ✕
          </button>
        )}
        <img src={groomer.hero} alt={groomer.name} className="w-full h-56 object-cover" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>{groomer.name}</span>
              {groomer.certified && (
                <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-bold">
                  ✓ Certified
                </span>
              )}
            </h3>
            <div className="text-xs text-gray-600 mt-1">
              ★ <span className="font-bold text-gray-900">{groomer.rating}</span> • {groomer.reviews} reviews
            </div>
            <div className="mt-2 text-xs text-gray-700 font-medium">
              📅 Next available: {new Date(groomer.nextAvailable).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              📍 {groomer.address || "Main Street"}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-base font-extrabold text-gray-900">{groomer.priceEstimate}</div>
            <div className="mt-2 flex flex-col gap-1.5">
              <button
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                onClick={() => handleBookService(null)}
              >
                ✂️ Book
              </button>
              <button
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold transition"
                onClick={() => setOpenMessage(true)}
              >
                💬 Message
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="mt-6">
          <h4 className="font-bold text-sm text-gray-900">Portfolio Gallery</h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {groomer.portfolio.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={`portfolio-${i}`}
                className="w-full h-28 object-cover rounded-xl border border-gray-100 shadow-xs hover:opacity-90 transition"
              />
            ))}
          </div>
        </div>

        {/* Before / After sample */}
        <div className="mt-6">
          <h4 className="font-bold text-sm text-gray-900">Before &amp; After Transformation</h4>
          <div className="mt-3">
            <BeforeAfter before={groomer.portfolio[0]} after={groomer.portfolio[1] || groomer.portfolio[0]} />
          </div>
        </div>

        {/* Services List */}
        <div className="mt-6">
          <h4 className="font-bold text-sm text-gray-900">Services &amp; Pricing</h4>
          <div className="mt-3 space-y-2">
            {groomer.services.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-green-300 transition bg-gray-50/50"
              >
                <div>
                  <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-500 font-medium">⏱️ {s.durationMin} mins</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-gray-900">₹{s.price}</div>
                  <button
                    onClick={() => handleBookService(s.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={openBook}
        onClose={() => setOpenBook(false)}
        groomer={groomer}
        initialServiceId={selectedServiceId}
        onConfirmBooking={onConfirmBooking}
        pet={pet}
      />

      {/* Message Modal */}
      <MessageModal
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
        groomer={groomer}
        pet={pet}
      />
    </div>
  );
}
