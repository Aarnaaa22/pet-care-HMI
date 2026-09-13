import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ServiceCard({
  service,
  onBook,
  onViewDetail,
  isFavorite = false,
  onToggleFavorite
}) {
  const [expanded, setExpanded] = useState(false);

  const handleCall = (e) => {
    e.stopPropagation();
    alert(`Calling ${service.name} at ${service.phone}...`);
  };

  const handleDirections = (e) => {
    e.stopPropagation();
    alert(`Opening directions to ${service.name} (${service.distance} km away)...`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: `Check out ${service.name} on PetCare!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Copied link to ${service.name}!`);
    }
  };

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="bg-white border border-[#DCEBE0] hover:border-[#7BD389] rounded-card p-4 sm:p-5 shadow-soft-sm hover:shadow-soft-md transition-all cursor-pointer space-y-3 relative group"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        
        {/* Avatar + Info */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          
          {/* 60x60 Avatar Box */}
          <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl overflow-hidden flex-shrink-0 relative border border-[#DCEBE0] bg-[#FAF9F6]">
            {service.images && service.images[0] ? (
              <img
                src={service.images[0]}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${service.logoBg || 'bg-[#EBF8EE] text-[#7BD389]'}`}>
                {service.icon || '🩺'}
              </div>
            )}
          </div>

          {/* Business Name & Tagline */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-[#111827] truncate group-hover:text-[#7BD389] transition">
                {service.name}
              </h3>
            </div>
            
            {/* Tagline & Distance */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#525C54] mt-0.5">
              <span>{service.type}</span>
              <span>•</span>
              <span className="text-[#7BD389] font-bold">{service.distance} km</span>
            </div>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span className="text-amber-400 font-bold">★ {service.rating}</span>
              <span className="text-[#8E9890] font-medium">({service.reviewsCount} reviews)</span>
            </div>
          </div>

        </div>

        {/* Top Right Badges & Heart Favorite */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          
          <div className="flex items-center gap-1">
            {/* Favorite Heart Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleFavorite) onToggleFavorite(service.id);
              }}
              className="p-1.5 rounded-full hover:bg-[#FAF9F6] text-base transition min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Toggle favorite"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-[#FAF9F6] text-sm text-[#8E9890] transition min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Share business"
            >
              🔗
            </button>
          </div>

          {/* Status Badge */}
          {service.openNow ? (
            <span className="bg-[#EBF8EE] text-[#7BD389] px-2.5 py-0.5 rounded-pill text-[10px] font-extrabold border border-[#7BD389]/30">
              Open Now
            </span>
          ) : (
            <span className="bg-[#FAF9F6] text-[#8E9890] px-2.5 py-0.5 rounded-pill text-[10px] font-extrabold border border-[#DCEBE0]">
              Closed
            </span>
          )}

        </div>

      </div>

      {/* Offers Badge Tag */}
      {service.offers && service.offers.length > 0 && (
        <div className="inline-flex items-center gap-1.5 bg-[#FFF0F5] border border-[#F7C6D7] px-3 py-1 rounded-pill text-xs font-extrabold text-[#111827]">
          <span>🏷️ {service.offers[0]}</span>
        </div>
      )}

      {/* Price Estimate Line & Quick Action Buttons */}
      <div className="pt-2 border-t border-[#EBF8EE] flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-[#8E9890] uppercase block">Price Estimate</span>
          <span className="font-extrabold text-sm text-[#111827]">{service.price} <span className="text-[11px] font-normal text-[#525C54]">{service.priceDetail}</span></span>
        </div>

        {/* Action Button Row */}
        <div className="flex items-center gap-1.5">
          {/* Call Icon */}
          <button
            onClick={handleCall}
            className="w-10 h-10 rounded-pill bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-sm flex items-center justify-center text-[#111827] transition focus:outline-none focus:ring-2 focus:ring-[#7BD389]"
            title="Call Clinic"
            aria-label="Call clinic"
          >
            📞
          </button>

          {/* Directions Icon */}
          <button
            onClick={handleDirections}
            className="w-10 h-10 rounded-pill bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-sm flex items-center justify-center text-[#111827] transition focus:outline-none focus:ring-2 focus:ring-[#7BD389]"
            title="Get Directions"
            aria-label="Get directions"
          >
            📍
          </button>

          {/* Book Primary CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onBook) onBook(service);
            }}
            className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm transition focus:outline-none focus:ring-2 focus:ring-[#7BD389] focus:ring-offset-1 min-h-[40px] flex items-center justify-center"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* EXPANDABLE INLINE EXCERPT */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-3 border-t border-[#DCEBE0] space-y-2 text-xs text-[#525C54] animate-fadeIn"
        >
          <p className="leading-relaxed">{service.excerpt}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="font-semibold text-[#8E9890]">📍 {service.address}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onViewDetail) onViewDetail(service);
              }}
              className="text-[#7BD389] font-extrabold hover:underline"
            >
              View Full Details & Reviews →
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
