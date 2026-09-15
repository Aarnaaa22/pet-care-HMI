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
        <div className="bg-[#FFE5CC] border border-[#A65B33]/30 rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#A65B33] tracking-wider block">Average Daily Intake</span>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-2xl text-[#111827]">{avgGrams}g</span>
            <span className="text-xs text-[#525C54] font-bold">/ 200g goal</span>
          </div>
          <p className="text-[10px] text-[#525C54] mt-1">Optimal nutrition for {pet.name}</p>
        </div>

        {/* KPI 2: Longest Streak */}
        <div className="bg-[#FFE5CC] border border-[#A65B33]/30 rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#A65B33] tracking-wider block">Longest Log Streak</span>
          <div className="flex items-baseline gap-2">
            <span className="font-black text-2xl text-[#111827]">14 Days</span>
            <span className="text-xs text-[#F28B82] font-bold">🔥 Active</span>
          </div>
          <p className="text-[10px] text-[#525C54] mt-1">Logged all meals consistently</p>
        </div>

        {/* KPI 3: Goal Progress */}
        <div className="bg-[#FFE5CC] border border-[#A65B33]/30 rounded-card p-5 shadow-soft-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#A65B33] tracking-wider block">Caloric Goal Progress</span>
          <div className="flex items-baseline gap-2">
            <span className="font-black text-2xl text-[#111827]">{goalPercent}%</span>
            <span className="text-xs text-[#525C54] font-bold">On Track</span>
          </div>
          <p className="text-[10px] text-[#525C54] mt-1">520 kcal daily target met</p>
        </div>

      </div>

      {/* RECHARTS WEEKLY TRENDS LINE / AREA CHART */}
      <div className="bg-[#FFE5CC] border border-[#A65B33]/30 rounded-card p-5 shadow-soft-sm relative overflow-hidden">
        <div className="flex justify-between items-end mb-6 relative z-10">
          <div>
            <h4 className="font-black text-lg text-[#111827] italic">Weekly Intake Trend (Grams)</h4>
            <p className="text-xs text-[#525C54]">Daily nutrition vs target baseline</p>
          </div>
          <span className="text-xs font-bold text-[#A65B33]">Last 7 Days</span>
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
              <XAxis dataKey="day" stroke="#A65B33" tick={{ fill: '#525C54', fontSize: 10, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
              <YAxis stroke="#A65B33" tick={{ fill: '#525C54', fontSize: 10, fontWeight: 'bold' }} tickLine={false} axisLine={false} domain={[0, 240]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <Area type="monotone" dataKey="grams" stroke="#A65B33" strokeWidth={3} fillOpacity={1} fill="url(#colorGrams)" />
              <Line type="monotone" dataKey="goal" stroke="#FFE5CC" strokeDasharray="4 4" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
