import React from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

/**
 * Simple before/after using react-compare-slider
 */
export default function BeforeAfter({ before, after }) {
  return (
    <div className="w-full rounded overflow-hidden shadow-sm">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={before} alt="before" />}
        itemTwo={<ReactCompareSliderImage src={after} alt="after" />}
      />
    </div>
  );
}
