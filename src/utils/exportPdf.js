import { jsPDF } from "jspdf";

/**
 * Export visible feeding logs array to a PDF file
 */
export function exportFeedPDF(feeds = [], petName = "Silver") {
  if (!feeds || feeds.length === 0) {
    alert("No feeding records available to export.");
    return;
  }

  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`Feeding Report for ${petName}`, 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.text(`Generated on: ${dateStr}`, 14, 28);
  
  // Content
  let yPos = 40;
  
  feeds.forEach((feed, index) => {
    // Add new page if we run out of space
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFont("helvetica", "bold");
    doc.text(`Meal ${index + 1}: ${feed.foodType} (${feed.amountGrams}g)`, 14, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text(`Time: ${feed.timestamp}`, 14, yPos);
    yPos += 6;
    doc.text(`Logged by: ${feed.loggedBy || "Owner"}`, 14, yPos);
    yPos += 6;
    if (feed.notes) {
      doc.text(`Notes: ${feed.notes}`, 14, yPos);
      yPos += 6;
    }
    
    yPos += 6; // extra space between entries
  });

  doc.save(`feeding-report-${petName.toLowerCase()}-${dateStr}.pdf`);
}
