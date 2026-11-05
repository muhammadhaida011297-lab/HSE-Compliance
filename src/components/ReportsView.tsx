import React from 'react';
import { BarChart3, FileText, Wrench, Download, Printer, Building2, ShieldCheck } from 'lucide-react';
import { Permit, Equipment } from '../types';
import { calculateDaysRemaining } from '../utils/helpers';

interface ReportsViewProps {
  permits: Permit[];
  equipment: Equipment[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ permits, equipment }) => {
  const totalPermits = permits.length;
  const totalEquipment = equipment.length;

  const permitsDueSoon = permits.filter(p => calculateDaysRemaining(p.tanggalBerakhir) <= 30 && calculateDaysRemaining(p.tanggalBerakhir) >= 0).length;
  const permitsOverdue = permits.filter(p => calculateDaysRemaining(p.tanggalBerakhir) < 0).length;
  const permitsSafe = totalPermits - permitsDueSoon - permitsOverdue;

  const equipDueSoon = equipment.filter(e => calculateDaysRemaining(e.tanggalKalibrasiBerikutnya) <= 30 && calculateDaysRemaining(e.tanggalKalibrasiBerikutnya) >= 0).length;
  const equipOverdue = equipment.filter(e => calculateDaysRemaining(e.tanggalKalibrasiBerikutnya) < 0).length;
  const equipSafe = totalEquipment - equipDueSoon - equipOverdue;

  const complianceRate = Math.round(((permitsSafe + equipSafe) / (totalPermits + totalEquipment)) * 100) || 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Summary & Laporan Kepatuhan</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Departemen Environment</h2>
          <p className="text-xs text-gray-500 mt-0.5">Analisis tingkat kepatuhan perizinan dan kalibrasi alat lingkungan PT. Tambang Sejahtera Mandiri</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Laporan Resmi</span>
        </button>
      </div>

      {/* Compliance Rate Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold">Indeks Kepatuhan Lingkungan (Environmental Compliance Rate)</h3>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Persentase total dokumen perizinan dan kalibrasi peralatan yang berada dalam status aman terhadap keseluruhan inventaris departemen environment.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20 text-center">
          <span className="text-4xl font-extrabold text-emerald-300">{complianceRate}%</span>
          <p className="text-xs font-semibold uppercase tracking-wider mt-1 text-emerald-100">Status Kepatuhan Tinggi</p>
        </div>
      </div>

      {/* Summary Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2 border-b pb-3">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>Rekapitulasi Perizinan Lingkungan</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-gray-600 font-medium">Total Perizinan Terdaftar</span>
              <span className="font-bold text-gray-800">{totalPermits} Dokumen</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-emerald-700 font-medium">Status Aman (Aktif)</span>
              <span className="font-bold text-emerald-700">{permitsSafe} Dokumen</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-amber-600 font-medium">Akan Jatuh Tempo (H-30)</span>
              <span className="font-bold text-amber-600">{permitsDueSoon} Dokumen</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-rose-600 font-medium">Sudah Kedaluwarsa (Overdue)</span>
              <span className="font-bold text-rose-600">{permitsOverdue} Dokumen</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2 border-b pb-3">
            <Wrench className="w-5 h-5 text-teal-700" />
            <span>Rekapitulasi Kalibrasi Peralatan</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-gray-600 font-medium">Total Peralatan Terdaftar</span>
              <span className="font-bold text-gray-800">{totalEquipment} Unit</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-teal-700 font-medium">Status Kalibrasi Aman</span>
              <span className="font-bold text-teal-700">{equipSafe} Unit</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs">
              <span className="text-amber-600 font-medium">Jadwal Kalibrasi (H-30)</span>
              <span className="font-bold text-amber-600">{equipDueSoon} Unit</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-rose-600 font-medium">Overdue / Belum Kalibrasi</span>
              <span className="font-bold text-rose-600">{equipOverdue} Unit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
