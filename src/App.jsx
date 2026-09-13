import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import ResponsiveDemoTester from './components/ResponsiveDemoTester';
import BookingModal from './components/BookingModal';
import FAQAccordion from './components/FAQAccordion';
import ChatWidget from './components/ChatWidget';

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
  
  const [activePetKey, setActivePetKey] = useState('luna');
  const [pets, setPets] = useState(PETS_MOCK);
  
  const [bookingService, setBookingService] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const activePet = pets[activePetKey] || pets.luna;

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
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2A2F2B] font-sans selection:bg-[#7BD389] selection:text-white">
      
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

      {/* Main Content Viewport Wrapper (Adapts to Mobile 375, Tablet 768, Desktop 1440, or Fluid 100%) */}
      <main className="flex-1 py-6 sm:py-8">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewportMode === 'mobile' ? 'max-w-[375px] border-4 border-[#222B24] rounded-[40px] overflow-hidden p-4 shadow-soft-lg bg-[#FAF9F6]' :
            viewportMode === 'tablet' ? 'max-w-[768px] border-4 border-[#222B24] rounded-[32px] overflow-hidden p-6 shadow-soft-lg bg-[#FAF9F6]' :
            viewportMode === 'desktop' ? 'max-w-[1440px] px-8' :
            'w-full'
          }`}
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
