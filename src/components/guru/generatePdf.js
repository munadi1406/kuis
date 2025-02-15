import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";
import { header } from "../kelas/generatePdf";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async () => {
  const datas = await axios.get(`/api/guru/all`);
  const now = new Date();
      const formattedTime = localTime(now);

  try {
    const documentDefinition = {
      content: [
        header(),
        {
          text: "Daftar guru",
          style: "header",
          alignment: "center",
          margin: [10, 0, 0, 10],
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
            widths: ["auto", "auto", "auto", '*', '*'],
            body: [
              ["No", "NIP", "Nama lengkap", "Jenis Kelamin", "alamat",],
              ...datas.data.data.map(({ nip, nama_lengkap, jenis_kelamin, alamat, }, i) => [
                i + 1,
                nip,
                nama_lengkap,
                jenis_kelamin,
                alamat,

              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("daftar guru.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
