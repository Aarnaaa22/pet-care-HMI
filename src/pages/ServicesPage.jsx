import React, { useState } from 'react';
import Container from '../components/Container';
import ResponsiveGrid from '../components/ResponsiveGrid';
import ServiceCard from '../components/ServiceCard';
import MapPanel from '../components/MapPanel';
import BottomSheet from '../components/BottomSheet';
import { SERVICES_MOCK } from '../mockData';

export default function ServicesPage({ searchQuery, onBookService, pet }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMapOpen, setMobileMapOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'vet', label: '🩺 Vets' },
    { id: 'groomer', label: '🛁 Groomers' },
    { id: 'store', label: '🛍️ Pet Stores' },
    { id: 'emergency', label: '🚨 Emergency' },
    { id: 'ondemand', label: '⚡ On-Demand' },
  ];

  // Filter services by category and search query
  const filteredServices = SERVICES_MOCK.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Hero Lead Banner */}
      <section className="bg-gradient-to-r from-[#EBF8EE] via-[#FFF0F5] to-[#E0F2FE] border border-[#DCEBE0] rounded-card p-6 sm:p-8 shadow-soft-sm">
        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase text-[#7BD389] tracking-wider mb-1 block">Local Care Network</span>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#2A2F2B] mb-2 leading-tight">
            Find & Book Local Vets, Groomers, and Stores
          </h1>
          <p className="text-xs sm:text-sm text-[#525C54] leading-relaxed">
            Verified local care professionals for <strong className="text-[#2A2F2B]">{pet.name}</strong>. Real-time availability, instant online booking, and emergency assistance.
          </p>
        </div>
      </section>

      {/* Hero Filter Chips & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Horizontal Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-pill text-xs font-extrabold whitespace-nowrap transition border min-h-[44px] ${
                activeCategory === c.id
                  ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                  : 'bg-white text-[#525C54] border-[#DCEBE0] hover:border-[#7BD389]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Mobile Map Toggle Button (lg:hidden) */}
        <button
          onClick={() => setMobileMapOpen(true)}
          className="lg:hidden w-full sm:w-auto bg-[#2A2F2B] text-white px-4 py-2.5 rounded-pill font-extrabold text-xs flex items-center justify-center gap-2 shadow-soft-sm min-h-[44px]"
        >
          <span>🗺️ Open Interactive Map ({filteredServices.length})</span>
        </button>
      </div>

      {/* RESPONSIVE LAYOUT RULE DEMO:
          - Desktop (lg): Two-column layout (Services List 2/3, Persistent Map 1/3)
          - Tablet (md): Stacked or Split view
          - Mobile (sm): Single column list + Mobile Map Bottom Sheet
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width on Desktop `lg`) - Service Cards Grid */}
        <div className="lg:col-span-2 space-y-6">
          {filteredServices.length === 0 ? (
            <div className="bg-white border border-dashed border-[#DCEBE0] rounded-card p-12 text-center space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="font-extrabold text-base text-[#2A2F2B]">No results near you</h3>
              <p className="text-xs text-[#8E9890] max-w-sm mx-auto">
                No pet services matched your current filters. Try widening the search query or resetting filters.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-4 py-2 bg-[#FAF9F6] border border-[#DCEBE0] rounded-pill text-xs font-bold text-[#2A2F2B] min-h-[44px]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 2 }}>
              {filteredServices.map((srv) => (
                <ServiceCard
                  key={srv.id}
                  service={srv}
                  onBook={(s) => onBookService(s)}
                  onCall={(s) => alert(`Calling ${s.name} at ${s.phone}...`)}
                  onDirections={(s) => {
                    setSelectedService(s);
                    setMobileMapOpen(true);
                  }}
                />
              ))}
            </ResponsiveGrid>
          )}
        </div>

        {/* Right Column (1/3 width on Desktop `lg`) - Persistent Map Panel Column */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <MapPanel
              services={filteredServices}
              selectedService={selectedService}
              onSelectService={(s) => onBookService(s)}
            />
          </div>
        </div>

      </div>

      {/* Mobile Map Bottom Sheet */}
      <BottomSheet
        isOpen={mobileMapOpen}
        onClose={() => setMobileMapOpen(false)}
        title="Interactive Nearby Map"
      >
        <MapPanel
          services={filteredServices}
          selectedService={selectedService}
          onSelectService={(s) => {
            setMobileMapOpen(false);
            onBookService(s);
          }}
          isMobileSheet={true}
        />
      </BottomSheet>

    </div>
  );
}
