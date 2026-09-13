// src/components/PrescriptionBuilder.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateEPrescriptionPDF } from '../utils/pdf';
import { scheduleReminder } from '../utils/notify';

export default function PrescriptionBuilder({ isOpen, onClose, pet, initialNotes = '', onSavePrescription }) {
  if (!isOpen) return null;

  const [medName, setMedName] = useState('Amoxicillin Trihydrate');
  const [dosage, setDosage] = useState('50mg oral tablet');
  const [frequency, setFrequency] = useState('Twice daily for 7 days');
  const [refillThreshold, setRefillThreshold] = useState('1 Refill allowed');
  const [notes, setNotes] = useState(initialNotes || 'Administer with food morning and evening.');

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Signature Canvas Event Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E3A8A';
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
  };

  const handleGeneratePdf = () => {
    const canvas = canvasRef.current;
    const signatureDataUrl = canvas && hasSignature ? canvas.toDataURL('image/png') : '';

    const rxData = {
      petName: pet?.name || 'Silver',
      ownerName: 'Pet Parent',
      weightKg: pet?.weightKg || 4.2,
      medName,
      dosage,
      frequency,
      refillThreshold,
      notes
    };

    const doc = generateEPrescriptionPDF(rxData, signatureDataUrl);

    // Schedule automated refill reminder notification demo
    scheduleReminder(
      10 * 1000,
      `Refill Reminder: ${medName}`,
      `Time to order refill for ${pet?.name || 'Silver'}'s ${medName} prescription!`
    );

    if (onSavePrescription) {
      onSavePrescription({
        title: `Prescription: ${medName}`,
        date: new Date().toISOString().slice(0, 10),
        provider: 'Dr. Sarah Jenkins, DVM (E-Signed)',
        type: 'vaccine',
        notes: `E-Prescription issued for ${medName} (${dosage}). Refill reminder scheduled!`,
        attachments: [
          {
            id: `att_rx_${Date.now()}`,
            name: `E_Prescription_${medName.replace(/\s+/g, '_')}.pdf`,
            type: 'pdf',
            size: '115 KB',
            url: doc.output('bloburl')
          }
        ]
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              <h3 className="font-extrabold text-base text-ww-ink">
                E-Prescription Builder &amp; Digital Signature
              </h3>
            </div>
            <button onClick={onClose} className="font-bold text-ww-wood">✕</button>
          </div>

          {/* Rx Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-ww-ink mb-1">Medication Name</label>
              <input
                type="text"
                value={medName}
                onChange={e => setMedName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold focus:ring-2 focus:ring-ww-brass"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ww-ink mb-1">Dosage &amp; Form</label>
                <input
                  type="text"
                  value={dosage}
                  onChange={e => setDosage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ww-ink mb-1">Frequency</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={e => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ww-ink mb-1">Prescription Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-medium resize-none"
              />
            </div>

            {/* Signature Pad */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-ww-ink">
                  Veterinarian Authorized Signature (Draw below)
                </label>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-[10px] text-ww-wood hover:text-rose-600 font-bold"
                >
                  Clear Signature
                </button>
              </div>

              <div className="border-2 border-dashed border-ww-brass rounded-2xl bg-white overflow-hidden shadow-inner cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={110}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-28 touch-none"
                />
              </div>
              <p className="text-[10px] text-ww-wood mt-1">
                {hasSignature ? '✓ Signature captured' : 'Draw veterinarian signature above using mouse or touch.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-ww-paper-dark">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-ww-wood">
              Cancel
            </button>
            <button
              onClick={handleGeneratePdf}
              className="px-5 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1.5"
            >
              <span>📄 Generate Signed PDF &amp; Push Refill Reminder</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
