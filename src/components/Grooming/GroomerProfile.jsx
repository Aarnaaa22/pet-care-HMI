// src/components/Grooming/GroomerProfile.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfter from './BeforeAfter';

export default function GroomerProfile({ isOpen, onClose, groomer, onBook }) {
  if (!isOpen || !groomer) return null;

  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'services' | 'reviews' | 'chat'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'groomer', text: `Hi! I'm ${groomer.name}. How can I help groom Silver today?`, time: '10:00 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userMsg = { sender: 'user', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMsg('');

    setTimeout(() => {
      const replies = [
        `Thanks for reaching out! Silver is in great hands. We have open slots tomorrow!`,
        `I specialize in gentle feline grooming with zero sedation. Feel free to book a slot!`,
        `Our full groom includes coat de-shedding, nail trim, and organic bath!`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages(prev => [...prev, { sender: 'groomer', text: randomReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-ww-paper border-2 border-ww-brass rounded-3xl p-6 shadow-warm-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-5"
        >
          {/* Hero Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-ww-paper-dark">
            <div className="flex items-center gap-4">
              <img
                src={groomer.avatar}
                alt={groomer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-ww-brass shadow-warm-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-xl text-ww-ink">{groomer.name}</h2>
                  {groomer.verified && (
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ✓ Verified Salon
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-ww-wood-dark mt-0.5">
                  ★ {groomer.rating} rating ({groomer.reviewsCount} verified reviews) • {groomer.experienceYears || 8} yrs experience
                </p>
                <p className="text-xs text-ww-wood italic mt-1 line-clamp-1">
                  "{groomer.bio || 'Passionate about gentle, stress-free pet grooming with organic products.'}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onBook && onBook(groomer)}
                className="px-5 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
              >
                Book Appointment
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-ww-paper-dark text-ww-wood font-bold hover:bg-rose-100 transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 border-b border-ww-paper-dark pb-2 overflow-x-auto">
            {[
              { id: 'portfolio', label: '📸 Portfolio & Before/After' },
              { id: 'services', label: '✂️ Services & Pricing' },
              { id: 'reviews', label: '⭐ Client Reviews' },
              { id: 'chat', label: '💬 Message Groomer' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-ww-brass text-white shadow-sm'
                    : 'bg-ww-paper-dark/60 text-ww-wood-dark hover:bg-ww-wood-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Portfolio & Before/After Slider Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-5">
              <h3 className="font-extrabold text-sm text-ww-ink">Featured Before &amp; After Transformation</h3>
              <BeforeAfter
                before={groomer.beforeImg || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80'}
                after={groomer.afterImg || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'}
                title="Full Feline Luxury Groom &amp; Fur Styling"
              />

              <h3 className="font-extrabold text-sm text-ww-ink pt-2">Groomer Work Portfolio</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80'
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Portfolio ${i}`}
                    className="w-full h-28 rounded-2xl object-cover border border-ww-paper-dark shadow-sm hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Services & Pricing Table Tab */}
          {activeTab === 'services' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-ww-ink">Available Packages &amp; Pricing</h3>
              <div className="space-y-2">
                {[
                  { name: 'Full Luxury Feline Groom', desc: 'Coat trim, warm organic bath, nail clipping, ear cleaning & paw therapy', price: '$55' },
                  { name: 'Express Bath & Brush', desc: 'Hypoallergenic bath, blow dry, thorough brush out & cologne spray', price: '$35' },
                  { name: 'Nail Trim & Paw Therapy', desc: 'Precision claw trimming, filing & soothing paw pad butter', price: '$20' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-ww-paper-dark/50 p-3.5 rounded-2xl border border-ww-paper-dark flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-extrabold text-xs text-ww-ink">{s.name}</h4>
                      <p className="text-[10px] text-ww-wood font-medium mt-0.5">{s.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-black text-sm text-ww-brass font-mono">{s.price}</span>
                      <button
                        onClick={() => onBook && onBook(groomer)}
                        className="px-3 py-1.5 bg-ww-brass text-white font-extrabold text-xs rounded-xl hover:brightness-105 transition"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-ww-ink">Verified Pet Owner Reviews</h3>
              <div className="space-y-2.5">
                {[
                  { user: 'Jessica M. (Cat Parent)', rating: '5.0 ★', text: 'Bella did an unbelievable job with Silver! Silver usually hates baths, but was completely calm and fluffy.' },
                  { user: 'David K. (Persian Parent)', rating: '5.0 ★', text: 'Extremely professional and clean facility. The before & after comparison spoke for itself!' }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-ww-paper-dark/40 p-3.5 rounded-2xl border border-ww-paper-dark">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-ww-ink">{rev.user}</span>
                      <span className="text-xs font-bold text-amber-600">{rev.rating}</span>
                    </div>
                    <p className="text-xs text-ww-wood-dark font-medium mt-1">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Groomer Chat Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-3">
              <div className="h-48 overflow-y-auto bg-ww-paper-dark/40 rounded-2xl p-3 border border-ww-paper-dark space-y-2">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs font-medium ${
                      msg.sender === 'user'
                        ? 'bg-ww-brass text-white rounded-br-none'
                        : 'bg-ww-paper text-ww-ink border border-ww-paper-dark rounded-bl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-75 block text-right mt-0.5">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask groomer a question..."
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-ww-wood-light bg-ww-paper rounded-xl focus:ring-2 focus:ring-ww-brass"
                />
                <button type="submit" className="px-4 py-2 bg-ww-brass text-white font-extrabold text-xs rounded-xl">
                  Send
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
