import { Permit, Equipment, HistoryLog } from '../types';

export const INITIAL_PERMITS: Permit[] = [
  {
    id: 'PRM-001',
    nomor: '01',
    namaPerizinan: 'Persetujuan Teknis Pembuangan Air Limbah (IPAL)',
    nomorDokumen: 'SK.452/MENLHK/SETJEN/PLA.4/5/2024',
    lokasi: 'Pit Melamin',
    tanggalPenerbitan: '2024-05-15',
    tanggalBerakhir: '2026-12-05', // ~31 days / warning soon (or adjust to trigger H-30)
    pic: 'Rahmat Hidayat, S.T.',
    departemen: 'Water Management Section',
    status: 'Akan Jatuh Tempo',
    dokumenNama: 'Pertek_IPAL_Pit_Melamin_2024.pdf',
    catatan: 'Dokumen perpanjangan sedang disiapkan untuk pengajuan ke Dinas ESDM & KLHK.'
  },
  {
    id: 'PRM-002',
    nomor: '02',
    namaPerizinan: 'Surat Kelayakan Operasional (SLO) Kegiatan Pengelolaan Limbah B3',
    nomorDokumen: '503/12/SLO-LB3/DPMPTSP/X/2023',
    lokasi: 'ISP Workshop',
    tanggalPenerbitan: '2023-11-10',
    tanggalBerakhir: '2026-11-18', // ~14 days remaining
    pic: 'Dewi Lestari, M.Env',
    departemen: 'Hazardous Waste Management',
    status: 'Akan Jatuh Tempo',
    dokumenNama: 'SLO_LB3_ISP_Workshop_2023.pdf',
    catatan: 'Inspeksi verifikasi lapangan dijadwalkan tanggal 10 November.'
  },
  {
    id: 'PRM-003',
    nomor: '03',
    namaPerizinan: 'Persetujuan Lingkungan (AMDAL / KELayakan Lingkungan)',
    nomorDokumen: '660.1/45/AMDAL/BLH/2021',
    lokasi: 'Port Bunyu',
    tanggalPenerbitan: '2021-08-20',
    tanggalBerakhir: '2026-11-08', // ~4 days remaining
    pic: 'Ir. Bambang Sugiarto',
    departemen: 'Environmental Compliance',
    status: 'Akan Jatuh Tempo',
    dokumenNama: 'AMDAL_Port_Bunyu_Final.pdf',
    catatan: 'Adendum AMDAL untuk pengembangan jetty tahap 2.'
  },
  {
    id: 'PRM-004',
    nomor: '04',
    namaPerizinan: 'Izin Penyimpanan Sementara Limbah B3',
    nomorDokumen: 'DPMPTSP.503/44/LB3-TPS/2022',
    lokasi: 'Stockpile Barat',
    tanggalPenerbitan: '2022-10-01',
    tanggalBerakhir: '2026-10-25', // Already overdue (passed)
    pic: 'Rahmat Hidayat, S.T.',
    departemen: 'Hazardous Waste Management',
    status: 'Kedaluwarsa',
    dokumenNama: 'Izin_TPS_LimbahB3_Stockpile.pdf',
    catatan: 'Perlu segera dilakukan pengurusan ulang karena telah melewati masa berlaku.'
  },
  {
    id: 'PRM-005',
    nomor: '05',
    namaPerizinan: 'Persetujuan Teknis Emisi Sumber Tidak Bergerak (Genset)',
    nomorDokumen: 'SK.881/PPKL/V/2023',
    lokasi: 'Office Site',
    tanggalPenerbitan: '2023-06-12',
    tanggalBerakhir: '2028-06-12',
    pic: 'Siti Rahmawati, S.Si',
    departemen: 'Air Quality Unit',
    status: 'Aktif',
    dokumenNama: 'Pertek_Emisi_Genset_Office.pdf',
    catatan: 'Masa berlaku masih panjang.'
  },
  {
    id: 'PRM-006',
    nomor: '06',
    namaPerizinan: 'Izin Pembuangan Air Limbah ke Laut (IPAL Jetty)',
    nomorDokumen: 'B-1290/MENLHK/SETJEN/WAS.1/9/2022',
    lokasi: 'Port Bunyu',
    tanggalPenerbitan: '2022-09-01',
    tanggalBerakhir: '2027-09-01',
    pic: 'Dewi Lestari, M.Env',
    departemen: 'Water Management Section',
    status: 'Aktif',
    dokumenNama: 'Izin_IPAL_Jetty_Bunyu.pdf',
    catatan: 'Laporan triwulanan rutin diserahkan tepat waktu.'
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'EQP-001',
    nomor: '01',
    namaPeralatan: 'Continuous Water Quality Monitoring System (SPARING Air)',
    nomorRegister: 'SPW-MTR-091',
    jenisPeralatan: 'Alat Monitoring SPARING',
    lokasi: 'WTP Area',
    tanggalKalibrasiTerakhir: '2026-05-10',
    intervalKalibrasiBulan: 6,
    tanggalKalibrasiBerikutnya: '2026-11-10', // ~6 days remaining
    pic: 'Ahmad Fauzi, M.T.',
    status: 'Jadwal Kalibrasi',
    sertifikatUrl: 'Sertifikat_Kalibrasi_SPARING_WTP.pdf',
    sertifikatNama: 'Sertifikat_Kalibrasi_SPARING_WTP.pdf',
    catatan: 'Vendor kalibrasi terakreditasi KAN telah dikonfirmasi hadir.'
  },
  {
    id: 'EQP-002',
    nomor: '02',
    namaPeralatan: 'Sound Level Meter (Alat Ukur Kebisingan)',
    nomorRegister: 'ENV-SLM-202',
    jenisPeralatan: 'Sound Level Meter',
    lokasi: 'Pit Melamin',
    tanggalKalibrasiTerakhir: '2025-11-01',
    intervalKalibrasiBulan: 12,
    tanggalKalibrasiBerikutnya: '2026-11-01', // Already overdue (passed 3 days)
    pic: 'Siti Rahmawati, S.Si',
    status: 'Overdue',
    sertifikatUrl: 'Sertifikat_SLM_Melamin_2025.pdf',
    sertifikatNama: 'Sertifikat_SLM_Melamin_2025.pdf',
    catatan: 'Alat sedang ditarik dari lapangan untuk dikirim ke laboratorium kalibrasi eksternal.'
  },
  {
    id: 'EQP-003',
    nomor: '03',
    namaPeralatan: 'Ambient Air Quality Sampler (High Volume Sampler)',
    nomorRegister: 'HVS-AMB-04',
    jenisPeralatan: 'Alat Ukur Udara Ambient',
    lokasi: 'Office Site',
    tanggalKalibrasiTerakhir: '2026-02-15',
    intervalKalibrasiBulan: 12,
    tanggalKalibrasiBerikutnya: '2027-02-15',
    pic: 'Ahmad Fauzi, M.T.',
    status: 'Aman',
    sertifikatUrl: 'Sertifikat_HVS_Office.pdf',
    sertifikatNama: 'Sertifikat_HVS_Office.pdf',
    catatan: 'Kondisi sensor flowmeter sangat baik.'
  },
  {
    id: 'EQP-004',
    nomor: '04',
    namaPeralatan: 'Portable Water Quality Meter (pH/DO/TDS)',
    nomorRegister: 'WQM-PORT-12',
    jenisPeralatan: 'Water Quality Monitoring Equipment',
    lokasi: 'Tailings Management Facility',
    tanggalKalibrasiTerakhir: '2026-05-20',
    intervalKalibrasiBulan: 6,
    tanggalKalibrasiBerikutnya: '2026-11-20', // ~16 days remaining
    pic: 'Rahmat Hidayat, S.T.',
    status: 'Jadwal Kalibrasi',
    sertifikatUrl: 'Sertifikat_WQM_Tailings.pdf',
    sertifikatNama: 'Sertifikat_WQM_Tailings.pdf',
    catatan: 'Kalibrasi menggunakan larutan standar pH 4, 7, dan 10.'
  },
  {
    id: 'EQP-005',
    nomor: '05',
    namaPeralatan: 'Current Meter / Alat Ukur Debit Air Sungai',
    nomorRegister: 'CM-DEBIT-01',
    jenisPeralatan: 'Alat Ukur Debit Air',
    lokasi: 'ISP Workshop',
    tanggalKalibrasiTerakhir: '2025-10-10',
    intervalKalibrasiBulan: 12,
    tanggalKalibrasiBerikutnya: '2026-10-10', // Overdue
    pic: 'Dewi Lestari, M.Env',
    status: 'Overdue',
    sertifikatUrl: 'Sertifikat_CurrentMeter.pdf',
    sertifikatNama: 'Sertifikat_CurrentMeter.pdf',
    catatan: 'Jadwal kalibrasi tertunda menunggu sparepart baling-baling.'
  },
  {
    id: 'EQP-006',
    nomor: '06',
    namaPeralatan: 'Gas Emission Analyzer (Stack Gas)',
    nomorRegister: 'GEA-STACK-03',
    jenisPeralatan: 'Alat Ukur Emisi',
    lokasi: 'Port Bunyu',
    tanggalKalibrasiTerakhir: '2026-04-01',
    intervalKalibrasiBulan: 12,
    tanggalKalibrasiBerikutnya: '2027-04-01',
    pic: 'Siti Rahmawati, S.Si',
    status: 'Aman',
    sertifikatUrl: 'Sertifikat_GasAnalyzer.pdf',
    sertifikatNama: 'Sertifikat_GasAnalyzer.pdf',
    catatan: 'Digunakan untuk uji emisi berkala genset port marine.'
  }
];

export const INITIAL_HISTORY: HistoryLog[] = [
  {
    id: 'HST-101',
    type: 'permit',
    action: 'UPDATE',
    title: 'Persetujuan Teknis Pembuangan Air Limbah (IPAL)',
    timestamp: '2026-10-12 14:30',
    user: 'Rahmat Hidayat, S.T.',
    details: 'Memperbarui dokumen pendukung dan catatan verifikasi.'
  },
  {
    id: 'HST-102',
    type: 'equipment',
    action: 'CALIBRATE',
    title: 'Continuous Water Quality Monitoring System',
    timestamp: '2026-05-10 10:15',
    user: 'Ahmad Fauzi, M.T.',
    details: 'Kalibrasi berkala semester 1 oleh PT. Kalibrasi Mandiri Utama.'
  },
  {
    id: 'HST-103',
    type: 'permit',
    action: 'CREATE',
    title: 'Izin Penyimpanan Sementara Limbah B3',
    timestamp: '2022-10-01 09:00',
    user: 'Admin Environment',
    details: 'Entry data perizinan baru ke dalam sistem database.'
  }
];
