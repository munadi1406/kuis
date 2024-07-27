export const calculateDuration = (start, end) => {
    // Hitung selisih waktu dalam milidetik
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime;

    // Hitung durasi dalam detik, menit, dan jam
    const totalSeconds = Math.floor(durationMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return { hours, minutes, seconds };
};


export const getConclusion = (score, total) => {
    if (total === 0) return 'Tidak ada soal untuk dinilai.';
    
    const percentage = (score / total) * 100;
  
    if (percentage >= 70) {
      return 'Pemahaman materi sangat baik.';
    } else if (percentage >= 50) {
      return 'Pemahaman materi cukup baik, tetapi masih perlu perbaikan.';
    } else {
      return 'Pemahaman materi kurang, perlu lebih banyak belajar.';
    }
  };
  