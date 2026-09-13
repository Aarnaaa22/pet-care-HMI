// src/utils/export.js
import togpx from 'togpx';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

/**
 * Exports a single activity or route as GPX format file
 * @param {Object} activity - Activity record containing coords array [[lat, lon], ...]
 */
export function exportActivityGPX(activity) {
  if (!activity || !activity.coords || activity.coords.length === 0) {
    alert("No GPS coordinates available to export in this activity.");
    return;
  }

  // Convert coords [[lat, lng], ...] to GeoJSON LineString (GeoJSON uses [lng, lat])
  const geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: activity.coords.map(([lat, lng]) => [lng, lat])
    },
    properties: {
      name: activity.title || `Pet Activity - ${activity.petName || 'Silver'}`,
      desc: activity.notes || 'Tracked with PetCare App',
      time: activity.startedAt ? new Date(activity.startedAt).toISOString() : new Date().toISOString()
    }
  };

  try {
    const gpxString = togpx(geojson);
    const blob = new Blob([gpxString], { type: "application/gpx+xml;charset=utf-8" });
    const filename = `activity-${(activity.title || 'route').toLowerCase().replace(/\s+/g, '-')}-${new Date(activity.startedAt || Date.now()).toISOString().slice(0, 10)}.gpx`;
    saveAs(blob, filename);
  } catch (err) {
    console.error("Failed to generate GPX file:", err);
    alert("Error exporting GPX file.");
  }
}

/**
 * Exports activities list into a downloadable CSV file
 * @param {Array} activities - List of activity objects
 */
export function exportActivitiesCSV(activities = []) {
  if (!activities || activities.length === 0) {
    alert("No activity data to export.");
    return;
  }

  const csvRows = activities.map(act => ({
    ID: act.id,
    PetName: act.petName || 'Silver',
    Title: act.title || 'Outdoor Stroll',
    StartedAt: act.startedAt,
    EndedAt: act.endedAt,
    DurationSec: act.durationSec,
    DistanceMeters: act.distanceMeters,
    DistanceKm: (act.distanceMeters / 1000).toFixed(2),
    AvgSpeedKmph: act.avgSpeedKmph,
    CaloriesBurned: act.calories,
    WaypointCount: act.coords ? act.coords.length : 0,
    Notes: act.notes || ''
  }));

  const csv = unparse(csvRows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `activity-history-${new Date().toISOString().slice(0, 10)}.csv`);
}
