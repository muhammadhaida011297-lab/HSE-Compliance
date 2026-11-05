import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  Bell, 
  History, 
  FileClock, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  unreadCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, unreadCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'permits', label: 'Monitoring Perizinan', icon: FileText },
    { id: 'equipment', label: 'Monitoring Peralatan', icon: Wrench },
    { id: 'reminders', label: 'Reminder & Notifikasi', icon: Bell, badge: unreadCount },
    { id: 'calibration-history', label: 'Riwayat Kalibrasi', icon: History },
    { id: 'permit-history', label: 'Riwayat Perizinan', icon: FileClock },
    { id: 'reports', label: 'Laporan', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-emerald-950 text-white flex flex-col shadow-xl flex-shrink-0">
      {/* App Brand Header */}
      <div className="p-5 border-b border-emerald-900 flex items-center gap-3 bg-emerald-900/60">
        <div className="p-2.5 bg-emerald-700 text-white rounded-xl shadow-md flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-base leading-tight tracking-wide">SIMARL</h1>
          <p className="text-xs text-emerald-300 font-medium">Compliance Monitoring</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
          Menu Utama
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-md font-semibold'
                  : 'text-emerald-100 hover:bg-emerald-900/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-200' : 'text-emerald-400 group-hover:text-emerald-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info / User Session */}
      <div className="p-4 border-t border-emerald-900 bg-emerald-900/40">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm shadow">
            BS
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">Budi Santoso, S.T.</p>
            <p className="text-[11px] text-emerald-300 truncate">HSE / Env Superintendent</p>
          </div>
        </div>
        <div className="text-[10px] text-emerald-400 bg-emerald-900/80 p-2 rounded-lg text-center border border-emerald-800">
          PT. Tambang Sejahtera Mandiri
        </div>
      </div>
    </aside>
  );
};
