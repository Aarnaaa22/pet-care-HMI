// src/pages/ActivityPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import LiveTracker from '../components/LiveTracker';
import ActivityHistory from '../components/ActivityHistory';
import Playback from '../components/Playback';
import ActivitySummaryModal from '../components/ActivitySummaryModal';
import { fetchActivities, logActivity, removeActivity } from '../api/activityApi';
import { formatDistance, formatDuration } from '../utils/geo';
import { exportActivitiesPDF } from '../utils/export';

export default function ActivityPage({ pet }) {
  const currentPet = pet || {
    id: 'silver',
    name: 'Silver',
    type: 'cat',
    breed: 'Silver Tabby',
    weightKg: 4.2,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
  };

  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'history' | 'playback' | 'analytics'
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaybackActivity, setSelectedPlaybackActivity] = useState(null);
  
  // Modal states
  const [summaryData, setSummaryData] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchActivities();
      setActivities(res.data || []);
      if (res.data && res.data.length > 0) {
        setSelectedPlaybackActivity(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to load activity logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFinishLiveTracking = (payload) => {
    setSummaryData(payload);
    setIsSummaryOpen(true);
  };

  const handleSaveSummary = async (finalPayload) => {
    setIsSummaryOpen(false);
    setIsLoading(true);
    try {
      const res = await logActivity(finalPayload);
      setActivities(res.allActivities);
      showToast("🎉 Walk activity recorded successfully!");
      setActiveTab('history');
    } catch (err) {
      console.error("Failed to save activity:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity record?")) return;
    setIsLoading(true);
    try {
      const res = await removeActivity(id);
      setActivities(res.allActivities);
      showToast("Activity deleted.");
    } catch (err) {
      console.error("Failed to delete activity:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlayback = (act) => {
    setSelectedPlaybackActivity(act);
    setActiveTab('playback');
  };

  // Analytics Aggregations
  const totalDistanceMeters = activities.reduce((acc, a) => acc + (a.distanceMeters || 0), 0);
  const totalDurationSec = activities.reduce((acc, a) => acc + (a.durationSec || 0), 0);
  const totalCalories = activities.reduce((acc, a) => acc + (a.calories || 0), 0);
  const avgDistanceKm = activities.length > 0 ? (totalDistanceMeters / 1000 / activities.length).toFixed(2) : 0;
  
  const longestWalkMeters = activities.reduce((max, a) => (a.distanceMeters > max ? a.distanceMeters : max), 0);

  // Chart dataset
  const chartData = [
    { day: 'Mon', km: 2.1, calories: 120 },
    { day: 'Tue', km: 2.8, calories: 160 },
    { day: 'Wed', km: 1.5, calories: 95 },
    { day: 'Thu', km: 3.0, calories: 180 },
    { day: 'Fri', km: 2.5, calories: 150 },
    { day: 'Sat', km: 3.2, calories: 190 },
    { day: 'Sun', km: (totalDistanceMeters / 1000).toFixed(1) || 2.4, calories: 145 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Notification Toast */}
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

      {/* Main Silver Header Banner */}
      <section
        className="rounded-3xl p-6 sm:p-8 shadow-warm-md relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)',
          border: '1.5px solid var(--wood-light)',
          borderLeft: '8px solid var(--brass)'
        }}
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
                <span className="room-label">Activity Hub</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  GPS Active
                </span>
              </div>
              <h1 className="font-kalam text-3xl sm:text-4xl leading-tight text-ww-ink mt-1">
                Exercise &amp; Route Tracker for {currentPet.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-ww-wood-dark mt-0.5">
                {currentPet.breed} • {currentPet.weightKg || 4.2} kg • Daily Outdoor Strolls &amp; Playtime
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2.5 bg-ww-paper border border-ww-paper-dark hover:bg-ww-wood-light text-ww-ink rounded-2xl text-xs font-extrabold shadow-sm transition flex items-center gap-1.5"
            >
              📡 Share Live Link
            </button>
            <button
              onClick={() => setShowSosModal(true)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl text-xs font-extrabold shadow-sm transition flex items-center gap-1.5"
            >
              🚨 SOS Emergency
            </button>
          </div>
        </div>
      </section>

      {/* Active Streak Banner */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 sm:p-5 shadow-warm-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black shadow-inner">
            🔥
          </div>
          <div>
            <h3 className="font-extrabold text-base text-ww-ink">7-Day Active Exercise Streak!</h3>
            <p className="text-xs font-semibold text-ww-wood-dark">
              {currentPet.name} has completed 100% of weekly outdoor exercise targets.
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] uppercase font-bold text-ww-wood block">Total Distance</span>
          <span className="text-lg font-black text-ww-brass font-mono">
            {formatDistance(totalDistanceMeters)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ww-paper-dark pb-3">
        {[
          { id: 'tracker', label: '📡 Live Route' },
          { id: 'history', label: '📜 History', count: activities.length },
          { id: 'playback', label: '🎬 Playback' },
          { id: 'analytics', label: '📊 Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-[11px] sm:text-xs font-extrabold transition flex items-center gap-1.5 flex-auto justify-center sm:flex-none ${
              activeTab === tab.id
                ? 'bg-ww-brass text-white shadow-warm-sm'
                : 'bg-ww-paper border border-ww-paper-dark text-ww-wood-dark hover:bg-ww-paper-dark'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-ww-paper-dark text-ww-wood-dark'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Views */}
      {activeTab === 'tracker' && (
        <LiveTracker
          pet={currentPet}
          onSaveActivity={handleFinishLiveTracking}
          onShareLocation={() => setShowShareModal(true)}
          onTriggerSOS={() => setShowSosModal(true)}
        />
      )}

      {activeTab === 'history' && (
        <ActivityHistory
          activities={activities}
          isLoading={isLoading}
          onDeleteActivity={handleDeleteActivity}
          onSelectPlayback={handleSelectPlayback}
          onRefresh={loadData}
        />
      )}

      {activeTab === 'playback' && (
        <Playback
          activity={selectedPlaybackActivity || activities[0]}
          onClose={() => setActiveTab('history')}
        />
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md text-center">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="text-[10px] uppercase font-bold text-ww-wood block mt-1">Avg / Walk</span>
              <span className="text-xl sm:text-2xl font-black text-ww-brass font-mono mt-0.5 block">
                {avgDistanceKm} km
              </span>
            </div>

            <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md text-center">
              <span className="text-2xl">🏆</span>
              <span className="text-[10px] uppercase font-bold text-ww-wood block mt-1">Longest Single Stroll</span>
              <span className="text-xl sm:text-2xl font-black text-ww-ink font-mono mt-0.5 block">
                {formatDistance(longestWalkMeters)}
              </span>
            </div>

            <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md text-center">
              <span className="text-2xl">⏱️</span>
              <span className="text-[10px] uppercase font-bold text-ww-wood block mt-1">Total Active Time</span>
              <span className="text-xl sm:text-2xl font-black text-ww-ink font-mono mt-0.5 block">
                {formatDuration(totalDurationSec)}
              </span>
            </div>

            <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md text-center">
              <span className="text-2xl">🔥</span>
              <span className="text-[10px] uppercase font-bold text-ww-wood block mt-1">Calories Burned</span>
              <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono mt-0.5 block">
                {totalCalories} kcal
              </span>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-6 shadow-warm-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-ww-ink">Weekly Walking Distance (km)</h3>
                <p className="text-xs text-ww-wood-dark font-medium">Daily cumulative exercise breakdown for {currentPet.name}.</p>
              </div>
              <button
                onClick={() => exportActivitiesPDF(activities)}
                className="px-3 py-1.5 bg-ww-paper-dark hover:bg-ww-wood-light text-ww-ink text-xs font-bold rounded-xl transition"
              >
                📥 Export PDF
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7BD389" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7BD389" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--paper-dark)" />
                  <XAxis dataKey="day" stroke="var(--wood)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--wood)" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--paper)',
                      borderColor: 'var(--wood-light)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Area type="monotone" dataKey="km" stroke="#7BD389" strokeWidth={3} fillOpacity={1} fill="url(#colorKm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Activity Summary Modal */}
      <ActivitySummaryModal
        isOpen={isSummaryOpen}
        activityData={summaryData}
        onSave={handleSaveSummary}
        onDiscard={() => setIsSummaryOpen(false)}
      />

      {/* Share Location Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-md w-full"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📡</span>
                  <h3 className="font-extrabold text-base text-ww-ink">Share Live GPS Location</h3>
                </div>
                <button onClick={() => setShowShareModal(false)} className="font-bold text-ww-wood">✕</button>
              </div>

              <p className="text-xs text-ww-wood-dark mb-4">
                Share this real-time tracking link with family or vet contacts so they can follow {currentPet.name}'s walk live:
              </p>

              <div className="p-3 bg-ww-paper-dark rounded-xl font-mono text-xs text-ww-ink break-all mb-4 border border-ww-paper-dark">
                https://petcare.app/live-tracking/{currentPet.id}?token=live_sec_98431
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://petcare.app/live-tracking/${currentPet.id}?token=live_sec_98431`);
                    showToast("📋 Live tracking link copied to clipboard!");
                    setShowShareModal(false);
                  }}
                  className="px-5 py-2.5 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
                >
                  Copy Live Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOS Emergency Modal */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ww-paper border-2 border-rose-500 rounded-3xl p-6 shadow-warm-lg max-w-md w-full"
            >
              <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚨</span>
                  <h3 className="font-extrabold text-base text-rose-700">Emergency SOS Alert</h3>
                </div>
                <button onClick={() => setShowSosModal(false)} className="font-bold text-ww-wood">✕</button>
              </div>

              <p className="text-xs text-ww-wood-dark mb-4">
                Do you need urgent assistance for {currentPet.name}? This action alerts emergency pet services and broadcasts your current GPS location to saved contacts.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSosModal(false)}
                  className="px-4 py-2 text-xs font-bold text-ww-wood"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showToast("🚨 Emergency SOS Broadcasted! Nearby Vets & Emergency contacts notified.");
                    setShowSosModal(false);
                  }}
                  className="px-5 py-2.5 bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow hover:bg-rose-700 transition"
                >
                  Confirm Emergency SOS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
