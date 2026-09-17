import React, { useState } from "react";
import GroomerCard from "./GroomerCard";
import { GROOMERS } from "../../data/groomers";
import GroomerProfile from "./GroomerProfile";
import BookingModal from "./BookingModal";
import MessageModal from "./MessageModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * GroomersPage - Main groomers list, filtering, profile drawer, messaging & booking
 */
export default function GroomersPage({ pet }) {
  const currentPet = pet || { name: "Silver", breed: "Silver Tabby Cat" };
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [serviceCategory, setServiceCategory] = useState("all"); // 'all' | 'Full Groom' | 'Express Bath' | 'Nail Trim' | 'Mobile'
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [highRatingOnly, setHighRatingOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended"); // 'recommended' | 'rating' | 'distance' | 'price'

  // Modals state
  const [bookingGroomer, setBookingGroomer] = useState(null);
  const [messagingGroomer, setMessagingGroomer] = useState(null);
  const [userBookings, setUserBookings] = useState([
    {
      id: "bk-sample-1",
      groomerName: "Pawsitive Grooming Spa",
      serviceName: "Full Grooming Spa & Coat Styling",
      date: "2026-09-16T10:30:00.000Z",
      name: `${currentPet.name}'s Parent`,
      total: 1200,
      status: "Confirmed"
    }
  ]);

  const handleConfirmBooking = (bookingPayload) => {
    setUserBookings((prev) => [bookingPayload, ...prev]);
    toast.success(`🎉 Booking confirmed with ${bookingPayload.groomerName} for ${new Date(bookingPayload.date).toLocaleDateString()}!`);
  };

  const handleCancelBooking = (id) => {
    setUserBookings((prev) => prev.filter((b) => b.id !== id));
    toast.info("Booking cancelled.");
  };

  // Filter logic
  let filtered = GROOMERS.filter((g) => {
    // Text search query
    const q = query.toLowerCase();
    const matchesQuery =
      g.name.toLowerCase().includes(q) ||
      g.tagline?.toLowerCase().includes(q) ||
      g.address?.toLowerCase().includes(q) ||
      g.services.some((s) => s.name.toLowerCase().includes(q));

    if (!matchesQuery) return false;

    // Service category filter
    if (serviceCategory === "Mobile" && !g.isMobile) return false;
    if (serviceCategory !== "all" && serviceCategory !== "Mobile") {
      const hasCatService = g.services.some((s) =>
        s.name.toLowerCase().includes(serviceCategory.toLowerCase())
      );
      if (!hasCatService) return false;
    }

    // Certified filter
    if (certifiedOnly && !g.certified) return false;

    // Rating filter (4.8+)
    if (highRatingOnly && g.rating < 4.8) return false;

    return true;
  });

  // Sort logic
  if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "distance") {
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === "price") {
    filtered.sort((a, b) => {
      const priceA = a.services[0]?.price || 0;
      const priceB = b.services[0]?.price || 0;
      return priceA - priceB;
    });
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-12">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#8A5A9E] via-[#A070B5] to-[#B388CC] text-white py-8 px-4 sm:px-8 shadow-sm rounded-card relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-[#F3E8FF] mb-2 backdrop-blur-xs">
              <img src={`${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/grooming_icon.png`} alt="Grooming" className="w-5 h-5 object-contain inline-block rounded-xs" />
              <span>Grooming &amp; Spa Care</span>
              <span>•</span>
              <span>For {currentPet.name} ({currentPet.breed || "Silver Tabby"})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Verified Pet Salons &amp; Doorstep Mobile Groomers
            </h1>
            <p className="text-xs sm:text-sm text-green-100 mt-1 max-w-2xl">
              Book certified pet stylists, compare before &amp; after transformations, send direct messages, or order climate-controlled mobile grooming vans to your home!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingGroomer(GROOMERS[0])}
              className="px-5 py-2.5 bg-white text-green-800 hover:bg-green-50 font-extrabold text-xs rounded-xl shadow-md transition"
            >
              ✂️ Quick Book Now
            </button>
          </div>
        </div>
      </div>

      <div>

        {/* Upcoming Confirmed Bookings Banner */}
        {userBookings.length > 0 && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs">
            <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
              <span>📅 Your Upcoming Grooming Appointments</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                {userBookings.length} Active
              </span>
            </h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {userBookings.map((bk) => (
                <div key={bk.id} className="bg-[#F4EBF7] border border-[#D4B6D6] p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{bk.serviceName}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      <span className="font-semibold text-emerald-800">{bk.groomerName}</span> • {new Date(bk.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Booked by {bk.name} • <span className="font-bold text-gray-800">₹{bk.total}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelBooking(bk.id)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-[#F4EBF7] rounded-2xl p-4 shadow-xs border border-[#D4B6D6] mb-6 space-y-4">
          
          {/* Top Bar: Search input & Sort dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[200px] sm:min-w-[260px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by salon name, service (e.g. Nail Trim, Bath)..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-600 transition"
              />
              <span className="absolute left-3 top-3 text-gray-400 text-sm">🔍</span>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-green-600"
              >
                <option value="recommended">⭐ Recommended</option>
                <option value="rating">★ Highest Rating</option>
                <option value="distance">📍 Nearest Distance</option>
                <option value="price">💵 Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Category Chips & Checkboxes */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-gray-500 shrink-0">Services:</span>
              {[
                { id: "all", label: "All Salons" },
                { id: "Full Groom", label: "✂️ Full Groom" },
                { id: "Bath", label: "🛁 Express Bath" },
                { id: "Nail", label: "💅 Nail & Paw" },
                { id: "De-Shedding", label: "🐈 De-Shedding" },
                { id: "Mobile", label: "🚐 Mobile Van" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setServiceCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    serviceCategory === tab.id
                      ? "bg-green-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={certifiedOnly}
                  onChange={(e) => setCertifiedOnly(e.target.checked)}
                  className="accent-green-600 rounded"
                />
                <span>✓ Certified Salons Only</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={highRatingOnly}
                  onChange={(e) => setHighRatingOnly(e.target.checked)}
                  className="accent-green-600 rounded"
                />
                <span>★ 4.8+ Rated</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Layout: Stacked vertically */}
        <div className="flex flex-col gap-6 items-stretch">
          
          {/* Top Section: Profile Drawer (Desktop) */}
          <aside className="hidden lg:block">
            {selected ? (
              <GroomerProfile
                groomer={selected}
                onClose={() => setSelected(null)}
                onConfirmBooking={handleConfirmBooking}
                pet={currentPet}
              />
            ) : (
              <div className="p-6 bg-[#F4EBF7] rounded-2xl shadow-xs border border-[#D4B6D6] text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-xl mb-3">
                  ✂️
                </div>
                <h3 className="font-bold text-base text-gray-900">Pick a groomer profile</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Click any groomer card below to view detailed portfolio, before &amp; after transformations, services &amp; pricing.
                </p>
              </div>
            )}
          </aside>

          {/* Bottom Section: Groomer Cards */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium px-1">
              <span>Showing <strong>{filtered.length}</strong> pet groomers nearby</span>
              {filtered.length > 0 && <span className="text-xs text-green-700">● Open for bookings today</span>}
            </div>

            <div className="space-y-4">
              {filtered.map((g) => (
                <GroomerCard
                  key={g.id}
                  groomer={g}
                  onView={() => setSelected(g)}
                  onBook={(groomerToBook) => setBookingGroomer(groomerToBook)}
                  onMessage={(groomerToMsg) => setMessagingGroomer(groomerToMsg)}
                />
              ))}

              {filtered.length === 0 && (
                <div className="p-8 bg-[#F4EBF7] rounded-2xl shadow-xs border border-[#D4B6D6] text-center">
                  <div className="text-3xl mb-2">🐾</div>
                  <h3 className="text-base font-bold text-gray-900">No groomers found</h3>
                  <p className="text-xs text-gray-500 mt-1">Try clearing filters or searching for another term like "Bath" or "Mobile".</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setServiceCategory("all");
                      setCertifiedOnly(false);
                      setHighRatingOnly(false);
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-green-700 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Drawer / Modal */}
      {selected && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-[99999] p-4 flex items-end sm:items-center justify-center">
          <div className="bg-[#F4EBF7] rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-lg p-2 relative z-[100000] border border-[#D4B6D6]">
            <button
              className="m-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1"
              onClick={() => setSelected(null)}
            >
              ← Back to list
            </button>
            <GroomerProfile
              groomer={selected}
              onClose={() => setSelected(null)}
              onConfirmBooking={handleConfirmBooking}
              pet={currentPet}
            />
          </div>
        </div>
      )}

      {/* Standalone Direct Booking Modal */}
      {bookingGroomer && (
        <BookingModal
          isOpen={Boolean(bookingGroomer)}
          onClose={() => setBookingGroomer(null)}
          groomer={bookingGroomer}
          onConfirmBooking={(payload) => {
            handleConfirmBooking(payload);
            setBookingGroomer(null);
          }}
          pet={currentPet}
        />
      )}

      {/* Standalone Direct Message Modal */}
      {messagingGroomer && (
        <MessageModal
          isOpen={Boolean(messagingGroomer)}
          onClose={() => setMessagingGroomer(null)}
          groomer={messagingGroomer}
          pet={currentPet}
        />
      )}
    </div>
  );
}
