import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhotoUploadCrop from "./PhotoUploadCrop";
import { toast } from "react-toastify";

export default function BookingModal({ isOpen, onClose, groomer, initialServiceId, onConfirmBooking, pet }) {
  const defaultPetName = pet?.name || "Silver";
  const [serviceId, setServiceId] = useState(initialServiceId || groomer?.services?.[0]?.id || "");
  const [date, setDate] = useState(new Date(groomer?.nextAvailable || Date.now()));
  const [name, setName] = useState(`${defaultPetName}'s Parent`);
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState(null);
  
  // Add-on options
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    if (groomer) {
      setServiceId(initialServiceId || groomer.services?.[0]?.id || "");
      setDate(new Date(groomer.nextAvailable || Date.now()));
    }
  }, [groomer, initialServiceId]);

  const activeService = groomer?.services?.find((s) => s.id === serviceId) || groomer?.services?.[0];

  const ADDONS = [
    { id: "a1", name: "Extra De-shedding Conditioning", price: 350 },
    { id: "a2", name: "Teeth Brushing & Breath Refresh", price: 200 },
    { id: "a3", name: "Organic Flea & Tick Treatment", price: 300 },
    { id: "a4", name: "Soothing Paw Balm Massage", price: 180 }
  ];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SILVER10" || couponCode.trim().toUpperCase() === "PETSHOP") {
      setDiscountPercent(10);
      toast.success("🎟️ Coupon applied: 10% OFF discount!");
    } else if (couponCode.trim().toUpperCase() === "PAW20") {
      setDiscountPercent(20);
      toast.success("🎉 Coupon applied: 20% OFF discount!");
    } else {
      toast.error("Invalid coupon code. Try 'SILVER10' or 'PAW20'");
    }
  };

  const basePrice = activeService ? activeService.price : 0;
  const addonsTotal = selectedAddons.reduce((sum, addId) => {
    const item = ADDONS.find((a) => a.id === addId);
    return sum + (item ? item.price : 0);
  }, 0);
  const subtotal = basePrice + addonsTotal;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  async function handleConfirm() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    const bookingPayload = {
      id: `bk-${Date.now()}`,
      groomerId: groomer.id,
      groomerName: groomer.name,
      serviceName: activeService?.name || "Grooming Service",
      date: date.toISOString(),
      name,
      notes,
      total: finalTotal,
      photoAttached: Boolean(photo),
      status: "Confirmed"
    };

    if (onConfirmBooking) {
      onConfirmBooking(bookingPayload);
    } else {
      toast.success(`🎉 Booking confirmed with ${groomer.name} for ₹${finalTotal}!`);
    }

    onClose();
  }

  if (!groomer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99999]"
      className="w-full max-w-lg bg-[#F4EBF7] rounded-2xl p-6 shadow-2xl relative outline-none z-[100000] max-h-[90vh] overflow-y-auto border border-[#D4B6D6]"
    >
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Book Grooming</span>
          <h3 className="text-xl font-bold text-gray-900">{groomer.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>
      </div>

      {/* Select Service */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Select Service</label>
        <div className="mt-2 space-y-2">
          {groomer.services?.map((s) => (
            <label
              key={s.id}
              onClick={() => setServiceId(s.id)}
              className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${
                serviceId === s.id
                  ? "border-green-500 bg-green-50/60 ring-2 ring-green-500/20"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="service"
                  checked={serviceId === s.id}
                  onChange={() => setServiceId(s.id)}
                  className="accent-green-600"
                />
                <div>
                  <div className="font-semibold text-sm text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500">Duration: {s.durationMin} mins</div>
                </div>
              </div>
              <div className="text-sm font-bold text-gray-900">₹{s.price}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Date & Time Picker */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Date &amp; Appointment Time</label>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect
          dateFormat="Pp"
          className="mt-1.5 p-2.5 border border-gray-300 rounded-xl w-full text-sm font-medium focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Add-on Upgrades */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Optional Spa Add-Ons</label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADDONS.map((add) => (
            <button
              type="button"
              key={add.id}
              onClick={() => toggleAddon(add.id)}
              className={`p-2.5 border rounded-xl text-left text-xs transition flex flex-col justify-between ${
                selectedAddons.includes(add.id)
                  ? "border-green-500 bg-green-50 text-green-900 font-semibold"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{add.name}</span>
              <span className="text-xs font-bold mt-1 text-green-700">+₹{add.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Your Name */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Pet Parent Name</label>
        <input
          className="w-full p-2.5 border border-gray-300 rounded-xl mt-1 text-sm focus:outline-none focus:border-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Silver's Parent"
        />
      </div>

      {/* Coupon Code */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Discount Coupon</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Try SILVER10 or PAW20"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 uppercase"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold transition"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800">Special Notes for Groomer</label>
        <textarea
          className="w-full p-2.5 border border-gray-300 rounded-xl mt-1 text-sm focus:outline-none focus:border-green-500"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={`e.g. ${defaultPetName} likes extra gentle handling on back paws...`}
        />
      </div>

      {/* Photo Upload */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-800 mb-1">Attach Pet Reference Photo (Optional)</label>
        <PhotoUploadCrop onSave={(img) => setPhoto(img)} />
      </div>

      {/* Price Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Base Service ({activeService?.name}):</span>
          <span className="font-semibold text-gray-900">₹{basePrice}</span>
        </div>
        {addonsTotal > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Spa Add-ons:</span>
            <span className="font-semibold text-gray-900">+₹{addonsTotal}</span>
          </div>
        )}
        {discountPercent > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Discount ({discountPercent}%):</span>
            <span>-₹{discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Estimated Total:</span>
          <span className="text-base text-green-600">₹{finalTotal}</span>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-50"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-md transition"
          onClick={handleConfirm}
        >
          Confirm &amp; Reserve Booking
        </button>
      </div>
    </Modal>
  );
}
