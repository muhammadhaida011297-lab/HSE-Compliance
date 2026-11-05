export type PermitCategory = 
  | 'Persetujuan Lingkungan'
  | 'Persetujuan Teknis'
  | 'Surat Kelayakan Operasional (SLO)'
  | 'Perizinan Pengelolaan Limbah B3'
  | 'Perizinan Lainnya';

export type PermitStatus = 'Aktif' | 'Akan Jatuh Tempo' | 'Kedaluwarsa' | 'Proses Perpanjangan';

export type EquipmentCategory = 
  | 'Alat Monitoring SPARING'
  | 'Water Quality Monitoring Equipment'
  | 'Alat Ukur Debit Air'
  | 'Alat Ukur Emisi'
  | 'Alat Ukur Udara Ambient'
  | 'Sound Level Meter'
  | 'Alat Ukur Lainnya';

export type EquipmentStatus = 'Aman' | 'Jadwal Kalibrasi' | 'Overdue' | 'Dalam Perbaikan';

export type LocationType = 'Pit Melamin' | 'Port Bunyu' | 'ISP Workshop' | 'Tailings Management Facility' | 'Office Site' | 'WTP Area' | 'Stockpile Barat';

export interface Permit {
  id: string;
  nomor: string;
  namaPerizinan: string;
  nomorDokumen: string;
  lokasi: LocationType;
  tanggalPenerbitan: string; // YYYY-MM-DD
  tanggalBerakhir: string; // YYYY-MM-DD
  pic: string;
  departemen: string;
  status: PermitStatus;
  dokumenUrl?: string;
  dokumenNama?: string;
  catatan?: string;
}

export interface Equipment {
  id: string;
  nomor: string;
  namaPeralatan: string;
  nomorRegister: string;
  jenisPeralatan: EquipmentCategory;
  lokasi: LocationType;
  tanggalKalibrasiTerakhir: string; // YYYY-MM-DD
  intervalKalibrasiBulan: number; // e.g., 6, 12
  tanggalKalibrasiBerikutnya: string; // YYYY-MM-DD (calculated)
  pic: string;
  status: EquipmentStatus;
  sertifikatUrl?: string;
  sertifikatNama?: string;
  catatan?: string;
}

export interface ReminderItem {
  id: string;
  type: 'permit' | 'equipment';
  itemId: string;
  title: string;
  location: string;
  dueDate: string;
  daysRemaining: number;
  urgency: 'safe' | 'warning-30' | 'warning-14' | 'warning-7' | 'warning-1' | 'overdue';
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface HistoryLog {
  id: string;
  type: 'permit' | 'equipment';
  action: 'CREATE' | 'UPDATE' | 'RENEW' | 'CALIBRATE' | 'DELETE';
  title: string;
  timestamp: string;
  user: string;
  details: string;
}
