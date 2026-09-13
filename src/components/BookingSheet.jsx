import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BookingSheet({ service, pet = { name: 'Silver' }, isOpen, onClose }) {
  const [selectedService, setSelectedService] = useState('Wellness Checkup & Consultation');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Smith (DVM)');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Sep 15');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen || !service) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);

      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111827]/50 backdrop-blur-sm p-0 sm:p-4">
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
          <div>
            <span className="text-xs font-bold text-[#7BD389] uppercase tracking-wider block">Quick Appointment</span>
            <h3 className="font-extrabold text-lg text-[#111827]">Book with {service.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] text-[#8E9890] flex items-center justify-center text-base hover:text-[#111827]"
          >
            ✕
          </button>
        </div>

        {bookingConfirmed ? (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#EBF8EE] text-[#7BD389] text-3xl flex items-center justify-center mx-auto shadow-soft-md animate-bounce">
              🎉
            </div>
            <div>
              <span className="text-xs font-bold text-[#7BD389] uppercase block">Booking Confirmed!</span>
              <h4 className="font-extrabold text-xl text-[#111827] mt-1">See You {selectedDate}!</h4>
              <p className="text-xs text-[#525C54] mt-1">
                Appointment for <strong>{pet.name}</strong> with <strong>{selectedDoctor}</strong> at <strong>{selectedSlot}</strong>.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#EBF8EE] p-4 rounded-2xl text-xs space-y-1.5 text-left font-semibold text-[#525C54]">
              <div className="flex justify-between"><span>Provider:</span><strong className="text-[#111827]">{service.name}</strong></div>
              <div className="flex justify-between"><span>Service:</span><strong className="text-[#111827]">{selectedService}</strong></div>
              <div className="flex justify-between"><span>Fee Payable at Clinic:</span><strong className="text-[#7BD389]">{service.price}</strong></div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => alert("Added to your Google & Apple Calendar! 📅")}
                className="w-full bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#111827] font-extrabold text-xs py-3 rounded-pill min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>📅 Add to Calendar</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#7BD389] text-white font-extrabold text-xs py-3.5 rounded-pill shadow-soft-sm min-h-[44px]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleConfirm} className="space-y-4 text-xs font-semibold">
            
            {/* Active Pet Card */}
            <div className="bg-[#EBF8EE] border border-[#7BD389]/30 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🐱</span>
                <div>
                  <span className="font-extrabold text-xs text-[#111827] block">Patient: {pet.name}</span>
                  <span className="text-[10px] text-[#525C54] font-bold">{pet.breed || 'Silver Tabby Cat'}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-white text-[#7BD389] px-2.5 py-1 rounded-pill">Active Pet</span>
            </div>

            {/* Select Doctor / Staff */}
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Select Provider / Specialist</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-2.5 font-bold text-[#111827]"
              >
                {(service.doctors || ['Dr. Sarah Smith (DVM)', 'Dr. Rahul Patel']).map((doc, idx) => (
                  <option key={idx} value={doc}>{doc}</option>
                ))}
              </select>
            </div>

            {/* Select Available Date & Slots */}
            <div>
              <label className="font-bold text-[#525C54] block mb-1.5">Select Time Slot for {selectedDate}</label>
              <div className="grid grid-cols-4 gap-2">
                {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 rounded-xl font-extrabold text-xs border text-center transition ${
                      selectedSlot === slot
                        ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                        : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#525C54] hover:border-[#7BD389]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Notes for Clinic (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Silver is timid with strangers..."
                className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-2.5 font-medium text-[#111827]"
              />
            </div>

            {/* Price Summary & Confirm Button */}
            <div className="pt-2 border-t border-[#DCEBE0]">
              <div className="flex justify-between items-center mb-3">
                <span className="font-extrabold text-sm text-[#111827]">Estimated Consultation Fee:</span>
                <span className="font-extrabold text-base text-[#7BD389]">{service.price}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[46px] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Appointment...</span>
                  </span>
                ) : (
                  <span>Confirm Appointment →</span>
                )}
              </button>
            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
}
