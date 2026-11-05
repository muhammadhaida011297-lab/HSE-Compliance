import React, { useState } from 'react';
import { Settings, Building2, Bell, Shield, RotateCcw, Save } from 'lucide-react';

interface SettingsViewProps {
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetData }) => {
  const [companyName, setCompanyName] = useState('PT. Tambang Sejahtera Mandiri');
  const [department, setDepartment] = useState('Departemen Environment (HSE)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Konfigurasi Sistem</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Pengaturan Aplikasi SIMARL</h2>
        <p className="text-xs text-gray-500 mt-0.5">Kelola preferensi perusahaan, pengingat otomatis, dan pemeliharaan database</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>Pengaturan berhasil disimpan ke sistem.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2 border-b pb-3">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>Informasi Perusahaan & Departemen</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Perusahaan</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Departemen</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2 border-b pb-3">
            <Bell className="w-5 h-5 text-emerald-700" />
            <span>Preferensi Notifikasi & Reminder Otomatis</span>
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded border-gray-300 focus:ring-emerald-600"
              />
              <span className="text-xs font-medium text-gray-700">Kirim pengingat otomatis H-30, H-14, H-7, H-1 melalui Email Superintendent</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded border-gray-300 focus:ring-emerald-600"
              />
              <span className="text-xs font-medium text-gray-700">Kirim notifikasi WhatsApp Gateway ke grup PIC Environment & HSE Officer</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (confirm('Apakah Anda ingin mereset seluruh data kembali ke data demo awal?')) {
                onResetData();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Data Demo</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
