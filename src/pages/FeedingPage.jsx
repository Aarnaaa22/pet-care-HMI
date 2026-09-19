import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import LogFeedingModal from '../components/LogFeedingModal';
import ScheduleManager from '../components/ScheduleManager';
import HistoryTimeline from '../components/HistoryTimeline';
import AnalyticsPanel from '../components/AnalyticsPanel';
import { getFeedingLogs, logFeeding, deleteFeedingLog, getSchedules } from '../api/feedingApi';
import { exportFeedPDF } from '../utils/exportPdf';
import { PETS_MOCK } from '../mockData';

export default function FeedingPage({ pet = PETS_MOCK.silver, onUpdatePet }) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'schedules' | 'analytics'
  const [logs, setLogs] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Fetch mock data on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedLogs = await getFeedingLogs(pet.id);
      const fetchedSchedules = await getSchedules(pet.id);
      setLogs(fetchedLogs);
      setSchedules(fetchedSchedules);
      setLoading(false);
    }
    loadData();
  }, [pet.id]);

  // Handle Quick Feed Action (Small 25g, Medium 50g, Large 100g)
  const handleQuickFeed = async (grams, label) => {
    const payload = {
      petId: pet.id || 'silver',
      foodType: 'Organic Salmon Kibble',
      amountGrams: grams,
      notes: `Quick feed (${label})`
    };

    const newLog = await logFeeding(payload);
    setLogs((prev) => [newLog, ...prev]);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    alert(`🎉 Quick Feed logged: ${grams}g (${label}) for ${pet.name}!`);
  };

  // Handle Save from Log Modal
  const handleSaveMeal = async (payload) => {
    const newLog = await logFeeding(payload);
    setLogs((prev) => [newLog, ...prev]);
  };

  // Handle Delete Log
  const handleDeleteLog = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal record?")) {
      await deleteFeedingLog(id);
      setLogs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle Add Schedule
  const handleAddSchedule = (newSchedule) => {
    setSchedules((prev) => [newSchedule, ...prev]);
  };

  // Handle Toggle Schedule
  const handleToggleSchedule = (id) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const totalGramsToday = logs
    .filter((l) => l.dayGroup === 'Today')
    .reduce((acc, curr) => acc + curr.amountGrams, 0);

  const goalPercent = Math.min(100, Math.round((totalGramsToday / 200) * 100));

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-24">
      
      {/* ================= 1. HEADER PET MINI-CARD & QUICK FEED CTAS ================= */}
      <section className="bg-gradient-to-r from-[#FFE5CC] via-[#FFDAB3] to-[#FFC999] border-none rounded-card p-6 sm:p-8 shadow-soft-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Pet Mini Card Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center gap-4">
              {/* Pet Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#7BD389] shadow-soft-sm bg-transparent flex-shrink-0">
                <img
                  src={pet.avatar || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-2xl sm:text-3xl text-[#111827]">{pet.name}'s Feeding Tracker</h1>
                  <span className="bg-[#FFFBF2] border-none text-[#7BD389] px-3 py-0.5 rounded-pill text-xs font-extrabold">
                    {pet.species || 'Cat 🐱'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#525C54] mt-0.5">
                  {pet.breed || 'Silver Tabby Cat'} • Weight: <strong>{pet.weight || '4.5 kg'}</strong> • Last fed: <strong>{pet.lastFed || '3 hrs ago'}</strong>
                </p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#A65B33] uppercase tracking-wider block">1-Tap Quick Feed Actions:</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleQuickFeed(25, 'Small')}
                  className="bg-[#FFFBF2] hover:bg-[#FFE5CC] text-[#A65B33] font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm transition min-h-[40px] flex items-center gap-1.5"
                >
                  <img src={`${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/feeding_icon.png`} alt="" className="w-4 h-4 object-contain inline-block" />
                  <span>Small (25g)</span>
                </button>

                <button
                  onClick={() => handleQuickFeed(50, 'Medium')}
                  className="bg-[#FFFBF2] hover:bg-[#FFE5CC] text-[#A65B33] font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm transition min-h-[40px] flex items-center gap-1.5"
                >
                  <span>🥩 Medium (50g)</span>
                </button>

                <button
                  onClick={() => handleQuickFeed(100, 'Large')}
                  className="bg-[#FFFBF2] hover:bg-[#FFE5CC] text-[#A65B33] font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm transition min-h-[40px] flex items-center gap-1.5"
                >
                  <span>🍖 Large (100g)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Goal Progress Ring & Log CTA (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
            
            {/* Daily Goal Ring Widget */}
            <div className="bg-[#FFFBF2] border-none rounded-2xl p-4 shadow-soft-sm flex items-center gap-4 w-full max-w-xs">
              <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FFE5CC"
                    strokeWidth="4"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FF9B8A"
                    strokeWidth="4"
                    strokeDasharray={`${goalPercent}, 100`}
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-[#111827]">{goalPercent}%</span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-[#8E9890] uppercase block">Today's Intake</span>
                <span className="font-extrabold text-lg text-[#111827]">{totalGramsToday}g <span className="text-xs text-[#525C54] font-normal">/ 200g</span></span>
              </div>
            </div>

            {/* Primary Log & Export CTAs */}
            <div className="flex items-center gap-2 w-full max-w-xs">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="flex-1 bg-[#FF9B8A] hover:bg-[#E28073] text-white font-extrabold text-xs py-3.5 rounded-pill shadow-soft-md transition min-h-[46px] flex items-center justify-center gap-2"
              >
                <span>Log Feeding +</span>
              </button>

              <button
                onClick={() => exportFeedPDF(logs, pet.name)}
                className="bg-[#FFFBF2] hover:bg-[#FFDAB3] text-[#A65B33] font-extrabold text-xs px-4 py-3.5 rounded-pill shadow-soft-sm transition min-h-[46px]"
                title="Export PDF"
              >
                📊 PDF
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 2. TABBED NAVIGATION ================= */}
      <div className="flex bg-[#FFFBF2] border-none rounded-card p-1 text-xs font-bold shadow-soft-sm">
        {[
          { id: 'history', label: '📋 Meal History' },
          { id: 'schedules', label: '⏰ Timed Schedules' },
          { id: 'analytics', label: '📊 Intake Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-center rounded-2xl transition ${
              activeTab === tab.id
                ? 'bg-[#FFDAB3] text-[#A65B33] font-extrabold shadow-soft-sm'
                : 'text-[#A65B33]/70 hover:text-[#A65B33]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= 3. TAB CONTENT ================= */}
      <div>
        {activeTab === 'history' && (
          <HistoryTimeline
            logs={logs}
            loading={loading}
            onDeleteLog={handleDeleteLog}
          />
        )}

        {activeTab === 'schedules' && (
          <ScheduleManager
            schedules={schedules}
            pet={pet}
            onAddSchedule={handleAddSchedule}
            onToggleSchedule={handleToggleSchedule}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPanel pet={pet} logs={logs} />
        )}
      </div>

      {/* ================= 4. LOG FEEDING MODAL ================= */}
      <LogFeedingModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSave={handleSaveMeal}
        pet={pet}
      />

    </div>
  );
}
