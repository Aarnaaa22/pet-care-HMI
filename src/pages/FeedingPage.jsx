import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FEEDING_HISTORY_MOCK, FEEDING_SCHEDULE_MOCK } from '../mockData';

export default function FeedingPage({ pet, onUpdatePet }) {
  const [activeSubtab, setActiveSubtab] = useState('today');
  const [portionModalOpen, setPortionModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  
  // Portion modal state
  const [foodType, setFoodType] = useState('Dry Kibble');
  const [portionGrams, setPortionGrams] = useState(50);
  const [addWater, setAddWater] = useState(true);
  const [notes, setNotes] = useState('');
  const [historyList, setHistoryList] = useState(FEEDING_HISTORY_MOCK);
  const [scheduleList, setScheduleList] = useState(FEEDING_SCHEDULE_MOCK);

  // Schedule Modal State
  const [schedTime, setSchedTime] = useState('08:00');
  const [schedLabel, setSchedLabel] = useState('Morning Kibble');
  const [schedRepeat, setSchedRepeat] = useState('Daily');

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickFeed = (sizeLabel, grams) => {
    const newCalCurrent = Math.min(pet.calGoal, pet.calCurrent + Math.round(grams * 1.5));
    onUpdatePet({
      ...pet,
      calCurrent: newCalCurrent,
      mealsCompleted: Math.min(pet.mealsTotal, pet.mealsCompleted + 1),
      lastFed: 'Just now'
    });

    setHistoryList([
      {
        id: Date.now(),
        title: `Quick Feed (${sizeLabel})`,
        timestamp: 'Just now',
        amount: `${grams}g Organic Kibble Treat`,
        loggedBy: 'Owner (Alex)',
        icon: '🍪',
        bg: 'bg-ww-paper-dark'
      },
      ...historyList
    ]);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    triggerToast(`Quick Feed (${sizeLabel} ${grams}g) logged — Great job! 🐾`);
  };

  const handlePortionSubmit = (e) => {
    e.preventDefault();
    const newCalCurrent = Math.min(pet.calGoal, pet.calCurrent + Math.round(portionGrams * 1.5));
    onUpdatePet({
      ...pet,
      calCurrent: newCalCurrent,
      mealsCompleted: Math.min(pet.mealsTotal, pet.mealsCompleted + 1),
      lastFed: 'Just now'
    });

    setHistoryList([
      {
        id: Date.now(),
        title: foodType,
        timestamp: 'Just now',
        amount: `${portionGrams}g ${addWater ? '+ Fresh Water' : ''} • ${notes || 'Regular Portion'}`,
        loggedBy: 'Owner (Alex)',
        icon: '🥣',
        bg: 'bg-ww-paper-dark'
      },
      ...historyList
    ]);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
    triggerToast(`Feeding logged — Great job! 🐾`);
    setPortionModalOpen(false);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const [h, m] = schedTime.split(':');
    let hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const formatted = `${hour}:${m} ${ampm}`;

    setScheduleList([
      ...scheduleList,
      { id: Date.now(), time: formatted, title: schedLabel, detail: `150g Portion • ${schedRepeat}` }
    ]);

    alert(`🔔 Push Reminder Scheduled!\n\n"${pet.name}'s ${schedLabel} in 15 mins (${formatted})" will alert daily.`);
    setScheduleModalOpen(false);
  };

  const pct = Math.min(100, Math.round((pet.calCurrent / pet.calGoal) * 100));

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-ww-pine-dark text-white px-6 py-3 rounded-md text-xs font-extrabold shadow-warm-lg z-50 flex items-center gap-2 animate-bounce">
          <span>🐾</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header: Pet Mini-Card */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-4 sm:p-5 shadow-warm-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={pet.avatar} alt={pet.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-ww-wood shadow-warm-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg sm:text-xl text-ww-ink">{pet.name}</h2>
              <span className="text-xs font-bold text-ww-wood-dark bg-ww-paper-dark px-2.5 py-0.5 rounded-md">{pet.age}</span>
            </div>
            <p className="text-xs text-ww-wood-dark mt-0.5">
              🥣 Last fed: <strong className="text-ww-ink">{pet.lastFed}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setPortionModalOpen(true)}
          className="hidden sm:inline-flex bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold px-5 py-2.5 rounded-md text-xs shadow-warm-sm min-h-[44px] items-center gap-1.5"
        >
          <span>🥣 Log Portion</span>
        </button>
      </div>

      {/* Analytics Mini-Card (Circular Progress SVG Component) */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md flex items-center gap-5">
        <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-ww-paper-dark" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-ww-brass transition-all duration-600" strokeWidth="3.8" strokeDasharray={`${pct}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span className="absolute text-xs font-extrabold text-ww-ink">{pct}%</span>
        </div>
        <div>
          <h3 className="font-kalam text-lg text-ww-ink">Daily Feeding Goal Met {pct}%</h3>
          <p className="text-xs font-semibold text-ww-wood-dark mt-0.5">
            <strong>{pet.calCurrent} / {pet.calGoal} kcal</strong> • {pet.mealsCompleted} of {pet.mealsTotal} meals completed today
          </p>
        </div>
      </div>

      {/* Primary Action Area: Prominent Green Log Feeding CTA */}
      <div>
        <button
          onClick={() => setPortionModalOpen(true)}
          className="w-full bg-gradient-to-r from-ww-brass to-[#5BB369] hover:from-[#5BB369] hover:to-ww-brass text-white font-extrabold py-4 px-6 rounded-md text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2.5 min-h-[52px]"
        >
          <span className="text-xl">🥣</span>
          <span>Log Feeding</span>
        </button>
      </div>

      {/* One-Tap Quick Feed Buttons Row */}
      <div>
        <h4 className="font-bold text-xs text-ww-wood-dark mb-2 uppercase tracking-wider">One-Tap Quick Feed</h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Small', grams: 25, icon: '🍪' },
            { label: 'Medium', grams: 50, icon: '🥣' },
            { label: 'Large', grams: 100, icon: '🥩' },
          ].map((q) => (
            <button
              key={q.label}
              onClick={() => handleQuickFeed(q.label, q.grams)}
              className="bg-ww-paper border border-ww-paper-dark hover:border-ww-wood hover:bg-ww-paper-dark p-3 rounded-md flex flex-col items-center gap-1 shadow-warm-sm transition min-h-[64px]"
            >
              <span className="text-xl">{q.icon}</span>
              <span className="font-extrabold text-xs text-ww-ink">{q.label}</span>
              <span className="text-[10px] font-bold text-ww-brass bg-ww-awning/10 px-2 py-0.5 rounded-md">{q.grams}g</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule & History Tabbed Area */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md">
        <div className="flex bg-ww-paper p-1 rounded-md border border-ww-paper-dark mb-5">
          <button
            onClick={() => setActiveSubtab('today')}
            className={`flex-1 py-2 rounded-md text-xs font-extrabold transition min-h-[44px] ${
              activeSubtab === 'today' ? 'bg-ww-paper text-ww-ink shadow-warm-sm' : 'text-ww-wood'
            }`}
          >
            Today's Meals
          </button>
          <button
            onClick={() => setActiveSubtab('schedule')}
            className={`flex-1 py-2 rounded-md text-xs font-extrabold transition min-h-[44px] ${
              activeSubtab === 'schedule' ? 'bg-ww-paper text-ww-ink shadow-warm-sm' : 'text-ww-wood'
            }`}
          >
            Feeding Schedule
          </button>
        </div>

        {activeSubtab === 'today' ? (
          /* History Feed */
          <div className="space-y-3">
            {historyList.map((item) => (
              <div key={item.id} className="bg-ww-paper border border-ww-paper-dark rounded-md p-3.5 flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-md flex items-center justify-center text-xl flex-shrink-0 ${item.bg}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-xs text-ww-ink">{item.title}</h5>
                    <span className="text-[10px] font-bold text-ww-wood">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-ww-wood-dark mt-0.5">{item.amount}</p>
                  <span className="text-[10px] font-bold text-ww-brass block mt-1">{item.loggedBy}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Schedule Timeline */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-ww-ink">Daily Feeding Routine</h4>
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="bg-ww-paper-dark text-ww-brass border border-ww-wood px-3 py-1.5 rounded-md text-xs font-extrabold min-h-[44px]"
              >
                + Add Time
              </button>
            </div>

            {scheduleList.length === 0 ? (
              <div className="text-center py-8 text-ww-wood">
                <div className="text-3xl mb-1">⏰</div>
                <p className="text-xs font-semibold">No scheduled feedings — Add one to get reminders.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {scheduleList.map((s) => (
                  <div key={s.id} className="bg-ww-paper border-l-4 border-ww-wood rounded-md p-3 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-xs text-ww-brass block">{s.time}</span>
                      <h5 className="font-extrabold text-xs text-ww-ink">{s.title}</h5>
                      <p className="text-[10px] text-ww-wood">{s.detail}</p>
                    </div>
                    <button className="text-xs p-2 min-h-[44px] min-w-[44px]" title="Edit Schedule">✏️</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Portion Selector Modal Bottom Sheet */}
      {portionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Log Feeding Portion</h3>
              <button onClick={() => setPortionModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handlePortionSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Food Type</label>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-bold text-ww-ink"
                >
                  <option value="Dry Kibble">🥣 Dry Kibble (Organic Salmon)</option>
                  <option value="Wet Food">🥫 Wet Food (Pate / Stew)</option>
                  <option value="Homemade">🍲 Homemade Meal (Chicken & Rice)</option>
                  <option value="Treats">🥩 Treats & Snacks</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-ww-wood-dark mb-1">
                  <span>Portion Amount</span>
                  <span className="text-ww-brass font-extrabold">{portionGrams} g</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="350"
                  step="5"
                  value={portionGrams}
                  onChange={(e) => setPortionGrams(parseInt(e.target.value))}
                  className="w-full accent-[#7BD389] cursor-pointer"
                />

                {/* Preset Chips */}
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 150, 250].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setPortionGrams(g)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-bold border transition min-h-[44px] ${
                        portionGrams === g ? 'bg-ww-awning text-white border-ww-wood' : 'bg-ww-paper border-ww-paper-dark'
                      }`}
                    >
                      {g}g
                    </button>
                  ))}
                </div>

                {/* Inline Max Warning */}
                {portionGrams > 200 && (
                  <div className="mt-2 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs font-bold p-2.5 rounded-md animate-shake">
                    ⚠️ Recommended max 250g for adult pet — check vet
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-ww-wood-dark">💧 Add Fresh Water Refill</span>
                <input
                  type="checkbox"
                  checked={addWater}
                  onChange={(e) => setAddWater(e.target.checked)}
                  className="w-5 h-5 accent-[#7BD389]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Notes / Detail</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., 50 g of Dry Kibble — Morning portion"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                Save Feeding Log 🐾
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Add Feeding Schedule</h3>
              <button onClick={() => setScheduleModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Feeding Time</label>
                <input
                  type="time"
                  value={schedTime}
                  onChange={(e) => setSchedTime(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-bold text-ww-ink"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Meal Label</label>
                <input
                  type="text"
                  value={schedLabel}
                  onChange={(e) => setSchedLabel(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Repeat Routine</label>
                <select
                  value={schedRepeat}
                  onChange={(e) => setSchedRepeat(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-bold text-ww-ink"
                >
                  <option value="Daily">Everyday (Daily)</option>
                  <option value="Weekdays">Weekdays (Mon-Fri)</option>
                  <option value="Custom">Custom Days</option>
                </select>
              </div>

              {/* Sample Push Notification UI Preview */}
              <div className="bg-ww-paper-dark border border-[#F7C6D7] p-3 rounded-md flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <h5 className="font-extrabold text-xs text-ww-ink">Sample Push Notification</h5>
                  <p className="text-[11px] text-ww-wood-dark">{pet.name}'s {schedLabel} in 15 mins ({schedTime})</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                Save Schedule
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
