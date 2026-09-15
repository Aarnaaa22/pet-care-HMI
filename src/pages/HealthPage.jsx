// src/pages/HealthPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RecordsTimeline, { INITIAL_MOCK_RECORDS } from '../components/RecordsTimeline';
import MedicationManager, { INITIAL_MOCK_MEDS } from '../components/MedicationManager';
import Appointments, { INITIAL_APPOINTMENTS } from '../components/Appointments';
import Teleconsult from '../components/Teleconsult';
import PrescriptionBuilder from '../components/PrescriptionBuilder';
import HealthDashboard from '../components/HealthDashboard';
import { generatePatientPackPDF } from '../utils/pdf';

export default function HealthPage({ pet }) {
  const currentPet = pet || {
    id: 'silver',
    name: 'Silver',
    type: 'cat',
    breed: 'Silver Tabby',
    weightKg: 4.2,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
  };

  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'meds' | 'appointments' | 'teleconsult' | 'dashboard'
  const [records, setRecords] = useState(INITIAL_MOCK_RECORDS);
  const [meds, setMeds] = useState(INITIAL_MOCK_MEDS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  // E-Prescription Modal State
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [rxInitialNotes, setRxInitialNotes] = useState('');

  const handleAddRecord = (newRec) => {
    setRecords(prev => [newRec, ...prev]);
  };

  const handleAddMed = (newMed) => {
    setMeds(prev => [newMed, ...prev]);
  };

  const handleAddAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const handleOpenRxBuilder = (notes = '') => {
    setRxInitialNotes(notes);
    setIsRxModalOpen(true);
  };

  const handleSaveRxRecord = (recPayload) => {
    setRecords(prev => [recPayload, ...prev]);
    setActiveTab('timeline');
    alert("🎉 E-Prescription signed and attached to Medical Timeline!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Lead Pet Profile Header */}
      <section
        className="rounded-3xl p-6 sm:p-8 shadow-warm-md relative overflow-hidden bg-gradient-to-br from-[#EBF8EE] to-[#DCEBE0] border border-[#7BD389]/50 border-l-[8px] border-l-[#7BD389]"
      >
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentPet.avatar || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'}
              alt={currentPet.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-ww-brass shadow-warm-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#EBF8EE] border border-[#7BD389]/50 text-[#23402E] px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide shadow-sm">Pet Health Care</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Fully Vaccinated
                </span>
              </div>
              <h1 className="font-kalam text-3xl sm:text-4xl leading-tight text-ww-ink mt-1">
                Medical Records &amp; Health Hub for {currentPet.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-ww-wood-dark mt-0.5">
                {currentPet.breed} • {currentPet.weightKg || 4.2} kg • Microchip #984210098 • Active Insurance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenRxBuilder()}
              className="px-4 py-2.5 bg-[#EBF8EE] border border-[#7BD389]/50 hover:bg-[#7BD389] hover:text-white text-[#23402E] rounded-2xl text-xs font-extrabold shadow-sm transition flex items-center gap-1.5"
            >
              ✍️ Sign E-Prescription
            </button>
            <button
              onClick={() => generatePatientPackPDF(currentPet, records, meds)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#7BD389] to-[#5BB369] text-white font-extrabold text-xs rounded-2xl shadow-warm-md hover:brightness-105 transition flex items-center gap-1.5"
            >
              📦 Patient Pack PDF
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-ww-paper-dark pb-1 overflow-x-auto">
        {[
          { id: 'timeline', label: '📋 Medical Records', count: records.length },
          { id: 'meds', label: '💊 Medications', count: meds.length },
          { id: 'appointments', label: '📅 Vet Appointments', count: appointments.length },
          { id: 'teleconsult', label: '📹 Teleconsult Room' },
          { id: 'dashboard', label: '📊 Health Dashboard & Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#7BD389] text-white shadow-warm-sm'
                : 'text-[#DCEBE0] hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/20 text-[#DCEBE0]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Views */}
      {activeTab === 'timeline' && (
        <RecordsTimeline
          pet={currentPet}
          records={records}
          onAddRecord={handleAddRecord}
        />
      )}

      {activeTab === 'meds' && (
        <MedicationManager
          pet={currentPet}
          meds={meds}
          onAddMed={handleAddMed}
          onUpdateMeds={setMeds}
        />
      )}

      {activeTab === 'appointments' && (
        <Appointments
          pet={currentPet}
          appointments={appointments}
          onAddAppointment={handleAddAppointment}
          onJoinTeleconsult={() => setActiveTab('teleconsult')}
        />
      )}

      {activeTab === 'teleconsult' && (
        <Teleconsult
          pet={currentPet}
          onOpenPrescriptionBuilder={handleOpenRxBuilder}
        />
      )}

      {activeTab === 'dashboard' && (
        <HealthDashboard
          pet={currentPet}
          records={records}
          meds={meds}
        />
      )}

      {/* E-Prescription Builder Modal */}
      <PrescriptionBuilder
        isOpen={isRxModalOpen}
        onClose={() => setIsRxModalOpen(false)}
        pet={currentPet}
        initialNotes={rxInitialNotes}
        onSavePrescription={handleSaveRxRecord}
      />
    </div>
  );
}
