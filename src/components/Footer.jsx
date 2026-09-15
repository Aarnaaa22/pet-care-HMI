import React from 'react';
import Container from './Container';

export default function Footer({ onNavigate }) {
  return (
    <footer className="pb-20 lg:pb-0 pt-12 bg-[#FFFBF2] border-t border-ww-wood/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐾</span>
              <span className="font-kalam text-xl text-[#23402E]">PetCare</span>
            </div>
            <p className="text-xs leading-relaxed text-[#525C54]">
              Production-ready responsive shell for pet care services, feeding, activity tracking, health logs, and supplies.
            </p>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3 text-[#A65B33]">Care Modules</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#525C54]">
              <li><button onClick={() => onNavigate('services')} className="hover:underline text-inherit">Find &amp; Book Vets</button></li>
              <li><button onClick={() => onNavigate('feeding')} className="hover:underline text-inherit">Feeding Routine &amp; Tracker</button></li>
              <li><button onClick={() => onNavigate('activity')} className="hover:underline text-inherit">Activity Analytics</button></li>
              <li><button onClick={() => onNavigate('health')} className="hover:underline text-inherit">Medical &amp; Vaccines</button></li>
              <li><button onClick={() => onNavigate('grooming')} className="hover:underline text-inherit">Grooming &amp; Supplies</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3 text-[#A65B33]">24/7 Pet Emergency</h4>
            <p className="text-xs mb-3 text-[#525C54]">Immediate helpline for urgent vet triage &amp; assistance.</p>
            <a href="tel:18007297911" className="press-btn inline-flex items-center gap-2 px-4 py-2 rounded-md font-extrabold text-[12px] bg-[#FF9B8A] text-white">
              🚨 Helpline: 1800-PAWS-911
            </a>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3 text-[#A65B33]">Accessibility &amp; Standards</h4>
            <p className="text-xs leading-relaxed text-[#525C54]">
              Min 44×44px touch targets, keyboard navigable, ARIA compliant, fluid breakpoints for mobile, tablet, desktop.
            </p>
          </div>
        </div>

        <div className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-2 border-t border-ww-wood/20 text-[#525C54]">
          <span className="text-xl mb-1 sm:mb-0">🔔</span>
          <span>© 2026 PetCare Paws & Pals — Thanks for stopping by! Come again soon.</span>
        </div>
      </Container>
    </footer>
  );
}
