import React from 'react';
import { motion } from 'framer-motion';

export default function HistoryTimeline({ logs = [], loading = false, onDeleteLog, onEditLog }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#FFE5CC] border border-[#7BD389]/30 rounded-card p-4 space-y-2 animate-pulse">
            <div className="h-4 bg-[#7BD389]/20 rounded w-1/3" />
            <div className="h-3 bg-[#7BD389]/10 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="bg-[#FFE5CC] border border-[#7BD389]/30 rounded-card p-8 text-center space-y-2 text-xs">
        <span className="text-3xl block">🥣</span>
        <h4 className="font-extrabold text-sm text-[#111827]">No Meal History Logged</h4>
        <p className="text-[#525C54]">Use Quick-Feed buttons or tap "Log Feeding" to track daily meal intake.</p>
      </div>
    );
  }

  // Group logs by dayGroup
  const grouped = logs.reduce((acc, log) => {
    const group = log.dayGroup || "Today";
    if (!acc[group]) acc[group] = [];
    acc[group].push(log);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([dayLabel, entries]) => (
        <div key={dayLabel} className="space-y-3">
          
          {/* Day Label Sticky Tag */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BD389]" />
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">{dayLabel}</h4>
            <span className="text-[10px] text-white/70 font-semibold">({entries.length} meals logged)</span>
          </div>

          {/* Timeline Cards */}
          <div className="bg-[#FFE5CC] border border-[#7BD389]/30 rounded-card p-5 shadow-soft-sm space-y-5">
            {entries.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFE5CC] border border-[#7BD389]/30 hover:border-[#7BD389] rounded-card p-4 shadow-soft-sm transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  
                  {/* Photo Thumbnail or Icon */}
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#DCEBE0] bg-[#EBF8EE] flex-shrink-0 flex items-center justify-center text-xl font-bold">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt="Meal photo"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span>🥩</span>
                    )}
                  </div>

                  {/* Meal Details */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-extrabold text-sm text-[#111827]">{item.foodType}</h5>
                      <span className="bg-[#FFFBF2] text-[#A65B33] text-[10px] font-extrabold px-2 py-0.5 rounded-pill border border-[#A65B33]/30">
                        {item.amountGrams}g
                      </span>
                    </div>

                    <p className="text-[11px] text-[#525C54] mt-0.5">
                      {item.dateFormatted || item.timestamp} • Logged by <strong>{item.loggedBy || 'Owner'}</strong>
                    </p>

                    {item.notes && (
                      <p className="text-[11px] text-[#8E9890] italic mt-1">"{item.notes}"</p>
                    )}
                  </div>

                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      if (onEditLog) onEditLog(item);
                      else alert(`Editing meal ${item.foodType} (${item.amountGrams}g)`);
                    }}
                    className="px-4 py-1.5 bg-[#FFFBF2] border border-[#DCEBE0] text-[#525C54] hover:text-[#111827] hover:border-[#111827] font-extrabold text-xs rounded-pill transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (onDeleteLog) onDeleteLog(item.id);
                      else alert(`Deleting meal ${item.foodType} (${item.amountGrams}g)`);
                    }}
                    className="px-4 py-1.5 bg-[#FFFBF2] border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-extrabold text-xs rounded-pill transition"
                  >
                    Delete
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
