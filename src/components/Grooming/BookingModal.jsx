// src/components/Grooming/BookingModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PhotoUploadCrop from './PhotoUploadCrop';

export default function BookingModal({
  isOpen,
  onClose,
  groomer = { id: 'g1', name: 'Bella Spa & Salon', priceEstimate: '$45 - $65' },
  service = { id: 's1', name: 'Full Luxury Feline Groom', price: 55 },
  pet,
  onConfirm
}) {
  const [date, setDate] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const ADDONS = [
    { id: 'a1', name: 'De-shedding Deep Treatment', price: 15 },
    { id: 'a2', name: 'Organic Flea & Tick Dip', price: 20 },
    { id: 'a3', name: 'Teeth Brushing & Breath Refresh', price: 10 },
    { id: 'a4', name: 'Paw Pad Moisturizing Therapy', price: 12 }
  ];

  const handleToggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'PAW20') {
      setDiscountPct(20);
      alert("🎉 Coupon PAW20 applied! 20% discount added.");
    } else {
      alert("Invalid coupon code. Try 'PAW20' for 20% off!");
    }
  };

  const basePrice = service.price || 55;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  
  const subtotal = basePrice + addonsTotal;
  const discountAmount = (subtotal * discountPct) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleConfirmBooking = () => {
    setIsSuccess(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    const bookingRecord = {
      id: `bk_${Date.now()}`,
      groomerId: groomer.id,
      groomerName: groomer.name,
      serviceName: service.name,
      petName: pet?.name || 'Silver',
      date: date.toISOString(),
      addons: selectedAddons,
      total: finalTotal,
      notes,
      photo: uploadedPhoto
    };

    setTimeout(() => {
      onConfirm && onConfirm(bookingRecord);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="max-w-lg mx-auto my-8 p-6 bg-ww-paper border-2 border-ww-brass rounded-3xl shadow-warm-lg max-h-[90vh] overflow-y-auto focus:outline-none"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
        <div>
          <h2 className="text-lg font-extrabold text-ww-ink">Book {service.name}</h2>
          <p className="text-xs text-ww-wood-dark font-semibold">With {groomer.name}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-ww-paper-dark text-ww-wood font-bold">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Date & Time Picker */}
        <div>
          <label className="block text-xs font-bold text-ww-ink mb-1">Select Date &amp; Time</label>
          <DatePicker
            selected={date}
            onChange={d => setDate(d)}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            className="w-full px-3 py-2 border border-ww-wood-light bg-ww-paper rounded-xl text-xs font-bold text-ww-ink focus:ring-2 focus:ring-ww-brass"
          />
        </div>

        {/* Add-ons Checkboxes */}
        <div>
          <label className="block text-xs font-bold text-ww-ink mb-1.5">Optional Grooming Add-ons</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ADDONS.map(addon => (
              <label
                key={addon.id}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition ${
                  selectedAddons.includes(addon.id)
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : 'bg-ww-paper-dark/50 border-ww-paper-dark text-ww-ink hover:bg-ww-paper-dark'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => handleToggleAddon(addon.id)}
                    className="accent-ww-brass rounded"
                  />
                  <span>{addon.name}</span>
                </div>
                <span className="text-[10px] font-black text-ww-brass">+${addon.price}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photo Upload & Crop */}
        <div>
          <label className="block text-xs font-bold text-ww-ink mb-1">Attach Before-Grooming Photo (Optional)</label>
          <PhotoUploadCrop onSaveCroppedPhoto={img => setUploadedPhoto(img)} />
        </div>

        {/* Notes input */}
        <div>
          <label className="block text-xs font-bold text-ww-ink mb-1">Special Grooming Instructions</label>
          <textarea
            rows={2}
            placeholder="e.g. Silver is sensitive around ears; use hypoallergenic shampoo..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full p-2.5 border border-ww-wood-light bg-ww-paper rounded-xl text-xs font-medium resize-none"
          />
        </div>

        {/* Coupon Code Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon Code (Try 'PAW20')"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            className="flex-1 px-3 py-2 border border-ww-wood-light bg-ww-paper rounded-xl text-xs font-semibold"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-3.5 py-2 bg-ww-paper-dark text-ww-ink font-bold text-xs rounded-xl hover:bg-ww-wood-light transition"
          >
            Apply
          </button>
        </div>

        {/* Price Breakdown */}
        <div className="bg-ww-paper-dark/60 p-3 rounded-2xl border border-ww-paper-dark space-y-1 text-xs">
          <div className="flex justify-between font-semibold text-ww-wood">
            <span>Base Grooming Service</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex justify-between font-semibold text-ww-wood">
              <span>Selected Add-ons</span>
              <span>+${addonsTotal.toFixed(2)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between font-bold text-emerald-700">
              <span>Coupon Discount ({discountPct}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-sm text-ww-ink pt-1 border-t border-ww-paper-dark">
            <span>Total Payable</span>
            <span className="text-ww-brass font-mono">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Stripe Integration Notice & CTA */}
        <div className="pt-2">
          <p className="text-[10px] text-ww-wood mb-3 text-center">
            🔒 Secured by Stripe Payment Gateway (Demo Mode)
          </p>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-ww-wood">
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isSuccess}
              className="px-6 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-warm-md hover:brightness-105 transition flex items-center gap-2"
            >
              {isSuccess ? '🎉 Confirmed!' : `Pay $${finalTotal.toFixed(2)} & Confirm`}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
