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
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#2A2F2B] text-white px-6 py-3 rounded-pill text-xs font-extrabold shadow-soft-lg z-50 flex items-center gap-2 animate-bounce">
          <span>🩺</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: PET HEALTH CARD */}
      <div className="bg-gradient-to-r from-[#EBF8EE] via-[#FFF0F5] to-[#E0F2FE] border border-[#DCEBE0] rounded-card p-5 shadow-soft-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={pet.avatar} alt={pet.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#7BD389] shadow-soft-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-[#2A2F2B]">{pet.name}'s Health Passport</h1>
              <span className="text-xs font-bold text-[#525C54] bg-white px-2.5 py-0.5 rounded-pill shadow-soft-sm">{pet.species}</span>
            </div>
            <p className="text-xs font-semibold text-[#525C54] mt-1 flex items-center gap-1.5">
              <span>🩺 Next Vaccine Due:</span>
              <span className="bg-[#7BD389] text-white px-2.5 py-0.5 rounded-pill font-extrabold text-[11px] shadow-soft-sm">
                {pet.nextVaccine || 'Oct 15 (Deworming Check)'}
              </span>
            </p>
          </div>
        </div>

        {/* Demo Trigger for Push Notification Modal */}
        <button
          onClick={() => setSamplePushModalOpen(true)}
          className="bg-white hover:bg-[#FFF0F5] border border-[#DCEBE0] text-[#FF85A1] px-3.5 py-2 rounded-pill font-extrabold text-xs shadow-soft-sm flex items-center gap-1.5 min-h-[44px]"
        >
          <span>🔔 Test Med Alarm</span>
        </button>
      </div>

      {/* TOP SUBTABS BAR: RECORDS | MEDS | APPOINTMENTS */}
      <div className="bg-white p-1.5 rounded-pill border border-[#DCEBE0] shadow-soft-sm flex items-center gap-1">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2.5 rounded-pill font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'records' ? 'bg-[#7BD389] text-white shadow-soft-sm' : 'text-[#525C54] hover:text-[#7BD389]'
          }`}
        >
          <span>📄</span> Records
        </button>

        <button
          onClick={() => setActiveTab('meds')}
          className={`flex-1 py-2.5 rounded-pill font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'meds' ? 'bg-[#7BD389] text-white shadow-soft-sm' : 'text-[#525C54] hover:text-[#7BD389]'
          }`}
        >
          <span>💊</span> Meds
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2.5 rounded-pill font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            activeTab === 'appointments' ? 'bg-[#7BD389] text-white shadow-soft-sm' : 'text-[#525C54] hover:text-[#7BD389]'
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
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Medical History Timeline</h3>
              <p className="text-xs text-[#8E9890]">Vaccinations, surgeries, and allergy records</p>
            </div>
            <button
              onClick={() => setAddRecordModalOpen(true)}
              className="bg-[#7BD389] hover:bg-[#5BB369] text-white px-4 py-2 rounded-pill font-extrabold text-xs shadow-soft-sm flex items-center gap-1.5 min-h-[44px]"
            >
              <span>+ Add Record</span>
            </button>
          </div>

          {/* Vertical Timeline List */}
          <div className="space-y-4 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DCEBE0]">
            {recordsList.map((rec) => (
              <div key={rec.id} className="relative pl-12">
                {/* Timeline Dot Icon */}
                <div className="absolute left-3 top-2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#7BD389] text-xs flex items-center justify-center shadow-soft-sm">
                  {rec.type === 'Vaccination' ? '💉' : rec.type === 'Surgery' ? '🩺' : '📋'}
                </div>

                <div className="bg-white border border-[#DCEBE0] rounded-card p-4 sm:p-5 shadow-soft-md hover:shadow-soft-lg transition">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#2A2F2B]">{rec.title}</h4>
                        <span className="text-[10px] font-extrabold bg-[#EBF8EE] text-[#7BD389] px-2 py-0.5 rounded-pill">{rec.badge}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#8E9890] mt-0.5">
                        {rec.date} • <strong className="text-[#525C54]">{rec.clinic}</strong> ({rec.doctor})
                      </p>
                    </div>

                    {/* PDF Report Download Button */}
                    <a
                      href={rec.pdfUrl}
                      download="sample_vet_report.pdf"
                      className="bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] hover:border-[#7BD389] text-[#7BD389] p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition min-h-[44px]"
                      title="Download PDF Vet Report"
                    >
                      <span>📄</span>
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  </div>

                  <p className="text-xs text-[#525C54] bg-[#FAF9F6] p-3 rounded-xl border border-[#EBF8EE] leading-relaxed">
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
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Active Medication Plan</h3>
              <p className="text-xs text-[#8E9890]">Daily prescriptions, dosage reminders, and history</p>
            </div>
            <button
              onClick={() => setAddMedModalOpen(true)}
              className="bg-[#7BD389] hover:bg-[#5BB369] text-white px-4 py-2 rounded-pill font-extrabold text-xs shadow-soft-sm flex items-center gap-1.5 min-h-[44px]"
            >
              <span>+ Add Medication</span>
            </button>
          </div>

          {/* Active Medication Pill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medsList.map((med) => (
              <div key={med.id} className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#FFF0F5] text-[#FF85A1] text-xl flex items-center justify-center shadow-soft-sm">
                        {med.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#2A2F2B]">{med.name}</h4>
                        <span className="text-xs font-semibold text-[#7BD389]">{med.dosage} • {med.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* DYNAMIC MISSED DOSE RISK WARNING (>12H) */}
                  {med.missedHours > 12 ? (
                    <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-2.5 text-xs font-bold text-[#991B1B] space-y-1 mb-2 animate-shake">
                      <div className="flex items-center gap-1.5">
                        <span>⚠️ Risk Badge: Missed &gt;12h</span>
                      </div>
                      <p className="text-[11px] font-medium text-[#7F1D1D]">
                        Dose overdue by {med.missedHours} hrs. Contact Dr. Sarah Smith for revised timing.
                      </p>
                      <button
                        onClick={() => alert('Initiating call to Dr. Sarah Smith...')}
                        className="text-[10px] bg-[#991B1B] text-white px-2.5 py-1 rounded-pill font-extrabold mt-1 inline-block"
                      >
                        📞 Contact Vet Now
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#EBF8EE] text-xs font-semibold text-[#525C54] mb-2">
                      Next dose: <strong className="text-[#2A2F2B]">{med.nextDoseTime}</strong>
                    </div>
                  )}
                </div>

                {/* Mark as Taken & Snooze Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#EBF8EE]">
                  <button
                    onClick={() => handleMarkMedTaken(med.id, med.name)}
                    className="flex-1 bg-[#7BD389] hover:bg-[#5BB369] text-white text-xs font-extrabold py-2.5 rounded-pill shadow-soft-sm transition min-h-[44px]"
                  >
                    ✓ Mark as Taken
                  </button>
                  <button
                    onClick={() => handleSnoozeMed(med.name)}
                    className="bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#525C54] px-3 py-2.5 rounded-pill text-xs font-bold transition min-h-[44px]"
                  >
                    ⏰ Snooze 10m
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Medication History Log */}
          <div className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md space-y-3">
            <h4 className="font-extrabold text-sm text-[#2A2F2B]">Medication Administration Log</h4>
            <div className="space-y-2">
              {medHistory.map((h) => (
                <div key={h.id} className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EBF8EE] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2A2F2B]">✓ {h.text}</span>
                  <span className="text-[#8E9890]">{h.time}</span>
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
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Vet Appointments</h3>
              <p className="text-xs text-[#8E9890]">Upcoming clinic visits & teleconsult video calls</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setBookServiceType('📹 Teleconsult 15-min Video Call');
                  setBookVetSheetOpen(true);
                }}
                className="bg-[#4EA8DE] hover:bg-[#3894C7] text-white px-3.5 py-2 rounded-pill font-extrabold text-xs shadow-soft-sm flex items-center gap-1 min-h-[44px]"
              >
                <span>📹 Teleconsult</span>
              </button>
              <button
                onClick={() => {
                  setBookServiceType('Vaccination & Wellness Check');
                  setBookVetSheetOpen(true);
                }}
                className="bg-[#7BD389] hover:bg-[#5BB369] text-white px-3.5 py-2 rounded-pill font-extrabold text-xs shadow-soft-sm flex items-center gap-1 min-h-[44px]"
              >
                <span>+ Book Vet</span>
              </button>
            </div>
          </div>

          {/* Upcoming Appointments List */}
          <div className="space-y-4">
            {appointmentsList.map((app) => (
              <div key={app.id} className="bg-white border border-[#DCEBE0] rounded-card p-5 shadow-soft-md space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-[#EBF8EE] text-[#7BD389] px-2.5 py-1 rounded-pill">{app.type}</span>
                    <h4 className="font-extrabold text-base text-[#2A2F2B] mt-1">{app.title}</h4>
                    <p className="text-xs font-semibold text-[#525C54] mt-0.5">
                      📅 <strong>{app.date} at {app.time}</strong> • {app.vetName}
                    </p>
                    <p className="text-xs text-[#8E9890] mt-0.5">{app.location}</p>
                  </div>
                  <span className="font-extrabold text-base text-[#7BD389]">{app.fee}</span>
                </div>

                {/* Reschedule & Cancel Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#EBF8EE]">
                  <button
                    onClick={() => alert(`Rescheduling ${app.title}...`)}
                    className="flex-1 bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#2A2F2B] font-extrabold text-xs py-2.5 rounded-pill transition min-h-[44px]"
                  >
                    ✏️ Reschedule
                  </button>
                  <button
                    onClick={() => alert(`Cancelling ${app.title}...`)}
                    className="bg-[#FFE8E8] text-[#E63946] font-extrabold text-xs px-4 py-2.5 rounded-pill hover:bg-[#E63946] hover:text-white transition min-h-[44px]"
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
          className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-extrabold py-3.5 px-6 rounded-pill shadow-soft-lg flex items-center justify-center gap-2 min-h-[48px] animate-pulse"
        >
          <span className="text-lg">🚨</span>
          <span>Emergency — Call Vet (1800-PAWS-911)</span>
        </button>
      </div>

      {/* ADD RECORD MODAL */}
      {addRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Add Health Record</h3>
              <button onClick={() => setAddRecordModalOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleAddRecordSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Record Title</label>
                <input
                  type="text"
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  placeholder="e.g. Annual Vaccine, Dental X-Ray"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={recordClinic}
                  onChange={(e) => setRecordClinic(e.target.value)}
                  placeholder="e.g. Paws & Care Vet Clinic"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Upload Report / Image (PDF, JPG)</label>
                <div className="border-2 border-dashed border-[#7BD389] rounded-2xl p-4 text-center bg-[#EBF8EE]/50 cursor-pointer">
                  <span className="text-2xl block mb-1">📄</span>
                  <span className="text-xs font-bold text-[#7BD389]">Upload vet note or image (PDF, JPG)</span>
                </div>

                {isUploading && (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-[#525C54]">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#DCEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7BD389] transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Notes</label>
                <textarea
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  placeholder="e.g. Administered 1-yr booster vaccine"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold h-20"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px]"
              >
                {isUploading ? 'Uploading Document...' : 'Save & Attach Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEDICATION MODAL */}
      {addMedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Add Active Medication</h3>
              <button onClick={() => setAddMedModalOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleAddMedSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Medication Name</label>
                <input
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g. Amoxicillin 250mg, Eye Drops"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold mb-2"
                  required
                />

                {/* Auto-suggest Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['Amoxicillin 250mg', 'Flea & Tick Chew', 'Eye Soothing Drops', 'Joint Supplement'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setMedName(s)}
                      className="bg-[#FAF9F6] hover:bg-[#EBF8EE] border border-[#DCEBE0] text-[#525C54] px-2.5 py-1 rounded-pill text-[11px] font-bold whitespace-nowrap"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Dosage</label>
                <input
                  type="text"
                  value={medDosage}
                  onChange={(e) => setMedDosage(e.target.value)}
                  placeholder="e.g. 1 Tablet, 2 Drops"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Times Per Day</label>
                <select
                  value={medTimes}
                  onChange={(e) => setMedTimes(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-bold"
                >
                  <option value="1">Once Daily (q24h)</option>
                  <option value="2">Twice Daily (q12h)</option>
                  <option value="3">Three Times Daily (q8h)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px]"
              >
                Save Medication
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOK VET BOTTOM SHEET MODAL */}
      {bookVetSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2F2B]/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-card p-6 shadow-soft-lg border border-[#DCEBE0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE0] mb-4">
              <h3 className="font-extrabold text-base text-[#2A2F2B]">Book Vet Appointment</h3>
              <button onClick={() => setBookVetSheetOpen(false)} className="text-lg text-[#8E9890] min-h-[44px] min-w-[44px]">✕</button>
            </div>

            <form onSubmit={handleBookVetSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Service Type</label>
                <select
                  value={bookServiceType}
                  onChange={(e) => setBookServiceType(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-bold"
                >
                  <option value="Vaccination & Wellness Check">💉 Vaccination & Wellness Checkup (₹499)</option>
                  <option value="Symptom Inspection">🩺 Symptom Inspection (₹499)</option>
                  <option value="📹 Teleconsult 15-min Video Call">📹 Teleconsult 15-min Video Call (₹299)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#525C54] block mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={bookReason}
                  onChange={(e) => setBookReason(e.target.value)}
                  placeholder="e.g. Annual rabies vaccine booster"
                  className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl p-3 text-xs font-semibold"
                />
              </div>

              <div className="bg-[#EBF8EE] p-3.5 rounded-2xl border border-[#7BD389]/30 flex justify-between items-center text-xs font-bold">
                <span>Estimated Consultation Fee</span>
                <span className="text-[#7BD389] text-sm">₹499</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7BD389] hover:bg-[#5BB369] text-white font-extrabold py-3.5 rounded-pill shadow-soft-md transition min-h-[44px]"
              >
                Confirm Appointment — ₹499
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SAMPLE PUSH NOTIFICATION ALARM MODAL */}
      {samplePushModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2F2B]/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-card p-6 shadow-soft-lg border border-[#DCEBE0] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FFF0F5] text-[#FF85A1] text-3xl flex items-center justify-center mx-auto shadow-soft-sm animate-bounce">
              ⏰
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#7BD389] uppercase tracking-wider">Medication Reminder</span>
              <h4 className="font-extrabold text-base text-[#2A2F2B] mt-0.5">Time for {pet.name}'s Amoxicillin 250mg!</h4>
              <p className="text-xs text-[#525C54] mt-1">Twice Daily Dose • Take with morning meal</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleMarkMedTaken(1, 'Amoxicillin 250mg');
                  setSamplePushModalOpen(false);
                }}
                className="flex-1 bg-[#7BD389] text-white font-extrabold py-2.5 rounded-pill text-xs shadow-soft-sm min-h-[44px]"
              >
                ✓ Mark as Given
              </button>
              <button
                onClick={() => {
                  handleSnoozeMed('Amoxicillin 250mg');
                  setSamplePushModalOpen(false);
                }}
                className="bg-[#FAF9F6] border border-[#DCEBE0] text-[#525C54] font-bold py-2.5 px-4 rounded-pill text-xs min-h-[44px]"
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
