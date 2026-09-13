// src/components/Grooming/QueueWidget.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QueueWidget({ pet }) {
  const [queueLength, setQueueLength] = useState(3);
  const [ticket, setTicket] = useState(null);

  const handleJoinQueue = () => {
    const newTicket = {
      number: `W-${Math.floor(100 + Math.random() * 900)}`,
      petsAhead: queueLength,
      estWaitMins: queueLength * 15,
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTicket(newTicket);
    setQueueLength(prev => prev + 1);
  };

  const handleLeaveQueue = () => {
    setTicket(null);
    setQueueLength(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="bg-ww-paper border border-ww-paper-dark rounded-3xl p-5 shadow-warm-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-extrabold shadow-inner">
            ⏳
          </div>
          <div>
            <h3 className="font-extrabold text-base text-ww-ink">Live Walk-In Queue</h3>
            <p className="text-xs text-ww-wood-dark font-medium">Skip advance booking for same-day salon visit.</p>
          </div>
        </div>

        {!ticket ? (
          <button
            onClick={handleJoinQueue}
            className="px-4 py-2 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
          >
            <span>+ Join Walk-In Queue</span>
          </button>
        ) : (
          <button
            onClick={handleLeaveQueue}
            className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition"
          >
            Leave Queue
          </button>
        )}
      </div>

      {ticket ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-emerald-900 font-mono">Ticket {ticket.number}</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 animate-pulse">
                ● Live Ticket Active
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">
              Registered for {pet?.name || 'Silver'} at {ticket.joinedAt}
            </p>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Pets Ahead</span>
              <span className="font-extrabold text-base text-emerald-950 font-mono">{ticket.petsAhead}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Est. Wait</span>
              <span className="font-extrabold text-base text-emerald-950 font-mono">~{ticket.estWaitMins} mins</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between text-xs text-ww-wood-dark font-semibold bg-ww-paper-dark/40 p-3 rounded-2xl border border-ww-paper-dark">
          <span>Current Salon Queue: <strong className="text-ww-ink">{queueLength} pets waiting</strong></span>
          <span>Estimated wait: <strong className="text-ww-brass">~{queueLength * 15} mins</strong></span>
        </div>
      )}
    </div>
  );
}
