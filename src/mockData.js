export const PETS_MOCK = {
  luna: {
    id: 'luna',
    name: 'Luna',
    species: 'Cat 🐱',
    breed: 'Ragdoll • 2 yrs',
    age: '2 yrs',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    mood: 'Joyful & Purring',
    moodIcon: '💖',
    happiness: 92,
    energy: 85,
    weight: '4.2 kg',
    lastFed: '4 hrs ago (8:12 AM)',
    calGoal: 500,
    calCurrent: 320,
    mealsCompleted: 2,
    mealsTotal: 3,
    nextVaccine: 'Oct 15 (Deworming & Parasite Check)',
    nextVaccineDays: 14,
  },
  milo: {
    id: 'milo',
    name: 'Milo',
    species: 'Dog 🐶',
    breed: 'Golden Puppy • 8 mos',
    age: '8 mos',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
    mood: 'Super Playful',
    moodIcon: '🎾',
    happiness: 98,
    energy: 95,
    weight: '12.5 kg',
    lastFed: '2 hrs ago (10:30 AM)',
    calGoal: 900,
    calCurrent: 650,
    mealsCompleted: 2,
    mealsTotal: 3,
    nextVaccine: 'Nov 02 (DHPP 5-in-1 Booster)',
    nextVaccineDays: 32,
  },
  coco: {
    id: 'coco',
    name: 'Coco',
    species: 'Bunny 🐰',
    breed: 'Holland Lop • 1 yr',
    age: '1 yr',
    avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=300&q=80',
    mood: 'Hopping Happy',
    moodIcon: '🌾',
    happiness: 95,
    energy: 80,
    weight: '1.8 kg',
    lastFed: '1 hr ago (11:15 AM)',
    calGoal: 300,
    calCurrent: 210,
    mealsCompleted: 2,
    mealsTotal: 3,
    nextVaccine: 'Oct 28 (RHDV2 Vaccine)',
    nextVaccineDays: 27,
  }
};

export const GROOMING_SERVICES_MOCK = [
  {
    id: 1,
    title: 'Full Spa Grooming & Bath',
    duration: '60 mins',
    price: '₹899',
    rawPrice: 899,
    rating: 4.9,
    reviews: 142,
    icon: '🛁',
    desc: 'Deep coat shampoo, ear cleaning, paw balm & styling.',
    badge: 'Popular'
  },
  {
    id: 2,
    title: 'De-Shedding & Brush Out',
    duration: '45 mins',
    price: '₹599',
    rawPrice: 599,
    rating: 4.8,
    reviews: 88,
    icon: '🪮',
    desc: 'Reduces loose undercoat fur up to 90%.',
    badge: 'Best Value'
  },
  {
    id: 3,
    title: 'Nail Trimming & Paw Polish',
    duration: '20 mins',
    price: '₹299',
    rawPrice: 299,
    rating: 4.9,
    reviews: 210,
    icon: '✂️',
    desc: 'Gentle claw trimming & soothing organic paw butter.',
    badge: 'Quick Care'
  },
  {
    id: 4,
    title: 'Medicated Coat Bath & Rinse',
    duration: '50 mins',
    price: '₹749',
    rawPrice: 749,
    rating: 4.9,
    reviews: 64,
    icon: '🧴',
    desc: 'Soothes itchy skin & protects against allergens.',
    badge: 'Vet Recommended'
  }
];

export const SUPPLIES_MOCK = [
  {
    id: 101,
    name: 'Organic Salmon Kibble (2kg)',
    category: 'food',
    price: '₹899',
    rawPrice: 899,
    rating: 4.9,
    inStock: true,
    previouslyBought: true,
    subscriptionAvailable: true,
    icon: '🥩',
    imageBg: 'bg-[#EBF8EE] text-[#7BD389]'
  },
  {
    id: 102,
    name: 'Interactive Squeaky Chew Toy',
    category: 'toys',
    price: '₹349',
    rawPrice: 349,
    rating: 4.8,
    inStock: true,
    previouslyBought: false,
    subscriptionAvailable: false,
    icon: '🎾',
    imageBg: 'bg-[#FFF0F5] text-[#FF85A1]'
  },
  {
    id: 103,
    name: 'Lavender Coat Shine Spray (250ml)',
    category: 'grooming',
    price: '₹449',
    rawPrice: 449,
    rating: 4.9,
    inStock: true,
    previouslyBought: true,
    subscriptionAvailable: true,
    icon: '🧴',
    imageBg: 'bg-[#F0E6FF] text-[#9D72FF]'
  },
  {
    id: 104,
    name: 'Bravecto Flea & Tick Chew (Single)',
    category: 'meds',
    price: '₹999',
    rawPrice: 999,
    rating: 4.9,
    inStock: false,
    previouslyBought: true,
    subscriptionAvailable: true,
    icon: '💊',
    imageBg: 'bg-[#FFE8E8] text-[#E63946]'
  },
  {
    id: 105,
    name: 'Ultra Soft Plush Calming Bed',
    category: 'toys',
    price: '₹1,299',
    rawPrice: 1299,
    rating: 4.9,
    inStock: true,
    previouslyBought: false,
    subscriptionAvailable: false,
    icon: '🛏️',
    imageBg: 'bg-[#E0F2FE] text-[#4EA8DE]'
  },
  {
    id: 106,
    name: 'Organic Timothy Hay Bundle (1kg)',
    category: 'food',
    price: '₹399',
    rawPrice: 399,
    rating: 4.8,
    inStock: true,
    previouslyBought: true,
    subscriptionAvailable: true,
    icon: '🌾',
    imageBg: 'bg-[#EBF8EE] text-[#7BD389]'
  }
];

export const COUPONS_MOCK = [
  { code: 'PAWS20', discountText: '20% OFF on all Spa Services', discountAmount: 180 },
  { code: 'FIRSTPET', discountText: '₹150 OFF on Supplies Order', discountAmount: 150 },
];

export const HEALTH_RECORDS_MOCK = [
  {
    id: 1,
    type: 'Vaccination',
    title: 'Feline Rabies Vaccine (1-Year)',
    date: 'Jun 12, 2026',
    clinic: 'Paws & Care Vet Clinic',
    doctor: 'Dr. Sarah Smith',
    notes: 'Administered right rear limb. No adverse reactions observed.',
    pdfUrl: '/sample_vet_report.pdf',
    badge: 'Active Immunity'
  },
  {
    id: 2,
    type: 'Surgery',
    title: 'Spay Procedure & Microchip Tag',
    date: 'Jan 10, 2026',
    clinic: 'Central City Pet Hospital',
    doctor: 'Dr. Rahul Patel',
    notes: 'Routine spay. Microchip #985140029381 installed between shoulder blades.',
    pdfUrl: '/sample_vet_report.pdf',
    badge: 'Completed'
  }
];

export const HEALTH_MEDS_MOCK = [
  {
    id: 1,
    name: 'Amoxicillin Antibiotic',
    dosage: '250 mg',
    frequency: 'Twice Daily (q12h)',
    nextDoseTime: '8:00 PM Today',
    status: 'active',
    missedHours: 0,
    icon: '💊',
    lastTaken: '8:00 AM Today by Owner (Alex)'
  }
];

export const APPOINTMENTS_MOCK = [
  {
    id: 1,
    title: 'Annual Wellness & Dental Checkup',
    date: 'Jan 23, 2026',
    time: '11:00 AM',
    vetName: 'Dr. Rahul Patel',
    clinic: 'Paws & Care Vet Clinic',
    location: '2.1 km away • 14 Park Avenue',
    type: 'In-Clinic Visit',
    fee: '₹499',
    status: 'Confirmed'
  }
];

export const SERVICES_MOCK = [
  {
    id: 1,
    name: 'Paws & Care Vet Clinic',
    category: 'vet',
    type: 'Veterinary Clinic',
    distance: 2.1,
    rating: 4.9,
    reviewsCount: 128,
    price: '₹499',
    priceDetail: 'Consultation Fee',
    badge: 'Open Now',
    badgeType: 'green',
    phone: '+91 98765 43210',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    logoBg: 'bg-[#EBF8EE] text-[#7BD389]',
    iconPlaceholder: 'icon_placeholder_vet.svg'
  },
  {
    id: 2,
    name: 'Fluffy Bubbles Grooming',
    category: 'groomer',
    type: 'Pet Spa & Grooming',
    distance: 3.4,
    rating: 4.8,
    reviewsCount: 85,
    price: '₹899',
    priceDetail: 'Basic Spa Package',
    badge: 'Walk-ins OK',
    badgeType: 'blue',
    phone: '+91 98765 43211',
    coordinates: { lat: 28.6239, lng: 77.2190 },
    logoBg: 'bg-[#E0F2FE] text-[#38BDF8]',
    iconPlaceholder: 'icon_placeholder_groomer.svg'
  },
  {
    id: 3,
    name: 'Happy Tails Pet Store',
    category: 'store',
    type: 'Premium Supplies',
    distance: 1.5,
    rating: 4.7,
    reviewsCount: 342,
    price: '₹299+',
    priceDetail: 'Food & Toys',
    badge: 'Closes 9PM',
    badgeType: 'gray',
    phone: '+91 98765 43212',
    coordinates: { lat: 28.6039, lng: 77.2000 },
    logoBg: 'bg-[#FEF3C7] text-[#F59E0B]',
    iconPlaceholder: 'icon_placeholder_store.svg'
  },
  {
    id: 4,
    name: 'City Emergency Vet 24/7',
    category: 'emergency',
    type: 'Emergency Hospital',
    distance: 5.2,
    rating: 4.9,
    reviewsCount: 512,
    price: '₹999',
    priceDetail: 'Triage Fee',
    badge: '24/7 Open',
    badgeType: 'red',
    phone: '+91 98765 43213',
    coordinates: { lat: 28.6439, lng: 77.1890 },
    logoBg: 'bg-[#FEE2E2] text-[#EF4444]',
    iconPlaceholder: 'icon_placeholder_emergency.svg'
  }
];

export const FEEDING_HISTORY_MOCK = [
  {
    id: 1,
    title: 'Morning Organic Kibble',
    timestamp: '8:12 AM Today',
    amount: '150g Dry Kibble + Water',
    loggedBy: 'Owner (Alex)',
    icon: '🥣',
    bg: 'bg-[#EBF8EE]'
  }
];

export const FEEDING_SCHEDULE_MOCK = [
  { id: 1, time: '8:00 AM', title: 'Morning Kibble', detail: '150g Dry Kibble • Daily' }
];

export const FAQS_MOCK = [
  {
    question: "How do I book a vet or grooming appointment?",
    answer: "Browse local service providers on the Services tab or Grooming page, select your preferred date & time slot, and tap 'Confirm Booking'. You will instantly receive an SMS and email confirmation."
  }
];
