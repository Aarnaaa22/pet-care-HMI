import React from 'react';

export default function ActivityPage({ pet }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Lead Banner */}
      <section
        className="rounded-md p-6 sm:p-8 shadow-warm-sm"
        style={{ background: 'linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)', border: '1.5px solid var(--wood-light)', borderLeft: '6px solid var(--awning)' }}
      >
        <span className="room-label mb-2">Activity Analytics</span>
        <h1 className="font-kalam text-3xl sm:text-4xl mb-2 leading-tight" style={{ color: 'var(--ink)' }}>
          Exercise &amp; Playtime Tracker for {pet.name}
        </h1>
        <p className="text-xs sm:text-sm font-nunito" style={{ color: 'var(--wood-dark)' }}>
          Track outdoor walks, play streaks, calorie burns, and weekly activity goals.
        </p>
      </section>

      {/* Active Streak Card */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md flex items-center gap-4">
        <div className="text-4xl animate-bounce">🔥</div>
        <div>
          <h3 className="font-extrabold text-xl text-ww-ink">7 Days Active Streak!</h3>
          <p className="text-xs font-semibold text-ww-wood-dark">Outstanding daily exercise routine maintained for {pet.name}.</p>
        </div>
      </div>

      {/* Weekly Distance Bar Chart */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-6 shadow-warm-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-extrabold text-base text-ww-ink">Weekly Walking Distance</h3>
          <span className="font-extrabold text-xs text-ww-brass bg-ww-paper-dark px-3 py-1 rounded-md">Total: 16.4 km</span>
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
              <span className="text-[10px] font-bold text-ww-wood">{bar.km}</span>
              <div
                style={{ height: bar.h }}
                className={`w-6 sm:w-8 rounded-t-xl transition-all ${
                  bar.active ? 'bg-gradient-to-t from-[#9D72FF] to-ww-brass shadow-warm-sm' :
                  bar.planned ? 'bg-ww-paper border-2 border-dashed border-[#8E9890]' :
                  'bg-ww-paper-dark'
                }`}
              ></div>
              <span className={`text-xs font-bold ${bar.active ? 'text-ww-brass' : 'text-ww-wood'}`}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
