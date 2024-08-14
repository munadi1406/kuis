import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";



pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (title,getKelasName,data) => {

 
 
  try {
    const documentDefinition = {
      content: [
        {
          text: `Daftar Siswa ${title}`,
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", '*', '*','*'],
            body: [
              ["No", "NISN", "Nama lengkap","Kelas", "Jenis Kelamin", "alamat",],
              ...data.data.map(({ nisn, siswa:{nama_lengkap, jenis_kelamin, alamat,id_kelas} }, i) => [
                i + 1,
                nisn,
                nama_lengkap,
                getKelasName(id_kelas),
                jenis_kelamin,
                alamat,
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
