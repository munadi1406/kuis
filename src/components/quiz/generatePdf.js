import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (title,id) => {
  const {data} = await axios.get(`/api/score?id=${id}`)
  
  try {
    const documentDefinition = {
      content: [
        {
          text: `Daftar Nilai Kuis ${title}`,
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*"],
            body: [
              ["No", "Nama Lengkap", "Nilai"],
              ...data.data.map(({ namaLengkap,total,score }, i) => [
                  i + 1,
                  namaLengkap,
                  score / total * 100,
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

    pdfMake.createPdf(documentDefinition).download(`Daftar Nilai ${title}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
