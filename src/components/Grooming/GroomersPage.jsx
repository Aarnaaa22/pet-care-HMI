import React, { useState } from "react";
import GroomerCard from "./GroomerCard";
import { GROOMERS } from "../../data/groomers";
import GroomerProfile from "./GroomerProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * GroomersPage - list on left, profile drawer on click
 */
export default function GroomersPage() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = GROOMERS.filter(g =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="bottom-right" />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Groomers nearby</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search groomers, services..."
              className="px-3 py-2 border rounded w-72 text-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-4">
            {filtered.map(g => (
              <GroomerCard key={g.id} groomer={g} onView={() => setSelected(g)} />
            ))}
            {filtered.length === 0 && (
              <div className="p-6 bg-white rounded shadow text-gray-500 text-sm">No groomers found</div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block">
          {selected ? (
            <GroomerProfile groomer={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="p-6 bg-white rounded shadow">
              <h3 className="font-semibold text-gray-900">Pick a groomer</h3>
              <p className="text-sm text-gray-500 mt-2">Click a groomer card to view profile & book.</p>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile modal: show profile when selected */}
      {selected && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40 p-4">
          <div className="bg-white rounded-lg max-h-full overflow-auto p-4">
            <button className="mb-2 text-sm text-gray-600 font-medium" onClick={() => setSelected(null)}>← Back</button>
            <GroomerProfile groomer={selected} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
