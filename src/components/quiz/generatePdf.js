import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { getFormattedDate, localTime } from "@/utils/localTime";
import axios from "axios";
import { header } from "../kelas/generatePdf";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (title, id) => {
  const { data } = await axios.get(`/api/score?id=${id}`)

  // console.log(data) 

  const now = new Date();
  const formattedTime = localTime(now);

  try {
    const documentDefinition = {
      content: [
        ...header(),
        {
          text: `Daftar Nilai Kuis ${title}`,
          style: "header",
          alignment: "center",
          margin: [0, 10, 0, 10],
        },
        {
          text: `${data.guruData.nama_lengkap} , ${localTime(data.quiz.start_quiz)} Sampai ${localTime(data.quiz.end_quiz)} ,Kelas ${data.quiz.kelas.kelas}`,
          style: "subheader",
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
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", 50, 50, 50, 50],
            body: [

              [
                { text: 'No', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'NISN', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Nama Lengkap', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Jumlah Soal', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Jawaban Benar', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Jawaban Salah', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Nilai', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] } // Light blue
              ],
              ...data.data.map(({ nisn, namaLengkap, total, score,hasRemedial }, i) => [
                { text: i + 1, alignment: 'center', margin: [0, 3] },
                { text: nisn, alignment: 'center', margin: [0, 3] },
                { text: namaLengkap, alignment: 'left', margin: [0, 3] },
                { text: total, alignment: 'center', margin: [0, 3] },
                { text: score, alignment: 'center', margin: [0, 3] },
                { text: total - score, alignment: 'center', margin: [0, 3] },
                { text: hasRemedial && (score / total * 100 ) >= data.quiz.kkm ? data.quiz.kkm : score / total * 100, alignment: 'center', margin: [0, 3] },
              ]),
            ],
          },
        },
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
              margin: [250, 40], // Adding space for the signature
            },
            {
              text: `${data.guruData.nama_lengkap}`,
              style: "subheader",
              alignment: "center",
              margin: [250, 0, 0, 10], // Align the name in the center and position it on the right side
            },
            {
              text: `NIP.${data.guruData.nip}`,
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
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`Daftar Nilai ${title}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
