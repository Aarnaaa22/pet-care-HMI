import React, { useState } from 'react';
import { FAQS_MOCK } from '../mockData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white border border-[#DCEBE0] rounded-card p-6 shadow-soft-md space-y-4">
      <h3 className="font-extrabold text-base text-[#2A2F2B] mb-2 flex items-center gap-2">
        <span>❓</span> Frequently Asked Questions
      </h3>

      <div className="divide-y divide-[#EBF8EE]">
        {FAQS_MOCK.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-3">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left font-extrabold text-sm text-[#2A2F2B] flex items-center justify-between min-h-[44px] focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="text-[#7BD389] text-base">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <p className="text-xs text-[#525C54] leading-relaxed pt-2 animate-fadeIn">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
