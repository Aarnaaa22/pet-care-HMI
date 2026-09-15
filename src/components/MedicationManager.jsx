// src/components/MedicationManager.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { scanPrescriptionOCR } from '../utils/ocr';
import { requestPermission, scheduleReminder } from '../utils/notify';

export const INITIAL_MOCK_MEDS = [
  {
    id: 'med_1',
    name: 'Amoxicillin Trihydrate',
    dosage: '50mg',
    frequency: 'Twice Daily',
    time: '08:00',
    refillThreshold: 5,
    remainingDoses: 12,
    totalDoses: 20,
    startDate: '2026-09-10',
    endDate: '2026-09-20',
    lastTaken: '2026-09-13T20:00:00.000Z',
    notes: 'Administer with morning & evening meal for Silver.'
  },
  {
    id: 'med_2',
    name: 'Revolution Plus Feline',
    dosage: '2.5kg - 5kg Topical',
    frequency: 'Monthly',
    time: '09:00',
    refillThreshold: 1,
    remainingDoses: 2,
    totalDoses: 6,
    startDate: '2026-08-01',
    endDate: '2027-02-01',
    lastTaken: '2026-09-01T09:00:00.000Z',
    notes: 'Apply topically on skin behind neck.'
  }
];

export default function MedicationManager({ pet, meds = [], onAddMed, onUpdateMeds }) {
  const currentMeds = meds.length ? meds : INITIAL_MOCK_MEDS;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Twice Daily');
  const [time, setTime] = useState('08:00');
  const [refillThreshold, setRefillThreshold] = useState(5);
  const [totalDoses, setTotalDoses] = useState(20);
  const [notes, setNotes] = useState('');

  const handleMarkAsTaken = (medId) => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}

    const updated = currentMeds.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          remainingDoses: Math.max(0, m.remainingDoses - 1),
          lastTaken: new Date().toISOString()
        };
      }
      return m;
    });

    onUpdateMeds && onUpdateMeds(updated);
  };

  const handleSnooze = (medName) => {
    scheduleReminder(15 * 60 * 1000, `Snoozed Medication Reminder`, `Time to give ${pet?.name || 'Silver'} ${medName}!`);
    alert(`Snoozed ${medName} for 15 minutes. Notification scheduled!`);
  };

  const handleOcrScan = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOcrScanning(true);
    setOcrSuccess(false);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = await scanPrescriptionOCR(reader.result);
        setName(result.suggestedName);
        setDosage(result.suggestedDosage);
        setFrequency(result.suggestedFrequency);
        setIsOcrScanning(false);
        setOcrSuccess(true);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn("OCR failure:", err);
      setIsOcrScanning(false);
    }
  };

  const handleSaveMed = (e) => {
    e.preventDefault();
    if (!name || !dosage) return alert("Please fill in medication name and dosage.");

    const newMed = {
      id: `med_${Date.now()}`,
      name,
      dosage,
      frequency,
      time,
      refillThreshold: Number(refillThreshold),
      remainingDoses: Number(totalDoses),
      totalDoses: Number(totalDoses),
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-10-30',
      lastTaken: null,
      notes
    };

    onAddMed && onAddMed(newMed);
    setIsAddModalOpen(false);

    // Reset Form
    setName('');
    setDosage('');
    setNotes('');
    setOcrSuccess(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Toolbar */}
      <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
            💊
          </div>
          <div>
            <h2 className="font-extrabold text-base text-ww-ink">Active Prescription &amp; Meds Manager</h2>
            <p className="text-xs text-ww-wood-dark">Track refill thresholds, dosage schedules, and dose confirmations.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => requestPermission()}
            className="px-3.5 py-1.5 bg-[#EBF8EE]-dark hover:bg-ww-wood-light text-ww-ink font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            🔔 Enable Med Notifications
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1"
          >
            + Add Medication
          </button>
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentMeds.map(med => {
          const isLowSupply = med.remainingDoses <= med.refillThreshold;

          return (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#EBF8EE] border-2 rounded-2xl p-5 shadow-warm-md relative overflow-hidden transition ${
                isLowSupply ? 'border-amber-400 bg-amber-50/20' : 'border-ww-paper-dark hover:border-ww-brass'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-extrabold text-base text-ww-ink flex items-center gap-2">
                    <span>💊</span> {med.name}
                  </h3>
                  <p className="text-xs font-semibold text-ww-wood mt-0.5">
                    Dosage: <strong className="text-ww-ink">{med.dosage}</strong> • Frequency: {med.frequency}
                  </p>
                </div>

                {isLowSupply && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                    ⚠️ Low Supply ({med.remainingDoses} doses left)
                  </span>
                )}
              </div>

              {med.notes && (
                <p className="text-xs text-ww-wood-dark font-medium bg-[#EBF8EE]-dark/40 p-2.5 rounded-xl border border-ww-paper-dark my-2">
                  "{med.notes}"
                </p>
              )}

              {/* Progress Bar for Supply */}
              <div className="space-y-1 my-3">
                <div className="flex justify-between text-[10px] font-bold text-ww-wood">
                  <span>Supply Remaining</span>
                  <span>{med.remainingDoses} / {med.totalDoses} doses</span>
                </div>
                <div className="w-full bg-[#EBF8EE]-dark rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isLowSupply ? 'bg-amber-500' : 'bg-ww-brass'
                    }`}
                    style={{ width: `${Math.max(5, (med.remainingDoses / med.totalDoses) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Dose Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-ww-paper-dark">
                <span className="text-[10px] font-bold text-ww-wood">
                  ⏰ Next Scheduled Dose: <strong className="text-ww-ink font-mono">{med.time}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSnooze(med.name)}
                    className="px-2.5 py-1.5 bg-[#EBF8EE]-dark hover:bg-ww-wood-light text-ww-wood-dark text-xs font-bold rounded-xl transition"
                    title="Snooze reminder for 15 minutes"
                  >
                    ⏰ Snooze 15m
                  </button>
                  <button
                    onClick={() => handleMarkAsTaken(med.id)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center gap-1"
                  >
                    ✓ Mark as Taken
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Medication Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#EBF8EE] border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-md w-full max-h-[90vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  <h3 className="font-extrabold text-base text-ww-ink">Add Medication for {pet?.name || 'Silver'}</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="font-bold text-ww-wood">✕</button>
              </div>

              {/* OCR Scan Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-xs text-emerald-900">📷 Smart Prescription OCR Scan</h4>
                  <p className="text-[10px] text-emerald-700">Scan prescription image to auto-fill medication name &amp; dosage.</p>
                </div>
                <label className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl cursor-pointer transition shadow-sm shrink-0">
                  {isOcrScanning ? 'Scanning...' : 'Scan Rx Photo'}
                  <input type="file" accept="image/*" onChange={handleOcrScan} className="hidden" />
                </label>
              </div>

              {ocrSuccess && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-100 p-2 rounded-xl">
                  ✨ Prescription parsed! Auto-filled medication details below.
                </p>
              )}

              <form onSubmit={handleSaveMed} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Medication Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amoxicillin Trihydrate"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-semibold focus:ring-2 focus:ring-ww-brass"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Dosage</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50mg"
                      value={dosage}
                      onChange={e => setDosage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Frequency</label>
                    <select
                      value={frequency}
                      onChange={e => setFrequency(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-bold"
                    >
                      <option value="Once Daily">Once Daily</option>
                      <option value="Twice Daily">Twice Daily</option>
                      <option value="Every 8 Hours">Every 8 Hours</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Total Doses Supply</label>
                    <input
                      type="number"
                      value={totalDoses}
                      onChange={e => setTotalDoses(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Refill Threshold</label>
                    <input
                      type="number"
                      value={refillThreshold}
                      onChange={e => setRefillThreshold(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Instructions / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Administer with meals..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-medium resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-ww-paper-dark">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-bold text-ww-wood">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition">
                    Save Medication
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
