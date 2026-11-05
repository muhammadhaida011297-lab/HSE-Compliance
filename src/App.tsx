import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { PermitsView } from './components/PermitsView';
import { EquipmentView } from './components/EquipmentView';
import { RemindersView } from './components/RemindersView';
import { CalibrationHistoryView } from './components/CalibrationHistoryView';
import { PermitHistoryView } from './components/PermitHistoryView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { PermitModal } from './components/PermitModal';
import { EquipmentModal } from './components/EquipmentModal';

import { INITIAL_PERMITS, INITIAL_EQUIPMENT } from './data/initialData';
import { Permit, Equipment } from './types';
import { calculateDaysRemaining } from './utils/helpers';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Load from localStorage or initial data
  const [permits, setPermits] = useState<Permit[]>(() => {
    const saved = localStorage.getItem('simarl_permits');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_PERMITS;
  });

  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('simarl_equipment');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_EQUIPMENT;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('simarl_permits', JSON.stringify(permits));
  }, [permits]);

  useEffect(() => {
    localStorage.setItem('simarl_equipment', JSON.stringify(equipment));
  }, [equipment]);

  // Modal states
  const [isPermitModalOpen, setIsPermitModalOpen] = useState(false);
  const [editingPermit, setEditingPermit] = useState<Permit | null>(null);

  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  // Unread reminder count calculation
  const permitDueCount = permits.filter(p => calculateDaysRemaining(p.tanggalBerakhir) <= 30).length;
  const equipDueCount = equipment.filter(e => calculateDaysRemaining(e.tanggalKalibrasiBerikutnya) <= 30).length;
  const unreadCount = permitDueCount + equipDueCount;

  // Permit Handlers
  const handleSavePermit = (permitData: Omit<Permit, 'id'> & { id?: string }) => {
    if (permitData.id) {
      setPermits(permits.map(p => p.id === permitData.id ? { ...p, ...permitData } as Permit : p));
    } else {
      const newPermit: Permit = {
        ...permitData,
        id: 'PRM-' + Date.now().toString().slice(-4)
      };
      setPermits([newPermit, ...permits]);
    }
  };

  const handleDeletePermit = (id: string) => {
    setPermits(permits.filter(p => p.id !== id));
  };

  // Equipment Handlers
  const handleSaveEquipment = (equipmentData: Omit<Equipment, 'id'> & { id?: string }) => {
    if (equipmentData.id) {
      setEquipment(equipment.map(eq => eq.id === equipmentData.id ? { ...eq, ...equipmentData } as Equipment : eq));
    } else {
      const newEquip: Equipment = {
        ...equipmentData,
        id: 'EQP-' + Date.now().toString().slice(-4)
      };
      setEquipment([newEquip, ...equipment]);
    }
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter(eq => eq.id !== id));
  };

  const handleResetData = () => {
    setPermits(INITIAL_PERMITS);
    setEquipment(INITIAL_EQUIPMENT);
    localStorage.removeItem('simarl_permits');
    localStorage.removeItem('simarl_equipment');
    alert('Data berhasil direset ke data demo awal.');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        unreadCount={unreadCount} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          unreadCount={unreadCount} 
          onOpenNotifications={() => setCurrentTab('reminders')} 
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <DashboardView 
              permits={permits}
              equipment={equipment}
              onOpenAddPermit={() => { setEditingPermit(null); setIsPermitModalOpen(true); }}
              onOpenAddEquipment={() => { setEditingEquipment(null); setIsEquipmentModalOpen(true); }}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'permits' && (
            <PermitsView 
              permits={permits}
              onAdd={() => { setEditingPermit(null); setIsPermitModalOpen(true); }}
              onEdit={(p) => { setEditingPermit(p); setIsPermitModalOpen(true); }}
              onDelete={handleDeletePermit}
            />
          )}

          {currentTab === 'equipment' && (
            <EquipmentView 
              equipment={equipment}
              onAdd={() => { setEditingEquipment(null); setIsEquipmentModalOpen(true); }}
              onEdit={(eq) => { setEditingEquipment(eq); setIsEquipmentModalOpen(true); }}
              onDelete={handleDeleteEquipment}
            />
          )}

          {currentTab === 'reminders' && (
            <RemindersView 
              permits={permits}
              equipment={equipment}
              onMarkAllRead={() => alert('Semua reminder telah ditandai dibaca.')}
            />
          )}

          {currentTab === 'calibration-history' && (
            <CalibrationHistoryView />
          )}

          {currentTab === 'permit-history' && (
            <PermitHistoryView />
          )}

          {currentTab === 'reports' && (
            <ReportsView 
              permits={permits}
              equipment={equipment}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView 
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <PermitModal 
        isOpen={isPermitModalOpen}
        onClose={() => setIsPermitModalOpen(false)}
        onSave={handleSavePermit}
        initialData={editingPermit}
      />

      <EquipmentModal 
        isOpen={isEquipmentModalOpen}
        onClose={() => setIsEquipmentModalOpen(false)}
        onSave={handleSaveEquipment}
        initialData={editingEquipment}
      />
    </div>
  );
}
