import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import edjsHTML from "editorjs-html";
import axios from "axios";
import htmlToPdfmake from "html-to-pdfmake";


pdfMake.fonts = pdfMakeFonts;
const edjsParser = edjsHTML();


const fetchImageAsDataURL = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
export const printAnalize = async (title, id) => {
    try {
        const { data } = await axios.get(`/api/analisis?id=${id}`);

        // Process each question to handle images
        const processQuestion = async (questionData, index) => {
            const htmlString = edjsParser.parse(questionData.soal).join('');
            const htmlContent = htmlToPdfmake(htmlString);

            // Check for images in htmlContent and replace URLs with data URLs
            const processedContent = await Promise.all(htmlContent.map(async (item) => {
                if (item.image) {
                    item.image = await fetchImageAsDataURL(item.image);
                }
                return item;
            }));

            return processedContent;
        };

        // Generate content for each question
        const questionsContent = await Promise.all(data.data.map((questionData, index) =>
            processQuestion(questionData, index)
        ));

        const documentDefinition = {
            content: [
                {
                    text: `Analisis Pertanyaan Paling Sering Salah ${title}`,
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [
                            [
                                { text: 'Soal', style: 'tableHeader' },
                              
                                { text: 'Hasil', style: 'tableHeader' }
                            ],
                            ...data.data.map((item, index) => [
                                {
                                    stack: questionsContent[index], 
                                    style: 'tableBody'
                                },
                                { text: item.hasil, style: 'tableBody' }
                            ])
                        ]
                    },
                    layout: 'lightHorizontalLines'
                },
                
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black',
                },
                tableBody: {
                    fontSize: 11,
                },
            },
        };
        

        // Create and download the PDF
        pdfMake.createPdf(documentDefinition).download(`Analisis Pertanyaan Paling Sering Salah ${title}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
