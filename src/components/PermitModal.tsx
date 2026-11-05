import React, { useState, useEffect } from 'react';
import { X, FileText, Calendar, MapPin, User, Building, AlertCircle } from 'lucide-react';
import { Permit, PermitCategory, LocationType, PermitStatus } from '../types';

interface PermitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permit: Omit<Permit, 'id'> & { id?: string }) => void;
  initialData?: Permit | null;
}

export const PermitModal: React.FC<PermitModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nomor: '',
    namaPerizinan: '',
    nomorDokumen: '',
    lokasi: 'Pit Melamin' as LocationType,
    tanggalPenerbitan: new Date().toISOString().split('T')[0],
    tanggalBerakhir: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pic: 'Rahmat Hidayat, S.T.',
    departemen: 'Environmental Compliance',
    status: 'Aktif' as PermitStatus,
    dokumenNama: '',
    catatan: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nomor: initialData.nomor,
        namaPerizinan: initialData.namaPerizinan,
        nomorDokumen: initialData.nomorDokumen,
        lokasi: initialData.lokasi,
        tanggalPenerbitan: initialData.tanggalPenerbitan,
        tanggalBerakhir: initialData.tanggalBerakhir,
        pic: initialData.pic,
        departemen: initialData.departemen,
        status: initialData.status,
        dokumenNama: initialData.dokumenNama || '',
        catatan: initialData.catatan || ''
      });
    } else {
      setFormData({
        nomor: '0' + Math.floor(Math.random() * 90 + 10),
        namaPerizinan: '',
        nomorDokumen: '',
        lokasi: 'Pit Melamin',
        tanggalPenerbitan: new Date().toISOString().split('T')[0],
        tanggalBerakhir: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pic: 'Rahmat Hidayat, S.T.',
        departemen: 'Environmental Compliance',
        status: 'Aktif',
        dokumenNama: 'Dokumen_Perizinan_Lingkungan.pdf',
        catatan: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      ...formData
    });
    onClose();
  };

  const categories: PermitCategory[] = [
    'Persetujuan Lingkungan',
    'Persetujuan Teknis',
    'Surat Kelayakan Operasional (SLO)',
    'Perizinan Pengelolaan Limbah B3',
    'Perizinan Lainnya'
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
              <FileText className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {initialData ? 'Edit Data Perizinan Lingkungan' : 'Tambah Perizinan Lingkungan Baru'}
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis / Nama Perizinan</label>
              <select
                value={formData.namaPerizinan}
                onChange={(e) => setFormData({ ...formData, namaPerizinan: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="">-- Pilih Jenis Perizinan --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                {formData.namaPerizinan && !categories.includes(formData.namaPerizinan as any) && (
                  <option value={formData.namaPerizinan}>{formData.namaPerizinan}</option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Dokumen / SK</label>
              <input
                type="text"
                required
                value={formData.nomorDokumen}
                onChange={(e) => setFormData({ ...formData, nomorDokumen: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Contoh: SK.452/MENLHK/..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi Operasional</label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Penerbitan</label>
              <input
                type="date"
                required
                value={formData.tanggalPenerbitan}
                onChange={(e) => setFormData({ ...formData, tanggalPenerbitan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Berakhir (Jatuh Tempo)</label>
              <input
                type="date"
                required
                value={formData.tanggalBerakhir}
                onChange={(e) => setFormData({ ...formData, tanggalBerakhir: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Departemen / Seksi</label>
              <input
                type="text"
                required
                value={formData.departemen}
                onChange={(e) => setFormData({ ...formData, departemen: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status Perizinan</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PermitStatus })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="Aktif">Aktif</option>
                <option value="Akan Jatuh Tempo">Akan Jatuh Tempo</option>
                <option value="Kedaluwarsa">Kedaluwarsa</option>
                <option value="Proses Perpanjangan">Proses Perpanjangan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Dokumen PDF</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({ ...formData, dokumenNama: e.target.files[0].name });
                  }
                }}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-300 rounded-xl"
              />
            </div>
            {formData.dokumenNama && (
              <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                <FileText className="w-3.5 h-3.5" /> File terpilih: {formData.dokumenNama}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Catatan / Keterangan Tambahan</label>
            <textarea
              rows={2}
              value={formData.catatan}
              onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Catatan progres perpanjangan atau verifikasi..."
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
              Simpan Perizinan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
