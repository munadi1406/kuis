import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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