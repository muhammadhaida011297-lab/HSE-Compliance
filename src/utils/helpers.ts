export function calculateDaysRemaining(targetDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDateId(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const months = [
        '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const mNum = parseInt(month, 10);
      return `${day} ${months[mNum] || month} ${year}`;
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export function formatDateTimeId(isoStr: string): string {
  if (!isoStr) return '-';
  return isoStr;
}

export function getTodayIndonesian(): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const now = new Date();
  const dName = days[now.getDay()];
  const date = now.getDate();
  const mName = months[now.getMonth()];
  const year = now.getFullYear();
  return `${dName}, ${date} ${mName} ${year}`;
}

export function addMonthsToDate(dateStr: string, months: number): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Aktif':
    case 'Aman':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'Akan Jatuh Tempo':
    case 'Jadwal Kalibrasi':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'Kedaluwarsa':
    case 'Overdue':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    case 'Proses Perpanjangan':
    case 'Dalam Perbaikan':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}
