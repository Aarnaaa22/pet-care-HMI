// src/components/Teleconsult.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Teleconsult({ pet, onOpenPrescriptionBuilder }) {
  const [inCall, setInCall] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callEnded, setCallEnded] = useState(false);
  const [callNotes, setCallNotes] = useState('');

  const localVideoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (inCall) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Request media stream for camera preview
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(err => console.warn("Camera preview fallback mode:", err));
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inCall]);

  const handleStartCall = () => {
    setInCall(true);
    setCallEnded(false);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setInCall(false);
    setCallEnded(true);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach(t => t.stop());
    }
  };

  const formatSec = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl font-bold">
            📹
          </div>
          <div>
            <h2 className="font-extrabold text-base text-ww-ink">Live Teleconsult &amp; Virtual Room</h2>
            <p className="text-xs text-ww-wood-dark">WebRTC video consultation with Dr. Sarah Jenkins, DVM.</p>
          </div>
        </div>

        {!inCall && (
          <button
            onClick={handleStartCall}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-warm-md hover:brightness-105 transition flex items-center gap-2"
          >
            <span>📹 Join Live Video Call</span>
          </button>
        )}
      </div>

      {/* Active Call Video Screen */}
      {inCall ? (
        <div className="bg-slate-900 border-2 border-sky-500 rounded-3xl p-4 sm:p-6 shadow-warm-lg text-white space-y-4 relative overflow-hidden">
          {/* Top Status Header */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-extrabold text-sm text-emerald-400">
                Connected with Dr. Sarah Jenkins, DVM
              </span>
            </div>
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl text-xs font-mono font-bold">
              ⏱ {formatSec(callDuration)}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-72 sm:h-80 relative">
            {/* Vet Remote Stream */}
            <div className="bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700 shadow-inner flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                alt="Dr. Sarah Jenkins"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-white">
                Dr. Sarah Jenkins (Vet Remote)
              </div>
            </div>

            {/* Patient Local Stream */}
            <div className="bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700 shadow-inner flex items-center justify-center">
              {!videoMuted ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-xs font-bold text-slate-400">
                  📷 Camera Muted
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-white">
                {pet?.name || 'Silver'} (You)
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              className={`w-12 h-12 rounded-full font-bold text-lg transition flex items-center justify-center ${
                audioMuted ? 'bg-rose-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {audioMuted ? '🔇' : '🎙️'}
            </button>

            <button
              onClick={() => setVideoMuted(!videoMuted)}
              className={`w-12 h-12 rounded-full font-bold text-lg transition flex items-center justify-center ${
                videoMuted ? 'bg-rose-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {videoMuted ? '🚫' : '📷'}
            </button>

            <button
              onClick={handleEndCall}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-full shadow transition flex items-center gap-2"
            >
              <span>🛑 End Call</span>
            </button>
          </div>
        </div>
      ) : callEnded ? (
        /* Post-Call Notes & E-Prescription Builder Trigger */
        <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-5 shadow-warm-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ww-paper-dark">
            <div className="flex items-center gap-2">
              <span className="text-xl">📝</span>
              <h3 className="font-extrabold text-sm text-ww-ink">Post-Call Summary &amp; E-Prescription</h3>
            </div>
            <span className="text-xs text-ww-wood font-semibold">
              Call Duration: {formatSec(callDuration)}
            </span>
          </div>

          <p className="text-xs text-ww-wood-dark">
            Enter veterinarian observations and generate an e-signed prescription for {pet?.name || 'Silver'}:
          </p>

          <textarea
            rows={3}
            placeholder="Veterinarian call notes, dietary recommendations, or follow-up instructions..."
            value={callNotes}
            onChange={e => setCallNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-ww-wood-light bg-[#EBF8EE] text-xs font-medium resize-none focus:ring-2 focus:ring-ww-brass"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => onOpenPrescriptionBuilder && onOpenPrescriptionBuilder(callNotes)}
              className="px-5 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition flex items-center gap-2"
            >
              <span>✍️ Generate Signed E-Prescription PDF</span>
            </button>
          </div>
        </div>
      ) : (
        /* Idle Waiting Room Screen */
        <div className="bg-[#EBF8EE] border border-ww-paper-dark rounded-2xl p-8 text-center shadow-warm-sm space-y-3">
          <span className="text-4xl block">📹</span>
          <h3 className="font-extrabold text-base text-ww-ink">Ready for Teleconsultation</h3>
          <p className="text-xs text-ww-wood-dark max-w-md mx-auto">
            Test your camera and microphone, then join the encrypted video room to consult with Dr. Sarah Jenkins.
          </p>
          <button
            onClick={handleStartCall}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow transition"
          >
            Start Pre-Call Device Test
          </button>
        </div>
      )}
    </div>
  );
}
