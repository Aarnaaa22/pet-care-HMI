// src/components/RecordsTimeline.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadViewer from './UploadViewer';
import { encryptHealthRecord, decryptHealthRecord } from '../utils/security';

export const INITIAL_MOCK_RECORDS = [
  {
    id: 'rec_1',
    type: 'vaccine',
    title: 'FVRCP & Rabies Booster',
    date: '2026-08-10',
    provider: 'Dr. Sarah Jenkins, DVM (Pawsome Vet)',
    notes: 'Silver was well-behaved. Annual core feline viral booster administered.',
    encrypted: false,
    attachments: [
      {
        id: 'att_v1',
        name: 'FVRCP_Vaccine_Certificate.pdf',
        type: 'pdf',
        size: '142 KB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    ]
  },
  {
    id: 'rec_2',
    type: 'lab',
    title: 'Feline Comprehensive Blood Panel',
    date: '2026-06-15',
    provider: 'Central Veterinary Diagnostics Lab',
    notes: 'CBC and Kidney function levels normal. BUN and Creatinine within optimal range.',
    encrypted: false,
    attachments: [
      {
        id: 'att_l1',
        name: 'Blood_Panel_Report.jpg',
        type: 'image',
        size: '88 KB',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'rec_3',
    type: 'surgery',
    title: 'Spay Procedure & Microchip Insertion',
    date: '2025-11-04',
    provider: 'Metropolitan Pet Hospital',
    notes: 'Routine spay surgery completed smoothly. Microchip #984210098 inserted between shoulder blades.',
    encrypted: false,
    attachments: []
  },
  {
    id: 'rec_4',
    type: 'allergy',
    title: 'Mild Environmental Dust Mite Sensitivity',
    date: '2025-09-20',
    provider: 'Dr. Michael Chang (Dermatology Specialist)',
    notes: 'Mild seasonal skin allergy. Prescribed hypoallergenic shampoo rinse.',
    encrypted: false,
    attachments: []
  }
];

export default function RecordsTimeline({ pet, records = [], onAddRecord, onDeleteRecord, isLoading = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [newType, setNewType] = useState('vaccine');
  const [newTitle, setNewTitle] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [newNotes, setNewNotes] = useState('');
  const [newAttachments, setNewAttachments] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareRecord = (data) => {
    const shareUrl = `https://petcare.app/medical-record/${data.id}?access=sec_link_984`;
    navigator.clipboard.writeText(shareUrl);
    showToast(`📋 Record link for "${data.title}" copied to clipboard!`);
  };

  const filtered = (records.length ? records : INITIAL_MOCK_RECORDS).filter(rec => {
    if (activeFilter === 'all') return true;
    return rec.type === activeFilter;
  });

  const handleCreateRecord = (e) => {
    e.preventDefault();
    if (!newTitle) return alert("Please enter a record title.");

    const rawPayload = {
      id: `rec_${Date.now()}`,
      type: newType,
      title: newTitle,
      date: newDate,
      provider: newProvider || 'Veterinary Clinic',
      notes: newNotes,
      attachments: newAttachments
    };

    const finalRecord = encryptionEnabled ? encryptHealthRecord(rawPayload) : rawPayload;
    onAddRecord && onAddRecord(finalRecord);
    showToast("🎉 Medical record added to timeline!");

    // Reset Form
    setNewTitle('');
    setNewProvider('');
    setNewNotes('');
    setNewAttachments([]);
    setIsAddModalOpen(false);
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'vaccine': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'lab': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'surgery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'allergy': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-ww-paper-dark text-ww-wood-dark border-ww-paper-dark';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vaccine': return '💉';
      case 'lab': return '🔬';
      case 'surgery': return '🩺';
      case 'allergy': return '🌿';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-ww-ink text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-warm-lg flex items-center gap-2 border border-ww-brass"
          >
            <span>✨</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Toolbar & Controls */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'vaccine', label: '💉 Vaccinations' },
            { id: 'lab', label: '🔬 Lab Results' },
            { id: 'surgery', label: '🩺 Surgeries' },
            { id: 'allergy', label: '🌿 Allergies' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-ww-brass text-white shadow-sm'
                  : 'bg-ww-paper-dark/60 text-ww-wood-dark hover:bg-ww-wood-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* AES Encryption Toggle */}
          <button
            onClick={() => setEncryptionEnabled(!encryptionEnabled)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 ${
              encryptionEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-ww-paper-dark text-ww-wood border-ww-paper-dark'
            }`}
          >
            <span>{encryptionEnabled ? '🔒 AES Encrypted' : '🔓 Unencrypted'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1"
          >
            <span>+ Add Record</span>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-5 shadow-warm-sm animate-pulse space-y-3">
              <div className="w-44 h-4 bg-ww-paper-dark rounded" />
              <div className="w-full h-12 bg-ww-paper-dark rounded-xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-10 text-center shadow-warm-sm">
          <span className="text-3xl">📋</span>
          <p className="text-xs font-extrabold text-ww-ink mt-2">No medical records in this category.</p>
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-ww-brass/40 space-y-6 my-2">
          {filtered.map(rec => {
            const data = rec.encrypted ? decryptHealthRecord(rec) : rec;

            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-ww-paper border border-ww-paper-dark rounded-2xl p-5 shadow-warm-md hover:border-ww-brass transition group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-ww-brass border-4 border-ww-paper shadow-sm" />

                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(data.type)}</span>
                      <h3 className="font-extrabold text-base text-ww-ink group-hover:text-ww-brass transition">
                        {data.title}
                      </h3>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getBadgeColor(data.type)}`}>
                        {data.type?.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-ww-wood mt-0.5">
                      📅 {data.date} • {data.provider}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareRecord(data)}
                      className="px-3 py-1 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink text-xs font-bold rounded-xl transition flex items-center gap-1"
                      title="Share Record Link"
                    >
                      🔗 Share
                    </button>
                    {rec.encrypted && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        🔒 Encrypted Record
                      </span>
                    )}
                  </div>
                </div>

                {data.notes && (
                  <p className="text-xs text-ww-wood-dark font-medium bg-ww-paper-dark/40 p-3 rounded-xl border border-ww-paper-dark mb-3">
                    "{data.notes}"
                  </p>
                )}

                {/* Attachments Section */}
                {data.attachments && data.attachments.length > 0 && (
                  <div className="pt-2 border-t border-ww-paper-dark">
                    <span className="text-[10px] uppercase font-bold text-ww-wood block mb-1.5">
                      Attachments &amp; Lab Reports ({data.attachments.length})
                    </span>
                    <UploadViewer attachments={data.attachments} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Record Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  <h3 className="font-extrabold text-base text-ww-ink">Add Medical Record for {pet?.name || 'Silver'}</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="font-bold text-ww-wood">✕</button>
              </div>

              <form onSubmit={handleCreateRecord} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Record Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-bold focus:ring-2 focus:ring-ww-brass"
                  >
                    <option value="vaccine">💉 Vaccination</option>
                    <option value="lab">🔬 Lab Results / Blood Panel</option>
                    <option value="surgery">🩺 Surgery / Medical Procedure</option>
                    <option value="allergy">🌿 Allergy &amp; Sensitivity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Record Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual FVRCP Vaccine"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold focus:ring-2 focus:ring-ww-brass"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ww-ink mb-1">Provider / Clinic</label>
                    <input
                      type="text"
                      placeholder="Dr. Jenkins / Pawsome Vet"
                      value={newProvider}
                      onChange={e => setNewProvider(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Medical Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Diagnosis details, instructions, or findings..."
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-ww-paper text-xs font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ww-ink mb-1">Attachments (Images/PDFs)</label>
                  <UploadViewer
                    attachments={newAttachments}
                    onAddAttachment={att => setNewAttachments(prev => [...prev, att])}
                    onDeleteAttachment={id => setNewAttachments(prev => prev.filter(a => a.id !== id))}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-ww-paper-dark">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-ww-wood"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
                  >
                    Save Medical Record
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
