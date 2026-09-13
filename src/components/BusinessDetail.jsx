import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BusinessDetail({ service, isOpen, onClose, onBook }) {
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'reviews' | 'about'
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!isOpen || !service) return null;

  const images = service.images && service.images.length > 0 ? service.images : ['/assets/petshop.png'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-card shadow-soft-lg border border-[#DCEBE0] my-auto overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* HERO IMAGE CAROUSEL */}
        <div className="relative h-48 sm:h-64 bg-[#FAF9F6] flex-shrink-0">
          <img
            src={images[currentImgIndex]}
            alt={service.name}
            className="w-full h-full object-cover"
          />

          {/* Carousel Arrows if multiple images */}
          {images.length > 1 && (
            <div className="absolute inset-x-3 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={() => setCurrentImgIndex((currentImgIndex - 1 + images.length) % images.length)}
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentImgIndex((currentImgIndex + 1) % images.length)}
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm"
              >
                ›
              </button>
            </div>
          )}

          {/* Close Button Overlay */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm z-10"
          >
            ✕
          </button>

          {/* Badge Overlay */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md border border-[#DCEBE0] px-3 py-1 rounded-pill text-xs font-extrabold text-[#7BD389]">
            🟢 Open Now • {service.distance} km away
          </div>
        </div>

        {/* HEADER INFORMATION */}
        <div className="p-5 border-b border-[#DCEBE0] bg-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#111827]">{service.name}</h2>
              <p className="text-xs text-[#525C54] mt-0.5">{service.type} • 📍 {service.address}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="bg-[#EBF8EE] border border-[#7BD389]/30 px-3 py-1 rounded-pill inline-flex items-center gap-1 text-xs font-extrabold text-[#7BD389]">
                <span>★ {service.rating}</span>
                <span className="text-[#8E9890] font-normal">({service.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* Teleconsult Banner if supported */}
          {service.teleconsult && (
            <div className="mt-3 bg-[#EBF8EE] border border-[#7BD389]/40 rounded-xl p-2.5 text-xs font-bold text-[#111827] flex items-center justify-between">
              <span>📹 Video Teleconsultation Available</span>
              <span className="text-[#7BD389]">Starts ₹349</span>
            </div>
          )}
        </div>

        {/* TABBED NAVIGATION */}
        <div className="flex border-b border-[#DCEBE0] bg-[#FAF9F6] text-xs font-bold px-4 flex-shrink-0">
          {[
            { id: 'services', label: 'Services & Prices' },
            { id: 'reviews', label: `Reviews (${service.reviewsCount || 12})` },
            { id: 'about', label: 'About & Hours' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-[#7BD389] text-[#7BD389] font-extrabold'
                  : 'border-transparent text-[#525C54] hover:text-[#111827]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT BODY */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-[#525C54]">
          
          {/* TAB 1: SERVICES & PRICES */}
          {activeTab === 'services' && (
            <div className="space-y-3">
              {(service.availableServices || [
                { name: 'General Consultation', price: service.price, duration: '30 mins' },
                { name: 'Full Health Screening', price: '₹799', duration: '45 mins' }
              ]).map((srv, idx) => (
                <div key={idx} className="bg-[#FAF9F6] border border-[#EBF8EE] p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#111827]">{srv.name}</h4>
                    <span className="text-[11px] text-[#8E9890]">{srv.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-[#7BD389]">{srv.price}</span>
                    <button
                      onClick={() => {
                        if (onBook) onBook(service);
                        onClose();
                      }}
                      className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-pill shadow-soft-sm"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {(service.reviews || [
                { id: 1, author: 'Ananya Sharma', avatar: '👩', rating: 5, date: '2 days ago', comment: 'Excellent clinic! Silver loved the calm atmosphere.' }
              ]).map((rev) => (
                <div key={rev.id} className="bg-[#FAF9F6] border border-[#EBF8EE] p-3.5 rounded-2xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rev.avatar}</span>
                      <strong className="text-xs text-[#111827]">{rev.author}</strong>
                    </div>
                    <span className="text-amber-400 font-bold">★ {rev.rating}.0</span>
                  </div>
                  <p className="text-[#525C54] text-xs leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-3">
              <p className="leading-relaxed">{service.excerpt}</p>
              <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EBF8EE] space-y-2">
                <div className="flex justify-between"><span>Phone Number:</span><strong className="text-[#111827]">{service.phone}</strong></div>
                <div className="flex justify-between"><span>Address:</span><strong className="text-[#111827]">{service.address}</strong></div>
                <div className="flex justify-between"><span>Operating Hours:</span><strong className="text-[#7BD389]">Mon - Sun (8:00 AM - 9:00 PM)</strong></div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER CTA BAR */}
        <div className="p-4 border-t border-[#DCEBE0] bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={() => alert(`Calling ${service.name}...`)}
            className="flex-1 bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#111827] font-extrabold text-xs py-3 rounded-pill min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>📞 Call Clinic</span>
          </button>

          <button
            onClick={() => {
              if (onBook) onBook(service);
              onClose();
            }}
            className="flex-1 bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs py-3 rounded-pill shadow-soft-sm min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>Book Appointment →</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
