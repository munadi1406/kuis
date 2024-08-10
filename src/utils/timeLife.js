export function timeElapsed(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.abs(now - past); // Difference in milliseconds

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let result = '';
    if (days > 0) {
        result += `${days} hari`;
    } else {
        if (hours > 0) {
            result += `${hours} jam `;
        }
        if (minutes > 0) {
            result += `${minutes} menit `;
        }
        if (seconds > 0) {
            result += `${seconds} detik`;
        }
    }

    return result.trim();
}