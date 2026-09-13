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
    { id: 'all',       label: 'All Services' },
    { id: 'vet',       label: '🩺 Vets' },
    { id: 'groomer',   label: '🛁 Groomers' },
    { id: 'store',     label: '🛍️ Pet Stores' },
    { id: 'emergency', label: '🚨 Emergency' },
    { id: 'ondemand',  label: '⚡ On-Demand' },
  ];

  const filteredServices = SERVICES_MOCK.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Hero Banner */}
      <section
        className="rounded-md p-6 sm:p-8 shadow-warm-sm"
        style={{ background: 'linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)', border: '1.5px solid var(--wood-light)', borderLeft: '6px solid var(--awning)' }}
      >
        <div className="max-w-2xl">
          <span className="room-label mb-2">Local Care Network</span>
          <h1 className="font-kalam text-3xl sm:text-4xl mb-2 leading-tight" style={{ color: 'var(--ink)' }}>
            Find &amp; Book Local Vets, Groomers, and Stores
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed font-nunito" style={{ color: 'var(--wood-dark)' }}>
            Verified local care professionals for <strong style={{ color: 'var(--ink)' }}>{pet.name}</strong>. Real-time availability, instant online booking, and emergency assistance.
          </p>
        </div>
      </section>

      {/* Filter Chips & Map Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className="px-4 py-2 rounded-md text-xs font-extrabold whitespace-nowrap transition border min-h-[44px] font-nunito"
              style={activeCategory === c.id
                ? { backgroundColor: 'var(--awning)', color: '#fff', borderColor: 'var(--awning-dark)', boxShadow: '0 4px 0 var(--awning-dark)' }
                : { backgroundColor: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--wood)' }
              }
            >{c.label}</button>
          ))}
        </div>

        <button
          onClick={() => setMobileMapOpen(true)}
          className="press-btn lg:hidden w-full sm:w-auto px-4 py-2.5 rounded-md font-extrabold text-xs flex items-center justify-center gap-2 min-h-[44px]"
        >
          🗺️ Open Interactive Map ({filteredServices.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Cards */}
        <div className="lg:col-span-2 space-y-6">
          {filteredServices.length === 0 ? (
            <div className="rounded-md p-12 text-center space-y-3" style={{ backgroundColor: 'var(--paper)', border: '1.5px dashed var(--wood)' }}>
              <div className="text-4xl">🔍</div>
              <h3 className="font-kalam text-xl" style={{ color: 'var(--ink)' }}>No results near you</h3>
              <p className="text-xs font-nunito max-w-sm mx-auto" style={{ color: 'var(--wood-dark)' }}>
                No pet services matched your current filters. Try widening the search or resetting filters.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-4 py-2 rounded-md text-xs font-bold min-h-[44px] font-nunito"
                style={{ backgroundColor: 'var(--paper-dark)', border: '1px solid var(--wood)', color: 'var(--ink)' }}
              >Reset Filters</button>
            </div>
          ) : (
            <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 2 }}>
              {filteredServices.map((srv) => (
                <ServiceCard
                  key={srv.id}
                  service={srv}
                  onBook={(s) => onBookService(s)}
                  onCall={(s) => alert(`Calling ${s.name} at ${s.phone}...`)}
                  onDirections={(s) => { setSelectedService(s); setMobileMapOpen(true); }}
                />
              ))}
            </ResponsiveGrid>
          )}
        </div>

        {/* Persistent Map Panel (Desktop) */}
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
      <BottomSheet isOpen={mobileMapOpen} onClose={() => setMobileMapOpen(false)} title="Interactive Nearby Map">
        <MapPanel
          services={filteredServices}
          selectedService={selectedService}
          onSelectService={(s) => { setMobileMapOpen(false); onBookService(s); }}
          isMobileSheet={true}
        />
      </BottomSheet>

    </div>
  );
}
