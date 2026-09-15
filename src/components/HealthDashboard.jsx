// src/components/HealthDashboard.jsx
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { generatePatientPackPDF } from '../utils/pdf';

export default function HealthDashboard({ pet, records = [], meds = [] }) {
  const adherencePct = 96;
  const missedDosesCount = 1;

  const chartAdherenceData = [
    { month: 'Apr', adherence: 88, vaccines: 1 },
    { month: 'May', adherence: 92, vaccines: 0 },
    { month: 'Jun', adherence: 95, vaccines: 2 },
    { month: 'Jul', adherence: 90, vaccines: 0 },
    { month: 'Aug', adherence: 98, vaccines: 1 },
    { month: 'Sep', adherence: 96, vaccines: 0 },
  ];

  const handleExportPatientPack = () => {
    generatePatientPackPDF(
      pet || { name: 'Silver', weightKg: 4.2 },
      records,
      meds
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Health KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-5 shadow-warm-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-ww-wood block">Next Vaccine Due</span>
            <span className="text-xl font-black text-emerald-600 font-mono mt-0.5 block">
              In 10 Days
            </span>
            <span className="text-[10px] text-ww-wood-dark font-semibold">FVRCP Annual Booster (Sep 24)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold shadow-inner">
            💉
          </div>
        </div>

        <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-5 shadow-warm-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-ww-wood block">Med Adherence Rate</span>
            <span className="text-xl font-black text-ww-brass font-mono mt-0.5 block">
              {adherencePct}%
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Excellent Compliance</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold shadow-inner">
            📈
          </div>
        </div>

        <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-5 shadow-warm-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-ww-wood block">Missed Doses (30 Days)</span>
            <span className="text-xl font-black text-ww-ink font-mono mt-0.5 block">
              {missedDosesCount} dose
            </span>
            <span className="text-[10px] text-ww-wood font-semibold">Snoozed &amp; Made up</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-bold shadow-inner">
            ⏰
          </div>
        </div>
      </div>

      {/* Recharts Analytics Card */}
      <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-6 shadow-warm-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-ww-ink">Monthly Medication Compliance &amp; Health Timeline</h3>
            <p className="text-xs text-ww-wood-dark font-medium">Compliance trajectory for {pet?.name || 'Silver'}.</p>
          </div>

          <button
            onClick={handleExportPatientPack}
            className="px-4 py-2 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-1.5"
          >
            <span>📦 Export Full Patient Pack PDF</span>
          </button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartAdherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BD389" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7BD389" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--paper-dark)" />
              <XAxis dataKey="month" stroke="var(--wood)" fontSize={12} tickLine={false} />
              <YAxis domain={[70, 100]} stroke="var(--wood)" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--paper)',
                  borderColor: 'var(--wood-light)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Area type="monotone" dataKey="adherence" stroke="#7BD389" strokeWidth={3} fillOpacity={1} fill="url(#colorAdherence)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
