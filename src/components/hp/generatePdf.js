import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { getLogo } from "@/utils/logo";
import { localTime } from "@/utils/localTime";


pdfMake.fonts = pdfMakeFonts;
export const header = ()=>{
  const logo = getLogo()
  return [
    {
      table: {
        widths: [50, '*'],
        body: [
          [
            { image: logo, width: 60, alignment: "center", margin: [0, 10], },
            {
              stack: [
                { text: 'PEMERINTAH KABUPATEN BANJAR\n', bold: true, fontSize: 14, alignment: 'center', font: 'TimesNewRoman', lineHeight: 1.2 },
                { text: 'DINAS PENDIDIKAN\n', bold: true, fontSize: 14, alignment: 'center', font: 'TimesNewRoman', lineHeight: 1.2 },
                { text: 'SATUAN PENDIDIKAN\n SEKOLAH DASAR NEGERI PINGARAN ULU\n', bold: true, fontSize: 14, alignment: 'center', font: 'TimesNewRoman', lineHeight: 1.2, margin: [65,0, 0, 0],noWrap: true, },
                { text: 'NIS. 100050\n', bold: true, fontSize: 14, alignment: 'center', font: 'TimesNewRoman', lineHeight: 1.2 },
                { text: 'Alamat: Jalan Pingaran Ulu RT.04 RW.02, Kecamatan Astambul, Kabupaten Banjar,\n Kode Pos 70671', fontSize: 10, alignment: 'center', font: 'TimesNewRoman', lineHeight: 1.5 },
              ],
              margin: [-60, 10, 0, 10],
            },
          ],
        ],
      },
      layout: 'noBorders',
    },
    {
      canvas: [
        {
          type: 'line',
          x1: 0,
          y1: 0,
          x2: 515, // Lebar garis (sesuaikan dengan lebar halaman)
          y2: 0,
          lineWidth: 2,
          lineColor: 'black',
          margin: [0, 20], // Margin atas dan bawah
        }
      ]
    },
  ]
}


export const generatePdf = async (data) => {
  try {
    const now = new Date();
      const formattedTime = localTime(now);
    const totalSiswaAll = data
      .flatMap((page) => page.data.data)
      .reduce((sum, { kelas_history }) => sum + kelas_history.length, 0);

    const totalLakiLakiAll = data
      .flatMap((page) => page.data.data)
      .reduce((sum, { totalLakiLaki }) => sum + totalLakiLaki, 0);

    const totalPerempuanAll = data
      .flatMap((page) => page.data.data)
      .reduce((sum, { totalPerempuan }) => sum + totalPerempuan, 0);

    const documentDefinition = {
      content: [
        ...header(),
        {
          text: "Daftar Kelas",
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
            widths: ["auto", "*", "*", "*", "*"],
            body: [
              [
                { text: "No", style: "tableHeader", alignment: "center" },
                { text: "Kelas", style: "tableHeader", alignment: "center" },
                { text: "Laki-laki", style: "tableHeader", alignment: "center" },
                { text: "Perempuan", style: "tableHeader", alignment: "center" },
                { text: "Jumlah Siswa", style: "tableHeader", alignment: "center" },
              ],
              ...data
                .flatMap((page) => page.data.data)
                .map(({ kelas, totalSiswa, totalLakiLaki, totalPerempuan }, i) => [
                  { text: i + 1, alignment: "center" },
                  { text: `Kelas ${kelas}`, alignment: "left" },
                  { text: totalLakiLaki, alignment: "center" },
                  { text: totalPerempuan, alignment: "center" },
                  { text: totalSiswa, alignment: "center" },
                ]),
              // Menambahkan baris untuk total jumlah laki-laki dan perempuan
              [
                { text: "Total", colSpan: 2, alignment: "center", bold: true },
                {}, // Colspan menggabungkan dua kolom pertama
                { text: totalLakiLakiAll, alignment: "center", bold: true },
                { text: totalPerempuanAll, alignment: "center", bold: true },
                { text: totalSiswaAll, alignment: "center", bold: true },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: '#ADD8E6',
          margin: [0, 5, 0, 5], // Padding di dalam header
        },
      },
      defaultStyle: {
        fontSize: 12, 
       
      },
    };

    pdfMake.createPdf(documentDefinition).download("daftar_kelas.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};



