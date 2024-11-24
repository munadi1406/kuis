import pdfMake from 'pdfmake/build/pdfmake';
import { pdfMakeFonts } from '../users/generatePdf';
import { header } from '../kelas/generatePdf';
import { getFormattedDate, localTime } from '@/utils/localTime';



pdfMake.fonts = pdfMakeFonts;


export const reportQuiz = (quizzesArray, sortedUsers, kelas, data) => {

    // Menghitung data untuk tabel  

    const now = new Date();
    const formattedTime = localTime(now);

    const tableBody = [];

    // Header tabel
    tableBody.push([
        { text: 'No', alignment: 'center', fillColor: '#b3cde0', margin: [0, 10] }, // Biru muda
        { text: 'NISN', alignment: 'center', fillColor: '#b3cde0', margin: [0, 10] }, // Biru muda
        { text: 'Nama', fillColor: '#b3cde0', alignment: 'center', margin: [0, 10] }, // Biru muda
        ...quizzesArray.map(({ title }, i) => ({ text: i + 1, alignment: 'center', margin: [0, 10], fillColor: '#b3cde0' })), // Biru muda
        { text: 'Total', alignment: 'center', fillColor: '#b3cde0', margin: [0, 10] }, // Biru muda
        { text: 'Rata Rata', alignment: 'center', fillColor: '#b3cde0', margin: [0, 10] }, // Biru muda
        { text: 'Peringkat', alignment: 'center', fillColor: '#b3cde0', margin: [0, 10] } // Biru muda
    ]);

    // Data pengguna
    sortedUsers.forEach((user, index) => {
        let totalScore = 0;
        let totalQuizzes = 0;

        quizzesArray.forEach(({ totalQuestions, kkm, users }) => {
            const score = users.find(e => e.nisn === user.nisn);
            if (score) {
                totalScore += totalQuestions > 0
                    ? (score.hasRemedial && ((score.score / totalQuestions) * 100) >= kkm
                        ? Number(kkm)
                        : (score.score / totalQuestions) * 100)
                    : 0;
            }
            totalQuizzes += 1;
        });

        const averageScore = totalQuizzes > 0
            ? (totalScore / totalQuizzes).toFixed(1)
            : '0.0';

        const rank = sortedUsers
            .map(u => ({
                nisn: u.nisn,
                totalScore: quizzesArray.reduce((acc, { totalQuestions, users }) => {
                    const score = users.find(e => e.nisn === u.nisn);
                    return acc + (score ? (score.score / totalQuestions) * 100 : 0);
                }, 0)
            }))
            .sort((a, b) => b.totalScore - a.totalScore)
            .findIndex(u => u.nisn === user.nisn) + 1;

        tableBody.push([
            { text: index + 1, alignment: 'center' },
            { text: user.nisn },
            { text: user.namaLengkap },
            ...quizzesArray.map(({ totalQuestions,kkm, users }) => {
                const score = users.find(e => e.nisn === user.nisn);
                return {
                    text: score
                        ? score.hasRemedial && ((score.score / totalQuestions) * 100) > kkm
                            ? Number(kkm).toFixed(1)
                            : ((score.score / totalQuestions) * 100).toFixed(1)
                        : '0.0',
                    alignment: 'center'
                };
            }),
            { text: totalScore.toFixed(1), alignment: 'center' },
            { text: averageScore, alignment: 'center' },
            { text: rank, alignment: 'center' } // Menampilkan peringkat
        ]);
    });

    // Dokumen PDF
    const documentDefinition = {
        content: [
            header(),
            {
                text: `Rekap Nilai Kelas ${kelas}`,
                style: 'header',
                alignment: 'center',
                margin: [0, 10, 0, 10],
            },
            {
                text: `Waktu Cetak: ${formattedTime}`,
                style: "subheader",
                alignment: "right",
                margin: [0, 0, 0, 10],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', '*', ...Array(quizzesArray.length).fill('auto'), 'auto', 'auto', 'auto'],
                    body: tableBody
                },

            },
            { text: 'Keterangan Angka Kolom', alignment: 'left', fillColor: '#b3cde0', margin: [0, 10] },
            ...quizzesArray.map(({ title }, i) => ({ text: `${i + 1}. ${title}`, alignment: 'left', fillColor: '#b3cde0', margin: [0, 4] })),
            {
                stack: [
                    {
                        text: `Astambul, ${getFormattedDate()}`,
                        style: "subheader",
                        alignment: "center",
                        margin: [250, 0, 0, 10], // Adjust margin to position it on the right side
                    },
                    {
                        text: ``,
                        alignment: "center",
                        margin: [250, 20], // Adding space for the signature
                    },
                    {
                        text: `${data.nama_lengkap}`,
                        style: "subheader",
                        alignment: "center",
                        margin: [250, 0, 0, 10], // Align the name in the center and position it on the right side
                    },
                    {
                        text: `NIP.${data.nip}`,
                        style: "subheader",
                        alignment: "center",
                        margin: [250, 0, 0, 10], // Align the NIP in the center and position it on the right side
                    },
                ],
                margin: [0, 20, 0, 0],
                pageBreak: 'before',
            }

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            }
        }
    };

    pdfMake.createPdf(documentDefinition).download('Rekap Nilai.pdf');
};
