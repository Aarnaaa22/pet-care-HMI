// src/utils/pdf.js
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

/**
 * Generates and downloads a signed Veterinary E-Prescription PDF
 */
export function generateEPrescriptionPDF(data, signatureDataUrl = '') {
  const doc = new jsPDF();
  const primaryColor = [123, 211, 137]; // #7BD389

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PetCare Veterinary E-Prescription', 14, 18);

  // Clinic Details
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Dr. Sarah Jenkins, DVM (Licensed Vet #VET-9842)', 14, 38);
  doc.setFont('helvetica', 'normal');
  doc.text('Pawsome Care Pet Clinic & Teleconsult', 14, 44);
  doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 14, 50);

  // Divider Line
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 55, 196, 55);

  // Patient Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PATIENT DETAILS', 14, 65);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Patient Name: ${data.petName || 'Silver'} (Silver Tabby Cat)`, 14, 72);
  doc.text(`Owner Name: ${data.ownerName || 'Pet Parent'}`, 14, 78);
  doc.text(`Weight: ${data.weightKg || '4.2'} kg`, 14, 84);

  // Rx Section
  doc.setFillColor(245, 247, 245);
  doc.rect(14, 92, 182, 50, 'F');
  doc.setDrawColor(123, 211, 137);
  doc.rect(14, 92, 182, 50, 'S');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 90, 45);
  doc.text('Rx - PRESCRIPTION INSTRUCTIONS', 20, 102);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Medication: ${data.medName || 'Amoxicillin Trihydrate'}`, 20, 112);
  doc.text(`Dosage & Form: ${data.dosage || '50mg oral tablet'}`, 20, 120);
  doc.text(`Frequency: ${data.frequency || 'Twice daily for 7 days'}`, 20, 128);
  doc.text(`Refill Limit: ${data.refillThreshold || '1 Refill allowed'}`, 20, 136);

  // Vet Notes
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text(`Notes: ${data.notes || 'Administer with morning and evening wet food. Store in cool place.'}`, 14, 152);

  // Vet Signature
  if (signatureDataUrl) {
    try {
      doc.text('Veterinarian Authorized Signature:', 120, 170);
      doc.addImage(signatureDataUrl, 'PNG', 120, 174, 60, 25);
    } catch (err) {
      console.warn("Could not render signature image on PDF:", err);
    }
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('Generated via PetCare Teleconsult Digital Signature System. Verifiable record ID: RX-2026-98421.', 14, 280);

  // Save PDF
  doc.save(`Prescription_${(data.petName || 'Silver')}_${new Date().toISOString().slice(0, 10)}.pdf`);
  return doc;
}

/**
 * Builds and downloads a Patient Pack PDF combining records & medications
 */
export function generatePatientPackPDF(pet, records = [], meds = []) {
  const doc = new jsPDF();

  doc.setFillColor(123, 211, 137);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(`Pet Medical Summary Pack: ${pet.name || 'Silver'}`, 14, 20);

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 40);
  doc.text(`Pet Species: Cat | Breed: Silver Tabby | Weight: ${pet.weightKg || 4.2} kg`, 14, 46);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ACTIVE MEDICATIONS', 14, 60);

  let y = 68;
  meds.forEach(m => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${m.name} (${m.dosage})`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Frequency: ${m.frequency} | Next Dose: ${m.nextDoseTime || 'Scheduled'}`, 24, y + 5);
    y += 14;
  });

  y += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RECENT MEDICAL RECORDS & VACCINATIONS', 14, y);
  y += 8;

  records.forEach(r => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`• [${r.type.toUpperCase()}] ${r.title} - ${r.date}`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Clinic: ${r.provider || 'Pawsome Vet Clinic'} | Notes: ${r.notes || 'None'}`, 24, y + 5);
    y += 14;
  });

  doc.save(`Patient_Pack_${pet.name || 'Silver'}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Generates and downloads an .ics Calendar File for an appointment
 */
export function exportAppointmentICS(apt) {
  const startDate = new Date(apt.date || Date.now());
  const endDate = new Date(startDate.getTime() + 45 * 60000); // 45 min duration

  const formatDate = d => d.toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PetCare PetShop App//Veterinary Calendar//EN',
    'BEGIN:VEVENT',
    `UID:apt-${Date.now()}@petcare.app`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:Veterinary Appointment: ${apt.title || 'Silver Vet Checkup'}`,
    `DESCRIPTION:Appointment with ${apt.doctor || 'Dr. Sarah Jenkins'} for ${apt.petName || 'Silver'}. Location: ${apt.location || 'PetCare Teleconsult Video Room'}.`,
    `LOCATION:${apt.location || 'Pawsome Vet Clinic'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  saveAs(blob, `vet-appointment-${new Date().toISOString().slice(0, 10)}.ics`);
}
