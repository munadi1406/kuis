import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import edjsHTML from "editorjs-html";
import axios from "axios";
import htmlToPdfmake from "html-to-pdfmake";
import { header } from "../kelas/generatePdf";
import { localTime } from "@/utils/localTime";


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
export const printDifficulty = async (title, id) => {
    try {
        const { data } = await axios.get(`/api/analisis/difficulty?id=${id}`);
        console.log(data)
        const now = new Date();
        const formattedTime = localTime(now);
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
                header(),
                {
                    text: `Analisis Kesulitan ${title}`,
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 10, 0, 10],
                },
                {
                    text: `${data.nama_lengkap} , ${localTime(data.start_quiz)} Sampai ${localTime(data.end_quiz)} ,Kelas ${data.kelas.kelas}, ${data.mapel.mapel}`,
                    style: "subheader",
                    alignment: "center",
                    margin: [0, 0, 0, 10],
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
                        widths: ['*', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Soal', style: 'tableHeader' },
                                { text: 'Kesulitan', style: 'tableHeader' },
                                { text: 'Detail Kesulitan', style: 'tableHeader' },
                                { text: 'Hasil', style: 'tableHeader' }
                            ],
                            ...data.data.map((item, index) => [
                                {
                                    stack: questionsContent[index], // Use the processed content for the question
                                    style: 'tableBody'
                                },
                                { text: item.kesulitan, style: 'tableBody' ,alignment: 'center',},
                                { text: item.detailKesulitan, style: 'tableBody',alignment: 'center', },
                                { text: item.hasil, style: 'tableBody',alignment: 'center', }
                            ])
                        ]
                    },

                },
                {
                    text: `Rata Rata Kesulitan Kuis: ${data.averageDifficulty} (${data.overallDifficulty})`,
                    style: 'averageDifficulty',
                    margin: [0, 10, 0, 5],
                },
                {
                    text: `Rata Rata Sukses: ${data.overallSuccessRate}`,
                    style: 'averageSuccessRate',
                    margin: [0, 5, 0, 5],
                },
                {
                    text: `Keterangan: ${data.readyToProceed}`,
                    style: 'readyToProceed',
                    margin: [0, 5, 0, 10],
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
                    alignment: 'center',
                    fillColor: '#ADD8E6'
                },
                tableBody: {
                    fontSize: 11,
                    
                },
                averageDifficulty: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 5],
                },
                averageSuccessRate: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 5],
                },
                readyToProceed: {
                    fontSize: 12,
                    italic: true,
                    margin: [0, 5, 0, 10],
                },
            },
        };


        // Create and download the PDF
        pdfMake.createPdf(documentDefinition).download(`Analisis ${title}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
