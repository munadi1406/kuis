import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { header } from "../kelas/generatePdf";
import { localTime } from "@/utils/localTime";



pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (title, getKelasName, data) => {

  const now = new Date();
  const formattedTime = localTime(now);

  try {
    const documentDefinition = {
      content: [
        header(),
        {
          text: `Daftar Siswa ${title}`,
          style: "header",
          alignment: "center",
          margin: [0, 10, 0, 10],
        },
        {
          text: `Waktu Cetak: ${formattedTime}`,
          alignment: "right",
          margin: [0, 0, 0, 10],
          fontSize: 10,
          italics: true,
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", 'auto', 'auto', '*'],
            body: [
              [
                { text: 'No', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'NISN', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Nama Lengkap', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Jenis Kelamin', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Kelas', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Alamat', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] } ,// Light blue
              ],
              ...data.data.map(({ nisn, siswa: { nama_lengkap, jenis_kelamin, alamat, id_kelas } }, i) => [
              
                { text: i + 1, alignment: 'center',  margin: [0, 3] },
                { text: nisn, alignment: 'center',  margin: [0, 3] },
                { text: nama_lengkap, alignment: 'left',  margin: [0, 3] },
                { text: jenis_kelamin, alignment: 'center',  margin: [0, 3] },
                { text:  getKelasName(id_kelas), alignment: 'center',  margin: [0, 3] },
                { text: alamat, alignment: 'left',  margin: [0, 3] },
               
              ]),
            ],
          },
        },
        {
          width: '*',
          text: `Total: ${data.data.length}`,
          margin: [0, 10, 10, 10],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`Daftar Siswa ${title}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
