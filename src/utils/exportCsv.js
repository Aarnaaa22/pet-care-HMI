import { unparse } from "papaparse";
import { saveAs } from "file-saver";

/**
 * Export visible feeding logs array to a CSV spreadsheet file
 */
export function exportFeedCSV(feeds = [], petName = "Silver") {
  if (!feeds || feeds.length === 0) {
    alert("No feeding records available to export.");
    return;
  }

  // Format feeds for CSV output
  const formattedData = feeds.map(feed => ({
    "Feed ID": feed.id,
    "Pet Name": petName,
    "Timestamp": feed.timestamp,
    "Food Type": feed.foodType,
    "Amount (Grams)": feed.amountGrams,
    "Unit": feed.unit || "g",
    "Notes": feed.notes || "N/A",
    "Logged By": feed.loggedBy || "Owner"
  }));

  const csv = unparse(formattedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const dateStr = new Date().toISOString().slice(0, 10);
  saveAs(blob, `feeding-report-${petName.toLowerCase()}-${dateStr}.csv`);
}
