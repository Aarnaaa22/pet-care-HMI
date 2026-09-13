import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import MapPanel from '../components/MapPanel';
import FilterModal from '../components/FilterModal';
import BookingSheet from '../components/BookingSheet';
import BusinessDetail from '../components/BusinessDetail';
import ChatWidget from '../components/ChatWidget';
import { SERVICES_MOCK } from '../mockData';

export default function ServicesPage({ searchQuery = '', onBookService, pet = { name: 'Silver' } }) {
  // Local Search & Filter State
  const [term, setTerm] = useState(searchQuery);
  const [autosuggestOpen, setAutosuggestOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState('list'); // 'list' | 'map'
  
  const [favorites, setFavorites] = useState([1]); // Saved favorite IDs
  
  const [filters, setFilters] = useState({
    category: 'all',
    maxDistance: 20,
    minRating: 0,
    openNowOnly: false,
    offersOnly: false,
    homeVisitsOnly: false,
    priceTier: 'all'
  });

  // Modal State for Booking & Detail
  const [bookingService, setBookingService] = useState(null);
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  
  const [detailService, setDetailService] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Toggle Favorites
  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered Services List calculation
  const filteredServices = useMemo(() => {
    return SERVICES_MOCK.filter((item) => {
      // Search term
      if (term.trim() !== '') {
        const query = term.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchType = item.type.toLowerCase().includes(query);
        const matchAddr = item.address.toLowerCase().includes(query);
        if (!matchName && !matchType && !matchAddr) return false;
      }

      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) return false;

      // Distance
      if (item.distance > filters.maxDistance) return false;

      // Rating
      if (item.rating < filters.minRating) return false;

      // Open now
      if (filters.openNowOnly && !item.openNow) return false;

      // Offers only
      if (filters.offersOnly && (!item.offers || item.offers.length === 0)) return false;

      // Home visits only
      if (filters.homeVisitsOnly && !item.homeVisits) return false;

      return true;
    });
  }, [term, filters]);

  // Saved Favorites List
  const favoriteServices = useMemo(() => {
    return SERVICES_MOCK.filter((s) => favorites.includes(s.id));
  }, [favorites]);

  // Autosuggest List
  const autosuggestItems = useMemo(() => {
    if (!term.trim()) return [];
    return SERVICES_MOCK.filter((s) =>
      s.name.toLowerCase().includes(term.toLowerCase()) || s.type.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 4);
  }, [term]);

  const handleOpenBooking = (service) => {
    setBookingService(service);
    setIsBookingSheetOpen(true);
  };

  const handleOpenDetail = (service) => {
    setDetailService(service);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-24">
      
      {/* ================= 1. SEARCH & LEAD HERO ================= */}
      <section className="bg-gradient-to-r from-[#EBF8EE] via-[#FFF0F5] to-[#FAF9F6] border border-[#DCEBE0] rounded-card p-6 sm:p-8 shadow-soft-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text & Search Bar (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 bg-white/80 border border-[#DCEBE0] px-3.5 py-1 rounded-pill text-xs font-bold text-[#7BD389]">
              <span>📍 DISCOVER NEARBY CARE</span>
              <span>• VERIFIED PROVIDERS</span>
            </div>

            <h1 className="font-extrabold text-2xl sm:text-4xl text-[#111827] leading-tight">
              Find & Book Local Vets, Groomers & Pet Stores
            </h1>

            <p className="text-xs sm:text-sm text-[#525C54]">
              Top-rated care for <strong>{pet.name}</strong>. Compare consultation fees, read authentic reviews, and book instant appointments.
            </p>

            {/* Autosuggest Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-base text-[#8E9890]">🔍</span>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                    setAutosuggestOpen(true);
                  }}
                  onFocus={() => setAutosuggestOpen(true)}
                  placeholder="Search vets, groomers, emergency clinics, stores..."
                  className="w-full pl-11 pr-24 py-3.5 rounded-pill bg-white border border-[#DCEBE0] text-sm font-semibold text-[#111827] shadow-soft-sm focus:outline-none focus:border-[#7BD389] focus:ring-2 focus:ring-[#7BD389]/30 transition min-h-[48px]"
                />
                <button
                  onClick={() => setFilterModalOpen(true)}
                  className="absolute right-2 bg-[#EBF8EE] hover:bg-[#7BD389] text-[#7BD389] hover:text-white font-extrabold text-xs px-4 py-2.5 rounded-pill border border-[#7BD389]/30 transition min-h-[40px] flex items-center gap-1.5"
                >
                  <span>Filter</span>
                  <span>⚙️</span>
                </button>
              </div>

              {/* Autosuggest Dropdown Popup */}
              {autosuggestOpen && autosuggestItems.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DCEBE0] rounded-2xl shadow-soft-lg z-40 overflow-hidden text-xs">
                  {autosuggestItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTerm(item.name);
                        setAutosuggestOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#FAF9F6] border-b border-[#EBF8EE] last:border-none flex items-center justify-between"
                    >
                      <span className="font-bold text-[#111827]">{item.name}</span>
                      <span className="text-[11px] text-[#7BD389] font-semibold">{item.type} ({item.distance}km)</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Two Action CTAs */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setTerm('')}
                className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[40px]"
              >
                Find Nearby Vets 📍
              </button>
              <button
                onClick={() => alert("Partner portal coming soon! Contact support to list your business.")}
                className="bg-white hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#111827] font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[40px]"
              >
                List Your Business 🏪
              </button>
            </div>

          </div>

          {/* Right Hero Thumbnail Asset (5 cols on desktop, stacked on mobile) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[#DCEBE0] shadow-soft-md bg-white aspect-[4/3] relative">
              <img
                src="/assets/petshop.png"
                alt="PetShop Local Storefront Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm border border-[#DCEBE0] px-3 py-1 rounded-pill text-[11px] font-extrabold text-[#7BD389]">
                🟢 100+ Verified Partners
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 2. SAVED FAVORITES CAROUSEL ================= */}
      {favoriteServices.length > 0 && (
        <section className="bg-white border border-[#DCEBE0] rounded-card p-4 shadow-soft-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#111827] flex items-center gap-2">
              <span>❤️ Saved Favorites</span>
              <span className="text-xs text-[#8E9890] font-normal">({favoriteServices.length})</span>
            </h3>
            <span className="text-[11px] font-bold text-[#7BD389]">Quick Access</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {favoriteServices.map((fav) => (
              <div
                key={fav.id}
                onClick={() => handleOpenDetail(fav)}
                className="bg-[#FAF9F6] border border-[#EBF8EE] hover:border-[#7BD389] p-3 rounded-2xl flex-shrink-0 w-64 cursor-pointer transition space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <strong className="font-extrabold text-xs text-[#111827] truncate">{fav.name}</strong>
                  <span className="text-amber-400 font-bold text-[11px]">★ {fav.rating}</span>
                </div>
                <p className="text-[11px] text-[#525C54]">{fav.type} • {fav.distance} km</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenBooking(fav);
                  }}
                  className="w-full bg-[#EBF8EE] text-[#7BD389] hover:bg-[#7BD389] hover:text-white font-extrabold text-[11px] py-1.5 rounded-pill transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 3. ACTIVE FILTERS CHIPS BAR ================= */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white border border-[#DCEBE0] p-3 rounded-card text-xs font-bold">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#525C54]">Active Filters:</span>
          
          <span className="bg-[#EBF8EE] text-[#7BD389] px-3 py-1 rounded-pill border border-[#7BD389]/30">
            Category: {filters.category.toUpperCase()}
          </span>

          <span className="bg-[#EBF8EE] text-[#7BD389] px-3 py-1 rounded-pill border border-[#7BD389]/30">
            Radius: ≤ {filters.maxDistance} km
          </span>

          {filters.openNowOnly && (
            <span className="bg-[#EBF8EE] text-[#7BD389] px-3 py-1 rounded-pill border border-[#7BD389]/30">
              🟢 Open Now
            </span>
          )}

          {filters.offersOnly && (
            <span className="bg-[#FFF0F5] text-[#FF85A1] px-3 py-1 rounded-pill border border-[#F7C6D7]">
              🏷️ Offers Only
            </span>
          )}
        </div>

        {/* Mobile View Toggle Button (List vs Map) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileViewMode('list')}
            className={`px-3 py-1.5 rounded-pill text-xs font-bold transition ${
              mobileViewMode === 'list' ? 'bg-[#7BD389] text-white' : 'bg-[#FAF9F6] text-[#525C54]'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setMobileViewMode('map')}
            className={`px-3 py-1.5 rounded-pill text-xs font-bold transition ${
              mobileViewMode === 'map' ? 'bg-[#7BD389] text-white' : 'bg-[#FAF9F6] text-[#525C54]'
            }`}
          >
            🗺️ Map View
          </button>
        </div>
      </div>

      {/* ================= 4. RESPONSIVE LIST + MAP TOGGLE SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SCROLLABLE LIST OF SERVICE CARDS (7 cols on desktop) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileViewMode === 'map' ? 'hidden lg:block' : 'block'}`}>
          {filteredServices.length === 0 ? (
            /* Helpful Empty State */
            <div className="bg-white border border-[#DCEBE0] rounded-card p-10 text-center space-y-3">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-extrabold text-base text-[#111827]">No Providers Found</h3>
              <p className="text-xs text-[#525C54] max-w-sm mx-auto">
                No verified providers matched your search criteria. Try widening your distance radius or clearing active filters.
              </p>
              <button
                onClick={() => {
                  setTerm('');
                  setFilters({
                    category: 'all',
                    maxDistance: 25,
                    minRating: 0,
                    openNowOnly: false,
                    offersOnly: false,
                    homeVisitsOnly: false,
                    priceTier: 'all'
                  });
                }}
                className="bg-[#7BD389] text-white font-extrabold text-xs px-6 py-2.5 rounded-pill shadow-soft-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleOpenBooking}
                onViewDetail={handleOpenDetail}
                isFavorite={favorites.includes(service.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>

        {/* RIGHT COLUMN: MAP PANEL (5 cols on desktop) */}
        <div className={`lg:col-span-5 sticky top-24 h-[600px] ${mobileViewMode === 'list' ? 'hidden lg:block' : 'block'}`}>
          <MapPanel
            services={filteredServices}
            onBook={handleOpenBooking}
            onViewDetail={handleOpenDetail}
          />
        </div>

      </div>

      {/* ================= MODALS & BOTTOM SHEETS ================= */}
      
      {/* 1. FILTER MODAL */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() => setFilters({
          category: 'all',
          maxDistance: 25,
          minRating: 0,
          openNowOnly: false,
          offersOnly: false,
          homeVisitsOnly: false,
          priceTier: 'all'
        })}
      />

      {/* 2. QUICK BOOKING BOTTOM SHEET */}
      <BookingSheet
        service={bookingService}
        pet={pet}
        isOpen={isBookingSheetOpen}
        onClose={() => setIsBookingSheetOpen(false)}
      />

      {/* 3. BUSINESS DETAIL DRAWER */}
      <BusinessDetail
        service={detailService}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBook={handleOpenBooking}
      />

      {/* 4. LIVE IN-APP CHAT WIDGET */}
      <ChatWidget onSendMessage={(msg) => console.log('Chat Sent:', msg)} />

    </div>
  );
}
