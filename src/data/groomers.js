// Extended mock data used by GroomersPage, GroomerProfile, BookingModal, and MessageModal
export const GROOMERS = [
  {
    id: "g1",
    name: "Pawsitive Grooming Spa",
    rating: 4.9,
    reviews: 124,
    certified: true,
    distanceKm: 1.3,
    priceEstimate: "₹1,200",
    hero: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "Full Grooming Spa & Coat Styling", durationMin: 90, price: 1200 },
      { id: "s2", name: "Express Organic Bath & Blow-dry", durationMin: 30, price: 450 },
      { id: "s3", name: "Precision Claw Trim & Paw Butter", durationMin: 15, price: 200 },
      { id: "s4", name: "Feline De-Shedding Deep Clean", durationMin: 60, price: 850 }
    ],
    hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-18:00", sat: "10:00-16:00" },
    nextAvailable: "2026-09-16T10:30:00.000Z",
    tagline: "Breed-specific cuts, gentle handling, and calming herbal baths.",
    address: "14 Palm Avenue, Bandra West",
    isMobile: false
  },
  {
    id: "g2",
    name: "Fluff & Buff Pet Studio",
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
      { id: "s2", name: "De-shedding Treatment", durationMin: 60, price: 899 },
      { id: "s3", name: "Ear Cleaning & Sanitary Trim", durationMin: 20, price: 300 }
    ],
    hours: { wed: "10:00-19:00", thu: "10:00-19:00", fri: "10:00-19:00", sat: "09:00-18:00" },
    nextAvailable: "2026-09-17T11:00:00.000Z",
    tagline: "Eco-friendly shampoo & stress-free coat conditioning.",
    address: "88 Link Road, Khar West",
    isMobile: false
  },
  {
    id: "g3",
    name: "Velvet Paws Cat & Dog Lounge",
    rating: 4.95,
    reviews: 210,
    certified: true,
    distanceKm: 0.8,
    priceEstimate: "₹1,450",
    hero: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "VIP Cat Luxury Grooming", durationMin: 90, price: 1450 },
      { id: "s2", name: "De-matting & Soft Fur Treatment", durationMin: 45, price: 750 },
      { id: "s3", name: "Berry Scented Spa Bath", durationMin: 40, price: 600 }
    ],
    hours: { mon: "08:30-19:30", tue: "08:30-19:30", wed: "08:30-19:30", thu: "08:30-19:30", fri: "08:30-19:30" },
    nextAvailable: "2026-09-15T14:00:00.000Z",
    tagline: "Feline specialists with quiet cat-only grooming hours.",
    address: "32 Hill Road, Bandra West",
    isMobile: false
  },
  {
    id: "g4",
    name: "Waggin' Wheels Mobile Grooming Van",
    rating: 4.85,
    reviews: 156,
    certified: true,
    distanceKm: 0.1,
    priceEstimate: "₹1,600",
    hero: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "Doorstep Full Mobile Grooming", durationMin: 75, price: 1600 },
      { id: "s2", name: "Mobile Express Bath & Blow-dry", durationMin: 35, price: 800 },
      { id: "s3", name: "At-Home Nail & Paw Care", durationMin: 20, price: 400 }
    ],
    hours: { mon: "09:00-17:00", tue: "09:00-17:00", wed: "09:00-17:00", thu: "09:00-17:00", fri: "09:00-17:00", sat: "09:00-17:00" },
    nextAvailable: "2026-09-16T15:30:00.000Z",
    tagline: "Fully equipped climate-controlled van parked right at your doorstep!",
    address: "Mobile Service (We come to you)",
    isMobile: true
  },
  {
    id: "g5",
    name: "Bark & Purr Organic Salon",
    rating: 4.6,
    reviews: 64,
    certified: false,
    distanceKm: 4.2,
    priceEstimate: "₹850",
    hero: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { id: "s1", name: "Organic Essential Oil Bath", durationMin: 45, price: 850 },
      { id: "s2", name: "Hypoallergenic Paw Care", durationMin: 25, price: 350 }
    ],
    hours: { tue: "10:00-18:00", wed: "10:00-18:00", thu: "10:00-18:00", fri: "10:00-18:00" },
    nextAvailable: "2026-09-18T10:00:00.000Z",
    tagline: "Natural botanical shampoos & gentle coat revitalizing.",
    address: "20 Central Avenue, Santacruz West",
    isMobile: false
  }
];
