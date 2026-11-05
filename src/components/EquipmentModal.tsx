import React, { useState, useEffect } from 'react';
import { X, Wrench, Calendar, MapPin, User, Hash } from 'lucide-react';
import { Equipment, EquipmentCategory, LocationType, EquipmentStatus } from '../types';
import { addMonthsToDate } from '../utils/helpers';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Omit<Equipment, 'id'> & { id?: string }) => void;
  initialData?: Equipment | null;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nomor: '',
    namaPeralatan: '',
    nomorRegister: '',
    jenisPeralatan: 'Alat Monitoring SPARING' as EquipmentCategory,
    lokasi: 'Pit Melamin' as LocationType,
    tanggalKalibrasiTerakhir: new Date().toISOString().split('T')[0],
    intervalKalibrasiBulan: 6,
    tanggalKalibrasiBerikutnya: addMonthsToDate(new Date().toISOString().split('T')[0], 6),
    pic: 'Ahmad Fauzi, M.T.',
    status: 'Aman' as EquipmentStatus,
    sertifikatNama: '',
    catatan: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nomor: initialData.nomor,
        namaPeralatan: initialData.namaPeralatan,
        nomorRegister: initialData.nomorRegister,
        jenisPeralatan: initialData.jenisPeralatan,
        lokasi: initialData.lokasi,
        tanggalKalibrasiTerakhir: initialData.tanggalKalibrasiTerakhir,
        intervalKalibrasiBulan: initialData.intervalKalibrasiBulan,
        tanggalKalibrasiBerikutnya: initialData.tanggalKalibrasiBerikutnya,
        pic: initialData.pic,
        status: initialData.status,
        sertifikatNama: initialData.sertifikatNama || '',
        catatan: initialData.catatan || ''
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        nomor: '0' + Math.floor(Math.random() * 90 + 10),
        namaPeralatan: '',
        nomorRegister: 'ENV-EQ-' + Math.floor(Math.random() * 900 + 100),
        jenisPeralatan: 'Alat Monitoring SPARING',
        lokasi: 'WTP Area',
        tanggalKalibrasiTerakhir: today,
        intervalKalibrasiBulan: 6,
        tanggalKalibrasiBerikutnya: addMonthsToDate(today, 6),
        pic: 'Ahmad Fauzi, M.T.',
        status: 'Aman',
        sertifikatNama: 'Sertifikat_Kalibrasi.pdf',
        catatan: ''
      });
    }
  }, [initialData, isOpen]);

  // Recalculate next calibration when last calibration or interval changes
  const handleLastDateChange = (dateVal: string) => {
    const nextDate = addMonthsToDate(dateVal, formData.intervalKalibrasiBulan);
    setFormData({
      ...formData,
      tanggalKalibrasiTerakhir: dateVal,
      tanggalKalibrasiBerikutnya: nextDate
    });
  };

  const handleIntervalChange = (months: number) => {
    const nextDate = addMonthsToDate(formData.tanggalKalibrasiTerakhir, months);
    setFormData({
      ...formData,
      intervalKalibrasiBulan: months,
      tanggalKalibrasiBerikutnya: nextDate
    });
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      ...formData
    });
    onClose();
  };

  const categories: EquipmentCategory[] = [
    'Alat Monitoring SPARING',
    'Water Quality Monitoring Equipment',
    'Alat Ukur Debit Air',
    'Alat Ukur Emisi',
    'Alat Ukur Udara Ambient',
    'Sound Level Meter',
    'Alat Ukur Lainnya'
  ];

  const locations: LocationType[] = [
    'Pit Melamin',
    'Port Bunyu',
    'ISP Workshop',
    'Tailings Management Facility',
    'Office Site',
    'WTP Area',
    'Stockpile Barat'
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800 rounded-lg">
              <Wrench className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {initialData ? 'Edit Data Peralatan & Kalibrasi' : 'Tambah Peralatan Lingkungan Baru'}
              </h3>
              <p className="text-xs text-emerald-300">PT. Tambang Sejahtera Mandiri - Environment Dept</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Urut</label>
              <input
                type="text"
                required
                value={formData.nomor}
                onChange={(e) => setFormData({ ...formData, nomor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Contoh: 01"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Peralatan</label>
              <input
                type="text"
                required
                value={formData.namaPeralatan}
                onChange={(e) => setFormData({ ...formData, namaPeralatan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Contoh: Sound Level Meter"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Register / Serial Number</label>
              <input
                type="text"
                required
                value={formData.nomorRegister}
                onChange={(e) => setFormData({ ...formData, nomorRegister: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Contoh: ENV-SLM-001"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Peralatan</label>
              <select
                value={formData.jenisPeralatan}
                onChange={(e) => setFormData({ ...formData, jenisPeralatan: e.target.value as EquipmentCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi Penempatan</label>
              <select
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value as LocationType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Interval Kalibrasi (Bulan)</label>
              <select
                value={formData.intervalKalibrasiBulan}
                onChange={(e) => handleIntervalChange(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value={3}>3 Bulan (Triwulanan)</option>
                <option value={6}>6 Bulan (Semesteran)</option>
                <option value={12}>12 Bulan (Tahunan)</option>
                <option value={24}>24 Bulan (2 Tahunan)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Kalibrasi Terakhir</label>
              <input
                type="date"
                required
                value={formData.tanggalKalibrasiTerakhir}
                onChange={(e) => handleLastDateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-900 mb-1">
                Jadwal Kalibrasi Berikutnya <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-md font-bold">Auto</span>
              </label>
              <input
                type="date"
                required
                disabled
                value={formData.tanggalKalibrasiBerikutnya}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-100/70 text-emerald-900 font-semibold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">PIC Penanggung Jawab</label>
              <input
                type="text"
                required
                value={formData.pic}
                onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status Kalibrasi</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EquipmentStatus })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="Aman">Aman</option>
                <option value="Jadwal Kalibrasi">Jadwal Kalibrasi</option>
                <option value="Overdue">Overdue</option>
                <option value="Dalam Perbaikan">Dalam Perbaikan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Sertifikat Kalibrasi (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, sertifikatNama: e.target.files[0].name });
                }
              }}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-300 rounded-xl"
            />
            {formData.sertifikatNama && (
              <p className="text-[11px] text-emerald-600 mt-1 font-medium">Sertifikat: {formData.sertifikatNama}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Catatan / Kondisi Alat</label>
            <textarea
              rows={2}
              value={formData.catatan}
              onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Catatan kalibrasi atau perbaikan..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-md transition-all"
            >
              Simpan Peralatan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
