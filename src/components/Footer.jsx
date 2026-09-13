import React from 'react';
import Container from './Container';

export default function Footer({ onNavigate }) {
  return (
    <footer className="pb-20 lg:pb-0 pt-12" style={{ backgroundColor: 'var(--pine-dark)', color: 'var(--paper-dark)' }}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐾</span>
              <span className="font-kalam text-xl" style={{ color: 'var(--cream)' }}>PetCare</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--paper-dark)' }}>
              Production-ready responsive shell for pet care services, feeding, activity tracking, health logs, and supplies.
            </p>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3" style={{ color: 'var(--brass)' }}>Care Modules</h4>
            <ul className="space-y-2 text-xs font-semibold" style={{ color: 'var(--paper-dark)' }}>
              <li><button onClick={() => onNavigate('services')} className="hover:underline" style={{ color: 'inherit' }}>Find &amp; Book Vets</button></li>
              <li><button onClick={() => onNavigate('feeding')} className="hover:underline" style={{ color: 'inherit' }}>Feeding Routine &amp; Tracker</button></li>
              <li><button onClick={() => onNavigate('activity')} className="hover:underline" style={{ color: 'inherit' }}>Activity Analytics</button></li>
              <li><button onClick={() => onNavigate('health')} className="hover:underline" style={{ color: 'inherit' }}>Medical &amp; Vaccines</button></li>
              <li><button onClick={() => onNavigate('grooming')} className="hover:underline" style={{ color: 'inherit' }}>Grooming &amp; Supplies</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3" style={{ color: 'var(--brass)' }}>24/7 Pet Emergency</h4>
            <p className="text-xs mb-3" style={{ color: 'var(--paper-dark)' }}>Immediate helpline for urgent vet triage &amp; assistance.</p>
            <a href="tel:18007297911" className="press-btn inline-flex items-center gap-2 px-4 py-2 rounded-md font-extrabold" style={{ fontSize: '12px' }}>
              🚨 Helpline: 1800-PAWS-911
            </a>
          </div>

          <div>
            <h4 className="font-kalam text-base mb-3" style={{ color: 'var(--brass)' }}>Accessibility &amp; Standards</h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--paper-dark)' }}>
              Min 44×44px touch targets, keyboard navigable, ARIA compliant, fluid breakpoints for mobile, tablet, desktop.
            </p>
          </div>
        </div>

        <div className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-2"
          style={{ borderTop: '1px solid rgba(200,155,60,0.25)', color: 'var(--paper-dark)' }}>
          <span className="text-xl mb-1 sm:mb-0">🔔</span>
          <span>© 2026 PetCare Paws &amp; Pals — Thanks for stopping by! Come again soon.</span>
          <span style={{ color: 'var(--brass)', opacity: 0.7 }}>React + Tailwind CSS</span>
        </div>
      </Container>
    </footer>
  );
}
