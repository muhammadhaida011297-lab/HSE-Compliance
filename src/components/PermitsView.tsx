import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  Eye, 
  Building2, 
  Calendar, 
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Permit, LocationType } from '../types';
import { calculateDaysRemaining, formatDateId, getStatusBadgeClass } from '../utils/helpers';

interface PermitsViewProps {
  permits: Permit[];
  onAdd: () => void;
  onEdit: (permit: Permit) => void;
  onDelete: (id: string) => void;
}

export const PermitsView: React.FC<PermitsViewProps> = ({ permits, onAdd, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Filter logic
  const filteredPermits = permits.filter((p) => {
    const matchesSearch = 
      p.namaPerizinan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || p.namaPerizinan === selectedCategory;
    const matchesLocation = selectedLocation === 'ALL' || p.lokasi === selectedLocation;

    const days = calculateDaysRemaining(p.tanggalBerakhir);
    let computedStatus = p.status;
    if (days < 0) computedStatus = 'Kedaluwarsa';
    else if (days <= 30) computedStatus = 'Akan Jatuh Tempo';

    const matchesStatus = selectedStatus === 'ALL' || computedStatus === selectedStatus;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  // Export to CSV / Excel
  const handleExportExcel = () => {
    const headers = ['Nomor', 'Nama Perizinan', 'Nomor Dokumen', 'Lokasi', 'Tanggal Penerbitan', 'Tanggal Berakhir', 'Sisa Hari', 'PIC', 'Status'];
    const rows = filteredPermits.map(p => {
      const days = calculateDaysRemaining(p.tanggalBerakhir);
      return [
        p.nomor,
        `"${p.namaPerizinan}"`,
        `"${p.nomorDokumen}"`,
        p.lokasi,
        p.tanggalPenerbitan,
        p.tanggalBerakhir,
        days,
        `"${p.pic}"`,
        p.status
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Monitoring_Perizinan_Environment_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Compliance & Legalitas</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Monitoring Perizinan Lingkungan</h2>
          <p className="text-xs text-gray-500 mt-0.5">Kelola dan pantau masa berlaku seluruh dokumen perizinan lingkungan PT. Tambang Sejahtera Mandiri</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Ekspor Excel</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all"
          >
            <FileText className="w-4 h-4 text-teal-700" />
            <span>Cetak PDF</span>
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Perizinan</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama izin, no dokumen, PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="ALL">Semua Jenis Perizinan</option>
            <option value="Persetujuan Lingkungan">Persetujuan Lingkungan</option>
            <option value="Persetujuan Teknis">Persetujuan Teknis</option>
            <option value="Surat Kelayakan Operasional (SLO)">Surat Kelayakan Operasional (SLO)</option>
            <option value="Perizinan Pengelolaan Limbah B3">Perizinan Pengelolaan Limbah B3</option>
            <option value="Perizinan Lainnya">Perizinan Lainnya</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="ALL">Semua Lokasi Operasional</option>
            <option value="Pit Melamin">Pit Melamin</option>
            <option value="Port Bunyu">Port Bunyu</option>
            <option value="ISP Workshop">ISP Workshop</option>
            <option value="Tailings Management Facility">Tailings Management Facility</option>
            <option value="Office Site">Office Site</option>
            <option value="WTP Area">WTP Area</option>
            <option value="Stockpile Barat">Stockpile Barat</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="ALL">Semua Status</option>
            <option value="Aktif">Aktif (Aman)</option>
            <option value="Akan Jatuh Tempo">Akan Jatuh Tempo (H-30)</option>
            <option value="Kedaluwarsa">Kedaluwarsa (Overdue)</option>
            <option value="Proses Perpanjangan">Proses Perpanjangan</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">No</th>
                <th className="py-3.5 px-4">Nama Perizinan & No Dokumen</th>
                <th className="py-3.5 px-4">Lokasi</th>
                <th className="py-3.5 px-4">Penerbitan</th>
                <th className="py-3.5 px-4">Berakhir</th>
                <th className="py-3.5 px-4">Sisa Waktu</th>
                <th className="py-3.5 px-4">PIC</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredPermits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500 font-medium">
                    Tidak ada data perizinan yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredPermits.map((p, idx) => {
                  const days = calculateDaysRemaining(p.tanggalBerakhir);
                  let computedStatus = p.status;
                  if (days < 0) computedStatus = 'Kedaluwarsa';
                  else if (days <= 30) computedStatus = 'Akan Jatuh Tempo';

                  return (
                    <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-700">{idx + 1}</td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-800">{p.namaPerizinan}</p>
                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">{p.nomorDokumen}</p>
                        {p.dokumenNama && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 font-semibold">
                            <FileText className="w-3 h-3" /> {p.dokumenNama}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                          <Building2 className="w-3 h-3 text-emerald-700" /> {p.lokasi}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{formatDateId(p.tanggalPenerbitan)}</td>
                      <td className="py-4 px-4 text-gray-800 font-semibold">{formatDateId(p.tanggalBerakhir)}</td>
                      <td className="py-4 px-4 font-bold">
                        <span className={`${days < 0 ? 'text-rose-600 bg-rose-50 px-2 py-1 rounded-md' : days <= 30 ? 'text-amber-700 bg-amber-50 px-2 py-1 rounded-md' : 'text-emerald-700'}`}>
                          {days < 0 ? `Overdue (${Math.abs(days)}h)` : `${days} Hari`}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-700">{p.pic}</p>
                        <p className="text-[10px] text-gray-500">{p.departemen}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusBadgeClass(computedStatus)}`}>
                          {computedStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onEdit(p)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                            title="Edit Data"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus data perizinan "${p.namaPerizinan}"?`)) {
                                onDelete(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
