import axios from "axios";

// Mock initial data state
const MOCK_FEEDING_LOGS = [
  {
    id: "f1",
    petId: "silver",
    timestamp: "2026-09-14T08:45:00.000Z",
    dateFormatted: "Today, 8:45 AM",
    dayGroup: "Today",
    foodType: "Organic Salmon Kibble",
    amountGrams: 50,
    unit: "g",
    photo: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80",
    notes: "After morning play session",
    loggedBy: "Alex (Owner)"
  },
  {
    id: "f2",
    petId: "silver",
    timestamp: "2026-09-13T18:30:00.000Z",
    dateFormatted: "Yesterday, 6:30 PM",
    dayGroup: "Yesterday",
    foodType: "Wet Salmon & Tuna Pate",
    amountGrams: 100,
    unit: "g",
    photo: null,
    notes: "Added 2 tbsp warm water",
    loggedBy: "Maya (Caregiver)"
  },
  {
    id: "f3",
    petId: "silver",
    timestamp: "2026-09-13T08:15:00.000Z",
    dateFormatted: "Yesterday, 8:15 AM",
    dayGroup: "Yesterday",
    foodType: "Organic Salmon Kibble",
    amountGrams: 50,
    unit: "g",
    photo: null,
    notes: "Normal appetite",
    loggedBy: "Alex (Owner)"
  },
  {
    id: "f4",
    petId: "silver",
    timestamp: "2026-09-12T19:00:00.000Z",
    dateFormatted: "Sep 12, 7:00 PM",
    dayGroup: "Sep 12, 2026",
    foodType: "Raw Chicken & Pumpkin Stew",
    amountGrams: 80,
    unit: "g",
    photo: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    notes: "Weekend special treat",
    loggedBy: "Alex (Owner)"
  }
];

const MOCK_SCHEDULES = [
  {
    id: "s1",
    petId: "silver",
    time: "08:00 AM",
    repeat: "Daily",
    foodType: "Organic Salmon Kibble",
    amountGrams: 50,
    enabled: true
  },
  {
    id: "s2",
    petId: "silver",
    time: "06:30 PM",
    repeat: "Daily",
    foodType: "Wet Salmon Pate",
    amountGrams: 100,
    enabled: true
  }
];

export async function getFeedingLogs(petId = "silver") {
  // Simulates network latency
  await new Promise(res => setTimeout(res, 300));
  return [...MOCK_FEEDING_LOGS];
}

export async function logFeeding(payload) {
  await new Promise(res => setTimeout(res, 200));
  const newEntry = {
    id: `f-${Date.now()}`,
    petId: payload.petId || "silver",
    timestamp: new Date().toISOString(),
    dateFormatted: "Just now",
    dayGroup: "Today",
    foodType: payload.foodType || "Organic Salmon Kibble",
    amountGrams: Number(payload.amountGrams) || 50,
    unit: "g",
    photo: payload.photo || null,
    notes: payload.notes || "Logged via quick-feed",
    loggedBy: "Alex (Owner)"
  };
  MOCK_FEEDING_LOGS.unshift(newEntry);
  return newEntry;
}

export async function deleteFeedingLog(id) {
  await new Promise(res => setTimeout(res, 200));
  const idx = MOCK_FEEDING_LOGS.findIndex(f => f.id === id);
  if (idx !== -1) {
    MOCK_FEEDING_LOGS.splice(idx, 1);
  }
  return true;
}

export async function getSchedules(petId = "silver") {
  await new Promise(res => setTimeout(res, 200));
  return [...MOCK_SCHEDULES];
}
