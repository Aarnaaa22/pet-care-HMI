// src/components/Appointments.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportAppointmentICS } from '../utils/pdf';

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt_1',
    petName: 'Silver',
    title: 'Annual General Wellness & Dental Checkup',
    doctor: 'Dr. Sarah Jenkins, DVM',
    location: 'Pawsome Care Pet Clinic',
    type: 'In-Clinic',
    date: '2026-09-18T10:00:00.000Z',
    status: 'Confirmed'
  },
  {
    id: 'apt_2',
    petName: 'Silver',
    title: 'Post-Dietary Consult Teleconsult',
    doctor: 'Dr. Michael Chang',
    location: 'PetCare Video Room',
    type: 'Teleconsult',
    date: '2026-09-25T14:30:00.000Z',
    status: 'Scheduled'
  }
];

export default function Appointments({ pet, appointments = [], onAddAppointment }) {
  const currentAppointments = appointments.length ? appointments : INITIAL_APPOINTMENTS;
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookSheetOpen, setIsBookSheetOpen] = useState(false);
  const [aptType, setAptType] = useState('Teleconsult');
  const [doctor, setDoctor] = useState('Dr. Sarah Jenkins, DVM');

  const AVAILABLE_SLOTS = [
    '09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '05:00 PM'
  ];

  const handleConfirmBooking = () => {
    if (!selectedSlot) return alert("Please select a time slot.");

    const newApt = {
      id: `apt_${Date.now()}`,
      petName: pet?.name || 'Silver',
      title: `${aptType} with ${doctor.split(',')[0]}`,
      doctor,
      location: aptType === 'Teleconsult' ? 'PetCare Video Room' : 'Pawsome Care Pet Clinic',
      type: aptType,
      date: `${selectedDate}T${selectedSlot.includes('PM') ? '14' : '10'}:00:00.000Z`,
      status: 'Confirmed'
    };

    onAddAppointment && onAddAppointment(newApt);
    exportAppointmentICS(newApt);
    setIsBookSheetOpen(false);
    setSelectedSlot(null);
    alert("🎉 Appointment Booked! ICS Calendar invitation downloaded.");
  };

  return (
    <div className="space-y-4">
      {/* Header & Quick Action */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
            📅
          </div>
          <div>
            <h2 className="font-extrabold text-base text-ww-ink">Veterinary Appointments &amp; Calendar</h2>
            <p className="text-xs text-ww-wood-dark">Book in-clinic vet visits or instant video teleconsultations.</p>
          </div>
        </div>

        <button
          onClick={() => setIsBookSheetOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1.5"
        >
          <span>+ Book Vet Appointment</span>
        </button>
      </div>

      {/* Upcoming Appointments List */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-ww-ink">Upcoming Scheduled Visits</h3>

        {currentAppointments.map(apt => (
          <div
            key={apt.id}
            className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md hover:border-ww-brass transition flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                apt.type === 'Teleconsult' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {apt.type === 'Teleconsult' ? '📹' : '🏥'}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-ww-ink">{apt.title}</h4>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    apt.type === 'Teleconsult'
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {apt.type}
                  </span>
                </div>

                <p className="text-xs font-semibold text-ww-wood mt-0.5">
                  📅 {new Date(apt.date).toLocaleString()} • {apt.doctor}
                </p>
                <p className="text-[10px] text-ww-wood-dark font-medium">📍 {apt.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => exportAppointmentICS(apt)}
                className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink text-xs font-bold rounded-xl transition flex items-center gap-1"
                title="Download .ICS for Apple/Google/Outlook Calendar"
              >
                📆 Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick-Book Bottom Sheet / Modal */}
      <AnimatePresence>
        {isBookSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-md w-full space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
                <h3 className="font-extrabold text-base text-ww-ink">Book Appointment for {pet?.name || 'Silver'}</h3>
                <button onClick={() => setIsBookSheetOpen(false)} className="font-bold text-ww-wood">✕</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Appointment Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAptType('Teleconsult')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        aptType === 'Teleconsult' ? 'bg-sky-600 text-white border-sky-600' : 'bg-ww-paper-dark text-ww-ink'
                      }`}
                    >
                      📹 Video Teleconsult
                    </button>
                    <button
                      type="button"
                      onClick={() => setAptType('In-Clinic Visit')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        aptType === 'In-Clinic Visit' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-ww-paper-dark text-ww-ink'
                      }`}
                    >
                      🏥 In-Clinic Visit
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Select Veterinarian</label>
                  <select
                    value={doctor}
                    onChange={e => setDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-bold"
                  >
                    <option value="Dr. Sarah Jenkins, DVM">Dr. Sarah Jenkins, DVM (Feline Specialist)</option>
                    <option value="Dr. Michael Chang, DVM">Dr. Michael Chang, DVM (General Vet)</option>
                    <option value="Dr. Elena Rostova, DVM">Dr. Elena Rostova, DVM (Dermatology)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Available Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {AVAILABLE_SLOTS.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition ${
                          selectedSlot === slot
                            ? 'bg-ww-brass text-white border-ww-brass'
                            : 'bg-ww-paper-dark/60 text-ww-ink hover:bg-ww-wood-light'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-ww-paper-dark">
                <button onClick={() => setIsBookSheetOpen(false)} className="px-4 py-2 text-xs font-bold text-ww-wood">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-5 py-2 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
                >
                  Confirm &amp; Export ICS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
