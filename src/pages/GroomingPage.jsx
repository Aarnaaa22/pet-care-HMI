import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GROOMING_SERVICES_MOCK, SUPPLIES_MOCK, COUPONS_MOCK } from '../mockData';

export default function GroomingPage({ pet = { name: 'Luna' }, onBookService, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [shopSearch, setShopSearch] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState([
    { id: 101, name: 'Organic Salmon Kibble (2kg)', price: 899, quantity: 1, icon: '🥩' },
    { id: 103, name: 'Lavender Coat Shine Spray', price: 449, quantity: 1, icon: '🧴' }
  ]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Grooming Booking Sheet State
  const [selectedGroomingService, setSelectedGroomingService] = useState(null);
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);
  const [includeHomePickup, setIncludeHomePickup] = useState(true);
  const [groomerNotes, setGroomerNotes] = useState('');
  const [referencePhotoAttached, setReferencePhotoAttached] = useState(false);

  // Subscription State Modal
  const [subSettingsModalOpen, setSubSettingsModalOpen] = useState(false);
  const [isSubPaused, setIsSubPaused] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ADD TO CART
  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { id: product.id, name: product.name, price: product.rawPrice, quantity: 1, icon: product.icon }]);
    }

    if (typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }
    showToast(`Added ${product.name} to cart 🛒`);
  };

  // REORDER QUICK
  const handleReorder = (product) => {
    handleAddToCart(product);
  };

  // NOTIFY ME
  const handleNotifyMe = (productName) => {
    showToast(`We will notify you as soon as ${productName} is back in stock! 🔔`);
  };

  // OPEN GROOMING BOOKING SHEET
  const handleOpenGroomingBooking = (service) => {
    setSelectedGroomingService(service);
    setBookingSheetOpen(true);
  };

  // CONFIRM GROOMING BOOKING
  const handleConfirmGroomingBooking = (e) => {
    e.preventDefault();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
    alert(`🎉 Grooming Booking Confirmed!\n\n${selectedGroomingService.title} for ${pet.name}.\nDate: Tomorrow at 2:00 PM\nPickup: ${includeHomePickup ? 'Home Pickup Included (+₹99)' : 'In-Store Visit'}\nEstimated Groomer ETA: 1:45 PM`);
    setBookingSheetOpen(false);
  };

  // CALCULATE CART TOTALS
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // FILTER SUPPLIES
  const filteredSupplies = SUPPLIES_MOCK.filter((prod) => {
    const matchesCat = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = !shopSearch || prod.name.toLowerCase().includes(shopSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-28">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#2A2F2B] text-white px-6 py-3 rounded-pill text-xs font-extrabold shadow-soft-lg z-50 flex items-center gap-2 animate-bounce">
          <span>🛒</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: QUICK ACTIONS ROW */}
      <div className="bg-gradient-to-r from-[#FFF0F5] via-[#EBF8EE] to-[#E0F2FE] border border-[#DCEBE0] rounded-card p-5 shadow-soft-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase text-[#FF85A1] tracking-wider block">Grooming & Pet Store</span>
          <h1 className="font-extrabold text-xl sm:text-2xl text-[#2A2F2B] mt-0.5">Pamper & Supplies Hub</h1>
          <p className="text-xs text-[#525C54] mt-0.5">Book professional grooming spa sessions or order essential pet supplies for {pet.name}.</p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleOpenGroomingBooking(GROOMING_SERVICES_MOCK[0])}
            className="flex-1 sm:flex-none bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>🛁</span> Book Grooming
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('shopSection');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 sm:flex-none bg-white hover:bg-[#FAF9F6] border border-[#DCEBE0] text-[#2A2F2B] font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>🛍️</span> Order Supplies
          </button>
          <button
            onClick={() => setCartModalOpen(true)}
            className="bg-white hover:bg-[#FFF0F5] border border-[#DCEBE0] text-[#FF85A1] font-extrabold text-xs px-3.5 py-2.5 rounded-pill shadow-soft-sm min-h-[44px] flex items-center justify-center gap-1"
          >
            <span>🛒</span> My Orders ({totalCartCount})
          </button>
        </div>
      </div>

      {/* ================= SECTION 1: GROOMING SERVICES CAROUSEL ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-[#2A2F2B]">Grooming Spa Packages</h2>
            <p className="text-xs text-[#8E9890]">Professional bath, haircut, nail trim & skin spa</p>
          </div>
          <button
            onClick={() => setSubSettingsModalOpen(true)}
            className="text-xs font-extrabold text-[#7BD389] bg-[#EBF8EE] px-3.5 py-1.5 rounded-pill hover:bg-[#7BD389] hover:text-white transition"
          >
            ⚙️ Auto-Grooming Plan
          </button>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {GROOMING_SERVICES_MOCK.map((srv) => (
            <div
              key={srv.id}
              className="min-w-[270px] sm:min-w-[300px] bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md hover:shadow-soft-lg hover:border-[#7BD389] transition snap-start flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#FF85A1] text-2xl flex items-center justify-center shadow-soft-sm">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#EBF8EE] text-[#7BD389] px-2.5 py-1 rounded-pill">{srv.badge}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#2A2F2B] mb-1">{srv.title}</h3>
                <p className="text-xs text-[#8E9890] mb-3 leading-relaxed">{srv.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#525C54] mb-4">
                  <span>⏱️ {srv.duration}</span>
                  <span>•</span>
                  <span className="text-[#F59E0B] font-bold">★ {srv.rating} ({srv.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EBF8EE]">
                <div>
                  <span className="text-[10px] text-[#8E9890] block">Starting from</span>
                  <span className="font-extrabold text-base text-[#7BD389]">{srv.price}</span>
                </div>
                <button
                  onClick={() => handleOpenGroomingBooking(srv)}
                  className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm min-h-[44px] transition"
                >
                  Book Grooming
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS & COUPONS BANNER CARD */}
      <div className="bg-gradient-to-r from-[#FFE8E8] to-[#FFF0F5] border border-[#FFC1C1] rounded-card p-5 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-soft-sm">🏷️</div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#E63946] tracking-wider">Exclusive Offers</span>
            <h4 className="font-extrabold text-sm text-[#2A2F2B]">Save 20% OFF with Code PAWS20</h4>
            <p className="text-xs text-[#525C54]">Valid on all full spa grooming & bath bookings this month.</p>
          </div>
        </div>
        <button
          onClick={() => {
            setAppliedCoupon(COUPONS_MOCK[0]);
            showToast("Applied Coupon PAWS20 (Saved ₹180!) 🏷️");
          }}
          className="w-full sm:w-auto bg-[#E63946] hover:bg-[#D62828] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          {appliedCoupon ? '✓ Coupon Applied' : 'Apply Coupon Code'}
        </button>
      </div>

      {/* ================= SECTION 2: SUPPLIES & STORE SECTION ================= */}
      <div id="shopSection" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-extrabold text-lg text-[#2A2F2B]">Pet Supplies Store</h2>
            <p className="text-xs text-[#8E9890]">Organic foods, toys, medicines & grooming essentials</p>
          </div>

          {/* Shop Search Bar */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-2.5 text-xs text-[#8E9890]">🔍</span>
            <input
              type="text"
              value={shopSearch}
              onChange={(e) => setShopSearch(e.target.value)}
              placeholder="Search food, toys, supplies..."
              className="w-full pl-8 pr-4 py-2 bg-white border border-[#DCEBE0] rounded-pill text-xs font-semibold focus:outline-none focus:border-[#7BD389]"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'food', label: 'Food 🥩' },
            { id: 'toys', label: 'Toys 🎾' },
            { id: 'grooming', label: 'Grooming 🛁' },
            { id: 'meds', label: 'Meds 💊' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-pill text-xs font-extrabold whitespace-nowrap transition border min-h-[44px] ${
                activeCategory === cat.id
                  ? 'bg-[#7BD389] text-white border-[#7BD389] shadow-soft-sm'
                  : 'bg-white text-[#525C54] border-[#DCEBE0] hover:border-[#7BD389]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid (1 col sm, 2 col md, 3 col lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSupplies.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md hover:shadow-soft-lg hover:border-[#7BD389] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${prod.imageBg} shadow-soft-sm`}>
                    {prod.icon}
                  </div>
                  {prod.previouslyBought && (
                    <span className="text-[10px] font-extrabold bg-[#EBF8EE] text-[#7BD389] px-2.5 py-1 rounded-pill">
                      Previously Bought
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-[#2A2F2B] mb-1">{prod.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] mb-3">
                  <span>★ {prod.rating}</span>
                  <span className="text-[#8E9890] font-normal">(92 reviews)</span>
                </div>

                {/* Auto-reorder Subscription Option */}
                {prod.subscriptionAvailable && (
                  <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#EBF8EE] text-[11px] font-bold text-[#525C54] mb-3">
                    <span className="text-[#7BD389]">🔄 Auto-reorder every 30 days</span>
                    <span className="block text-[#8E9890] text-[10px] font-semibold">Save 15% on monthly delivery</span>
                  </div>
                )}
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-3 border-t border-[#EBF8EE] flex items-center justify-between gap-2">
                <span className="font-extrabold text-base text-[#7BD389]">{prod.price}</span>
                
                <div className="flex items-center gap-1.5">
                  {prod.previouslyBought && (
                    <button
                      onClick={() => handleReorder(prod)}
                      className="bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#525C54] hover:text-[#7BD389] px-3 py-2 rounded-pill text-xs font-extrabold transition min-h-[44px]"
                      title="Quick Reorder"
                    >
                      Reorder
                    </button>
                  )}

                  {!prod.inStock ? (
                    <button
                      onClick={() => handleNotifyMe(prod.name)}
                      className="bg-[#FFE8E8] text-[#E63946] font-extrabold text-xs px-3.5 py-2.5 rounded-pill hover:bg-[#E63946] hover:text-white transition min-h-[44px]"
                    >
                      Notify Me
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-4 py-2.5 rounded-pill shadow-soft-sm transition min-h-[44px]"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING CART PREVIEW BAR */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-[#2A2F2B] text-white p-3.5 px-5 rounded-pill shadow-soft-lg z-40 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7BD389] text-white flex items-center justify-center text-lg font-extrabold">
              🛒
            </div>
            <div>
              <span className="font-extrabold text-sm block">{totalCartCount} Items in Cart</span>
              <span className="text-xs text-[#8E9890]">Subtotal: <strong className="text-[#7BD389]">₹{cartFinalTotal}</strong></span>
            </div>
          </div>

          <button
            onClick={() => setCartModalOpen(true)}
            className="bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[44px]"
          >
            Checkout →
          </button>
        </div>
      )}

      {/* GROOMING BOOKING BOTTOM SHEET MODAL */}
      {bookingSheetOpen && selectedGroomingService && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Book {selectedGroomingService.title}</h3>
              <button onClick={() => setBookingSheetOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleConfirmGroomingBooking} className="space-y-4">
              <div className="bg-[#EBF8EE] p-3.5 rounded-2xl border border-[#7BD389]/30 flex justify-between items-center text-xs font-bold">
                <span>{selectedGroomingService.title} ({selectedGroomingService.duration})</span>
                <span className="text-[#7BD389] text-sm">{selectedGroomingService.price}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Preferred Date & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="py-2 px-3 rounded-pill bg-[#7BD389] text-white font-extrabold text-xs min-h-[44px]">Tomorrow, 2:00 PM</button>
                  <button type="button" className="py-2 px-3 rounded-pill bg-[#FAF9F6] border border-[#DCEBE0] text-[#525C54] font-bold text-xs min-h-[44px]">Tue Sep 15, 10:00 AM</button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center justify-between bg-[#FAF9F6] p-3 rounded-2xl border border-[#EBF8EE] text-xs font-bold cursor-pointer">
                  <span>🏠 Include Home Pickup & Drop (+₹99)</span>
                  <input
                    type="checkbox"
                    checked={includeHomePickup}
                    onChange={(e) => setIncludeHomePickup(e.target.checked)}
                    className="w-5 h-5 accent-[#7BD389]"
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Before/After Reference Photo Upload</label>
                <div
                  onClick={() => setReferencePhotoAttached(true)}
                  className={`border-2 border-dashed rounded-2xl p-3.5 text-center cursor-pointer transition ${
                    referencePhotoAttached ? 'bg-[#EBF8EE] border-[#7BD389] text-[#7BD389]' : 'bg-[#FAF9F6] border-[#DCEBE0] text-[#8E9890]'
                  }`}
                >
                  <span className="text-xl block">📷</span>
                  <span className="text-xs font-bold">
                    {referencePhotoAttached ? '✓ Reference Photo Attached' : 'Add reference photo for groomer'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Special Grooming Instructions</label>
                <textarea
                  value={groomerNotes}
                  onChange={(e) => setGroomerNotes(e.target.value)}
                  placeholder="e.g., Sensitive ears, soft coat trim around paws"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold h-20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px]"
              >
                Confirm Grooming Booking — {selectedGroomingService.price}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT CART MODAL */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Shopping Cart & Checkout</h3>
              <button onClick={() => setCartModalOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            {cartItems.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="text-center py-8 space-y-3">
                <div className="text-4xl">🛒</div>
                <h4 className="font-extrabold text-base text-[#2A2F2B]">Your cart is empty</h4>
                <p className="text-xs text-[#8E9890]">Your cart is empty — find food & toys to add.</p>
                <button
                  onClick={() => setCartModalOpen(false)}
                  className="bg-[#7BD389] text-white font-extrabold text-xs px-5 py-2.5 rounded-pill shadow-soft-sm min-h-[44px]"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              /* CART ITEMS LIST & CHECKOUT */
              <div className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-[#FAF9F6] p-3 rounded-2xl border border-[#EBF8EE] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h5 className="font-extrabold text-xs text-[#2A2F2B]">{item.name}</h5>
                          <span className="text-[11px] text-[#7BD389] font-extrabold">₹{item.price} x {item.quantity}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setCartItems(cartItems.filter(i => i.id !== item.id))}
                        className="text-xs text-[#E63946] font-bold p-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#F7C6D7] flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2A2F2B]">Applied Coupon: PAWS20</span>
                  <span className="text-xs font-extrabold text-[#E63946]">-₹{discountAmount}</span>
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EBF8EE] space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between"><span>Subtotal:</span><span>₹{cartSubtotal}</span></div>
                  <div className="flex justify-between text-[#E63946]"><span>Discount:</span><span>-₹{discountAmount}</span></div>
                  <div className="flex justify-between font-extrabold text-sm text-[#2A2F2B] pt-2 border-t stroke-[#DCEBE0]">
                    <span>Total Payable:</span>
                    <span className="text-[#7BD389]">₹{cartFinalTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCartModalOpen(false);
                    if (onNavigate) {
                      onNavigate('checkout');
                    }
                  }}
                  className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout Page →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBSCRIPTION SETTINGS MODAL */}
      {subSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0]">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Auto-Reorder Subscription</h3>
              <button onClick={() => setSubSettingsModalOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <div className="bg-[#EBF8EE] p-3.5 rounded-2xl border border-[#7BD389]/30 space-y-1">
              <span className="text-xs font-extrabold text-[#2A2F2B] block">Monthly Essentials Plan</span>
              <p className="text-[11px] text-[#525C54]">Next charge date: <strong>Oct 13, 2026</strong> (₹799/month - Save 15%)</p>
            </div>

            <div className="flex items-center justify-between bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EBF8EE] text-xs font-bold">
              <span>Pause Subscription</span>
              <input
                type="checkbox"
                checked={isSubPaused}
                onChange={(e) => {
                  setIsSubPaused(e.target.checked);
                  showToast(e.target.checked ? "Subscription paused ⏸️" : "Subscription active ▶️");
                }}
                className="w-5 h-5 accent-[#7BD389]"
              />
            </div>

            <button
              onClick={() => setSubSettingsModalOpen(false)}
              className="w-full bg-[#7BD389] text-white font-extrabold py-3.5 rounded-pill text-xs shadow-soft-sm min-h-[44px]"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
