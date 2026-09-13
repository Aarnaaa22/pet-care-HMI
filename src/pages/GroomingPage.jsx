// src/pages/GroomingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GroomerCard from '../components/Grooming/GroomerCard';
import GroomerProfile from '../components/Grooming/GroomerProfile';
import BookingModal from '../components/Grooming/BookingModal';
import QueueWidget from '../components/Grooming/QueueWidget';

export const INITIAL_MOCK_GROOMERS = [
  {
    id: 'g1',
    name: 'Bella Feline & Canine Spa',
    avatar: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.9,
    reviewsCount: 128,
    distanceKm: 1.2,
    priceEstimate: '$45 - $65',
    openNow: true,
    specialty: 'Feline Coat Styling & Stress-Free Bathing',
    experienceYears: 9,
    bio: 'Certified master groomer specializing in Persian, Tabby, and Maine Coon coats using 100% organic shampoos.',
    servicesList: ['Full Groom', 'Bath & Brush', 'Nails & Ears', 'Flea Dip'],
    beforeImg: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g2',
    name: 'Paws & Whiskers Grooming Hub',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.8,
    reviewsCount: 94,
    distanceKm: 2.5,
    priceEstimate: '$35 - $50',
    openNow: true,
    specialty: 'Express Bath, De-shedding & Paw Therapy',
    experienceYears: 6,
    bio: 'Fast, high-quality bath and de-shedding treatments tailored for sensitive skin.',
    servicesList: ['Bath & Brush', 'Nails & Ears', 'Paw Pad Therapy'],
    beforeImg: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g3',
    name: 'Metro Velvet Coat Salon',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    verified: false,
    rating: 4.7,
    reviewsCount: 56,
    distanceKm: 3.8,
    priceEstimate: '$40 - $60',
    openNow: false,
    specialty: 'Show Coat Styling & De-matting',
    experienceYears: 12,
    bio: 'Luxury styling for long-haired cats and dogs.',
    servicesList: ['Full Groom', 'De-matting', 'Teeth Brushing'],
    beforeImg: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80'
  }
];

export default function GroomingPage({ pet, onBookService, onNavigate }) {
  const currentPet = pet || {
    id: 'silver',
    name: 'Silver',
    type: 'cat',
    breed: 'Silver Tabby',
    weightKg: 4.2,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
  };

  const [serviceFilter, setServiceFilter] = useState('all'); // 'all' | 'Full Groom' | 'Bath & Brush' | 'Nails & Ears'
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedGroomer, setSelectedGroomer] = useState(null);
  const [bookingGroomer, setBookingGroomer] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredGroomers = INITIAL_MOCK_GROOMERS.filter(g => {
    if (openNowOnly && !g.openNow) return false;
    if (serviceFilter !== 'all' && !g.servicesList.includes(serviceFilter)) return false;
    return true;
  });

  const handleConfirmBooking = (bookingPayload) => {
    setUserBookings(prev => [bookingPayload, ...prev]);
    showToast(`🎉 Grooming booked with ${bookingPayload.groomerName}!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-ww-ink text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-warm-lg flex items-center gap-2 border border-ww-brass"
          >
            <span>✨</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Silver Profile Header */}
      <section
        className="rounded-3xl p-6 sm:p-8 shadow-warm-md relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)',
          border: '1.5px solid var(--wood-light)',
          borderLeft: '8px solid var(--brass)'
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentPet.avatar || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'}
              alt={currentPet.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-ww-brass shadow-warm-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="room-label">Grooming &amp; Spa</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Next Trim Due: In 5 Days
                </span>
              </div>
              <h1 className="font-kalam text-3xl sm:text-4xl leading-tight text-ww-ink mt-1">
                Luxury Grooming &amp; Fur Care for {currentPet.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-ww-wood-dark mt-0.5">
                {currentPet.breed} • Verified Salons • Before &amp; After Compare • Live Walk-In Queue
              </p>
            </div>
          </div>

          <button
            onClick={() => setBookingGroomer(INITIAL_MOCK_GROOMERS[0])}
            className="px-5 py-2.5 bg-gradient-to-r from-ww-brass to-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-warm-md hover:brightness-105 transition flex items-center gap-1.5"
          >
            ✂️ Book Quick Grooming
          </button>
        </div>
      </section>

      {/* Live Walk-In Queue Widget */}
      <QueueWidget pet={currentPet} />

      {/* Filter Toolbar */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-2xl p-4 shadow-warm-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-ww-wood shrink-0">Filter Service:</span>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'Full Groom', label: '✂️ Full Groom' },
            { id: 'Bath & Brush', label: '🛁 Bath & Brush' },
            { id: 'Nails & Ears', label: '🐾 Nails & Ears' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setServiceFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                serviceFilter === tab.id
                  ? 'bg-ww-brass text-white shadow-sm'
                  : 'bg-ww-paper-dark/60 text-ww-wood-dark hover:bg-ww-wood-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-bold text-ww-ink cursor-pointer">
          <input
            type="checkbox"
            checked={openNowOnly}
            onChange={e => setOpenNowOnly(e.target.checked)}
            className="accent-ww-brass rounded"
          />
          <span>● Open Now Only</span>
        </label>
      </div>

      {/* User Confirmed Bookings Banner */}
      {userBookings.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-extrabold text-sm text-ww-ink">Your Upcoming Grooming Appointments</h3>
          {userBookings.map(bk => (
            <div key={bk.id} className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-xs text-emerald-900">{bk.serviceName}</h4>
                <p className="text-[10px] font-semibold text-emerald-800">
                  {bk.groomerName} • {new Date(bk.date).toLocaleString()} • Total: ${bk.total.toFixed(2)}
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900">
                ✓ Confirmed
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Groomer Cards Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-ww-ink">Top Rated Verified Grooming Salons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGroomers.map(groomer => (
            <GroomerCard
              key={groomer.id}
              groomer={groomer}
              onSelect={g => setSelectedGroomer(g)}
              onBook={g => setBookingGroomer(g)}
            />
          ))}
        </div>
      </div>

      {/* Groomer Profile Modal */}
      <GroomerProfile
        isOpen={Boolean(selectedGroomer)}
        onClose={() => setSelectedGroomer(null)}
        groomer={selectedGroomer}
        onBook={g => {
          setSelectedGroomer(null);
          setBookingGroomer(g);
        }}
      />

      {/* Booking Modal */}
      {bookingGroomer && (
        <BookingModal
          isOpen={Boolean(bookingGroomer)}
          onClose={() => setBookingGroomer(null)}
          groomer={bookingGroomer}
          pet={currentPet}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
