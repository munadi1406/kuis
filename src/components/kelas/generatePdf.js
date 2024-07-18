import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (data) => {
  const datas = await axios.get(`/api/kelas/all`);
  
  try {
    const documentDefinition = {
      content: [
        {
          text: "Daftar Kelas",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*"],
            body: [
              ["No", "Kelas", "Created At"],
              ...datas.data.data.map(({ created_at, id, kelas }, i) => [
                  i + 1,
                  kelas,
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
