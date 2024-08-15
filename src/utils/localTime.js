export const localTime = (isoDateString) => {
  return new Date(isoDateString).toLocaleString();
};
export function getFormattedDate() {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu'];
  const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const today = new Date();
  const dayName = days[today.getDay()]; // Nama hari
  const date = today.getDate(); // Tanggal
  const monthName = months[today.getMonth()]; // Nama bulan
  const year = today.getFullYear(); // Tahun

  return `${dayName}, ${date} ${monthName} ${year}`;
}