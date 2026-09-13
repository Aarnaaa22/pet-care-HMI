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
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-md text-xs font-extrabold shadow-warm-lg z-50 flex items-center gap-2 animate-bob" style={{ backgroundColor: 'var(--pine-dark)', border: '2px solid var(--brass)' }}>
          <span>🛒</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: QUICK ACTIONS ROW */}
      <div className="rounded-md p-5 shadow-warm-md flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)', border: '1.5px solid var(--wood-light)', borderLeft: '6px solid var(--awning)' }}>
        <div>
          <span className="room-label">Grooming & Pet Store</span>
          <h1 className="font-kalam text-2xl sm:text-3xl text-ww-ink mt-0.5">Pamper & Supplies Hub</h1>
          <p className="text-xs text-ww-wood-dark mt-0.5">Book professional grooming spa sessions or order essential pet supplies for {pet.name}.</p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleOpenGroomingBooking(GROOMING_SERVICES_MOCK[0])}
            className="flex-1 sm:flex-none bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-md shadow-warm-sm min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>🛁</span> Book Grooming
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('shopSection');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 sm:flex-none bg-ww-paper hover:bg-ww-paper border border-ww-paper-dark text-ww-ink font-extrabold text-xs px-4 py-2.5 rounded-md shadow-warm-sm min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <span>🛍️</span> Order Supplies
          </button>
          <button
            onClick={() => setCartModalOpen(true)}
            className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-awning font-extrabold text-xs px-3.5 py-2.5 rounded-md shadow-warm-sm min-h-[44px] flex items-center justify-center gap-1"
          >
            <span>🛒</span> My Orders ({totalCartCount})
          </button>
        </div>
      </div>

      {/* ================= SECTION 1: GROOMING SERVICES CAROUSEL ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-kalam text-xl text-ww-ink">Grooming Spa Packages</h2>
            <p className="text-xs text-ww-wood">Professional bath, haircut, nail trim & skin spa</p>
          </div>
          <button
            onClick={() => setSubSettingsModalOpen(true)}
            className="text-xs font-extrabold text-ww-brass bg-ww-paper-dark px-3.5 py-1.5 rounded-md hover:bg-ww-awning hover:text-white transition"
          >
            ⚙️ Auto-Grooming Plan
          </button>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {GROOMING_SERVICES_MOCK.map((srv) => (
            <div
              key={srv.id}
              className="min-w-[270px] sm:min-w-[300px] bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md hover:shadow-warm-lg hover:border-ww-wood transition snap-start flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-md bg-ww-paper-dark text-ww-awning text-2xl flex items-center justify-center shadow-warm-sm">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-extrabold bg-ww-paper-dark text-ww-brass px-2.5 py-1 rounded-md">{srv.badge}</span>
                </div>
                <h3 className="font-kalam text-lg text-ww-ink mb-1">{srv.title}</h3>
                <p className="text-xs text-ww-wood mb-3 leading-relaxed">{srv.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-ww-wood-dark mb-4">
                  <span>⏱️ {srv.duration}</span>
                  <span>•</span>
                  <span className="text-ww-brass font-bold">★ {srv.rating} ({srv.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-ww-paper-dark">
                <div>
                  <span className="text-[10px] text-ww-wood block">Starting from</span>
                  <span className="font-extrabold text-base text-ww-brass">{srv.price}</span>
                </div>
                <button
                  onClick={() => handleOpenGroomingBooking(srv)}
                  className="bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-md shadow-warm-sm min-h-[44px] transition"
                >
                  Book Grooming
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS & COUPONS BANNER CARD */}
      <div className="bg-gradient-to-r from-[#FFE8E8] to-[#FFF0F5] border border-[#FFC1C1] rounded-md p-5 shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-md bg-ww-paper text-2xl flex items-center justify-center shadow-warm-sm">🏷️</div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-ww-awning tracking-wider">Exclusive Offers</span>
            <h4 className="font-extrabold text-sm text-ww-ink">Save 20% OFF with Code PAWS20</h4>
            <p className="text-xs text-ww-wood-dark">Valid on all full spa grooming & bath bookings this month.</p>
          </div>
        </div>
        <button
          onClick={() => {
            setAppliedCoupon(COUPONS_MOCK[0]);
            showToast("Applied Coupon PAWS20 (Saved ₹180!) 🏷️");
          }}
          className="w-full sm:w-auto bg-[#E63946] hover:bg-[#D62828] text-white font-extrabold text-xs px-5 py-2.5 rounded-md shadow-warm-sm min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          {appliedCoupon ? '✓ Coupon Applied' : 'Apply Coupon Code'}
        </button>
      </div>

      {/* ================= SECTION 2: SUPPLIES & STORE SECTION ================= */}
      <div id="shopSection" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-kalam text-xl text-ww-ink">Pet Supplies Store</h2>
            <p className="text-xs text-ww-wood">Organic foods, toys, medicines & grooming essentials</p>
          </div>

          {/* Shop Search Bar */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-2.5 text-xs text-ww-wood">🔍</span>
            <input
              type="text"
              value={shopSearch}
              onChange={(e) => setShopSearch(e.target.value)}
              placeholder="Search food, toys, supplies..."
              className="w-full pl-8 pr-4 py-2 bg-ww-paper border border-ww-paper-dark rounded-md text-xs font-semibold focus:outline-none focus:border-ww-wood"
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
              className={`px-4 py-2 rounded-md text-xs font-extrabold whitespace-nowrap transition border min-h-[44px] ${
                activeCategory === cat.id
                  ? 'bg-ww-awning text-white border-ww-wood shadow-warm-sm'
                  : 'bg-ww-paper text-ww-wood-dark border-ww-paper-dark hover:border-ww-wood'
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
              className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md hover:shadow-warm-lg hover:border-ww-wood transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-14 h-14 rounded-md flex items-center justify-center text-3xl ${prod.imageBg} shadow-warm-sm`}>
                    {prod.icon}
                  </div>
                  {prod.previouslyBought && (
                    <span className="text-[10px] font-extrabold bg-ww-paper-dark text-ww-brass px-2.5 py-1 rounded-md">
                      Previously Bought
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-ww-ink mb-1">{prod.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-ww-brass mb-3">
                  <span>★ {prod.rating}</span>
                  <span className="text-ww-wood font-normal">(92 reviews)</span>
                </div>

                {/* Auto-reorder Subscription Option */}
                {prod.subscriptionAvailable && (
                  <div className="bg-ww-paper p-2.5 rounded-md border border-ww-paper-dark text-[11px] font-bold text-ww-wood-dark mb-3">
                    <span className="text-ww-brass">🔄 Auto-reorder every 30 days</span>
                    <span className="block text-ww-wood text-[10px] font-semibold">Save 15% on monthly delivery</span>
                  </div>
                )}
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-3 border-t border-ww-paper-dark flex items-center justify-between gap-2">
                <span className="font-extrabold text-base text-ww-brass">{prod.price}</span>
                
                <div className="flex items-center gap-1.5">
                  {prod.previouslyBought && (
                    <button
                      onClick={() => handleReorder(prod)}
                      className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-wood-dark hover:text-ww-brass px-3 py-2 rounded-md text-xs font-extrabold transition min-h-[44px]"
                      title="Quick Reorder"
                    >
                      Reorder
                    </button>
                  )}

                  {!prod.inStock ? (
                    <button
                      onClick={() => handleNotifyMe(prod.name)}
                      className="bg-ww-awning text-white font-extrabold text-xs px-3.5 py-2.5 rounded-md hover:bg-ww-awning-dark hover:text-white transition min-h-[44px]"
                    >
                      Notify Me
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-md shadow-warm-sm transition min-h-[44px]"
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
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-ww-pine-dark text-white p-3.5 px-5 rounded-md shadow-warm-lg z-40 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ww-awning text-white flex items-center justify-center text-lg font-extrabold">
              🛒
            </div>
            <div>
              <span className="font-extrabold text-sm block">{totalCartCount} Items in Cart</span>
              <span className="text-xs text-ww-wood">Subtotal: <strong className="text-ww-brass">₹{cartFinalTotal}</strong></span>
            </div>
          </div>

          <button
            onClick={() => setCartModalOpen(true)}
            className="bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold text-xs px-5 py-2.5 rounded-md shadow-warm-sm min-h-[44px]"
          >
            Checkout →
          </button>
        </div>
      )}

      {/* GROOMING BOOKING BOTTOM SHEET MODAL */}
      {bookingSheetOpen && selectedGroomingService && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Book {selectedGroomingService.title}</h3>
              <button onClick={() => setBookingSheetOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleConfirmGroomingBooking} className="space-y-4">
              <div className="bg-ww-paper-dark p-3.5 rounded-md border border-ww-wood flex justify-between items-center text-xs font-bold">
                <span>{selectedGroomingService.title} ({selectedGroomingService.duration})</span>
                <span className="text-ww-brass text-sm">{selectedGroomingService.price}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Preferred Date & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="py-2 px-3 rounded-md bg-ww-awning text-white font-extrabold text-xs min-h-[44px]">Tomorrow, 2:00 PM</button>
                  <button type="button" className="py-2 px-3 rounded-md bg-ww-paper border border-ww-paper-dark text-ww-wood-dark font-bold text-xs min-h-[44px]">Tue Sep 15, 10:00 AM</button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center justify-between bg-ww-paper p-3 rounded-md border border-ww-paper-dark text-xs font-bold cursor-pointer">
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
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Before/After Reference Photo Upload</label>
                <div
                  onClick={() => setReferencePhotoAttached(true)}
                  className={`border-2 border-dashed rounded-md p-3.5 text-center cursor-pointer transition ${
                    referencePhotoAttached ? 'bg-ww-paper-dark border-ww-wood text-ww-brass' : 'bg-ww-paper border-ww-paper-dark text-ww-wood'
                  }`}
                >
                  <span className="text-xl block">📷</span>
                  <span className="text-xs font-bold">
                    {referencePhotoAttached ? '✓ Reference Photo Attached' : 'Add reference photo for groomer'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Special Grooming Instructions</label>
                <textarea
                  value={groomerNotes}
                  onChange={(e) => setGroomerNotes(e.target.value)}
                  placeholder="e.g., Sensitive ears, soft coat trim around paws"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold h-20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                Confirm Grooming Booking — {selectedGroomingService.price}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT CART MODAL */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Shopping Cart & Checkout</h3>
              <button onClick={() => setCartModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            {cartItems.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="text-center py-8 space-y-3">
                <div className="text-4xl">🛒</div>
                <h4 className="font-extrabold text-base text-ww-ink">Your cart is empty</h4>
                <p className="text-xs text-ww-wood">Your cart is empty — find food & toys to add.</p>
                <button
                  onClick={() => setCartModalOpen(false)}
                  className="bg-ww-awning text-white font-extrabold text-xs px-5 py-2.5 rounded-md shadow-warm-sm min-h-[44px]"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              /* CART ITEMS LIST & CHECKOUT */
              <div className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-ww-paper p-3 rounded-md border border-ww-paper-dark flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h5 className="font-extrabold text-xs text-ww-ink">{item.name}</h5>
                          <span className="text-[11px] text-ww-brass font-extrabold">₹{item.price} x {item.quantity}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setCartItems(cartItems.filter(i => i.id !== item.id))}
                        className="text-xs text-ww-awning font-bold p-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="bg-ww-paper-dark p-3.5 rounded-md border border-[#F7C6D7] flex items-center justify-between">
                  <span className="text-xs font-extrabold text-ww-ink">Applied Coupon: PAWS20</span>
                  <span className="text-xs font-extrabold text-ww-awning">-₹{discountAmount}</span>
                </div>

                {/* Pricing Summary */}
                <div className="bg-ww-paper p-3.5 rounded-md border border-ww-paper-dark space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between"><span>Subtotal:</span><span>₹{cartSubtotal}</span></div>
                  <div className="flex justify-between text-ww-awning"><span>Discount:</span><span>-₹{discountAmount}</span></div>
                  <div className="flex justify-between font-extrabold text-sm text-ww-ink pt-2 border-t stroke-[#DCEBE0]">
                    <span>Total Payable:</span>
                    <span className="text-ww-brass">₹{cartFinalTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCartModalOpen(false);
                    if (onNavigate) {
                      onNavigate('checkout');
                    }
                  }}
                  className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px] flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-ww-paper rounded-md p-6 shadow-warm-lg border border-ww-paper-dark space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark">
              <h3 className="font-kalam text-lg text-ww-ink">Auto-Reorder Subscription</h3>
              <button onClick={() => setSubSettingsModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <div className="bg-ww-paper-dark p-3.5 rounded-md border border-ww-wood space-y-1">
              <span className="text-xs font-extrabold text-ww-ink block">Monthly Essentials Plan</span>
              <p className="text-[11px] text-ww-wood-dark">Next charge date: <strong>Oct 13, 2026</strong> (₹799/month - Save 15%)</p>
            </div>

            <div className="flex items-center justify-between bg-ww-paper p-3.5 rounded-md border border-ww-paper-dark text-xs font-bold">
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
              className="w-full bg-ww-awning text-white font-extrabold py-3.5 rounded-md text-xs shadow-warm-sm min-h-[44px]"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
