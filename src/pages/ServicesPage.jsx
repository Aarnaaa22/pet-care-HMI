import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import MapPanel from '../components/MapPanel';
import FilterModal from '../components/FilterModal';
import BookingSheet from '../components/BookingSheet';
import BusinessDetail from '../components/BusinessDetail';
import ChatWidget from '../components/ChatWidget';
import PetHeroAnimation from '../components/PetHeroAnimation';
import { SERVICES_MOCK, PETS_MOCK, COUPONS_MOCK } from '../mockData';

export default function ServicesPage({ searchQuery = '', onBookService, pet = PETS_MOCK.silver }) {
  // Local Search & Filter State
  const [term, setTerm] = useState(searchQuery);
  const [autosuggestOpen, setAutosuggestOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState('list'); // 'list' | 'map'
  const [heroImgError, setHeroImgError] = useState(false);
  
  const [favorites, setFavorites] = useState([1]); // Saved favorite IDs
  const [activeCollection, setActiveCollection] = useState('all'); // 'all' | 'vets' | 'spas'
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

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
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-24">
      
      {/* ================= 1. SEARCH & LEAD HERO ================= */}
      <section className="bg-gradient-to-r from-[#FFE5CC] via-[#FFD6B3] to-[#FFC899] border-none rounded-card p-6 sm:p-8 shadow-warm-md relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text & Search Bar (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 bg-white/50 border border-white/60 px-3.5 py-1 rounded-pill text-xs font-bold text-[#A65B33]">
              <span>📍 DISCOVER NEARBY CARE</span>
              <span>• VERIFIED PROVIDERS</span>
            </div>

            <h1 className="font-extrabold text-2xl sm:text-4xl text-[#111827] leading-tight">
              Find & Book Local Vets, Groomers & Pet Stores
            </h1>

            <p className="text-xs sm:text-sm text-[#525C54]">
              Top-rated care for <strong>{pet.name} ({pet.breed || 'Silver Tabby Cat'})</strong>. Compare consultation fees, read authentic reviews, and book instant appointments.
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
                  className="w-full pl-11 pr-24 py-3.5 rounded-pill bg-white/90 border-none text-sm font-semibold text-[#111827] shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-[#C2A370]/50 transition min-h-[48px]"
                />
                <button
                  onClick={() => setFilterModalOpen(true)}
                  className="absolute right-2 bg-[#C2A370] hover:bg-[#A88C5C] text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm transition min-h-[40px] flex items-center gap-1.5"
                >
                  <span>Filter</span>
                  <span>⚙️</span>
                </button>
              </div>

              {/* Autosuggest Dropdown Popup */}
              {autosuggestOpen && autosuggestItems.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFBF2] border border-ww-wood/30 rounded-2xl shadow-warm-lg z-40 overflow-hidden text-xs">
                  {autosuggestItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTerm(item.name);
                        setAutosuggestOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-ww-cream border-b border-ww-wood/10 last:border-none flex items-center justify-between"
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
                className="bg-[#23402E] hover:bg-[#31573F] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[40px]"
              >
                Find Nearby Vets 📍
              </button>
              <button
                onClick={() => alert("Partner portal: Fill form to register your clinic or pet shop.")}
                className="bg-[#31573F] hover:bg-[#437554] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-warm-sm min-h-[40px]"
              >
                List Your Business 🏪
              </button>
            </div>

          </div>

          {/* Right Hero Thumbnail Asset (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-soft-md bg-[#23402E] p-2 aspect-[4/3] relative flex items-center justify-center">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                {!heroImgError ? (
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
                    alt="PetShop Local Storefront Thumbnail"
                    className="w-full h-full object-cover"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-[#EBF8EE] p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <span className="text-5xl">🏪</span>
                    <strong className="text-sm text-[#111827] font-extrabold">PetShop Local Sanctuary</strong>
                    <span className="text-xs text-[#525C54]">Verified Vets & Spas</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border-none px-3 py-1 rounded-pill text-[11px] font-extrabold text-[#7BD389]">
                🟢 100+ Verified Partners
              </div>
            </div>
          </div>

        </div>

        {/* Foreground Running Animals Loop */}
        <div className="mt-6 pt-2 border-t border-black/5">
          <PetHeroAnimation lazyLoad={true} />
        </div>
      </section>

      {/* ================= 2. NEARBY EMERGENCY STICKY BANNER & OFFERS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Sticky Emergency Banner (6 cols) */}
        <div className="md:col-span-6 bg-[#FF9B8A] border-none rounded-card p-4 sm:p-5 flex items-center justify-between shadow-soft-sm text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white text-2xl flex items-center justify-center flex-shrink-0 font-extrabold animate-pulse">
              🚑
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-white/80 tracking-wider block">Urgent Trauma Care</span>
              <h3 className="font-extrabold text-sm text-white">24/7 Nearby Pet Emergency</h3>
              <p className="text-[11px] text-white/90">Trauma ICU • Pet Ambulance • Immediate Triage</p>
            </div>
          </div>

          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm flex-shrink-0 min-h-[40px] transition"
          >
            Emergency Help
          </button>
        </div>

        {/* Offers & Deals Card (6 cols) */}
        <div className="md:col-span-6 bg-[#B388A1] border-none rounded-card p-4 sm:p-5 flex items-center justify-between shadow-soft-sm text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white text-2xl flex items-center justify-center flex-shrink-0 font-extrabold">
              🏷️
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-white/80 tracking-wider block">Exclusive Deals</span>
              <h3 className="font-extrabold text-sm text-white">Coupon PAWS20: 20% OFF</h3>
              <p className="text-[11px] text-white/90">Save 20% on all Spa Grooming & Vet Checkups</p>
            </div>
          </div>

          <button
            onClick={() => alert("Applied promo coupon code PAWS20! 20% discount will be calculated at checkout.")}
            className="bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm flex-shrink-0 min-h-[40px] transition"
          >
            Apply Deal
          </button>
        </div>

      </div>

      {/* ================= 3. SAVED FAVORITES & CUSTOM COLLECTIONS ================= */}
      {favoriteServices.length > 0 && (
        <section className="bg-[#FFF2CC] border-none rounded-card p-4 sm:p-5 shadow-warm-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-sm text-[#23402E] flex items-center gap-2">
                <span>❤️ Saved Favorites & Collections</span>
                <span className="text-xs text-[#23402E]/60 font-normal">({favoriteServices.length})</span>
              </h3>
            </div>

            {/* Collection Filter Chips */}
            <div className="flex items-center gap-1.5 text-xs font-bold">
              {['all', 'vets', 'spas'].map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-3 py-1 rounded-pill transition ${
                    activeCollection === col ? 'bg-[#31573F] text-white' : 'bg-white/50 text-[#31573F]'
                  }`}
                >
                  {col === 'all' ? 'All Saved' : col === 'vets' ? 'Favorite Vets' : 'Weekend Spas'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {favoriteServices.map((fav) => (
              <div
                key={fav.id}
                onClick={() => handleOpenDetail(fav)}
                className="bg-[#FFFBF2] border border-ww-wood/20 hover:border-[#7BD389] p-3 rounded-2xl flex-shrink-0 w-64 cursor-pointer transition space-y-1.5"
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
                  className="w-full bg-[#23402E] text-white hover:bg-[#31573F] font-extrabold text-[11px] py-1.5 rounded-pill transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 4. ACTIVE FILTERS CHIPS BAR ================= */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-[#FFF2CC] border-none p-3 rounded-card text-xs font-bold shadow-warm-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#31573F]">Active Filters:</span>
          
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
              🏷️ Deals Only
            </span>
          )}
        </div>

        {/* Mobile View Toggle Button (List vs Map) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileViewMode('list')}
            className={`px-3 py-1.5 rounded-pill text-xs font-bold transition ${
              mobileViewMode === 'list' ? 'bg-[#31573F] text-white' : 'bg-white/50 text-[#31573F]'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setMobileViewMode('map')}
            className={`px-3 py-1.5 rounded-pill text-xs font-bold transition ${
              mobileViewMode === 'map' ? 'bg-[#31573F] text-white' : 'bg-white/50 text-[#31573F]'
            }`}
          >
            🗺️ Map View
          </button>
        </div>
      </div>

      {/* ================= 5. RESPONSIVE LIST + MAP TOGGLE SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SCROLLABLE LIST OF SERVICE CARDS (7 cols on desktop) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileViewMode === 'map' ? 'hidden lg:block' : 'block'}`}>
          {filteredServices.length === 0 ? (
            /* Helpful Empty State */
            <div className="bg-[#FFFBF2] border border-ww-wood/30 rounded-card p-10 text-center space-y-3 shadow-warm-sm">
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
                className="bg-[#31573F] hover:bg-[#23402E] text-white font-extrabold text-xs px-6 py-2.5 rounded-pill shadow-soft-sm transition"
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

        {/* RIGHT COLUMN: MAP & PROMO CARDS (5 cols on desktop) */}
        <div className={`lg:col-span-5 sticky top-24 space-y-4 ${mobileViewMode === 'list' ? 'hidden lg:block' : 'block'}`}>
          <MapPanel
            services={filteredServices}
            onBook={handleOpenBooking}
            onViewDetail={handleOpenDetail}
            height="500px"
          />
          
          {/* Promotional Card: PetCare Pro */}
          <div className="bg-[#FFFBF2] border border-ww-wood/30 rounded-card p-5 shadow-warm-sm flex items-start gap-4">
            <div className="text-4xl">🌟</div>
            <div>
              <h4 className="font-extrabold text-[#23402E] text-sm mb-1">PetCare Pro Network</h4>
              <p className="text-xs text-[#525C54] mb-3 leading-relaxed">
                Are you a licensed veterinarian or certified groomer? Join our network of 100+ verified professionals and grow your practice.
              </p>
              <button 
                onClick={() => alert('Redirecting to partner portal...')}
                className="bg-[#31573F] text-white hover:bg-[#23402E] text-[11px] font-extrabold px-4 py-2 rounded-pill transition"
              >
                Apply to Join
              </button>
            </div>
          </div>

          {/* Promotional Card: Daily Tip */}
          <div className="bg-[#EBF8EE] border border-[#7BD389]/30 rounded-card p-5 shadow-warm-sm flex items-center gap-4 min-h-[164px]">
            <div className="text-4xl shrink-0">💡</div>
            <div>
              <h4 className="font-extrabold text-[#23402E] text-sm mb-1">Daily Pet Tip</h4>
              <p className="text-xs text-[#525C54] leading-relaxed">
                Summer is here! Make sure your pets have access to fresh, cool water at all times. Consider adding ice cubes to their water bowl on hot afternoons.
              </p>
            </div>
          </div>
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

      {/* 2. QUICK BOOKING BOTTOM SHEET WITH MULTI-PET */}
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

      {/* 4. EMERGENCY TRIAGE MODAL */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-card p-6 shadow-soft-lg border border-[#FCA5A5] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#DCEBE0]">
              <h3 className="font-extrabold text-base text-[#EF4444] flex items-center gap-2">
                <span>🚑 Emergency Pet Dispatch</span>
              </h3>
              <button onClick={() => setEmergencyModalOpen(false)} className="text-lg text-[#8E9890]">✕</button>
            </div>

            <div className="bg-[#FFE8E8] p-4 rounded-2xl text-xs space-y-2 text-[#111827]">
              <span className="font-extrabold block text-sm text-[#EF4444]">City Emergency Vet Hospital (5.2 km)</span>
              <p>Ambulance Hotline: <strong>+91 98765 43213</strong> (24/7 Active)</p>
              <p className="text-[11px] text-[#525C54]">Equipped for respiratory distress, trauma, toxin ingestion, and emergency surgery.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert("Dispatching emergency pet ambulance to your saved address!")}
                className="flex-1 bg-[#EF4444] text-white font-extrabold text-xs py-3 rounded-pill shadow-soft-sm"
              >
                Dispatch Ambulance
              </button>
              <button
                onClick={() => alert("Connecting 1-tap call to Dr. Vikram Rao (ICU Chief)...")}
                className="flex-1 bg-[#FAF9F6] border border-[#DCEBE0] text-[#111827] font-extrabold text-xs py-3 rounded-pill"
              >
                Call ICU Doctor 📞
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. LIVE IN-APP CHAT WIDGET */}
      {/* <ChatWidget onSendMessage={(msg) => console.log('Chat Sent:', msg)} /> */}

    </div>
  );
}
