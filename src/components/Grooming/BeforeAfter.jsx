// src/components/Grooming/BeforeAfter.jsx
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function BeforeAfter({
  before = 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
  after = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  title = 'Full Fur Trim & Bath Transformation'
}) {
  return (
    <div className="w-full space-y-2">
      {title && (
        <div className="flex items-center justify-between text-xs font-bold text-ww-wood">
          <span>◄ BEFORE (Scruffy)</span>
          <span className="text-ww-ink font-extrabold">{title}</span>
          <span>AFTER (Groomed) ►</span>
        </div>
      )}

      <div className="w-full rounded-2xl overflow-hidden shadow-warm-md border-2 border-ww-paper-dark relative group">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={before}
              alt="Before Grooming"
              style={{ objectFit: 'cover', height: '320px' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={after}
              alt="After Grooming"
              style={{ objectFit: 'cover', height: '320px' }}
            />
          }
          style={{ height: '320px', width: '100%' }}
        />

        {/* Labels Overlay */}
        <span className="absolute bottom-3 left-3 bg-black/60 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-xl backdrop-blur-md">
          BEFORE
        </span>
        <span className="absolute bottom-3 right-3 bg-ww-brass text-white font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow">
          AFTER
        </span>
      </div>
      <p className="text-[10px] text-center text-ww-wood italic">
        Drag the center slider horizontally to compare before &amp; after transformation.
      </p>
    </div>
  );
}
