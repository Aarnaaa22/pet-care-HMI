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

import { jsPDF } from 'jspdf';

/**
 * Exports activities list into a downloadable PDF file
 * @param {Array} activities - List of activity objects
 */
export function exportActivitiesPDF(activities = []) {
  if (!activities || activities.length === 0) {
    alert("No activity data to export.");
    return;
  }

  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`Activity History`, 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.text(`Generated on: ${dateStr}`, 14, 28);
  
  // Content
  let yPos = 40;
  
  activities.forEach((act, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFont("helvetica", "bold");
    doc.text(`Activity ${index + 1}: ${act.title || 'Outdoor Stroll'}`, 14, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    const distanceKm = (act.distanceMeters / 1000).toFixed(2);
    doc.text(`Distance: ${distanceKm} km | Duration: ${Math.floor(act.durationSec / 60)} mins`, 14, yPos);
    yPos += 6;
    doc.text(`Calories Burned: ${act.calories || 0} kcal | Avg Speed: ${act.avgSpeedKmph || 0} km/h`, 14, yPos);
    yPos += 6;
    if (act.notes) {
      doc.text(`Notes: ${act.notes}`, 14, yPos);
      yPos += 6;
    }
    
    yPos += 6; // extra space
  });

  doc.save(`activity-history-${dateStr}.pdf`);
}
