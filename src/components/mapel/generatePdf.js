import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";
import { header } from "../kelas/generatePdf";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (data) => {
  const datas = await axios.get(`/api/mapel/all`);

  const now = new Date();
  const formattedTime = localTime(now);


  try {
    const documentDefinition = {
      content: [
        header(),
        {
          text: "Daftar Mata Pelajaran",
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
            widths: ["auto", "*", "*"],
            body: [
              ["No", "Mata Pelajaran", "Created At"],
              ...datas.data.data.map(({ created_at, id, mapel }, i) => [
                i + 1,
                mapel,
                String(localTime(created_at)),
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

    pdfMake.createPdf(documentDefinition).download("mapel.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
