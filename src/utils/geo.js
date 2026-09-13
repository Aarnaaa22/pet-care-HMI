// src/utils/geo.js

/**
 * Calculates the Haversine distance between two coordinates [lat, lon] in meters.
 */
export function haversineDistance([lat1, lon1], [lat2, lon2]) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates the total cumulative distance in meters across an array of coordinates [[lat, lon], ...]
 */
export function totalDistanceMeters(coords = []) {
  if (!coords || coords.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    total += haversineDistance(coords[i - 1], coords[i]);
  }
  return total;
}

/**
 * Formats distance in meters into readable string (m or km)
 */
export function formatDistance(meters = 0) {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

/**
 * Formats seconds into HH:MM:SS or MM:SS format
 */
export function formatDuration(seconds = 0) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates estimated calorie burn based on distance (meters) and pet weight (kg)
 * Placeholder estimate: approx 60 kcal per km for a standard cat/dog walk
 */
export function calculateCalories(distanceMeters = 0, petWeightKg = 4.2) {
  const km = distanceMeters / 1000;
  // Base formula: approx 60 kcal / km adjusted by weight factor
  const baseBurnPerKm = 50 + (petWeightKg * 2.5);
  return Math.round(km * baseBurnPerKm);
}
