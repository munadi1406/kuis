import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import { localTime } from "@/utils/localTime";
import QRCode from 'qrcode';
import { header } from "../kelas/generatePdf";

pdfMake.fonts = pdfMakeFonts;


export const printLink = async (id, title, data, token) => {
  try {
    // Flatten the data to ensure all student entries are in a single array
    const now = new Date();
    const formattedTime = localTime(now);
    const generateQRCodeDataURLs = async (textArray) => {
      const urls = await Promise.all(textArray.map(text => QRCode.toDataURL(text, {
        width: 250, // Lebar QR Code dalam piksel untuk kualitas lebih baik
        margin: 1   // Margin QR Code
      })));
      return urls;
    };
    const links = data.map(e => `${import.meta.env.PUBLIC_BASE_URL}take/${id}/?nisn=${e.nisn}&token=${token}`);
    const qrCodeDataURLs = await generateQRCodeDataURLs(links);
    const documentDefinition = {
      content: [
        header(),
        {
          text: `Daftar Link ${title}`,
          style: "header",
          alignment: "center",
          margin: [0, 10, 0, 10],
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
            widths: ["auto", "auto", "*", 150, "*"],
            body: [
              [
                { text: 'No', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'NISN', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Nama Lengkap', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] }, // Light blue
                { text: 'Link', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] },// Light blue
                { text: 'QRCODE', alignment: 'center', fillColor: '#ADD8E6', bold: true, margin: [0, 5] } // Light blue
              ],
              ...data.map((e, idx) => [
                { text: idx + 1, alignment: 'center' }, // Center align the numbers
                { text: e.nisn, alignment: 'left', margin: [5, 2] }, // Left align with some margin
                { text: e.nama_lengkap, alignment: 'left', margin: [5, 2] }, // Left align with some margin
                {
                  text: `${import.meta.env.PUBLIC_BASE_URL}take/${id}/?nisn=${e.nisn}&token=${token}`,
                  link: `${import.meta.env.PUBLIC_BASE_URL}take/${id}/?nisn=${e.nisn}&token=${token}`,
                  color: 'blue',
                  decoration: 'underline',
                  alignment: 'left',

                },
                {
                  image: qrCodeDataURLs[idx],
                  width: 100,
                  height: 100,
                  alignment: 'center',
                }
              ])
            ],

          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 8,
          italics: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`Daftar Link ${title}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

