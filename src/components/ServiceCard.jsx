import React from 'react';

export default function ServiceCard({ service, onBook, onCall, onDirections }) {
  return (
    <div className="bg-white border border-[#DCEBE0] rounded-card p-4 sm:p-5 shadow-soft-md hover:shadow-soft-lg hover:border-[#7BD389] transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Top Info Row */}
        <div className="flex items-start gap-3.5 mb-3">
          {/* 60x60 Logo / Avatar Box */}
          <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${service.logoBg} shadow-soft-sm`}>
            {service.category === 'vet' && '🩺'}
            {service.category === 'groomer' && '🛁'}
            {service.category === 'store' && '🛍️'}
            {service.category === 'emergency' && '🚨'}
            {service.category === 'ondemand' && '⚡'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-extrabold text-base text-[#2A2F2B] truncate">{service.name}</h3>
              {service.badge && (
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-pill whitespace-nowrap ${
                    service.badgeType === 'green' ? 'bg-[#D1FAE5] text-[#065F46]' :
                    service.badgeType === 'pink' ? 'bg-[#F7C6D7] text-[#9F1239]' :
                    'bg-[#FFE8E8] text-[#E63946]'
                  }`}
                >
                  {service.badge}
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-[#525C54]">
              {service.type} • <span className="text-[#7BD389] font-extrabold">{service.distance} km away</span>
            </p>

            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-[#F59E0B]">★ {service.rating}</span>
              <span className="text-[#8E9890]">({service.reviewsCount} reviews)</span>
              <span className="text-[#8E9890]">•</span>
              <span className="font-extrabold text-[#7BD389]">{service.price}</span>
            </div>
          </div>
        </div>

        {/* Price Sub-detail */}
        <div className="text-xs text-[#8E9890] mb-4 bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-[#EBF8EE]">
          <span>Service Note: </span>
          <strong className="text-[#2A2F2B]">{service.priceDetail}</strong>
        </div>
      </div>

      {/* Action Buttons (Tap Target > 44px) */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#EBF8EE]">
        <button
          onClick={() => onBook(service)}
          className="flex-1 min-h-[44px] bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-pill shadow-soft-sm hover:shadow-soft-md transition-all active:scale-[0.98]"
        >
          Book — {service.price}
        </button>

        <button
          onClick={() => onCall(service)}
          className="min-h-[44px] min-w-[44px] bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] hover:border-[#7BD389] text-[#2A2F2B] hover:text-[#7BD389] rounded-xl flex items-center justify-center text-base transition"
          aria-label={`Call ${service.name}`}
          title="Call Business"
        >
          📞
        </button>

        <button
          onClick={() => onDirections(service)}
          className="min-h-[44px] min-w-[44px] bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] hover:border-[#7BD389] text-[#2A2F2B] hover:text-[#7BD389] rounded-xl flex items-center justify-center text-base transition"
          aria-label={`Directions to ${service.name}`}
          title="Get Directions"
        >
          🗺️
        </button>
      </div>
    </div>
  );
}
