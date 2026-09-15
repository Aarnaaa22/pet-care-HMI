import React, { useState } from 'react';
import { FAQS_MOCK } from '../mockData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-card shadow-warm-md bg-[#EBF8EE] border border-[#7BD389]/30">
      <div className="p-5 sm:p-6">
        <h3 className="font-extrabold text-lg sm:text-xl mb-4 flex items-center gap-2 text-[#23402E]">
          <span>❓</span> Frequently Asked Questions
        </h3>

        <div className="border-t border-[#7BD389]/30">
          {FAQS_MOCK.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-[#7BD389]/30 last:border-none">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left font-extrabold text-sm sm:text-base flex items-center justify-between min-h-[44px] py-3.5 focus:outline-none text-[#23402E] transition-colors hover:text-[#31573F]"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-xl font-black text-[#A65B33] flex-shrink-0">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <p className="text-xs sm:text-sm leading-relaxed pb-4 animate-fadeIn text-[#525C54]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
