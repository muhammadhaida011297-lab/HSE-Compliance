import React from 'react';
import { Bell, Calendar, Building2, User } from 'lucide-react';
import { getTodayIndonesian } from '../utils/helpers';

interface HeaderProps {
  unreadCount: number;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ unreadCount, onOpenNotifications }) => {
  const todayStr = getTodayIndonesian();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-xs z-10">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>PT. Tambang Sejahtera Mandiri • Departemen Environment</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            Environmental Permit & Equipment Monitoring Dashboard
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-700 shadow-2xs">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{todayStr}</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 text-gray-700 hover:text-emerald-700 transition-all"
          title="Notifikasi & Reminder"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-gray-800">Budi Santoso, S.T.</p>
            <p className="text-[11px] text-gray-500">Superintendent Environment</p>
          </div>
        </div>
      </div>
    </header>
  );
};
