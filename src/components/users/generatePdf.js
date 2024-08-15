import pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from "./vfs_fontes";

export const pdfMakeFonts = { 
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
   TimesNewRoman: {
    normal: 'https://mbkrjdzimlemcuyphnla.supabase.co/storage/v1/object/public/test/public/times%20new%20roman.ttf?t=2024-08-15T01%3A58%3A10.026Z', // Anda dapat mengabaikan ini jika menggunakan font default sistem
    bold: 'https://mbkrjdzimlemcuyphnla.supabase.co/storage/v1/object/public/test/public/times%20new%20roman%20bold.ttf?t=2024-08-15T01%3A59%3A11.404Z',
    italics: 'https://mbkrjdzimlemcuyphnla.supabase.co/storage/v1/object/public/test/public/times%20new%20roman%20italic.ttf?t=2024-08-15T01%3A59%3A22.548Z',
    bolditalics: 'https://mbkrjdzimlemcuyphnla.supabase.co/storage/v1/object/public/test/public/times%20new%20roman%20bold%20italic.ttf?t=2024-08-15T01%3A59%3A45.447Z',
  },
};
pdfMake.fonts = pdfMakeFonts;

export const generatePdf = (data) => {
  const documentDefinition = {
    content: [
      {
        text: 'Daftar Pengguna',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', 'auto'],
          body: [
            ['No', 'Username', 'Email', 'Role'],
            ...data.map((user, index) => [index + 1, user.username, user.email, user.role]),
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

  pdfMake.createPdf(documentDefinition).download('users.pdf');
};