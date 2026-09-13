// src/utils/storage.js
import { get, set, del } from 'idb-keyval';

const ACTIVITIES_KEY = 'petcare_activities';

export const INITIAL_MOCK_ACTIVITIES = [
  {
    id: 'act_1',
    petId: 'silver',
    petName: 'Silver',
    title: 'Morning Sunspot Walk & Stroll',
    startedAt: '2026-09-14T06:30:00.000Z',
    endedAt: '2026-09-14T07:05:00.000Z',
    durationSec: 2100,
    distanceMeters: 2450,
    avgSpeedKmph: 4.2,
    calories: 147,
    coords: [
      [19.0760, 72.8777],
      [19.0768, 72.8785],
      [19.0775, 72.8792],
      [19.0782, 72.8801],
      [19.0790, 72.8810],
      [19.0798, 72.8818],
      [19.0805, 72.8825],
      [19.0812, 72.8832],
      [19.0820, 72.8840]
    ],
    notes: 'Silver was very energetic today! Chased a golden butterfly near the fountain.',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    synced: true
  },
  {
    id: 'act_2',
    petId: 'silver',
    petName: 'Silver',
    title: 'Evening Garden Trot',
    startedAt: '2026-09-13T17:15:00.000Z',
    endedAt: '2026-09-13T17:45:00.000Z',
    durationSec: 1800,
    distanceMeters: 1920,
    avgSpeedKmph: 3.8,
    calories: 115,
    coords: [
      [19.0750, 72.8760],
      [19.0755, 72.8768],
      [19.0762, 72.8775],
      [19.0770, 72.8782],
      [19.0778, 72.8790],
      [19.0785, 72.8798]
    ],
    notes: 'Calm evening stroll in the pet garden with Silver harness.',
    photo: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    synced: true
  },
  {
    id: 'act_3',
    petId: 'silver',
    petName: 'Silver',
    title: 'Weekend Park Run',
    startedAt: '2026-09-12T08:00:00.000Z',
    endedAt: '2026-09-12T08:50:00.000Z',
    durationSec: 3000,
    distanceMeters: 3800,
    avgSpeedKmph: 4.6,
    calories: 228,
    coords: [
      [19.0720, 72.8730],
      [19.0730, 72.8742],
      [19.0745, 72.8755],
      [19.0760, 72.8770],
      [19.0775, 72.8785],
      [19.0790, 72.8800],
      [19.0810, 72.8815]
    ],
    notes: 'Long weekend run at Central Park trail.',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    synced: true
  }
];

export async function saveActivity(activity) {
  try {
    const list = (await get(ACTIVITIES_KEY)) || INITIAL_MOCK_ACTIVITIES;
    const updated = [activity, ...list];
    await set(ACTIVITIES_KEY, updated);
    return updated;
  } catch (err) {
    console.error('Failed to save activity to IndexedDB:', err);
    return [activity];
  }
}

export async function loadActivities() {
  try {
    let list = await get(ACTIVITIES_KEY);
    if (!list || list.length === 0) {
      await set(ACTIVITIES_KEY, INITIAL_MOCK_ACTIVITIES);
      list = INITIAL_MOCK_ACTIVITIES;
    }
    return list;
  } catch (err) {
    console.error('Failed to load activities from IndexedDB:', err);
    return INITIAL_MOCK_ACTIVITIES;
  }
}

export async function deleteActivity(id) {
  try {
    const list = (await get(ACTIVITIES_KEY)) || INITIAL_MOCK_ACTIVITIES;
    const filtered = list.filter(act => act.id !== id);
    await set(ACTIVITIES_KEY, filtered);
    return filtered;
  } catch (err) {
    console.error('Failed to delete activity from IndexedDB:', err);
    return [];
  }
}

export async function clearAllActivities() {
  try {
    await del(ACTIVITIES_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear activities:', err);
    return [];
  }
}
