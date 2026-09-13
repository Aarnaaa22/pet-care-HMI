import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, service, pet }) {
  const [selectedDate, setSelectedDate] = useState('Today, Sep 13');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleConfirm = () => {
    setBookingConfirmed(true);
    if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  const resetAndClose = () => { setBookingConfirmed(false); onClose(); };

  const chipBase = 'py-2.5 px-3 rounded-md text-xs font-extrabold border min-h-[44px] transition cursor-pointer';
  const chipActive = 'text-white';
  const chipIdle   = '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-0 sm:p-4 animate-fadeIn"
      style={{ backgroundColor: 'rgba(26,48,34,0.65)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-t-[20px] sm:rounded-md shadow-warm-lg max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--paper)', border: '2px solid var(--wood-dark)' }}
      >
        {/* Booking Pad Staple */}
        <div style={{ height: '10px', background: 'repeating-linear-gradient(90deg, var(--brass) 0 3px, transparent 3px 12px)', borderRadius: '0 0 4px 4px', margin: '0 16px' }} />

        <div className="p-6">
          {/* Mobile Grab Handle */}
          <div className="w-10 h-1.5 rounded-full mx-auto mb-4 sm:hidden" style={{ backgroundColor: 'var(--wood-light)' }} />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: '1px dashed var(--paper-dark)' }}>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider font-nunito" style={{ color: 'var(--brass)' }}>Booking Preview</span>
              <h3 id="booking-modal-title" className="font-kalam text-xl" style={{ color: 'var(--ink)' }}>{service.name}</h3>
            </div>
            <button
              onClick={resetAndClose}
              className="w-9 h-9 rounded-md flex items-center justify-center text-lg min-h-[44px] min-w-[44px] transition"
              style={{ backgroundColor: 'var(--paper-dark)', border: '1px solid var(--wood)', color: 'var(--ink)' }}
              aria-label="Close modal"
            >✕</button>
          </div>

          {bookingConfirmed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full text-3xl flex items-center justify-center mx-auto shadow-warm-md animate-bob"
                style={{ backgroundColor: 'var(--paper-dark)', border: '2px solid var(--wood)' }}>🎉</div>
              <h4 className="font-kalam text-2xl" style={{ color: 'var(--ink)' }}>Booking Confirmed!</h4>
              <p className="text-xs leading-relaxed max-w-xs mx-auto font-nunito" style={{ color: 'var(--wood-dark)' }}>
                Appointment booked for <strong style={{ color: 'var(--ink)' }}>{pet.name}</strong> at <strong style={{ color: 'var(--ink)' }}>{service.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
              </p>
              <div className="p-3 rounded-md text-xs font-semibold" style={{ backgroundColor: 'var(--paper-dark)', color: 'var(--wood-dark)' }}>
                Confirmation SMS &amp; Calendar Invite dispatched.
              </div>
              <button onClick={resetAndClose} className="press-btn w-full py-3.5 rounded-md min-h-[44px]">
                Done &amp; Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Service Summary */}
              <div className="p-4 rounded-md flex items-center justify-between" style={{ backgroundColor: 'rgba(200,155,60,0.12)', border: '1.5px solid rgba(200,155,60,0.35)' }}>
                <div>
                  <span className="text-xs font-semibold block font-nunito" style={{ color: 'var(--wood)' }}>Service Type</span>
                  <span className="font-extrabold text-sm font-nunito" style={{ color: 'var(--ink)' }}>{service.priceDetail}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold block font-nunito" style={{ color: 'var(--wood)' }}>Total Amount</span>
                  <span className="font-kalam text-xl" style={{ color: 'var(--awning)' }}>{service.price}</span>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <label className="text-xs font-bold block mb-2 font-nunito" style={{ color: 'var(--wood-dark)' }}>Select Date</label>
                <div className="flex gap-2">
                  {['Today, Sep 13', 'Tomorrow, Sep 14', 'Tue, Sep 15'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`flex-1 ${chipBase} ${selectedDate === d ? chipActive : ''}`}
                      style={selectedDate === d
                        ? { backgroundColor: 'var(--awning)', borderColor: 'var(--awning-dark)', color: '#fff', boxShadow: '0 4px 0 var(--awning-dark)' }
                        : { backgroundColor: 'var(--paper-dark)', borderColor: 'var(--wood)', color: 'var(--ink)' }}
                    >{d}</button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold block mb-2 font-nunito" style={{ color: 'var(--wood-dark)' }}>Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-md text-xs font-extrabold border min-h-[44px] transition ${selectedSlot === slot ? chipActive : ''}`}
                      style={selectedSlot === slot
                        ? { backgroundColor: 'var(--brass)', borderColor: 'var(--brass-dark)', color: 'var(--ink)', boxShadow: '0 3px 0 var(--brass-dark)' }
                        : { backgroundColor: 'var(--paper-dark)', borderColor: 'var(--wood)', color: 'var(--ink)' }}
                    >{slot}</button>
                  ))}
                </div>
              </div>

              {/* Confirm CTA */}
              <div className="pt-2">
                <button onClick={handleConfirm} className="press-btn w-full py-3.5 rounded-md min-h-[44px] text-sm">
                  Confirm Booking — {service.price}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
