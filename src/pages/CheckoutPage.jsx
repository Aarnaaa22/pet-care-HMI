import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Container from '../components/Container';
import { COUPONS_MOCK } from '../mockData';

export default function CheckoutPage({ cartItems, pet, onClearCart, onNavigate }) {
  // Address State
  const [address, setAddress] = useState({
    fullName: 'Alex Morgan',
    phone: '+91 98765 43210',
    street: '14 Parkside Enclave, Green Avenue',
    city: 'New Delhi',
    pincode: '110001',
    instructions: 'Ring doorbell or leave at front door with security.'
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'card' | 'upi' | 'netbanking' | 'cod'

  // Card details
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8892',
    name: 'Alex Morgan',
    expiry: '08/28',
    cvv: '•••'
  });

  // UPI details
  const [upiId, setUpiId] = useState('alex@okicici');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Coupon state
  const [couponCode, setCouponCode] = useState('PAWS20');
  const [appliedCoupon, setAppliedCoupon] = useState(COUPONS_MOCK[0]);

  // Payment Processing & Success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Items fallback if empty
  const defaultItems = [
    { id: 101, name: 'Organic Salmon Kibble (2kg)', price: 899, quantity: 1, icon: '🥩' },
    { id: 103, name: 'Lavender Coat Shine Spray', price: 449, quantity: 1, icon: '🧴' }
  ];
  const itemsToCheckout = (cartItems && cartItems.length > 0) ? cartItems : defaultItems;

  // Calculation
  const subtotal = itemsToCheckout.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const totalAmount = Math.max(0, subtotal - discount + tax + deliveryFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = COUPONS_MOCK.find(c => c.code.toUpperCase() === couponCode.toUpperCase().trim());
    if (found) {
      setAppliedCoupon(found);
      alert(`🎉 Coupon "${found.code}" applied successfully! You saved ₹${found.discountAmount}.`);
    } else {
      alert("Invalid promo code. Try 'PAWS20' or 'FIRSTPET'.");
    }
  };

  const handlePayAndPlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `PAW-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setOrderCompleted(true);

      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
      }
      if (onClearCart) onClearCart();
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto pb-24">
      
      {/* Page Lead Banner */}
      <section className="bg-ww-paper border border-ww-paper-dark rounded-md p-6 sm:p-8 shadow-warm-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase text-ww-brass tracking-wider block">Secure Checkout</span>
            <h1 className="font-kalam text-3xl sm:text-4xl text-ww-ink mt-0.5">Complete Your Pet Care Order</h1>
            <p className="text-xs sm:text-sm text-ww-wood-dark mt-1">Review items for <strong>{pet.name}</strong>, choose your preferred payment method, and place order.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-ww-brass bg-ww-paper px-4 py-2 rounded-md shadow-warm-sm">
            <span>🔒 256-Bit SSL Encrypted</span>
          </div>
        </div>
      </section>

      {orderCompleted ? (
        /* ================= ORDER SUCCESS SCREEN ================= */
        <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-8 shadow-warm-lg text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-ww-paper-dark text-ww-brass text-4xl flex items-center justify-center mx-auto shadow-warm-md animate-bounce">
            🎉
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase text-ww-brass tracking-wider block">Order Confirmed!</span>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-ww-ink mt-1">Thank You for Your Order!</h2>
            <p className="text-xs sm:text-sm text-ww-wood-dark mt-1 max-w-md mx-auto">
              Order <strong className="text-ww-ink">{orderId}</strong> has been placed for <strong>{pet.name}</strong>. A confirmation email and SMS receipt have been sent to <strong>{address.phone}</strong>.
            </p>
          </div>

          {/* Delivery & ETA Details */}
          <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 max-w-md mx-auto space-y-2 text-left text-xs font-semibold text-ww-wood-dark">
            <div className="flex justify-between border-b border-ww-paper-dark pb-2">
              <span>Order Number:</span>
              <strong className="text-ww-ink font-extrabold">{orderId}</strong>
            </div>
            <div className="flex justify-between border-b border-ww-paper-dark pb-2">
              <span>Estimated Delivery / ETA:</span>
              <strong className="text-ww-brass font-extrabold">Tomorrow by 2:00 PM</strong>
            </div>
            <div className="flex justify-between border-b border-ww-paper-dark pb-2">
              <span>Delivery Address:</span>
              <strong className="text-ww-ink font-extrabold truncate max-w-[200px]">{address.street}</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span>Total Paid:</span>
              <strong className="text-ww-brass font-extrabold text-sm">₹{totalAmount}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="/sample_vet_report.pdf"
              download="Order_Receipt_PAW.pdf"
              className="w-full sm:w-auto bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-ink font-extrabold text-xs px-6 py-3 rounded-md shadow-warm-sm min-h-[44px] flex items-center justify-center gap-2"
            >
              <span>📄 Download Invoice PDF</span>
            </a>

            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold text-xs px-8 py-3 rounded-md shadow-warm-md min-h-[44px] flex items-center justify-center"
            >
              Back to Services Dashboard →
            </button>
          </div>
        </div>
      ) : (
        /* ================= MAIN CHECKOUT FLOW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (2/3 width on desktop) - Address & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS & CAREGIVER CONTACT */}
            <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 sm:p-6 shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-ww-paper-dark pb-3">
                <h3 className="font-kalam text-lg text-ww-ink flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ww-awning text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Delivery Address & Caregiver Contact</span>
                </h3>
                <span className="text-xs font-bold text-ww-brass">Saved Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-ww-wood-dark block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                  />
                </div>

                <div>
                  <label className="font-bold text-ww-wood-dark block mb-1">Phone Number (for SMS tracking)</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-ww-wood-dark block mb-1">Street Address & Landmark</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                  />
                </div>

                <div>
                  <label className="font-bold text-ww-wood-dark block mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                  />
                </div>

                <div>
                  <label className="font-bold text-ww-wood-dark block mb-1">Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: SELECT PAYMENT METHOD */}
            <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 sm:p-6 shadow-warm-md space-y-4">
              <div className="flex items-center justify-between border-b border-ww-paper-dark pb-3">
                <h3 className="font-kalam text-lg text-ww-ink flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ww-awning text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Select Payment Method</span>
                </h3>
                <span className="text-xs font-bold text-ww-brass">🔒 Safe & Encrypted</span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: '📱 Instant UPI', sub: 'GPay / PhonePe' },
                  { id: 'card', label: '💳 Cards', sub: 'Visa / Mastercard' },
                  { id: 'netbanking', label: '🏦 Net Banking', sub: 'All Indian Banks' },
                  { id: 'cod', label: '💵 Pay on Delivery', sub: 'Cash / Scan QR' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-md border text-left flex flex-col justify-between transition min-h-[64px] ${
                      paymentMethod === pm.id
                        ? 'bg-ww-paper-dark border-ww-wood shadow-warm-sm'
                        : 'bg-ww-paper border-ww-paper-dark hover:border-ww-wood'
                    }`}
                  >
                    <span className="font-extrabold text-xs text-ww-ink">{pm.label}</span>
                    <span className="text-[10px] font-semibold text-ww-wood">{pm.sub}</span>
                  </button>
                ))}
              </div>

              {/* PAYMENT OPTION DETAILS */}
              <div className="bg-ww-paper p-4 rounded-md border border-ww-paper-dark mt-4">
                
                {/* 1. INSTANT UPI PAYMENT */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-3 animate-fadeIn">
                    <span className="text-xs font-extrabold text-ww-ink block">Select UPI App or Enter Virtual Payment Address (VPA)</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'gpay', name: 'Google Pay', icon: '🟢' },
                        { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                        { id: 'paytm', name: 'Paytm', icon: '🔵' },
                        { id: 'bhim', name: 'BHIM UPI', icon: '🟠' },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id)}
                          className={`p-2.5 rounded-md border text-center font-extrabold text-xs flex flex-col items-center gap-1 transition ${
                            selectedUpiApp === app.id ? 'bg-ww-paper border-ww-wood shadow-warm-sm text-ww-brass' : 'border-ww-paper-dark text-ww-wood-dark'
                          }`}
                        >
                          <span className="text-lg">{app.icon}</span>
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-ww-wood-dark block mb-1">Enter UPI ID</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. alex@okicici, 9876543210@paytm"
                          className="flex-1 bg-ww-paper border border-ww-paper-dark rounded-md px-3 py-2 text-xs font-semibold text-ww-ink"
                        />
                        <button type="button" className="bg-ww-paper-dark text-ww-brass px-4 py-2 rounded-md text-xs font-extrabold border border-ww-wood">
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CREDIT / DEBIT CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div>
                      <label className="font-bold text-ww-wood-dark block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-ww-wood-dark block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-ww-wood-dark block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-semibold text-ww-ink"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NET BANKING */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <label className="font-bold text-ww-wood-dark block">Select Your Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-2.5 font-bold text-ww-ink"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {/* 4. PAY ON DELIVERY */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-2 animate-fadeIn text-xs">
                    <div className="flex items-center gap-2 text-ww-brass font-extrabold">
                      <span>💵 Pay on Delivery / Home Pickup</span>
                    </div>
                    <p className="text-ww-wood-dark">Pay via Cash, UPI QR, or Card upon delivery of supplies or completion of groomer visit.</p>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Right Column (1/3 width on desktop) - Order Summary & Confirm CTA */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* ORDER SUMMARY CARD */}
            <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md space-y-4">
              <h3 className="font-kalam text-lg text-ww-ink pb-3 border-b border-ww-paper-dark">Order Summary</h3>

              {/* Items List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {itemsToCheckout.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-bold text-ww-ink truncate">{item.name} x {item.quantity}</span>
                    </div>
                    <span className="font-extrabold text-ww-ink">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-ww-paper-dark">
                <label className="text-[11px] font-bold text-ww-wood-dark block mb-1">Apply Discount Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. PAWS20"
                    className="flex-1 bg-ww-paper border border-ww-paper-dark rounded-md px-3 py-2 text-xs font-bold uppercase text-ww-ink"
                  />
                  <button type="submit" className="bg-ww-paper-dark text-ww-brass border border-ww-wood px-3 py-2 rounded-md text-xs font-extrabold">
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <span className="text-[11px] font-bold text-ww-brass block mt-1">
                    ✓ Applied: {appliedCoupon.code} (-₹{appliedCoupon.discountAmount})
                  </span>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-ww-paper-dark space-y-2 text-xs font-semibold text-ww-wood-dark">
                <div className="flex justify-between"><span>Items Subtotal:</span><span>₹{subtotal}</span></div>
                {discount > 0 && <div className="flex justify-between text-ww-awning"><span>Coupon Discount:</span><span>-₹{discount}</span></div>}
                <div className="flex justify-between"><span>Estimated Taxes (5%):</span><span>₹{tax}</span></div>
                <div className="flex justify-between"><span>Delivery / Home Pickup:</span><span className="text-ww-brass font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>

                <div className="flex justify-between font-extrabold text-base text-ww-ink pt-3 border-t border-ww-paper-dark">
                  <span>Total Amount:</span>
                  <span className="text-ww-brass">₹{totalAmount}</span>
                </div>
              </div>

              {/* PAY & PLACE ORDER CTA BUTTON */}
              <button
                onClick={handlePayAndPlaceOrder}
                disabled={isProcessing}
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-4 rounded-md shadow-warm-md hover:shadow-warm-lg transition flex items-center justify-center gap-2 text-sm min-h-[50px] active:scale-[0.98]"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Secure Payment...</span>
                  </span>
                ) : (
                  <span>Pay & Place Order — ₹{totalAmount}</span>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
