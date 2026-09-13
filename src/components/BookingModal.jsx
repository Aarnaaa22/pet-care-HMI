import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, service, pet }) {
  const [selectedDate, setSelectedDate] = useState('Today, Sep 13');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Accessible ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleConfirm = () => {
    setBookingConfirmed(true);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const resetAndClose = () => {
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/50 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Modal Container: Mobile Bottom Sheet (full-width bottom) vs Desktop Centered Modal */}
      <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card shadow-soft-lg border border-[#DCEBE0] p-6 max-h-[90vh] overflow-y-auto transform transition-all">
        
        {/* Mobile Grab Handle */}
        <div className="w-10 h-1.5 bg-[#8E9890]/30 rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DCEBE0] mb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#7BD389] tracking-wider">Booking Preview</span>
            <h3 id="booking-modal-title" className="font-extrabold text-lg text-[#2A2F2B]">{service.name}</h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#DCEBE0] flex items-center justify-center text-lg text-[#8E9890] hover:text-[#2A2F2B] min-h-[44px] min-w-[44px]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {bookingConfirmed ? (
          /* Confirmation Success View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF8EE] text-[#7BD389] text-3xl flex items-center justify-center mx-auto shadow-soft-md animate-bounce">
              🎉
            </div>
            <h4 className="font-extrabold text-xl text-[#2A2F2B]">Booking Confirmed!</h4>
            <p className="text-xs text-[#525C54] leading-relaxed max-w-xs mx-auto">
              Appointment booked for <strong className="text-[#2A2F2B]">{pet.name}</strong> at <strong className="text-[#2A2F2B]">{service.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
            </p>
            <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EBF8EE] text-xs font-semibold text-[#8E9890]">
              Confirmation SMS & Calendar Invite dispatched.
            </div>
            <button
              onClick={resetAndClose}
              className="w-full bg-[#7BD389] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md min-h-[44px]"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          /* Booking Form Flow */
          <div className="space-y-5">
            {/* Service & Price Summary Box */}
            <div className="bg-[#EBF8EE] p-4 rounded-2xl border border-[#7BD389]/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#525C54] block">Service Type</span>
                <span className="font-extrabold text-sm text-[#2A2F2B]">{service.priceDetail}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#525C54] block">Total Amount</span>
                <span className="font-extrabold text-lg text-[#7BD389]">{service.price}</span>
              </div>
            </div>

            {/* Date Selector */}
            <div>
              <label className="text-xs font-bold text-[#525C54] block mb-2">Select Date</label>
              <div className="flex gap-2">
                {['Today, Sep 13', 'Tomorrow, Sep 14', 'Tue, Sep 15'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`flex-1 py-2.5 px-3 rounded-pill text-xs font-extrabold border min-h-[44px] transition ${
                      selectedDate === d
                        ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                        : 'bg-[#FAF9F6] text-[#525C54] border-[#DCEBE0] hover:border-[#7BD389]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="text-xs font-bold text-[#525C54] block mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border min-h-[44px] transition ${
                      selectedSlot === slot
                        ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                        : 'bg-[#FAF9F6] text-[#525C54] border-[#DCEBE0] hover:border-[#7BD389]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm CTA */}
            <div className="pt-2">
              <button
                onClick={handleConfirm}
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px] text-sm"
              >
                Confirm Booking — {service.price}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
