import React from 'react';
import { FileClock, FileText, Calendar, User } from 'lucide-react';
import { INITIAL_HISTORY } from '../data/initialData';

export const PermitHistoryView: React.FC = () => {
  const permitLogs = INITIAL_HISTORY.filter(h => h.type === 'permit');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FileClock className="w-4 h-4" />
            <span>Audit Trail & Log Perizinan</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Perizinan Lingkungan</h2>
          <p className="text-xs text-gray-500 mt-0.5">Catatan historis penerbitan, pembaruan, dan perpanjangan dokumen perizinan</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">ID Log</th>
                <th className="py-3.5 px-4">Waktu & Tanggal</th>
                <th className="py-3.5 px-4">Aksi</th>
                <th className="py-3.5 px-4">Nama Perizinan</th>
                <th className="py-3.5 px-4">PIC / Petugas</th>
                <th className="py-3.5 px-4">Detail Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {permitLogs.map((log) => (
                <tr key={log.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-gray-600">{log.id}</td>
                  <td className="py-4 px-4 text-gray-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{log.timestamp}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
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
              {permitLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">Belum ada riwayat perizinan tercatat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
