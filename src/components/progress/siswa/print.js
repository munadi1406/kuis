import pdfMake from "pdfmake/build/pdfmake";
import { localTime } from "@/utils/localTime";
import { pdfMakeFonts } from "@/components/users/generatePdf";


pdfMake.fonts = pdfMakeFonts;
export const printTeacherReport = async (data) => {
    try {
      const now = new Date();
      const formattedTime = localTime(now);
      
      // Extract necessary data from the provided object
      
      const quizDataArray = data.data;
      const quizPerBulanTahun = data.kuisPerBulanTahun;
  
      const documentDefinition = {
        content: [
          {
            text: `Progress Siswa ${data.namaLengkap}`,
            style: "header",
            alignment: "center",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Waktu Cetak: ${formattedTime}`,
            style: "subheader",
            alignment: "right",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Daftar Kuis yang DiKerjakan`,
            style: "subheader",
            alignment: "left",
            margin: [0, 10, 0, 10],
          },
          {
            table: {
              headerRows: 1,
              widths: ["*", "*", "*", "auto"],
              body: [
                [
                  { text: 'Judul', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                  { text: 'Mata Pelajaran', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                  { text: 'Kelas', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                  { text: 'Nilai', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] } // Light blue
                ],
                ...quizDataArray.map(quizData => [
                  { text: quizData.title, alignment: 'left', margin: [5, 2] }, // Left align with some margin
                  { text: quizData.mapel.mapel, alignment: 'center' }, // Center align
                  { text: quizData.kelas.kelas, alignment: 'center' }, // Center align
                  { text: (quizData.nilai).toFixed(1), alignment: 'center' }, // Center align
                ])
              ],
            },
          },
          {
            text: `Kuis Dikerjakan Per Bulan dan Tahun`,
            style: "subheader",
            alignment: "left",
            margin: [0, 10, 0, 10],
          },
          {
            table: {
              headerRows: 1,
              widths: ["*", "auto"],
              body: [
                [
                  { text: 'Tanggal', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                  { text: 'Jumlah Kuis', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] } // Light blue
                ],
                ...quizPerBulanTahun.map(e => [
                  { text: e.date, alignment: 'left', margin: [5, 2] }, // Left align with some margin
                  { text: e.count.toString(), alignment: 'center' }, // Center align
                ])
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 12,
            italics: false,
          },
          content: {
            fontSize: 10,
            italics: false,
          },
        },
      };
  
      pdfMake.createPdf(documentDefinition).download(`Progress Siswa ${data.namaLengkap}.pdf`);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  