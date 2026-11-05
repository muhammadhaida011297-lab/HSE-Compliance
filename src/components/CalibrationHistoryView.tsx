import React from 'react';
import { History, Wrench, Calendar, User } from 'lucide-react';
import { INITIAL_HISTORY } from '../data/initialData';

export const CalibrationHistoryView: React.FC = () => {
  const calibrationLogs = INITIAL_HISTORY.filter(h => h.type === 'equipment');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>Audit Trail & Log</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Kalibrasi Peralatan</h2>
          <p className="text-xs text-gray-500 mt-0.5">Catatan historis kalibrasi dan pengujian berkala alat ukur lingkungan</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-900 text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">ID Log</th>
                <th className="py-3.5 px-4">Waktu & Tanggal</th>
                <th className="py-3.5 px-4">Aksi</th>
                <th className="py-3.5 px-4">Nama Peralatan</th>
                <th className="py-3.5 px-4">PIC / Petugas</th>
                <th className="py-3.5 px-4">Detail Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {calibrationLogs.map((log) => (
                <tr key={log.id} className="hover:bg-teal-50/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-gray-600">{log.id}</td>
                  <td className="py-4 px-4 text-gray-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{log.timestamp}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-300">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-800">{log.title}</td>
                  <td className="py-4 px-4 text-gray-700 font-medium flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" /> {log.user}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{log.details}</td>
                </tr>
              ))}
              {calibrationLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">Belum ada riwayat kalibrasi tercatat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
