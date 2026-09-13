import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';

export default function AnalyticsPanel({ pet = { name: "Silver" }, logs = [] }) {
  // Mock weekly trends data
  const chartData = [
    { day: 'Mon', grams: 180, goal: 200 },
    { day: 'Tue', grams: 210, goal: 200 },
    { day: 'Wed', grams: 195, goal: 200 },
    { day: 'Thu', grams: 220, goal: 200 },
    { day: 'Fri', grams: 200, goal: 200 },
    { day: 'Sat', grams: 230, goal: 200 },
    { day: 'Sun', grams: 210, goal: 200 },
  ];

  const avgGrams = Math.round(chartData.reduce((acc, curr) => acc + curr.grams, 0) / chartData.length);
  const goalPercent = Math.round((avgGrams / 200) * 100);

  return (
    <div className="space-y-6">
      
      {/* KPI TILES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* KPI 1: Avg Intake */}
        <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#8E9890] tracking-wider block">Average Daily Intake</span>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl text-[#111827]">{avgGrams}g</span>
            <span className="text-xs font-bold text-[#7BD389]">/ 200g goal</span>
          </div>
          <p className="text-[11px] text-[#525C54]">Optimal nutrition for {pet.name}</p>
        </div>

        {/* KPI 2: Longest Streak */}
        <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#8E9890] tracking-wider block">Longest Log Streak</span>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl text-[#111827]">14 Days</span>
            <span className="text-xs font-bold text-[#FF85A1]">🔥 Active</span>
          </div>
          <p className="text-[11px] text-[#525C54]">Logged all meals consistently</p>
        </div>

        {/* KPI 3: Goal Progress */}
        <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#8E9890] tracking-wider block">Caloric Goal Progress</span>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl text-[#7BD389]">{goalPercent}%</span>
            <span className="text-xs font-bold text-[#525C54]">On Track</span>
          </div>
          <p className="text-[11px] text-[#525C54]">520 kcal daily target met</p>
        </div>

      </div>

      {/* RECHARTS WEEKLY TRENDS LINE / AREA CHART */}
      <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCEBE0]">
          <div>
            <h4 className="font-extrabold text-base text-[#111827]">Weekly Intake Trend (Grams)</h4>
            <span className="text-xs text-[#525C54]">Daily nutrition vs target baseline</span>
          </div>
          <span className="text-xs font-bold text-[#7BD389] bg-[#EBF8EE] px-3 py-1 rounded-pill">Last 7 Days</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGrams" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BD389" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7BD389" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBF8EE" />
              <XAxis dataKey="day" stroke="#8E9890" fontSize={12} tickLine={false} />
              <YAxis stroke="#8E9890" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <Area type="monotone" dataKey="grams" stroke="#7BD389" strokeWidth={3} fillOpacity={1} fill="url(#colorGrams)" />
              <Line type="monotone" dataKey="goal" stroke="#FF85A1" strokeDasharray="4 4" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
