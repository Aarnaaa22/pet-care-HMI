import React from 'react';
import Container from './Container';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-[#DCEBE0] mt-16 pb-20 lg:pb-8 pt-12 text-[#525C54]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#EBF8EE] text-[#7BD389] flex items-center justify-center text-lg font-bold">
                🐾
              </div>
              <span className="font-extrabold text-lg text-[#2A2F2B]">PetCare</span>
            </div>
            <p className="text-xs text-[#8E9890] leading-relaxed">
              Production-ready responsive shell for pet care services, feeding, activity tracking, health logs, and supplies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm text-[#2A2F2B] mb-3">Care Modules</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#7BD389]">Find & Book Vets</button></li>
              <li><button onClick={() => onNavigate('feeding')} className="hover:text-[#7BD389]">Feeding Routine & Tracker</button></li>
              <li><button onClick={() => onNavigate('activity')} className="hover:text-[#7BD389]">Activity Analytics</button></li>
              <li><button onClick={() => onNavigate('health')} className="hover:text-[#7BD389]">Medical & Vaccines</button></li>
              <li><button onClick={() => onNavigate('grooming')} className="hover:text-[#7BD389]">Grooming & Supplies</button></li>
            </ul>
          </div>

          {/* Emergency Contact Banner */}
          <div>
            <h4 className="font-extrabold text-sm text-[#2A2F2B] mb-3">24/7 Pet Emergency</h4>
            <p className="text-xs text-[#8E9890] mb-2">Immediate helpline for urgent vet triage & assistance.</p>
            <a
              href="tel:18007297911"
              className="inline-flex items-center gap-2 bg-[#FFE8E8] text-[#E63946] px-4 py-2 rounded-pill font-extrabold text-xs hover:bg-[#E63946] hover:text-white transition"
            >
              <span>🚨 Helpline: 1800-PAWS-911</span>
            </a>
          </div>

          {/* Accessibility Info */}
          <div>
            <h4 className="font-extrabold text-sm text-[#2A2F2B] mb-3">Accessibility & Standards</h4>
            <p className="text-xs text-[#8E9890] leading-relaxed">
              Min 44x44px touch targets, keyboard navigable, ARIA compliant, fluid breakpoints for mobile, tablet, desktop.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-[#DCEBE0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9890] gap-2">
          <span>© 2026 PetCare Paws & Pals Inc. All rights reserved.</span>
          <span>Designed with React + Tailwind CSS</span>
        </div>
      </Container>
    </footer>
  );
}
