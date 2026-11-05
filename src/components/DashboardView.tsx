import React from 'react';
import { 
  FileText, 
  Wrench, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Calendar,
  Building2,
  ShieldAlert,
  Download
} from 'lucide-react';
import { Permit, Equipment } from '../types';
import { calculateDaysRemaining, formatDateId, getStatusBadgeClass } from '../utils/helpers';

interface DashboardViewProps {
  permits: Permit[];
  equipment: Equipment[];
  onOpenAddPermit: () => void;
  onOpenAddEquipment: () => void;
  setCurrentTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  permits,
  equipment,
  onOpenAddPermit,
  onOpenAddEquipment,
  setCurrentTab
}) => {
  // Calculations
  const totalPermits = permits.length;
  const totalEquipment = equipment.length;

  // Process permits days & statuses
  const permitStats = permits.map(p => {
    const days = calculateDaysRemaining(p.tanggalBerakhir);
    let status = p.status;
    if (days < 0) status = 'Kedaluwarsa';
    else if (days <= 30) status = 'Akan Jatuh Tempo';
    else status = 'Aktif';
    return { ...p, daysRemaining: days, computedStatus: status };
  });

  // Process equipment days & statuses
  const equipStats = equipment.map(eq => {
    const days = calculateDaysRemaining(eq.tanggalKalibrasiBerikutnya);
    let status = eq.status;
    if (days < 0) status = 'Overdue';
    else if (days <= 30) status = 'Jadwal Kalibrasi';
    else status = 'Aman';
    return { ...eq, daysRemaining: days, computedStatus: status };
  });

  const permitsDueSoon = permitStats.filter(p => p.computedStatus === 'Akan Jatuh Tempo').length;
  const permitsOverdue = permitStats.filter(p => p.computedStatus === 'Kedaluwarsa').length;
  const permitsSafe = permitStats.filter(p => p.computedStatus === 'Aktif').length;

  const equipDueSoon = equipStats.filter(e => e.computedStatus === 'Jadwal Kalibrasi').length;
  const equipOverdue = equipStats.filter(e => e.computedStatus === 'Overdue').length;
  const equipSafe = equipStats.filter(e => e.computedStatus === 'Aman').length;

  const totalDueSoon = permitsDueSoon + equipDueSoon;
  const totalOverdue = permitsOverdue + equipOverdue;
  const totalSafe = permitsSafe + equipSafe;

  // Urgent items for top alert
  const urgentPermits = permitStats.filter(p => p.computedStatus === 'Akan Jatuh Tempo' || p.computedStatus === 'Kedaluwarsa');
  const urgentEquipment = equipStats.filter(e => e.computedStatus === 'Jadwal Kalibrasi' || e.computedStatus === 'Overdue');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 opacity-20 transform skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-700/80 px-3 py-1 rounded-full text-xs font-semibold text-emerald-100">
            <Building2 className="w-3.5 h-3.5" />
            <span>Departemen Environment • PT. Tambang Sejahtera Mandiri</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Dashboard Monitoring Lingkungan & Kalibrasi</h2>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Pantau seluruh masa berlaku perizinan AMDAL/Pertek/SLO dan jadwal kalibrasi alat lingkungan secara real-time untuk memastikan kepatuhan regulasi pertambangan (HSE Compliance).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onOpenAddPermit}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Perizinan</span>
          </button>
          <button
            onClick={onOpenAddEquipment}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg border border-emerald-600"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Peralatan</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Perizinan */}
        <div 
          onClick={() => setCurrentTab('permits')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Perizinan</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-gray-800">{totalPermits}</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              Dokumen <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Total Peralatan */}
        <div 
          onClick={() => setCurrentTab('equipment')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Peralatan</span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-gray-800">{totalEquipment}</h3>
            <span className="text-xs text-teal-600 font-semibold flex items-center gap-1">
              Unit Alat <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Akan Jatuh Tempo */}
        <div 
          onClick={() => setCurrentTab('reminders')}
          className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Akan Jatuh Tempo</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-amber-800">{totalDueSoon}</h3>
            <span className="text-xs text-amber-700 font-semibold">H-30 Warning</span>
          </div>
        </div>

        {/* Card 4: Kedaluwarsa / Overdue */}
        <div 
          onClick={() => setCurrentTab('reminders')}
          className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Sudah Kedaluwarsa</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-rose-800">{totalOverdue}</h3>
            <span className="text-xs text-rose-700 font-semibold">Overdue / Action</span>
          </div>
        </div>

        {/* Card 5: Status Aman */}
        <div 
          onClick={() => setCurrentTab('permits')}
          className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Status Aman</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-emerald-800">{totalSafe}</h3>
            <span className="text-xs text-emerald-700 font-semibold">Compliance OK</span>
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner if any overdue or due soon */}
      {(urgentPermits.length > 0 || urgentEquipment.length > 0) && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-xl flex-shrink-0 shadow-sm">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-amber-900 text-base mb-1">Perhatian: Terdapat Dokumen & Peralatan Mendekati Batas Waktu / Overdue</h3>
            <p className="text-xs text-amber-800 leading-relaxed mb-3">
              Segera lakukan tindakan perpanjangan perizinan atau penjadwalan ulang kalibrasi untuk menghindari sanksi administratif dan menjaga kepatuhan operasional tambang.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentTab('reminders')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
              >
                <span>Lihat Pusat Reminder ({urgentPermits.length + urgentEquipment.length} Item)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Two Columns Preview Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permits Table Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-gray-800 text-base">Monitoring Perizinan Lingkungan</h3>
            </div>
            <button
              onClick={() => setCurrentTab('permits')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
            >
              Lihat Semua ({permits.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/70 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Perizinan</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">Berakhir</th>
                  <th className="py-3 px-4">Sisa Hari</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {permitStats.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-800 max-w-[200px] truncate" title={p.namaPerizinan}>
                      {p.namaPerizinan}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{p.lokasi}</td>
                    <td className="py-3.5 px-4 text-gray-600">{formatDateId(p.tanggalBerakhir)}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span className={`${p.daysRemaining < 0 ? 'text-rose-600' : p.daysRemaining <= 30 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {p.daysRemaining < 0 ? `Overdue (${Math.abs(p.daysRemaining)}h)` : `${p.daysRemaining} Hari`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusBadgeClass(p.computedStatus)}`}>
                        {p.computedStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Equipment Table Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-teal-700" />
              <h3 className="font-bold text-gray-800 text-base">Monitoring Peralatan & Kalibrasi</h3>
            </div>
            <button
              onClick={() => setCurrentTab('equipment')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 hover:underline"
            >
              Lihat Semua ({equipment.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/70 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Peralatan</th>
                  <th className="py-3 px-4">Register</th>
                  <th className="py-3 px-4">Kalibrasi Berikutnya</th>
                  <th className="py-3 px-4">Sisa Waktu</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {equipStats.slice(0, 5).map((eq) => (
                  <tr key={eq.id} className="hover:bg-teal-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-800 max-w-[180px] truncate" title={eq.namaPeralatan}>
                      {eq.namaPeralatan}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-mono">{eq.nomorRegister}</td>
                    <td className="py-3.5 px-4 text-gray-600">{formatDateId(eq.tanggalKalibrasiBerikutnya)}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span className={`${eq.daysRemaining < 0 ? 'text-rose-600' : eq.daysRemaining <= 30 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {eq.daysRemaining < 0 ? `Overdue (${Math.abs(eq.daysRemaining)}h)` : `${eq.daysRemaining} Hari`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusBadgeClass(eq.computedStatus)}`}>
                        {eq.computedStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
