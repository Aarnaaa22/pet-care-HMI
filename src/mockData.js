export const PETS_MOCK = {
  silver: {
    id: 'silver',
    name: 'Silver',
    species: 'Cat 🐱',
    breed: 'Silver Tabby • 2.5 yrs',
    age: '2.5 yrs',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    mood: 'Playful & Curious',
    moodIcon: '✨',
    happiness: 96,
    energy: 90,
    weight: '4.5 kg',
    lastFed: '3 hrs ago (9:15 AM)',
    calGoal: 520,
    calCurrent: 350,
    mealsCompleted: 2,
    mealsTotal: 3,
    nextVaccine: 'Nov 10 (Rabies & FVRCP Booster)',
    nextVaccineDays: 20,
  },
  luna: {
    id: 'luna',
    name: 'Luna',
    species: 'Cat 🐱',
    breed: 'Ragdoll • 2 yrs',
    age: '2 yrs',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=300&q=80',
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

export const SERVICES_MOCK = [
  {
    id: 1,
    name: 'Paws & Care Vet Clinic',
    category: 'vet',
    type: 'Veterinary Clinic',
    distance: 2.1,
    rating: 4.9,
    reviewsCount: 142,
    price: '₹499',
    priceDetail: 'Consultation Fee',
    openNow: true,
    homeVisits: true,
    teleconsult: true,
    address: '14 Parkside Enclave, Green Avenue, New Delhi',
    phone: '+91 98765 43210',
    offers: ['15% OFF First Checkup', 'Free Dental Screening'],
    badge: 'Open Now • 15% OFF',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    logoBg: 'bg-[#EBF8EE] text-[#7BD389]',
    icon: '🩺',
    images: [
      '/assets/petshop.png',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80'
    ],
    doctors: ['Dr. Sarah Smith (DVM)', 'Dr. Rahul Patel (Surgeon)'],
    availableServices: [
      { name: 'General Wellness Checkup', price: '₹499', duration: '30 mins' },
      { name: 'Vaccination & Parasite Control', price: '₹699', duration: '20 mins' },
      { name: 'Dental Scaling & Polish', price: '₹1,299', duration: '45 mins' },
      { name: 'Video Teleconsultation', price: '₹349', duration: '15 mins' }
    ],
    reviews: [
      { id: 1, author: 'Ananya Sharma', avatar: '👩', rating: 5, date: '2 days ago', comment: 'Dr. Smith was so gentle with Silver! Very clean clinic and zero waiting time.' },
      { id: 2, author: 'Rohan Gupta', avatar: '👨', rating: 5, date: '1 week ago', comment: 'Saved Milo in an emergency situation. Highly recommend their 24/7 care.' }
    ],
    excerpt: 'Certified fear-free veterinary facility offering general checkups, surgery, dental scaling, and emergency trauma care.'
  },
  {
    id: 2,
    name: 'Fluffy Bubbles Pet Spa & Grooming',
    category: 'groomer',
    type: 'Pet Spa & Groomer',
    distance: 3.4,
    rating: 4.8,
    reviewsCount: 96,
    price: '₹899',
    priceDetail: 'Basic Spa Package',
    openNow: true,
    homeVisits: true,
    teleconsult: false,
    address: '88 Sunshine Arcade, Vasant Kunj, New Delhi',
    phone: '+91 98765 43211',
    offers: ['20% OFF Full Grooming'],
    badge: 'Open Now • 20% OFF',
    coordinates: { lat: 28.6239, lng: 77.2190 },
    logoBg: 'bg-[#FFF0F5] text-[#FF85A1]',
    icon: '🛁',
    images: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80'
    ],
    doctors: ['Master Groomer Maya', 'Stylist Alex'],
    availableServices: [
      { name: 'Full Spa Bath & Styling', price: '₹899', duration: '60 mins' },
      { name: 'De-shedding Fur Treatment', price: '₹599', duration: '45 mins' },
      { name: 'Nail Clipping & Paw Butter', price: '₹299', duration: '20 mins' }
    ],
    reviews: [
      { id: 1, author: 'Kavita Roy', avatar: '👩‍🦰', rating: 5, date: '3 days ago', comment: 'Luna smells like lavender and looks like a fluffy cloud! Amazing groomers.' }
    ],
    excerpt: 'Luxury organic grooming spa specializing in coat de-shedding, medicated baths, and cat-friendly stress-free styling.'
  },
  {
    id: 3,
    name: 'Happy Tails Superstore',
    category: 'store',
    type: 'Supplies & Nutrition Store',
    distance: 1.5,
    rating: 4.7,
    reviewsCount: 342,
    price: '₹299+',
    priceDetail: 'Food & Toys',
    openNow: true,
    homeVisits: false,
    teleconsult: false,
    address: '12 Market Ridge, Defense Colony, New Delhi',
    phone: '+91 98765 43212',
    offers: ['Buy 2 Get 1 Free Treats'],
    badge: 'Closes 9 PM',
    coordinates: { lat: 28.6039, lng: 77.2000 },
    logoBg: 'bg-[#FEF3C7] text-[#F59E0B]',
    icon: '🥩',
    images: [
      '/assets/petshop.png',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80'
    ],
    doctors: ['Nutrition Specialist Vikram'],
    availableServices: [
      { name: 'Custom Diet Planning', price: 'Free', duration: '15 mins' },
      { name: 'Express Home Delivery', price: 'Free > ₹500', duration: '30 mins' }
    ],
    reviews: [
      { id: 1, author: 'Deepak Kumar', avatar: '👨‍🦱', rating: 5, date: 'Yesterday', comment: 'Great collection of organic kibble and cat toys. Delivered in 25 mins!' }
    ],
    excerpt: 'One-stop pet store with organic grain-free food, orthopedic beds, cat towers, and prescription veterinary diets.'
  },
  {
    id: 4,
    name: 'City Trauma Emergency Hospital 24/7',
    category: 'emergency',
    type: '24/7 Emergency Hospital',
    distance: 5.2,
    rating: 4.9,
    reviewsCount: 512,
    price: '₹999',
    priceDetail: 'Triage Fee',
    openNow: true,
    homeVisits: true,
    teleconsult: true,
    address: '400 Ring Road Junction, Lajpat Nagar, New Delhi',
    phone: '+91 98765 43213',
    offers: ['24/7 Ambulance Service'],
    badge: '24/7 Emergency',
    coordinates: { lat: 28.6439, lng: 77.1890 },
    logoBg: 'bg-[#FEE2E2] text-[#EF4444]',
    icon: '🚑',
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
    ],
    doctors: ['Dr. Vikram Rao (ICU Chief)', 'Dr. Priya Mehta (Trauma)'],
    availableServices: [
      { name: 'Emergency ICU Triage', price: '₹999', duration: 'Immediate' },
      { name: 'Pet Ambulance Pickup', price: '₹499', duration: '15 mins' }
    ],
    reviews: [
      { id: 1, author: 'Sneha Kapur', avatar: '👩', rating: 5, date: '5 days ago', comment: 'Available at 3 AM when my cat swallowed a string. Saved her life!' }
    ],
    excerpt: 'Fully equipped 24-hour veterinary hospital with ICU, digital X-Ray, ultrasound, and dedicated pet ambulance service.'
  }
];

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
  }
];

export const COUPONS_MOCK = [
  { code: 'PAWS20', discountText: '20% OFF on all Spa Services', discountAmount: 180 },
  { code: 'FIRSTPET', discountText: '₹150 OFF on Supplies Order', discountAmount: 150 },
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

export const FAQS_MOCK = [
  {
    question: "How do I book a vet or grooming appointment?",
    answer: "Browse local service providers on the Services tab, select your preferred date & time slot, and tap 'Confirm Booking'. You will instantly receive an SMS and email confirmation."
  },
  {
    question: "Is teleconsultation supported for cats and dogs?",
    answer: "Yes! Selected clinics offer live 1-on-1 video teleconsultations with certified veterinarians directly through the app."
  }
];
