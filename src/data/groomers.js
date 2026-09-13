// simple mock data used by the GroomersPage and GroomerProfile
export const GROOMERS = [
  {
    id: "g1",
    name: "Pawsitive Grooming",
    rating: 4.9,
    reviews: 124,
    certified: true,
    distanceKm: 1.3,
    priceEstimate: "₹1200",
    hero: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "Full Groom", durationMin: 90, price: 1200 },
      { id: "s2", name: "Express Bath", durationMin: 30, price: 450 },
      { id: "s3", name: "Nail Trim", durationMin: 15, price: 200 }
    ],
    hours: { mon: "09:00-18:00", tue: "09:00-18:00" },
    nextAvailable: "2026-09-16T10:30:00.000Z"
  },
  {
    id: "g2",
    name: "Fluff & Buff",
    rating: 4.7,
    reviews: 89,
    certified: true,
    distanceKm: 2.5,
    priceEstimate: "₹999",
    hero: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "Full Groom", durationMin: 80, price: 999 },
      { id: "s2", name: "De-shed", durationMin: 60, price: 899 }
    ],
    hours: { wed: "10:00-19:00" },
    nextAvailable: "2026-09-17T11:00:00.000Z"
  }
];
