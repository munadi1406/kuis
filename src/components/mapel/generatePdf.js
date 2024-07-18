import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (data) => {
  const datas = await axios.get(`/api/mapel/all`);
  
  try {
    const documentDefinition = {
      content: [
        {
          text: "Daftar Mata Pelajaran",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
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
