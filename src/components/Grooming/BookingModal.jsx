import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhotoUploadCrop from "./PhotoUploadCrop";
import { toast } from "react-toastify";

/**
 * BookingModal - quick mock booking UI
 */
export default function BookingModal({ isOpen, onClose, groomer }) {
  const [service, setService] = useState(groomer?.services?.[0]?.id || "");
  const [date, setDate] = useState(new Date(groomer?.nextAvailable || Date.now()));
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState(null);

  async function handleConfirm() {
    // mock save
    toast.success("Booking requested — check your email for confirmation (mock).");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} className="max-w-xl mx-auto mt-16 bg-white rounded-2xl p-6 shadow-2xl relative outline-none z-50">
      <h3 className="text-lg font-bold text-gray-900">Book {groomer?.name}</h3>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <select className="w-full p-2 mt-1 border rounded-xl text-sm" value={service} onChange={(e)=>setService(e.target.value)}>
          {groomer?.services?.map(s=> <option key={s.id} value={s.id}>{s.name} — ₹{s.price}</option>)}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Date & time</label>
        <DatePicker selected={date} onChange={setDate} showTimeSelect dateFormat="Pp" className="mt-2 p-2 border rounded-xl w-full text-sm" />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Your name</label>
        <input className="w-full p-2 border rounded-xl mt-1 text-sm" value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Silver's Parent" />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Notes for groomer</label>
        <textarea className="w-full p-2 border rounded-xl mt-1 text-sm" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Special instructions, pet temperament..." />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Attach photo (optional)</label>
        <PhotoUploadCrop onSave={(img) => setPhoto(img)} />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50" onClick={onClose}>Cancel</button>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium" onClick={handleConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}
