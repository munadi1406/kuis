import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import axios from "axios";

pdfMake.fonts = pdfMakeFonts;

export const generatePdf = async (img) => {

  
  try {
    const documentDefinition = {
      content: [
        {
          text: "Statistik Rating",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          image: img, // Add the image Data URI to the PDF
          width: 500, // You can adjust the width as needed
          alignment: 'center',
          margin: [0, 0, 0, 20],
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
