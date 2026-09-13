import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import ResponsiveDemoTester from './components/ResponsiveDemoTester';
import BookingModal from './components/BookingModal';
import FAQAccordion from './components/FAQAccordion';
import ChatWidget from './components/ChatWidget';
import ShopDoorIntro from './components/ShopDoorIntro';

import ServicesPage from './pages/ServicesPage';
import FeedingPage from './pages/FeedingPage';
import ActivityPage from './pages/ActivityPage';
import HealthPage from './pages/HealthPage';
import GroomingPage from './pages/GroomingPage';
import CheckoutPage from './pages/CheckoutPage';

import { PETS_MOCK } from './mockData';

export default function App() {
  const [activeRoute, setActiveRoute] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewportMode, setViewportMode] = useState('fluid'); // 'fluid' | 'desktop' | 'tablet' | 'mobile'
  
  const [activePetKey, setActivePetKey] = useState('silver');
  const [pets, setPets] = useState(PETS_MOCK);
  
  const [bookingService, setBookingService] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Lock body scroll while door intro is showing
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showIntro]);

  const activePet = pets[activePetKey] || pets.silver;

  const handleUpdatePet = (updatedPet) => {
    setPets((prev) => ({
      ...prev,
      [activePetKey]: updatedPet,
    }));
  };

  const handleBookService = (service) => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-nunito selection:bg-ww-brass selection:text-white relative overflow-x-hidden"
      style={{ backgroundColor: 'var(--pine-dark)', color: 'var(--ink)' }}
    >
      {/* Shop Door Intro — shown once on load, hides when door is opened */}
      {showIntro && <ShopDoorIntro onEnter={() => setShowIntro(false)} />}

      {/* Subtle wood-plank floor texture (fixed, behind content) */}
      <div className="floor-planks" aria-hidden="true" />

      {/* Header */}
      <Header
        activeRoute={activeRoute}
        onNavigate={setActiveRoute}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activePet={activePet}
        onPetChange={setActivePetKey}
        pets={pets}
      />

      {/* Interactive Responsive Viewport Tester Bar */}
      <ResponsiveDemoTester
        currentMode={viewportMode}
        onModeChange={setViewportMode}
      />

      {/* Main Content Viewport Wrapper */}
      <main className="flex-1 py-6 sm:py-8 relative z-10">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewportMode === 'mobile'  ? 'max-w-[375px] border-4 border-ww-wood-dark rounded-[40px] overflow-hidden p-4 shadow-warm-lg' :
            viewportMode === 'tablet'  ? 'max-w-[768px] border-4 border-ww-wood-dark rounded-[32px] overflow-hidden p-6 shadow-warm-lg' :
            viewportMode === 'desktop' ? 'max-w-[1440px] px-8' :
            'w-full'
          }`}
          style={viewportMode === 'mobile' || viewportMode === 'tablet' ? { backgroundColor: 'var(--paper)' } : {}}
        >
          <Container>
            {activeRoute === 'services' && (
              <ServicesPage
                searchQuery={searchQuery}
                onBookService={handleBookService}
                pet={activePet}
              />
            )}

            {activeRoute === 'feeding' && (
              <FeedingPage
                pet={activePet}
                onUpdatePet={handleUpdatePet}
              />
            )}

            {activeRoute === 'activity' && (
              <ActivityPage pet={activePet} />
            )}

            {activeRoute === 'health' && (
              <HealthPage pet={activePet} />
            )}

            {activeRoute === 'grooming' && (
              <GroomingPage pet={activePet} onBookService={handleBookService} onNavigate={setActiveRoute} />
            )}

            {activeRoute === 'checkout' && (
              <CheckoutPage pet={activePet} onNavigate={setActiveRoute} />
            )}

            {/* Common FAQ Accordion Section */}
            <div className="mt-12">
              <FAQAccordion />
            </div>
          </Container>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveRoute} />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={bookingService}
        pet={activePet}
      />

      {/* Support Chat Floating Widget */}
      <ChatWidget />

    </div>
  );
}

