import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HEALTH_RECORDS_MOCK, HEALTH_MEDS_MOCK, APPOINTMENTS_MOCK } from '../mockData';

export default function HealthPage({ pet }) {
  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'meds' | 'appointments'

  // Records state
  const [recordsList, setRecordsList] = useState(HEALTH_RECORDS_MOCK);
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [recordTitle, setRecordTitle] = useState('');
  const [recordClinic, setRecordClinic] = useState('');
  const [recordNotes, setRecordNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Meds state
  const [medsList, setMedsList] = useState(HEALTH_MEDS_MOCK);
  const [addMedModalOpen, setAddMedModalOpen] = useState(false);
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medTimes, setMedTimes] = useState('2');
  const [samplePushModalOpen, setSamplePushModalOpen] = useState(false);
  const [medHistory, setMedHistory] = useState([
    { id: 1, text: 'Amoxicillin 250mg marked as Taken', time: '8:00 AM Today by Owner (Alex)' },
    { id: 2, text: 'Eye Drops marked as Taken', time: '10:00 PM Yesterday by Owner (Alex)' }
  ]);

  // Appointments state
  const [appointmentsList, setAppointmentsList] = useState(APPOINTMENTS_MOCK);
  const [bookVetSheetOpen, setBookVetSheetOpen] = useState(false);
  const [bookServiceType, setBookServiceType] = useState('Vaccination & Checkup');
  const [bookReason, setBookReason] = useState('');

  // Toast Banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ADD RECORD SUBMIT WITH UPLOAD PROGRESS
  const handleAddRecordSubmit = (e) => {
    e.preventDefault();
    if (!recordTitle) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          setRecordsList([
            {
              id: Date.now(),
              type: 'Medical Record',
              title: recordTitle,
              date: 'Just now',
              clinic: recordClinic || 'Paws & Care Vet Clinic',
              doctor: 'Dr. Sarah Smith',
              notes: recordNotes || 'Vet note attached.',
              pdfUrl: '/sample_vet_report.pdf',
              badge: 'New Record'
            },
            ...recordsList
          ]);

          showToast("Record added — Document attached successfully! 📄");
          setAddRecordModalOpen(false);
          setRecordTitle('');
          setRecordClinic('');
          setRecordNotes('');
          setUploadProgress(0);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  // MARK MEDICATION AS TAKEN
  const handleMarkMedTaken = (medId, medName) => {
    setMedsList(medsList.map(m => m.id === medId ? { ...m, status: 'active', missedHours: 0, nextDoseTime: '8:00 PM Today' } : m));
    setMedHistory([
      { id: Date.now(), text: `${medName} marked as Taken`, time: 'Just now by Owner (Alex)' },
      ...medHistory
    ]);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    showToast(`${medName} marked as Given — Great job! 💊`);
  };

  // SNOOZE MEDICATION
  const handleSnoozeMed = (medName) => {
    showToast(`Snoozed ${medName} for 10 minutes ⏰`);
  };

  // ADD MEDICATION SUBMIT
  const handleAddMedSubmit = (e) => {
    e.preventDefault();
    if (!medName) return;

    setMedsList([
      ...medsList,
      {
        id: Date.now(),
        name: medName,
        dosage: medDosage || '1 Tablet',
        frequency: `${medTimes} Times Daily`,
        nextDoseTime: 'In 4 hours',
        status: 'active',
        missedHours: 0,
        icon: '💊',
        lastTaken: 'Just added'
      }
    ]);

    showToast(`Added ${medName} to active medications 💊`);
    setAddMedModalOpen(false);
    setMedName('');
    setMedDosage('');
  };

  // BOOK VET SUBMIT
  const handleBookVetSubmit = (e) => {
    e.preventDefault();
    setAppointmentsList([
      {
        id: Date.now(),
        title: bookServiceType,
        date: 'Jan 23, 2026',
        time: '11:00 AM',
        vetName: 'Dr. Rahul Patel',
        clinic: 'Paws & Care Vet Clinic',
        location: bookServiceType.includes('Teleconsult') ? '📹 HD Video Call Link' : '2.1 km away • 14 Park Avenue',
        type: bookServiceType.includes('Teleconsult') ? 'Teleconsult' : 'In-Clinic Visit',
        fee: '₹499',
        status: 'Confirmed'
      },
      ...appointmentsList
    ]);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
    showToast("Appointment confirmed — Jan 23, 11:00 AM with Dr. Patel 🩺");
    setBookVetSheetOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto pb-24">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-ww-pine-dark text-white px-6 py-3 rounded-md text-xs font-extrabold shadow-warm-lg z-50 flex items-center gap-2 animate-bounce">
          <span>🩺</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: PET HEALTH CARD */}
      <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={pet.avatar} alt={pet.name} className="w-16 h-16 rounded-full object-cover border-2 border-ww-wood shadow-warm-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-ww-ink">{pet.name}'s Health Passport</h1>
              <span className="text-xs font-bold text-ww-wood-dark bg-ww-paper px-2.5 py-0.5 rounded-md shadow-warm-sm">{pet.species}</span>
            </div>
            <p className="text-xs font-semibold text-ww-wood-dark mt-1 flex items-center gap-1.5">
              <span>🩺 Next Vaccine Due:</span>
              <span className="bg-ww-awning text-white px-2.5 py-0.5 rounded-md font-extrabold text-[11px] shadow-warm-sm">
                {pet.nextVaccine || 'Oct 15 (Deworming Check)'}
              </span>
            </p>
          </div>
        </div>

        {/* Demo Trigger for Push Notification Modal */}
        <button
          onClick={() => setSamplePushModalOpen(true)}
          className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-awning px-3.5 py-2 rounded-md font-extrabold text-xs shadow-warm-sm flex items-center gap-1.5 min-h-[44px]"
        >
          <span>🔔 Test Med Alarm</span>
        </button>
      </div>

      {/* TOP SUBTABS BAR: RECORDS | MEDS | APPOINTMENTS */}
      <div className="bg-ww-paper p-1.5 rounded-md border border-ww-paper-dark shadow-warm-sm flex items-center gap-1">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2.5 rounded-md font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'records' ? 'bg-ww-awning text-white shadow-warm-sm' : 'text-ww-wood-dark hover:text-ww-brass'
          }`}
        >
          <span>📄</span> Records
        </button>

        <button
          onClick={() => setActiveTab('meds')}
          className={`flex-1 py-2.5 rounded-md font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'meds' ? 'bg-ww-awning text-white shadow-warm-sm' : 'text-ww-wood-dark hover:text-ww-brass'
          }`}
        >
          <span>💊</span> Meds
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2.5 rounded-md font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'appointments' ? 'bg-ww-awning text-white shadow-warm-sm' : 'text-ww-wood-dark hover:text-ww-brass'
          }`}
        >
          <span>🩺</span> Appointments
        </button>
      </div>

      {/* ================= TAB 1: RECORDS TIMELINE ================= */}
      {activeTab === 'records' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-kalam text-lg text-ww-ink">Medical History Timeline</h3>
              <p className="text-xs text-ww-wood">Vaccinations, surgeries, and allergy records</p>
            </div>
            <button
              onClick={() => setAddRecordModalOpen(true)}
              className="bg-ww-awning hover:bg-ww-awning-dark text-white px-4 py-2 rounded-md font-extrabold text-xs shadow-warm-sm flex items-center gap-1.5 min-h-[44px]"
            >
              <span>+ Add Record</span>
            </button>
          </div>

          {/* Vertical Timeline List */}
          <div className="space-y-4 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DCEBE0]">
            {recordsList.map((rec) => (
              <div key={rec.id} className="relative pl-12">
                {/* Timeline Dot Icon */}
                <div className="absolute left-3 top-2 -translate-x-1/2 w-7 h-7 rounded-full bg-ww-paper border-2 border-ww-wood text-xs flex items-center justify-center shadow-warm-sm">
                  {rec.type === 'Vaccination' ? '💉' : rec.type === 'Surgery' ? '🩺' : '📋'}
                </div>

                <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-4 sm:p-5 shadow-warm-md hover:shadow-warm-lg transition">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-ww-ink">{rec.title}</h4>
                        <span className="text-[10px] font-extrabold bg-ww-paper-dark text-ww-brass px-2 py-0.5 rounded-md">{rec.badge}</span>
                      </div>
                      <p className="text-xs font-semibold text-ww-wood mt-0.5">
                        {rec.date} • <strong className="text-ww-wood-dark">{rec.clinic}</strong> ({rec.doctor})
                      </p>
                    </div>

                    {/* PDF Report Download Button */}
                    <a
                      href={rec.pdfUrl}
                      download="sample_vet_report.pdf"
                      className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark hover:border-ww-wood text-ww-brass p-2.5 rounded-md flex items-center gap-1.5 text-xs font-bold transition min-h-[44px]"
                      title="Download PDF Vet Report"
                    >
                      <span>📄</span>
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  </div>

                  <p className="text-xs text-ww-wood-dark bg-ww-paper p-3 rounded-md border border-ww-paper-dark leading-relaxed">
                    {rec.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: MEDICATION MANAGEMENT ================= */}
      {activeTab === 'meds' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-kalam text-lg text-ww-ink">Active Medication Plan</h3>
              <p className="text-xs text-ww-wood">Daily prescriptions, dosage reminders, and history</p>
            </div>
            <button
              onClick={() => setAddMedModalOpen(true)}
              className="bg-ww-awning hover:bg-ww-awning-dark text-white px-4 py-2 rounded-md font-extrabold text-xs shadow-warm-sm flex items-center gap-1.5 min-h-[44px]"
            >
              <span>+ Add Medication</span>
            </button>
          </div>

          {/* Active Medication Pill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medsList.map((med) => (
              <div key={med.id} className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-md bg-ww-paper-dark text-ww-awning text-xl flex items-center justify-center shadow-warm-sm">
                        {med.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-ww-ink">{med.name}</h4>
                        <span className="text-xs font-semibold text-ww-brass">{med.dosage} • {med.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* DYNAMIC MISSED DOSE RISK WARNING (>12H) */}
                  {med.missedHours > 12 ? (
                    <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-md p-2.5 text-xs font-bold text-[#991B1B] space-y-1 mb-2 animate-shake">
                      <div className="flex items-center gap-1.5">
                        <span>⚠️ Risk Badge: Missed &gt;12h</span>
                      </div>
                      <p className="text-[11px] font-medium text-[#7F1D1D]">
                        Dose overdue by {med.missedHours} hrs. Contact Dr. Sarah Smith for revised timing.
                      </p>
                      <button
                        onClick={() => alert('Initiating call to Dr. Sarah Smith...')}
                        className="text-[10px] bg-[#991B1B] text-white px-2.5 py-1 rounded-md font-extrabold mt-1 inline-block"
                      >
                        📞 Contact Vet Now
                      </button>
                    </div>
                  ) : (
                    <div className="bg-ww-paper p-2.5 rounded-md border border-ww-paper-dark text-xs font-semibold text-ww-wood-dark mb-2">
                      Next dose: <strong className="text-ww-ink">{med.nextDoseTime}</strong>
                    </div>
                  )}
                </div>

                {/* Mark as Taken & Snooze Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-ww-paper-dark">
                  <button
                    onClick={() => handleMarkMedTaken(med.id, med.name)}
                    className="flex-1 bg-ww-awning hover:bg-ww-awning-dark text-white text-xs font-extrabold py-2.5 rounded-md shadow-warm-sm transition min-h-[44px]"
                  >
                    ✓ Mark as Taken
                  </button>
                  <button
                    onClick={() => handleSnoozeMed(med.name)}
                    className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-wood-dark px-3 py-2.5 rounded-md text-xs font-bold transition min-h-[44px]"
                  >
                    ⏰ Snooze 10m
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Medication History Log */}
          <div className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md space-y-3">
            <h4 className="font-extrabold text-sm text-ww-ink">Medication Administration Log</h4>
            <div className="space-y-2">
              {medHistory.map((h) => (
                <div key={h.id} className="bg-ww-paper p-3 rounded-md border border-ww-paper-dark flex items-center justify-between text-xs">
                  <span className="font-bold text-ww-ink">✓ {h.text}</span>
                  <span className="text-ww-wood">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: VET APPOINTMENTS ================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-kalam text-lg text-ww-ink">Vet Appointments</h3>
              <p className="text-xs text-ww-wood">Upcoming clinic visits & teleconsult video calls</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setBookServiceType('📹 Teleconsult 15-min Video Call');
                  setBookVetSheetOpen(true);
                }}
                className="bg-[#4EA8DE] hover:bg-[#3894C7] text-white px-3.5 py-2 rounded-md font-extrabold text-xs shadow-warm-sm flex items-center gap-1 min-h-[44px]"
              >
                <span>📹 Teleconsult</span>
              </button>
              <button
                onClick={() => {
                  setBookServiceType('Vaccination & Wellness Check');
                  setBookVetSheetOpen(true);
                }}
                className="bg-ww-awning hover:bg-ww-awning-dark text-white px-3.5 py-2 rounded-md font-extrabold text-xs shadow-warm-sm flex items-center gap-1 min-h-[44px]"
              >
                <span>+ Book Vet</span>
              </button>
            </div>
          </div>

          {/* Upcoming Appointments List */}
          <div className="space-y-4">
            {appointmentsList.map((app) => (
              <div key={app.id} className="bg-ww-paper border border-ww-paper-dark rounded-md p-5 shadow-warm-md space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-ww-paper-dark text-ww-brass px-2.5 py-1 rounded-md">{app.type}</span>
                    <h4 className="font-extrabold text-base text-ww-ink mt-1">{app.title}</h4>
                    <p className="text-xs font-semibold text-ww-wood-dark mt-0.5">
                      📅 <strong>{app.date} at {app.time}</strong> • {app.vetName}
                    </p>
                    <p className="text-xs text-ww-wood mt-0.5">{app.location}</p>
                  </div>
                  <span className="font-extrabold text-base text-ww-brass">{app.fee}</span>
                </div>

                {/* Reschedule & Cancel Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-ww-paper-dark">
                  <button
                    onClick={() => alert(`Rescheduling ${app.title}...`)}
                    className="flex-1 bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-ink font-extrabold text-xs py-2.5 rounded-md transition min-h-[44px]"
                  >
                    ✏️ Reschedule
                  </button>
                  <button
                    onClick={() => alert(`Cancelling ${app.title}...`)}
                    className="bg-ww-awning text-white font-extrabold text-xs px-4 py-2.5 rounded-md hover:bg-ww-awning-dark hover:text-white transition min-h-[44px]"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STICKY EMERGENCY QUICK ACTION (RED DANGER CTA) */}
      <div className="fixed bottom-16 lg:bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-30">
        <button
          onClick={() => alert('🚨 EMERGENCY HELPLINE INITIATED:\nCalling 24/7 Vet Hospital at 1800-PAWS-911...')}
          className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-extrabold py-3.5 px-6 rounded-md shadow-warm-lg flex items-center justify-center gap-2 min-h-[48px] animate-pulse"
        >
          <span className="text-lg">🚨</span>
          <span>Emergency — Call Vet (1800-PAWS-911)</span>
        </button>
      </div>

      {/* ADD RECORD MODAL */}
      {addRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Add Health Record</h3>
              <button onClick={() => setAddRecordModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleAddRecordSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Record Title</label>
                <input
                  type="text"
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  placeholder="e.g. Annual Vaccine, Dental X-Ray"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={recordClinic}
                  onChange={(e) => setRecordClinic(e.target.value)}
                  placeholder="e.g. Paws & Care Vet Clinic"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Upload Report / Image (PDF, JPG)</label>
                <div className="border-2 border-dashed border-ww-wood rounded-md p-4 text-center bg-ww-paper-dark/50 cursor-pointer">
                  <span className="text-2xl block mb-1">📄</span>
                  <span className="text-xs font-bold text-ww-brass">Upload vet note or image (PDF, JPG)</span>
                </div>

                {isUploading && (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-ww-wood-dark">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#DCEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-ww-awning transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Notes</label>
                <textarea
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  placeholder="e.g. Administered 1-yr booster vaccine"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold h-20"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                {isUploading ? 'Uploading Document...' : 'Save & Attach Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEDICATION MODAL */}
      {addMedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Add Active Medication</h3>
              <button onClick={() => setAddMedModalOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleAddMedSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Medication Name</label>
                <input
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g. Amoxicillin 250mg, Eye Drops"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold mb-2"
                  required
                />

                {/* Auto-suggest Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['Amoxicillin 250mg', 'Flea & Tick Chew', 'Eye Soothing Drops', 'Joint Supplement'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setMedName(s)}
                      className="bg-ww-paper hover:bg-ww-paper-dark border border-ww-paper-dark text-ww-wood-dark px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Dosage</label>
                <input
                  type="text"
                  value={medDosage}
                  onChange={(e) => setMedDosage(e.target.value)}
                  placeholder="e.g. 1 Tablet, 2 Drops"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Times Per Day</label>
                <select
                  value={medTimes}
                  onChange={(e) => setMedTimes(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-bold"
                >
                  <option value="1">Once Daily (q24h)</option>
                  <option value="2">Twice Daily (q12h)</option>
                  <option value="3">Three Times Daily (q8h)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                Save Medication
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOK VET BOTTOM SHEET MODAL */}
      {bookVetSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ww-pine-dark/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-ww-paper rounded-t-[28px] sm:rounded-md p-6 shadow-warm-lg border border-ww-paper-dark">
            <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-4">
              <h3 className="font-kalam text-lg text-ww-ink">Book Vet Appointment</h3>
              <button onClick={() => setBookVetSheetOpen(false)} className="text-lg text-ww-wood min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleBookVetSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Service Type</label>
                <select
                  value={bookServiceType}
                  onChange={(e) => setBookServiceType(e.target.value)}
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-bold"
                >
                  <option value="Vaccination & Wellness Check">💉 Vaccination & Wellness Checkup (₹499)</option>
                  <option value="Symptom Inspection">🩺 Symptom Inspection (₹499)</option>
                  <option value="📹 Teleconsult 15-min Video Call">📹 Teleconsult 15-min Video Call (₹299)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-ww-wood-dark block mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={bookReason}
                  onChange={(e) => setBookReason(e.target.value)}
                  placeholder="e.g. Annual rabies vaccine booster"
                  className="w-full bg-ww-paper border border-ww-paper-dark rounded-md p-3 text-xs font-semibold"
                />
              </div>

              <div className="bg-ww-paper-dark p-3.5 rounded-md border border-ww-wood flex justify-between items-center text-xs font-bold">
                <span>Estimated Consultation Fee</span>
                <span className="text-ww-brass text-sm">₹499</span>
              </div>

              <button
                type="submit"
                className="w-full bg-ww-awning hover:bg-ww-awning-dark text-white font-extrabold py-3.5 rounded-md shadow-warm-md transition min-h-[44px]"
              >
                Confirm Appointment — ₹499
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SAMPLE PUSH NOTIFICATION ALARM MODAL */}
      {samplePushModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ww-pine-dark/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-ww-paper rounded-md p-6 shadow-warm-lg border border-ww-paper-dark text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-ww-paper-dark text-ww-awning text-3xl flex items-center justify-center mx-auto shadow-warm-sm animate-bounce">
              ⏰
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-ww-brass uppercase tracking-wider">Medication Reminder</span>
              <h4 className="font-extrabold text-base text-ww-ink mt-0.5">Time for {pet.name}'s Amoxicillin 250mg!</h4>
              <p className="text-xs text-ww-wood-dark mt-1">Twice Daily Dose • Take with morning meal</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleMarkMedTaken(1, 'Amoxicillin 250mg');
                  setSamplePushModalOpen(false);
                }}
                className="flex-1 bg-ww-awning text-white font-extrabold py-2.5 rounded-md text-xs shadow-warm-sm min-h-[44px]"
              >
                ✓ Mark as Given
              </button>
              <button
                onClick={() => {
                  handleSnoozeMed('Amoxicillin 250mg');
                  setSamplePushModalOpen(false);
                }}
                className="bg-ww-paper border border-ww-paper-dark text-ww-wood-dark font-bold py-2.5 px-4 rounded-md text-xs min-h-[44px]"
              >
                Snooze 10m
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
