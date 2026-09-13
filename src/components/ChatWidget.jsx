import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatWidget({ onSendMessage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can we assist you with Silver or your pets today? 🐾', time: 'Just now' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState(null);

  const handleAttachPhoto = () => {
    setAttachedPhoto('pet_photo_attached.jpg');
    alert("Simulated photo attachment (e.g. skin rash or prescription image) added to message!");
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim() && !attachedPhoto) return;

    const fullText = attachedPhoto ? `📷 [Attached Image] ${text}` : text;
    const userMsg = { id: Date.now(), sender: 'user', text: fullText, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setAttachedPhoto(null);

    if (onSendMessage) onSendMessage(fullText);

    // Simulated Bot Reply
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Thanks for messaging! Our care team usually replies within 5 minutes. We will notify your phone via SMS.`,
        time: 'Just now'
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
      
      {/* FLOATING TOGGLE BUTTON */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#7BD389] hover:bg-[#5BB369] text-white p-3.5 rounded-full shadow-soft-lg flex items-center gap-2 border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#7BD389]"
          aria-label="Open support chat"
        >
          <span className="text-xl">💬</span>
          <span className="font-extrabold text-xs hidden sm:inline">Ask PetCare</span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        </motion.button>
      )}

      {/* CHAT WINDOW POPUP */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-[320px] sm:w-[360px] bg-white border border-[#DCEBE0] rounded-card shadow-soft-lg overflow-hidden flex flex-col h-[460px]"
        >
          {/* Header */}
          <div className="bg-[#7BD389] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                🐾
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">PetCare Live Assist</h4>
                <span className="text-[10px] text-white/90 font-medium">⚡ Replies in ~5 mins</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 text-lg font-bold min-h-[36px] min-w-[36px]"
            >
              ✕
            </button>
          </div>

          {/* Messages Log Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAF9F6] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#7BD389] text-white rounded-br-none'
                      : 'bg-white border border-[#DCEBE0] text-[#111827] rounded-bl-none shadow-soft-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-[#8E9890] mt-1 font-semibold">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Photo Attachment Preview Bar if attached */}
          {attachedPhoto && (
            <div className="bg-[#FFF0F5] px-3 py-1.5 border-t border-[#F7C6D7] text-[11px] font-bold text-[#111827] flex justify-between items-center">
              <span>📷 Attached: {attachedPhoto}</span>
              <button onClick={() => setAttachedPhoto(null)} className="text-[#E63946] text-xs">✕</button>
            </div>
          )}

          {/* Quick Reply Chips */}
          <div className="p-2 bg-white border-t border-[#DCEBE0] flex gap-1.5 overflow-x-auto text-[10px] font-bold text-[#525C54] whitespace-nowrap">
            {[
              "🚑 Emergency Vet Info",
              "🛁 Spa Package Rates",
              "📷 Attach Prescription"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (chip.includes("Attach")) handleAttachPhoto();
                  else handleSend(chip);
                }}
                className="bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#111827] px-2.5 py-1 rounded-pill"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-[#DCEBE0] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleAttachPhoto}
              className="text-base text-[#8E9890] hover:text-[#7BD389] p-1.5"
              title="Attach photo/prescription"
            >
              📷
            </button>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#FAF9F6] border border-[#DCEBE0] rounded-pill px-3 py-2 text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#7BD389]"
            />
            <button
              type="submit"
              className="bg-[#7BD389] hover:bg-[#5BB369] text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            >
              ➔
            </button>
          </form>
        </motion.div>
      )}

    </div>
  );
}
