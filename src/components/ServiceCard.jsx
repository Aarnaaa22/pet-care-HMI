import React from 'react';

export default function ServiceCard({ service, onBook, onCall, onDirections }) {
  return (
    <div
      className="rounded-md p-4 sm:p-5 shadow-warm-md hover:shadow-warm-lg transition-all duration-200 flex flex-col justify-between h-full"
      style={{ backgroundColor: 'var(--paper)', border: '1.5px solid var(--paper-dark)' }}
    >
      <div>
        {/* Top Info Row */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className={`w-[60px] h-[60px] rounded-lg flex items-center justify-center text-2xl flex-shrink-0 shadow-warm-sm ${service.logoBg}`}
            style={{ backgroundColor: 'rgba(200,155,60,0.15)', border: '2px solid var(--wood-light)' }}
          >
            {service.category === 'vet'       && '🩺'}
            {service.category === 'groomer'   && '🛁'}
            {service.category === 'store'     && '🛍️'}
            {service.category === 'emergency' && '🚨'}
            {service.category === 'ondemand'  && '⚡'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-kalam text-lg truncate" style={{ color: 'var(--ink)' }}>{service.name}</h3>
              {service.badge && (
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md whitespace-nowrap"
                  style={{
                    backgroundColor: 'var(--awning)',
                    color: '#fff',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >{service.badge}</span>
              )}
            </div>
            <p className="text-xs font-semibold" style={{ color: 'var(--wood)' }}>
              {service.type} • <span style={{ color: 'var(--pine)' }} className="font-extrabold">{service.distance} km away</span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold" style={{ color: 'var(--brass)' }}>★ {service.rating}</span>
              <span style={{ color: 'var(--wood)' }}>({service.reviewsCount} reviews)</span>
              <span style={{ color: 'var(--wood)' }}>•</span>
              <span className="font-extrabold" style={{ color: 'var(--awning)' }}>{service.price}</span>
            </div>
          </div>
        </div>

        {/* Service Note */}
        <div className="text-xs mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: 'var(--paper-dark)', color: 'var(--ink)' }}>
          <span style={{ color: 'var(--wood)' }}>Service Note: </span>
          <strong>{service.priceDetail}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px dashed var(--paper-dark)' }}>
        <button
          onClick={() => onBook(service)}
          className="press-btn flex-1 px-4 py-2.5 rounded-md text-xs sm:text-sm min-h-[44px]"
        >
          Book — {service.price}
        </button>

        <button
          onClick={() => onCall(service)}
          className="min-h-[44px] min-w-[44px] rounded-md flex items-center justify-center text-base transition"
          style={{ backgroundColor: 'var(--paper-dark)', border: '1.5px solid var(--wood)', color: 'var(--ink)' }}
          aria-label={`Call ${service.name}`}
          title="Call Business"
        >📞</button>

        <button
          onClick={() => onDirections(service)}
          className="min-h-[44px] min-w-[44px] rounded-md flex items-center justify-center text-base transition"
          style={{ backgroundColor: 'var(--paper-dark)', border: '1.5px solid var(--wood)', color: 'var(--ink)' }}
          aria-label={`Directions to ${service.name}`}
          title="Get Directions"
        >🗺️</button>
      </div>
    </div>
  );
}
