import pdfMake from 'pdfmake/build/pdfmake';
import { pdfMakeFonts } from '../users/generatePdf';



pdfMake.fonts = pdfMakeFonts;


export const reportQuiz = (quizzesArray, sortedUsers) => {
    // Menghitung data untuk tabel
    const tableBody = [];

    // Header tabel
    tableBody.push([
        { text: 'No', alignment: 'center', fillColor: '#b3cde0' }, // Biru muda
        { text: 'Nama', fillColor: '#b3cde0' }, // Biru muda
        ...quizzesArray.map(({ title }) => ({ text: title, alignment: 'center', fillColor: '#b3cde0' })), // Biru muda
        { text: 'Total', alignment: 'center', fillColor: '#b3cde0' }, // Biru muda
        { text: 'Rata Rata', alignment: 'center', fillColor: '#b3cde0' }, // Biru muda
        { text: 'Keterangan', alignment: 'center', fillColor: '#b3cde0' } // Biru muda
    ]);

    // Data pengguna
    sortedUsers.forEach((user, index) => {
        let totalScore = 0;
        let totalQuizzes = 0;

        quizzesArray.forEach(({ totalQuestion, users }) => {
            const score = users.find(e => e.userId === user.userId);
            if (score) {
                totalScore += (score.score / totalQuestion) * 100;
            }
            totalQuizzes += 1;
        });

        const averageScore = totalQuizzes > 0
            ? (totalScore / totalQuizzes).toFixed(1)
            : '0.0';

        const rank = sortedUsers
            .map(u => ({
                userId: u.userId,
                totalScore: quizzesArray.reduce((acc, { totalQuestion, users }) => {
                    const score = users.find(e => e.userId === u.userId);
                    return acc + (score ? (score.score / totalQuestion) * 100 : 0);
                }, 0)
            }))
            .sort((a, b) => b.totalScore - a.totalScore)
            .findIndex(u => u.userId === user.userId) + 1;

        tableBody.push([
            { text: index + 1, alignment: 'center' },
            { text: user.namaLengkap},
            ...quizzesArray.map(({ totalQuestion, users }) => {
                const score = users.find(e => e.userId === user.userId);
                return {
                    text: score
                        ? ((score.score / totalQuestion) * 100).toFixed(1)
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
            {
                text: 'Rekap Nilai',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', ...Array(quizzesArray.length).fill('auto'), 'auto', 'auto', 'auto'],
                    body: tableBody
                },
                
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
