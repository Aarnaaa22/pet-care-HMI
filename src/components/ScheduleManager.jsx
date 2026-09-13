import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { scheduleReminder } from '../utils/notify';

export default function ScheduleManager({ schedules = [], onToggleSchedule, onAddSchedule, pet = { name: "Silver" } }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [time, setTime] = useState("08:00 AM");
  const [repeat, setRepeat] = useState("Daily");
  const [portion, setPortion] = useState(50);
  const [foodType, setFoodType] = useState("Organic Salmon Kibble");

  const handleCreate = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: `s-${Date.now()}`,
      petId: pet.id || 'silver',
      time,
      repeat,
      amountGrams: portion,
      foodType,
      enabled: true
    };

    if (onAddSchedule) onAddSchedule(newSchedule);

    // Schedule local browser notification demo (10s demo delay)
    scheduleReminder(10000, `Time to feed ${pet.name}! 🥣`, `${portion}g of ${foodType} scheduled for ${time}.`);
    alert(`🎉 Schedule created for ${time} (${repeat})! Local reminder test notification set.`);

    setShowAddForm(false);
  };

  return (
    <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-sm space-y-4">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0]">
        <div>
          <span className="text-xs font-bold text-[#7BD389] uppercase tracking-wider block">Automated Timelines</span>
          <h3 className="font-extrabold text-base text-[#111827]">Feeding Schedules for {pet.name}</h3>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#EBF8EE] text-[#7BD389] hover:bg-[#7BD389] hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-pill border border-[#7BD389]/30 transition min-h-[38px]"
        >
          {showAddForm ? '✕ Close' : '+ Add Schedule'}
        </button>
      </div>

      {/* ADD SCHEDULE FORM */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleCreate}
          className="bg-[#FAF9F6] border border-[#EBF8EE] p-4 rounded-2xl space-y-3 text-xs font-semibold"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 08:00 AM"
                className="w-full bg-white border border-[#DCEBE0] rounded-xl p-2.5 font-bold text-[#111827]"
              />
            </div>
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Repeat Cycle</label>
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="w-full bg-white border border-[#DCEBE0] rounded-xl p-2.5 font-bold text-[#111827]"
              >
                <option value="Daily">Daily</option>
                <option value="Weekdays">Weekdays (Mon - Fri)</option>
                <option value="Custom">Custom Days</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Portion (g)</label>
              <input
                type="number"
                value={portion}
                onChange={(e) => setPortion(Number(e.target.value))}
                className="w-full bg-white border border-[#DCEBE0] rounded-xl p-2.5 font-bold text-[#111827]"
              />
            </div>
            <div>
              <label className="font-bold text-[#525C54] block mb-1">Food Type</label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full bg-white border border-[#DCEBE0] rounded-xl p-2.5 font-bold text-[#111827]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs py-3 rounded-pill shadow-soft-sm"
          >
            Save & Enable Schedule
          </button>
        </motion.form>
      )}

      {/* SCHEDULES LIST */}
      <div className="space-y-3">
        {schedules.map((sch) => (
          <div
            key={sch.id}
            className="bg-[#FAF9F6] border border-[#EBF8EE] p-3.5 rounded-2xl flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF8EE] border border-[#7BD389]/30 text-[#7BD389] text-lg flex items-center justify-center font-bold">
                ⏰
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-[#111827]">{sch.time}</h4>
                  <span className="bg-white border border-[#DCEBE0] text-[10px] font-extrabold text-[#7BD389] px-2 py-0.5 rounded-pill">
                    {sch.repeat}
                  </span>
                </div>
                <p className="text-[11px] text-[#525C54]">{sch.amountGrams}g of {sch.foodType}</p>
              </div>
            </div>

            {/* Toggle Enable Switch */}
            <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-[#525C54]">
              <span>{sch.enabled ? 'Enabled' : 'Paused'}</span>
              <input
                type="checkbox"
                checked={sch.enabled}
                onChange={() => {
                  if (onToggleSchedule) onToggleSchedule(sch.id);
                }}
                className="w-4 h-4 accent-[#7BD389] rounded"
              />
            </label>
          </div>
        ))}
      </div>

    </div>
  );
}
