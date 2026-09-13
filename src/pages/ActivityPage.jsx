import React from 'react';

export default function ActivityPage({ pet }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Lead Banner */}
      <section className="bg-gradient-to-r from-[#F0E6FF] via-[#EBF8EE] to-[#FFF0F5] border border-[#DCEBE0] rounded-card p-6 sm:p-8 shadow-soft-sm">
        <span className="text-xs font-extrabold uppercase text-[#9D72FF] tracking-wider mb-1 block">Activity Analytics</span>
        <h1 className="font-extrabold text-2xl sm:text-3xl text-[#2A2F2B] mb-2 leading-tight">
          Exercise & Playtime Tracker for {pet.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#525C54]">
          Track outdoor walks, play streaks, calorie burns, and weekly activity goals.
        </p>
      </section>

      {/* Active Streak Card */}
      <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md flex items-center gap-4">
        <div className="text-4xl animate-bounce">🔥</div>
        <div>
          <h3 className="font-extrabold text-xl text-[#2A2F2B]">7 Days Active Streak!</h3>
          <p className="text-xs font-semibold text-[#525C54]">Outstanding daily exercise routine maintained for {pet.name}.</p>
        </div>
      </div>

      {/* Weekly Distance Bar Chart */}
      <div className="bg-white border border-[#DCEBE0] rounded-card p-6 shadow-soft-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-extrabold text-base text-[#2A2F2B]">Weekly Walking Distance</h3>
          <span className="font-extrabold text-xs text-[#7BD389] bg-[#EBF8EE] px-3 py-1 rounded-pill">Total: 16.4 km</span>
        </div>

        <div className="flex items-end justify-between h-44 pt-4 px-2">
          {[
            { day: 'Mon', h: '60%', km: '2.1k' },
            { day: 'Tue', h: '85%', km: '2.8k' },
            { day: 'Wed', h: '45%', km: '1.5k' },
            { day: 'Thu', h: '90%', km: '3.0k' },
            { day: 'Fri', h: '75%', km: '2.5k' },
            { day: 'Sat', h: '80%', km: '2.5k', active: true },
            { day: 'Sun', h: '50%', km: '2.0k', planned: true },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
              <span className="text-[10px] font-bold text-[#8E9890]">{bar.km}</span>
              <div
                style={{ height: bar.h }}
                className={`w-6 sm:w-8 rounded-t-xl transition-all ${
                  bar.active ? 'bg-gradient-to-t from-[#9D72FF] to-[#7BD389] shadow-soft-sm' :
                  bar.planned ? 'bg-[#FAF9F6] border-2 border-dashed border-[#8E9890]' :
                  'bg-[#EBF8EE]'
                }`}
              ></div>
              <span className={`text-xs font-bold ${bar.active ? 'text-[#7BD389]' : 'text-[#8E9890]'}`}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
