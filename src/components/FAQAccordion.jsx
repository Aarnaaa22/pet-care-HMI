import React, { useState } from 'react';
import { FAQS_MOCK } from '../mockData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-md shadow-warm-md" style={{ backgroundColor: 'var(--paper)', borderLeft: '6px solid var(--pine)', border: '1.5px solid var(--paper-dark)' }}>
      <div className="p-6">
        <h3 className="font-kalam text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--ink)' }}>
          <span>❓</span> Frequently Asked Questions
        </h3>

        <div style={{ borderTop: '1px solid var(--paper-dark)' }}>
          {FAQS_MOCK.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} style={{ borderBottom: '1px solid var(--paper-dark)' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left font-extrabold text-sm flex items-center justify-between min-h-[44px] py-3 focus:outline-none font-nunito"
                  style={{ color: 'var(--ink)' }}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="text-base font-kalam ml-3" style={{ color: 'var(--brass)' }}>{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <p className="text-xs leading-relaxed pb-3 animate-fadeIn font-nunito" style={{ color: 'var(--wood-dark)' }}>
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
