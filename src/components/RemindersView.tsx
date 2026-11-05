import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Wrench, 
  MapPin, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Permit, Equipment } from '../types';
import { calculateDaysRemaining, formatDateId } from '../utils/helpers';

interface RemindersViewProps {
  permits: Permit[];
  equipment: Equipment[];
  onMarkAllRead: () => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({ permits, equipment, onMarkAllRead }) => {
  // Generate automated reminder items dynamically from current dates
  const permitReminders = permits.map(p => {
    const days = calculateDaysRemaining(p.tanggalBerakhir);
    let urgency: 'safe' | 'warning-30' | 'warning-14' | 'warning-7' | 'warning-1' | 'overdue' = 'safe';
    let statusLabel = 'Aman';

    if (days < 0) {
      urgency = 'overdue';
      statusLabel = 'OVERDUE (Kedaluwarsa)';
    } else if (days <= 1) {
      urgency = 'warning-1';
      statusLabel = 'H-1 Jatuh Tempo';
    } else if (days <= 7) {
      urgency = 'warning-7';
      statusLabel = 'H-7 Jatuh Tempo';
    } else if (days <= 14) {
      urgency = 'warning-14';
      statusLabel = 'H-14 Jatuh Tempo';
    } else if (days <= 30) {
      urgency = 'warning-30';
      statusLabel = 'H-30 Jatuh Tempo';
    }

    return {
      id: `p-rem-${p.id}`,
      type: 'permit' as const,
      title: p.namaPerizinan,
      docNumber: p.nomorDokumen,
      location: p.lokasi,
      dueDate: p.tanggalBerakhir,
      daysRemaining: days,
      urgency,
      statusLabel,
      pic: p.pic,
      message: `PERINGATAN MASA BERLAKU PERIZINAN\nNama Dokumen: ${p.namaPerizinan}.\nNo Dokumen: ${p.nomorDokumen}.\nLokasi: ${p.lokasi}.\nTanggal Berakhir: ${formatDateId(p.tanggalBerakhir)}.\nSisa Waktu: ${days < 0 ? `Sudah lewat ${Math.abs(days)} hari` : `${days} Hari`}.\nStatus: Segera Ditindaklanjuti oleh ${p.pic}.`
    };
  }).filter(item => item.urgency !== 'safe');

  const equipmentReminders = equipment.map(eq => {
    const days = calculateDaysRemaining(eq.tanggalKalibrasiBerikutnya);
    let urgency: 'safe' | 'warning-30' | 'warning-14' | 'warning-7' | 'warning-1' | 'overdue' = 'safe';
    let statusLabel = 'Aman';

    if (days < 0) {
      urgency = 'overdue';
      statusLabel = 'OVERDUE (Jadwal Terlewat)';
    } else if (days <= 1) {
      urgency = 'warning-1';
      statusLabel = 'H-1 Kalibrasi';
    } else if (days <= 7) {
      urgency = 'warning-7';
      statusLabel = 'H-7 Kalibrasi';
    } else if (days <= 14) {
      urgency = 'warning-14';
      statusLabel = 'H-14 Kalibrasi';
    } else if (days <= 30) {
      urgency = 'warning-30';
      statusLabel = 'H-30 Kalibrasi';
    }

    return {
      id: `eq-rem-${eq.id}`,
      type: 'equipment' as const,
      title: eq.namaPeralatan,
      docNumber: eq.nomorRegister,
      location: eq.lokasi,
      dueDate: eq.tanggalKalibrasiBerikutnya,
      daysRemaining: days,
      urgency,
      statusLabel,
      pic: eq.pic,
      message: `PERINGATAN JADWAL KALIBRASI PERALATAN\nNama Peralatan: ${eq.namaPeralatan}.\nNomor Register: ${eq.nomorRegister}.\nLokasi: ${eq.lokasi}.\nJadwal Kalibrasi Berikutnya: ${formatDateId(eq.tanggalKalibrasiBerikutnya)}.\nSisa Waktu: ${days < 0 ? `Terlewat ${Math.abs(days)} hari` : `${days} Hari`}.\nStatus: Segera Dijadwalkan oleh ${eq.pic}.`
    };
  }).filter(item => item.urgency !== 'safe');

  const allReminders = [...permitReminders, ...equipmentReminders].sort((a, b) => a.daysRemaining - b.daysRemaining);

  const overdueCount = allReminders.filter(r => r.urgency === 'overdue').length;
  const warningCount = allReminders.filter(r => r.urgency !== 'overdue').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>Sistem Automatic Reminder & Notifikasi</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Pusat Peringatan & Jatuh Tempo</h2>
          <p className="text-xs text-gray-500 mt-0.5">Notifikasi otomatis H-30, H-14, H-7, H-1 dan Overdue untuk seluruh perizinan dan kalibrasi alat lingkungan</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onMarkAllRead}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all"
          >
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-rose-600 text-white rounded-xl shadow">
            <XCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">Status Overdue (H+ dan Lewat)</p>
            <h3 className="text-2xl font-extrabold text-rose-900 mt-0.5">{overdueCount} Item</h3>
            <p className="text-xs text-rose-800 mt-0.5">Memerlukan tindakan korektif segera tanpa penundaan.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-amber-500 text-white rounded-xl shadow">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Akan Jatuh Tempo (H-30 s.d H-1)</p>
            <h3 className="text-2xl font-extrabold text-amber-900 mt-0.5">{warningCount} Item</h3>
            <p className="text-xs text-amber-800 mt-0.5">Dalam periode pengingat otomatis perpanjangan atau kalibrasi.</p>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {allReminders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 text-base">Semua Perizinan & Peralatan Aman!</h3>
            <p className="text-xs text-gray-500 mt-1">Tidak ada dokumen atau peralatan yang mendekati masa jatuh tempo saat ini.</p>
          </div>
        ) : (
          allReminders.map((rem) => {
            const isOverdue = rem.urgency === 'overdue';
            return (
              <div 
                key={rem.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  isOverdue ? 'border-rose-300 bg-rose-50/20' : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 text-white shadow-sm ${
                    isOverdue ? 'bg-rose-600' : 'bg-amber-500'
                  }`}>
                    {rem.type === 'permit' ? <FileText className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isOverdue ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {rem.statusLabel}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-700" /> {rem.location}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">{rem.title}</h3>
                    <p className="text-xs font-mono text-gray-500 mt-0.5">No: {rem.docNumber}</p>
                    
                    <div className="mt-3 bg-white/80 border border-gray-200/80 p-3 rounded-xl text-xs text-gray-700 font-medium whitespace-pre-line leading-relaxed shadow-2xs">
                      {rem.message}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-200 gap-2">
                  <div className="text-left md:text-right">
                    <p className="text-[11px] text-gray-500">Tanggal Jatuh Tempo</p>
                    <p className="text-xs font-bold text-gray-800">{formatDateId(rem.dueDate)}</p>
                    <p className={`text-xs font-extrabold mt-0.5 ${isOverdue ? 'text-rose-600' : 'text-amber-600'}`}>
                      {rem.daysRemaining < 0 ? `Terlewat ${Math.abs(rem.daysRemaining)} Hari` : `${rem.daysRemaining} Hari Lagi`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Memproses tindakan untuk: ${rem.title}\nPIC: ${rem.pic}\nSistem akan mengirimkan notifikasi penugasan via email ke ${rem.pic}.`);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow transition-all ${
                      isOverdue ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-700 hover:bg-emerald-800'
                    }`}
                  >
                    Tindak Lanjuti
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
